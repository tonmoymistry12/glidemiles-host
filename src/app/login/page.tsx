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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-md mx-auto pt-16">
        {/* Security Alert */}        

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sign in or create an account
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            For security, please sign in to access your information
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="test.t@gmail.com"
              required
            />
            
            <div className="mb-6">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={formData.keepSignedIn}
                  onChange={(e) => setFormData(prev => ({ ...prev, keepSignedIn: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded mr-2" 
                />
                <span className="text-sm text-gray-600">Keep me signed in</span>
              </label>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Continue
            </Button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-4">
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