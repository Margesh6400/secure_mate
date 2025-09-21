import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface CreateOrderRequest {
  bookingId: string;
  amount: number;
  currency?: string;
  receipt?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser()

    if (userError || !user) {
      throw new Error('Unauthorized')
    }

    // Parse request body
    const { bookingId, amount, currency = 'INR', receipt }: CreateOrderRequest = await req.json()

    if (!bookingId || !amount || amount <= 0) {
      throw new Error('Invalid booking ID or amount')
    }

    // Verify the booking exists and belongs to the user
    const { data: booking, error: bookingError } = await supabaseClient
      .from('bookings')
      .select('id, client_id, total_amount')
      .eq('id', bookingId)
      .eq('client_id', user.id)
      .single()

    if (bookingError || !booking) {
      throw new Error('Booking not found or unauthorized')
    }

    // Verify the amount matches the booking amount
    if (Math.abs(booking.total_amount - amount) > 0.01) {
      throw new Error('Amount mismatch')
    }

    // Create Razorpay order
    const razorpayKeyId = Deno.env.get('RAZORPAY_KEY_ID')
    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET')

    if (!razorpayKeyId || !razorpayKeySecret) {
      throw new Error('Razorpay credentials not configured')
    }

    const orderData = {
      amount: Math.round(amount * 100), // Convert to paise
      currency,
      receipt: receipt || `booking_${bookingId}`,
      notes: {
        booking_id: bookingId,
        client_id: user.id,
      },
    }

    const auth = btoa(`${razorpayKeyId}:${razorpayKeySecret}`)
    
    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })

    if (!razorpayResponse.ok) {
      const errorText = await razorpayResponse.text()
      console.error('Razorpay API error:', errorText)
      throw new Error('Failed to create Razorpay order')
    }

    const razorpayOrder = await razorpayResponse.json()

    // Store payment record in database
    const { data: payment, error: paymentError } = await supabaseClient
      .from('payments')
      .insert([
        {
          booking_id: bookingId,
          client_id: user.id,
          amount,
          currency,
          status: 'created',
          razorpay_order_id: razorpayOrder.id,
        },
      ])
      .select()
      .single()

    if (paymentError) {
      console.error('Database error:', paymentError)
      throw new Error('Failed to store payment record')
    }

    return new Response(
      JSON.stringify({
        success: true,
        order: razorpayOrder,
        payment_id: payment.id,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})