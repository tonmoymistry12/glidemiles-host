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
        <div className="w-full max-w-md mx-auto">
          {/* Benefits Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Welcome to Glidemiles Partner
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Your gateway to maximizing property revenue
            </p>
            
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Why Partner with Glidemiles?
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Increase Bookings:</span> Reach millions of travelers worldwide
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Boost Revenue:</span> Competitive commission rates and instant payouts
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Easy Management:</span> Complete dashboard to manage bookings and analytics
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">24/7 Support:</span> Dedicated partner support team
                  </p>
                </div>
              </div>
            </div>
          </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Sign In to Continue
            </h2>
            <p className="text-gray-600 text-sm">
              Access your property dashboard and start earning more
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
              Access Dashboard
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-center text-gray-500">
              By signing in, you agree to Glidemiles{' '}
              <a href="#" className="text-blue-600 hover:underline font-medium">Terms of Service</a>
              {' and '}
              <a href="#" className="text-blue-600 hover:underline font-medium">Privacy Policy</a>
            </p>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              New to Glidemiles?{' '}
              <a href="#" className="text-blue-600 hover:underline font-medium">
                Join as a Partner
              </a>
            </p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-6 text-xs text-gray-500">
          <p>© 2024 Glidemiles Pvt. Ltd. All Rights Reserved.</p>
        </div>
        </div>
      </div>
    </div>
  );
}