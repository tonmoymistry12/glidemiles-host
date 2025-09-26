'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, User, Sparkles } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useListingStore } from '@/store/listingStore';

export default function ListingPage() {
  const router = useRouter();
  const { setCurrentStep } = useListingStore();
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      {/* Main content area with proper spacing for fixed header and footer */}
      <div className="flex-1 pt-20 pb-20 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Welcome message in top right */}
        <div className="flex justify-end mb-6">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full border border-blue-200">
            <User className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Welcome back,</span>
            <span className="text-sm font-bold text-indigo-700">Sam</span>
            <Sparkles className="w-3 h-3 text-yellow-500" />
          </div>
        </div>
        
        {/* Complete Existing Listing */}
        {/* <div className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Complete your listing</h2>
          <Card className="hover:border-gray-300 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input type="radio" className="w-4 h-4 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Debashis jha</h3>
                  <p className="text-gray-600 text-sm">Kalna, West Bengal</p>
                  <p className="text-gray-500 text-sm">Created: 1 day ago</p>
                </div>
              </div>
            </div>
          </Card>
        </div> */}


        {/* Terms and Conditions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">Terms and Conditions</h2>
          
          <Card>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <input 
                  type="checkbox" 
                  id="terms-checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-4 h-4 text-blue-600 mt-1 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <label htmlFor="terms-checkbox" className="text-sm text-gray-700 cursor-pointer">
                    I agree to the following terms and conditions:
                  </label>
                </div>
              </div>
              
              <div className="ml-7 space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p>I will provide accurate and truthful information about my property throughout the listing process.</p>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p>I understand that all property details, photos, and pricing information must be current and representative of the actual property.</p>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p>I acknowledge that GlideMiles Holidays reserves the right to verify property information and may request additional documentation.</p>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p>I agree to comply with all local laws, regulations, and zoning requirements applicable to my property.</p>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p>I understand that providing false information may result in listing removal and account suspension.</p>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p>I agree to GlideMiles Holidays&apos; Terms of Service and Privacy Policy.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        </div>
      </div>
      
      {/* Fixed Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Button onClick={() => {              
                router.push('/login');
              }} variant="outline" size="lg">            
              Exit
            </Button>
            <Button 
              onClick={() => {
                setCurrentStep('property-type');
                router.push('/listing/property-type');
              }}
              size="lg"
              disabled={!agreedToTerms}
              className={agreedToTerms ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 cursor-not-allowed text-gray-500'}
            >
              I Agree
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}