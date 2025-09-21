import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { crypto } from "https://deno.land/std@0.177.0/crypto/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature }: VerifyPaymentRequest = await req.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw new Error('Missing required payment parameters')
    }

    // Get Razorpay secret
    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET')
    if (!razorpayKeySecret) {
      throw new Error('Razorpay secret not configured')
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(razorpayKeySecret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    ).then(key => 
      crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body))
    ).then(signature => 
      Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
    )

    const isSignatureValid = expectedSignature === razorpay_signature

    // Find the payment record
    const { data: payment, error: paymentError } = await supabaseClient
      .from('payments')
      .select('*, bookings(*)')
      .eq('razorpay_order_id', razorpay_order_id)
      .eq('client_id', user.id)
      .single()

    if (paymentError || !payment) {
      throw new Error('Payment record not found')
    }

    if (isSignatureValid) {
      // Payment successful - update payment and booking status
      const { error: updatePaymentError } = await supabaseClient
        .from('payments')
        .update({
          status: 'success',
          razorpay_payment_id,
          razorpay_signature,
          updated_at: new Date().toISOString(),
        })
        .eq('id', payment.id)

      if (updatePaymentError) {
        console.error('Error updating payment:', updatePaymentError)
        throw new Error('Failed to update payment status')
      }

      // Update booking status to confirmed
      const { error: updateBookingError } = await supabaseClient
        .from('bookings')
        .update({
          status: 'confirmed',
          updated_at: new Date().toISOString(),
        })
        .eq('id', payment.booking_id)

      if (updateBookingError) {
        console.error('Error updating booking:', updateBookingError)
        throw new Error('Failed to update booking status')
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Payment verified and booking confirmed',
          payment_status: 'success',
          booking_status: 'confirmed',
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    } else {
      // Payment verification failed
      const { error: updatePaymentError } = await supabaseClient
        .from('payments')
        .update({
          status: 'failed',
          razorpay_payment_id,
          razorpay_signature,
          updated_at: new Date().toISOString(),
        })
        .eq('id', payment.id)

      if (updatePaymentError) {
        console.error('Error updating payment:', updatePaymentError)
      }

      return new Response(
        JSON.stringify({
          success: false,
          message: 'Payment verification failed',
          payment_status: 'failed',
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }
  } catch (error) {
    console.error('Error verifying payment:', error)
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