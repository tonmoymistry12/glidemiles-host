'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Home } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useListingStore } from '@/store/listingStore';

export default function ListingPage() {
  const router = useRouter();
  const { setCurrentStep } = useListingStore();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Sam</h1>
        
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

        {/* Start New Listing */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Start a new listing</h2>          
          
          {/* Manual Creation */}
          <Card selected={true}>
            <div className="flex items-center justify-between">
              <div className="flex items-start space-x-3">
                <input 
                  type="radio" 
                  checked 
                  className="w-4 h-4 text-blue-600 mt-1"
                  readOnly
                />
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">Create listing manually</h3>
                  <p className="text-gray-700">Build your listing from scratch with our easy-to-follow, step-by-step guide.</p>
                </div>
              </div>
              <div className="ml-6">
                <Home className="w-16 h-16 text-blue-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center h-16 px-6 bg-white border-t border-gray-200 fixed bottom-0 left-56 right-56">
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
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}