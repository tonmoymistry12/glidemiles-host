'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { useListingStore } from '@/store/listingStore';
import {RealEstateAgent as RealEstateAgentIcon} from '@mui/icons-material';

export default function PropertyDetailsPage() {
  const router = useRouter();
  const { propertyData, updatePropertyData, setCurrentStep, updateStepStatus } = useListingStore();

  const handleCancellationPolicyChange = (policy: string) => {
    updatePropertyData({ cancellationPolicy: policy as '1day' | '3day' | 'nonrefundable' });
  };

  const handleCheckInChange = (field: 'from' | 'to', value: string) => {
    updatePropertyData({
      checkIn: {
        from: propertyData.checkIn?.from || '3pm',
        to: propertyData.checkIn?.to || '6pm',
        [field]: value
      }
    });
  };

  const handleCheckOutChange = (value: string) => {
    updatePropertyData({ checkOut: value });
  };

  const handleAccessChange = (access: string, checked: boolean) => {
    updatePropertyData({
      amenities: {
        ...propertyData.amenities,
        [access]: checked
      }
    });
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    updatePropertyData({
      amenities: {
        ...propertyData.amenities,
        [amenity]: checked
      }
    });
  };

  const handlePaymentMethodChange = (method: string, checked: boolean) => {
    updatePropertyData({
      paymentMethods: {
        ...propertyData.paymentMethods,
        [method]: checked
      }
    });
  };

  const handleNext = () => {
    updateStepStatus('property-details', { completed: true, current: false });
    updateStepStatus('rooms', { current: true, pending: false });
    setCurrentStep('rooms');
    router.push('/listing/setup/rooms');
  };

  const handlePrevious = () => {
    updateStepStatus('property-details', { current: false });
    updateStepStatus('location', { current: true });
    setCurrentStep('location');
    router.push('/listing/setup/location');
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-sm md:max-w-lg lg:max-w-3xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Property details</h1>
            <p className="text-gray-600">
              Set your key policies and list your facilities so your guests know what to expect and 
              enjoy during their stay.
            </p>
          </div>
          <div className="ml-8">
            <div className="w-24 h-24 bg-red-100 rounded-lg flex items-center justify-center">
              {/* <span className="text-4xl">🛋️</span> */}
              <RealEstateAgentIcon sx={{ color: '#E91E63', fontSize: 44 }} />
            </div>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Cancellation policy</h3>
          
          <div className="space-y-4 mb-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="cancellation"
                checked={propertyData.cancellationPolicy === '1day'}
                onChange={() => handleCancellationPolicyChange('1day')}
                className="w-4 h-4 text-blue-600 mt-1"
              />
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium">Refundable up to 1 day before check-in date</span>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                    Most popular with guests
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Guest may cancel until 1 day (24 hours) before the check-in date.<br />
                  Cancellation within 24 hours of check-in date pays 100% of booking as penalty.
                </p>
              </div>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="cancellation"
                checked={propertyData.cancellationPolicy === '3day'}
                onChange={() => handleCancellationPolicyChange('3day')}
                className="w-4 h-4 text-blue-600 mt-1"
              />
              <div>
                <span className="font-medium">Refundable up to 3 day before check-in date</span>
                <p className="text-sm text-gray-600">
                  Guest may cancel until 3 days (72 hours) before the check-in date.<br />
                  Cancellation within 72 hours of check-in date pays 100% of booking as penalty.
                </p>
              </div>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="cancellation"
                checked={propertyData.cancellationPolicy === 'nonrefundable'}
                onChange={() => handleCancellationPolicyChange('nonrefundable')}
                className="w-4 h-4 text-blue-600 mt-1"
              />
              <div>
                <span className="font-medium">Non-refundable</span>
                <p className="text-sm text-gray-600">
                  No free cancellation. A 100% penalty applies to all cancellations.
                </p>
              </div>
            </label>
          </div>

          <Alert variant="info" className="mb-6">
            Tip: Don&apos;t worry, you can change your cancellation policy even after onboarding.
          </Alert>
        </div>

        {/* Check-in/Check-out Time */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Check-in/check-out time</h3>
          
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">When can guests check in?</label>
              <p className="text-sm text-gray-600 mb-3">Between</p>
              <div className="space-y-2">
                <select
                  value={propertyData.checkIn?.from || '3pm'}
                  onChange={(e) => handleCheckInChange('from', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="3pm">3pm</option>
                  <option value="2pm">2pm</option>
                  <option value="4pm">4pm</option>
                </select>
                <p className="text-sm text-gray-600">and</p>
                <select
                  value={propertyData.checkIn?.to || '6pm'}
                  onChange={(e) => handleCheckInChange('to', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="6pm">6pm</option>
                  <option value="8pm">8pm</option>
                  <option value="10pm">10pm</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">What time will guests have to check out by?</label>
              <select
                value={propertyData.checkOut || '11am'}
                onChange={(e) => handleCheckOutChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="11am">11am</option>
                <option value="10am">10am</option>
                <option value="12pm">12pm</option>
              </select>
            </div>
          </div>
        </div>

        {/* Access */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-2">Access</h3>
          <p className="text-gray-600 mb-4">How guests get into your property.</p>
          
          <div className="grid grid-cols-3 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={propertyData.amenities?.checkinout || false}
                onChange={(e) => handleAccessChange('checkinout', e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">Check-in/out (private)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={propertyData.amenities?.keyless || false}
                onChange={(e) => handleAccessChange('keyless', e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">Keyless access</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={propertyData.amenities?.frontDesk || true}
                onChange={(e) => handleAccessChange('frontDesk', e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">Front desk (24-hour)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={propertyData.amenities?.checkin24 || true}
                onChange={(e) => handleAccessChange('checkin24', e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">Check-in (24-hour)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={propertyData.amenities?.parking || false}
                onChange={(e) => handleAccessChange('parking', e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">Car park</span>
            </label>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-2">Important information</h3>
          <p className="text-gray-600 mb-4">These offerings are found in most of our successful properties</p>
          
          <div className="grid grid-cols-3 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={propertyData.amenities?.ac || true}
                onChange={(e) => handleAmenityChange('ac', e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">A/C</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={propertyData.amenities?.pets || false}
                onChange={(e) => handleAmenityChange('pets', e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">Pets allowed</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={propertyData.amenities?.transport || false}
                onChange={(e) => handleAmenityChange('transport', e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">Transport to airport</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={propertyData.amenities?.wifi || false}
                onChange={(e) => handleAmenityChange('wifi', e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">Complimentary WiFi in all rooms</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={propertyData.amenities?.breakfast || false}
                onChange={(e) => handleAmenityChange('breakfast', e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">Breakfast (free)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={propertyData.amenities?.kitchen || true}
                onChange={(e) => handleAmenityChange('kitchen', e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">Shared kitchen</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={propertyData.amenities?.cleaning || true}
                onChange={(e) => handleAmenityChange('cleaning', e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">Daily cleaning</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={propertyData.amenities?.laundry || false}
                onChange={(e) => handleAmenityChange('laundry', e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">Laundry service</span>
            </label>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-2">Payment information</h3>
          <p className="text-gray-600 mb-4">
            Guests may choose to pay at your property, make sure to let travelers know what you accept
          </p>
          
          <div className="grid grid-cols-3 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={propertyData.paymentMethods?.visa || false}
                onChange={(e) => handlePaymentMethodChange('visa', e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">Visa</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={propertyData.paymentMethods?.mastercard || true}
                onChange={(e) => handlePaymentMethodChange('mastercard', e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">MasterCard</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={propertyData.paymentMethods?.amex || false}
                onChange={(e) => handlePaymentMethodChange('amex', e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">American Express</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={propertyData.paymentMethods?.cash || false}
                onChange={(e) => handlePaymentMethodChange('cash', e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">Cash</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={propertyData.paymentMethods?.unionpay || true}
                onChange={(e) => handlePaymentMethodChange('unionpay', e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">UnionPay</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={propertyData.paymentMethods?.jcb || false}
                onChange={(e) => handlePaymentMethodChange('jcb', e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">JCB</span>
            </label>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" size="lg" onClick={handlePrevious}>
            PREVIOUS
          </Button>
          <Button size="lg" onClick={handleNext}>
            NEXT
          </Button>
        </div>
      </div>
    </div>
  );
}