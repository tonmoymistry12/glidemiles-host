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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md mx-auto">
        {/* OTP Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          {/* Back Button */}
          <button 
            onClick={() => router.push('/login')}
            className="mb-4 p-2 hover:bg-gray-100 rounded-lg transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
          </button>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Verify Your Email</h2>
            <p className="text-gray-600 text-sm">
              We've sent a 6-digit code to
            </p>
            <p className="text-blue-600 font-semibold mt-1">
              {propertyData.email}
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* OTP Input Fields */}
            <div className="mb-6">
              <div className="flex space-x-3 justify-center">
                {otpValues.map((value, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className={`w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200 ${!isComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
              size="lg"
              disabled={!isComplete}
            >
              Verify & Continue
            </Button>
          </form>

          {/* Actions */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm text-gray-500">Didn't receive the code?</span>
              <button 
                onClick={handleResend}
                disabled={!canResend}
                className={`text-sm font-medium ${canResend ? 'text-blue-600 hover:text-blue-800' : 'text-gray-400 cursor-not-allowed'}`}
              >
                Resend
              </button>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm text-gray-500">Code expires in:</span>
              <span className="text-sm font-mono font-semibold text-red-600">
                {timeLeft > 0 ? `00:${timeLeft.toString().padStart(2, '0')}` : '00:00'}
              </span>
            </div>
            
            <button 
              onClick={() => router.push('/login')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              ← Back to login
            </button>
          </div>

          {/* Help */}
          <div className="flex items-center justify-center mt-4 p-2 bg-gray-50 rounded-lg">
            <Info className="w-3 h-3 text-gray-500 mr-2" />
            <span className="text-xs text-gray-600">Check your spam folder if you don't see the email</span>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-center text-gray-500">
              By continuing, you agree to GlideMiles{' '}
              <a href="#" className="text-blue-600 hover:underline font-medium">Terms of Service</a>
              {' and '}
              <a href="#" className="text-blue-600 hover:underline font-medium">Privacy Policy</a>
            </p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-4 text-xs text-gray-500">
          <p>© 2024 GlideMiles Pvt. Ltd. All Rights Reserved.</p>
        </div>
        </div>
      </div>
    </div>
  );
}