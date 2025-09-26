'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Info } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { useListingStore } from '@/store/listingStore';

export default function OTPPage() {
  const router = useRouter();
  const { propertyData, setCurrentStep } = useListingStore();
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(52);
  const [canResend, setCanResend] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValues.every(value => value.length === 1)) {
      setCurrentStep('listing-options');
      router.push('/listing');
    }
  };

  const handleResend = () => {
    setTimeLeft(60);
    setCanResend(false);
    setOtpValues(['', '', '', '', '', '']);
  };

  const isComplete = otpValues.every(value => value.length === 1);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-md mx-auto pt-16">
        {/* Security Alert */}
        
        {/* OTP Form */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Back Button */}
          <button 
            onClick={() => router.push('/login')}
            className="mb-6 p-2 hover:bg-gray-100 rounded transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in with OTP</h2>
          <p className="text-gray-600 mb-6 text-sm">
            Enter the OTP provided in the email sent to<br />
            <span className="font-medium">{propertyData.email}</span>
          </p>
          
          <form onSubmit={handleSubmit}>
            {/* OTP Input Fields */}
            <div className="mb-6">
              <div className="flex space-x-2 justify-center">
                {otpValues.map((value, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-medium border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className={`w-full mb-4 ${!isComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
              size="lg"
              disabled={!isComplete}
            >
              Continue
            </Button>
          </form>

          {/* Actions */}
          <div className="text-center space-y-3">
            <button 
              onClick={handleResend}
              disabled={!canResend}
              className={`text-sm ${canResend ? 'text-gray-600 hover:text-gray-800' : 'text-gray-400 cursor-not-allowed'}`}
            >
              Resend email
            </button>
            
            <p className="text-gray-500 text-sm">
              {timeLeft > 0 ? `00:${timeLeft.toString().padStart(2, '0')}` : '00:00'}
            </p>
            
            <button 
              onClick={() => router.push('/login')}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Use Password
            </button>
          </div>

          {/* Help */}
          <div className="flex items-center justify-center mt-6 space-x-2">
            <span className="text-sm text-gray-600">PIN not received or not working?</span>
            <div className="w-4 h-4 bg-gray-400 text-white rounded-full flex items-center justify-center">
              <Info className="w-3 h-3" />
            </div>
          </div>

          <p className="text-xs text-center text-gray-500 mt-6">
             By using GLIDEMILES website, I agree to Glidemiles{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-8 text-xs text-gray-500 space-y-1">
         <p>All material herein © 2005 Glidemiles Pvt. Ltd. All Rights Reserved.</p>
          <p>Glidemiles ® is part of Booking Holdings Inc., the world leader in online travel & related services.</p>
        </div>
      </div>
    </div>
  );
}