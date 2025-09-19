import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase, type BodyguardApplication } from '../lib/supabase';
import { Shield, Upload, CheckCircle, AlertCircle, User, Phone, Mail, Ruler, Weight, Clock, MapPin, IndianRupee, FileText, Briefcase } from 'lucide-react';
import Button from '../components/Button';

interface FormData extends Omit<BodyguardApplication, 'id' | 'government_id_url' | 'created_at' | 'updated_at' | 'status'> {
  government_id_file: FileList;
}

const BecomeBodyguard: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<FormData>();

  const specializationOptions = [
    'Event Security',
    'Personal Escort',
    'Bouncer',
    'Senior Citizen Escort',
    'VIP Protection',
    'Corporate Security',
    'Tourist Guide Protection',
    'Wedding Security',
    'Concert Security',
    'Other'
  ];

  const uploadFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('bodyguard_ids')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw new Error(`File upload failed: ${error.message}`);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('bodyguard_ids')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setUploadProgress(0);

    try {
      // Upload government ID file
      setUploadProgress(25);
      const governmentIdUrl = await uploadFile(data.government_id_file[0]);
      setUploadProgress(50);

      // Prepare data for database
      const applicationData: Omit<BodyguardApplication, 'id' | 'created_at' | 'updated_at' | 'status'> = {
        full_name: data.full_name,
        age: Number(data.age),
        gender: data.gender,
        phone_number: data.phone_number,
        email_address: data.email_address || null,
        height_cm: Number(data.height_cm),
        weight_kg: Number(data.weight_kg),
        years_experience: Number(data.years_experience),
        specialization: data.specialization,
        base_city: data.base_city,
        hourly_rate: Number(data.hourly_rate),
        full_day_rate: Number(data.full_day_rate),
        government_id_url: governmentIdUrl
      };

      setUploadProgress(75);

      // Insert into database
      const { error } = await supabase
        .from('became_bodygaurd')
        .insert([applicationData]);

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      setUploadProgress(100);
      setSubmitStatus('success');
      setSubmitMessage('Application submitted successfully! We will review your application and contact you within 2-3 business days.');
      reset();
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setUploadProgress(0), 2000);
    }
  };

  const watchedFile = watch('government_id_file');

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-primary/5 via-white to-accent/5">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center px-6 py-3 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
            <Shield size={20} className="mr-2" />
            <span>Join Our Elite Security Team</span>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold md:text-5xl text-primary">
            Become a <span className="text-accent">SecureMate</span> Bodyguard
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-neutral-600">
            Join India's premier on-demand security platform. Connect with clients who need professional protection services and build a rewarding career in personal security.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 border shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl border-neutral-100/50 md:p-12">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-primary/20 rounded-br-2xl"></div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="flex items-center p-4 mb-8 text-green-800 border border-green-200 rounded-lg bg-green-50">
                <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                <p>{submitMessage}</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex items-center p-4 mb-8 text-red-800 border border-red-200 rounded-lg bg-red-50">
                <AlertCircle className="w-5 h-5 mr-3 text-red-600" />
                <p>{submitMessage}</p>
              </div>
            )}

            {/* Upload Progress */}
            {isSubmitting && uploadProgress > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-primary">Processing Application...</span>
                  <span className="text-sm text-neutral-600">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="flex items-center mb-6 text-xl font-semibold text-primary">
                  <User className="w-6 h-6 mr-2" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-neutral-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      {...register('full_name', { 
                        required: 'Full name is required',
                        minLength: { value: 2, message: 'Name must be at least 2 characters' }
                      })}
                      className="w-full p-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-accent focus:border-accent"
                      placeholder="Enter your full name"
                    />
                    {errors.full_name && (
                      <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="age" className="block mb-2 text-sm font-medium text-neutral-700">
                      Age *
                    </label>
                    <input
                      type="number"
                      id="age"
                      {...register('age', { 
                        required: 'Age is required',
                        min: { value: 18, message: 'Must be at least 18 years old' },
                        max: { value: 70, message: 'Must be under 70 years old' }
                      })}
                      className="w-full p-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-accent focus:border-accent"
                      placeholder="25"
                    />
                    {errors.age && (
                      <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="gender" className="block mb-2 text-sm font-medium text-neutral-700">
                      Gender *
                    </label>
                    <select
                      id="gender"
                      {...register('gender', { required: 'Gender is required' })}
                      className="w-full p-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-accent focus:border-accent"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && (
                      <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="base_city" className="block mb-2 text-sm font-medium text-neutral-700">
                      <MapPin className="inline w-4 h-4 mr-1" />
                      Base City *
                    </label>
                    <input
                      type="text"
                      id="base_city"
                      {...register('base_city', { required: 'Base city is required' })}
                      className="w-full p-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-accent focus:border-accent"
                      placeholder="Ahmedabad"
                    />
                    {errors.base_city && (
                      <p className="mt-1 text-sm text-red-600">{errors.base_city.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="flex items-center mb-6 text-xl font-semibold text-primary">
                  <Phone className="w-6 h-6 mr-2" />
                  Contact Information
                </h3>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-neutral-700">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone_number"
                      {...register('phone_number', { 
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[6-9]\d{9}$/,
                          message: 'Please enter a valid 10-digit Indian mobile number'
                        }
                      })}
                      className="w-full p-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-accent focus:border-accent"
                      placeholder="9876543210"
                    />
                    {errors.phone_number && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone_number.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email_address" className="block mb-2 text-sm font-medium text-neutral-700">
                      <Mail className="inline w-4 h-4 mr-1" />
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      id="email_address"
                      {...register('email_address', {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Please enter a valid email address'
                        }
                      })}
                      className="w-full p-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-accent focus:border-accent"
                      placeholder="your@email.com"
                    />
                    {errors.email_address && (
                      <p className="mt-1 text-sm text-red-600">{errors.email_address.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Physical Information */}
              <div>
                <h3 className="flex items-center mb-6 text-xl font-semibold text-primary">
                  <Ruler className="w-6 h-6 mr-2" />
                  Physical Information
                </h3>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="height_cm" className="block mb-2 text-sm font-medium text-neutral-700">
                      Height (cm) *
                    </label>
                    <input
                      type="number"
                      id="height_cm"
                      {...register('height_cm', { 
                        required: 'Height is required',
                        min: { value: 140, message: 'Height must be at least 140 cm' },
                        max: { value: 220, message: 'Height must be under 220 cm' }
                      })}
                      className="w-full p-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-accent focus:border-accent"
                      placeholder="175"
                    />
                    {errors.height_cm && (
                      <p className="mt-1 text-sm text-red-600">{errors.height_cm.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="weight_kg" className="block mb-2 text-sm font-medium text-neutral-700">
                      <Weight className="inline w-4 h-4 mr-1" />
                      Weight (kg) *
                    </label>
                    <input
                      type="number"
                      id="weight_kg"
                      {...register('weight_kg', { 
                        required: 'Weight is required',
                        min: { value: 40, message: 'Weight must be at least 40 kg' },
                        max: { value: 150, message: 'Weight must be under 150 kg' }
                      })}
                      className="w-full p-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-accent focus:border-accent"
                      placeholder="70"
                    />
                    {errors.weight_kg && (
                      <p className="mt-1 text-sm text-red-600">{errors.weight_kg.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h3 className="flex items-center mb-6 text-xl font-semibold text-primary">
                  <Briefcase className="w-6 h-6 mr-2" />
                  Professional Information
                </h3>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="years_experience" className="block mb-2 text-sm font-medium text-neutral-700">
                      <Clock className="inline w-4 h-4 mr-1" />
                      Years of Experience *
                    </label>
                    <input
                      type="number"
                      id="years_experience"
                      {...register('years_experience', { 
                        required: 'Experience is required',
                        min: { value: 0, message: 'Experience cannot be negative' }
                      })}
                      className="w-full p-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-accent focus:border-accent"
                      placeholder="5"
                    />
                    {errors.years_experience && (
                      <p className="mt-1 text-sm text-red-600">{errors.years_experience.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="specialization" className="block mb-2 text-sm font-medium text-neutral-700">
                      Specialization *
                    </label>
                    <select
                      id="specialization"
                      {...register('specialization', { required: 'Specialization is required' })}
                      className="w-full p-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-accent focus:border-accent"
                    >
                      <option value="">Select Specialization</option>
                      {specializationOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    {errors.specialization && (
                      <p className="mt-1 text-sm text-red-600">{errors.specialization.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Pricing Information */}
              <div>
                <h3 className="flex items-center mb-6 text-xl font-semibold text-primary">
                  <IndianRupee className="w-6 h-6 mr-2" />
                  Pricing Information
                </h3>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="hourly_rate" className="block mb-2 text-sm font-medium text-neutral-700">
                      Hourly Rate (₹) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      id="hourly_rate"
                      {...register('hourly_rate', { 
                        required: 'Hourly rate is required',
                        min: { value: 100, message: 'Hourly rate must be at least ₹100' }
                      })}
                      className="w-full p-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-accent focus:border-accent"
                      placeholder="500"
                    />
                    {errors.hourly_rate && (
                      <p className="mt-1 text-sm text-red-600">{errors.hourly_rate.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="full_day_rate" className="block mb-2 text-sm font-medium text-neutral-700">
                      Full Day Rate (₹) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      id="full_day_rate"
                      {...register('full_day_rate', { 
                        required: 'Full day rate is required',
                        min: { value: 1000, message: 'Full day rate must be at least ₹1000' }
                      })}
                      className="w-full p-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-accent focus:border-accent"
                      placeholder="3000"
                    />
                    {errors.full_day_rate && (
                      <p className="mt-1 text-sm text-red-600">{errors.full_day_rate.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Document Upload */}
              <div>
                <h3 className="flex items-center mb-6 text-xl font-semibold text-primary">
                  <FileText className="w-6 h-6 mr-2" />
                  Document Upload
                </h3>
                
                <div>
                  <label htmlFor="government_id_file" className="block mb-2 text-sm font-medium text-neutral-700">
                    Government ID (Aadhaar/PAN/Driving License) *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="government_id_file"
                      accept="image/*,.pdf"
                      {...register('government_id_file', { 
                        required: 'Government ID is required',
                        validate: {
                          fileSize: (files) => {
                            if (files && files[0] && files[0].size > 5 * 1024 * 1024) {
                              return 'File size must be less than 5MB';
                            }
                            return true;
                          }
                        }
                      })}
                      className="w-full p-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-accent focus:border-accent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-primary hover:file:bg-accent-dark"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Upload className="w-5 h-5 text-neutral-400" />
                    </div>
                  </div>
                  {watchedFile && watchedFile[0] && (
                    <p className="mt-2 text-sm text-green-600">
                      Selected: {watchedFile[0].name} ({(watchedFile[0].size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                  {errors.government_id_file && (
                    <p className="mt-1 text-sm text-red-600">{errors.government_id_file.message}</p>
                  )}
                  <p className="mt-2 text-sm text-neutral-500">
                    Upload a clear image or PDF of your government-issued ID. Maximum file size: 5MB.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isSubmitting}
                  className="group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Application...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                      Submit Application
                    </>
                  )}
                </Button>
                
                <p className="mt-4 text-sm text-center text-neutral-600">
                  By submitting this application, you agree to our terms of service and privacy policy. 
                  We will review your application within 2-3 business days.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeBodyguard;