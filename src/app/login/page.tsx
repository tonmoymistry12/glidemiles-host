'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useListingStore } from '@/store/listingStore';

export default function LoginPage() {
  const router = useRouter();
  const { updatePropertyData, setCurrentStep } = useListingStore();
  const [formData, setFormData] = useState({
    email: 'test.t@gmail.com',
    keepSignedIn: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePropertyData({ email: formData.email });
    setCurrentStep('otp');
    router.push('/otp');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-sm mx-auto">
        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-sm">
              Sign in to your GlideMiles account
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email address"
                required
              />
            </div>
            
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.keepSignedIn}
                  onChange={(e) => setFormData(prev => ({ ...prev, keepSignedIn: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" 
                />
                <span className="ml-2 text-sm text-gray-600">Keep me signed in</span>
              </label>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200" size="lg">
              Continue
            </Button>
          </form>

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