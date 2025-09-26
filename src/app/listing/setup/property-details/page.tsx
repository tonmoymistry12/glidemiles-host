'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { FormSection } from '@/components/listing/FormSection';
import { Alert } from '@/components/ui/Alert';
import { useListingStore } from '@/store/listingStore';
import styles from '../shared.module.scss';

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
    <div className={styles.container}>
      <Header />
      
      {/* Fixed Header */}
      <div className={styles.fixedHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            Property details
          </h1>
          <p className={styles.subtitle}>Set your key policies and list your facilities so your guests know what to expect</p>
        </div>
      </div>
      
      {/* Content Area with Fixed Height */}
      <div className={styles.contentArea}>
        <div className={styles.contentWrapper}>
          {/* Scrollable Content Container */}
          <div className={styles.scrollableContainer}>

            {/* Cancellation Policy */}
            <FormSection
              title="Cancellation policy"
              description="Choose your cancellation policy for guests"
            >
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
            </FormSection>

            {/* Check-in/Check-out Time */}
            <FormSection
              title="Check-in/check-out time"
              description="Set the times when guests can check in and out"
            >
              <div className="space-y-6">
                {/* Check-in Time */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Check-in Time
                  </label>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600 whitespace-nowrap">Between</span>
                    <select
                      value={propertyData.checkIn?.from || '3pm'}
                      onChange={(e) => handleCheckInChange('from', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      <option value="2pm">2:00 PM</option>
                      <option value="3pm">3:00 PM</option>
                      <option value="4pm">4:00 PM</option>
                      <option value="5pm">5:00 PM</option>
                    </select>
                    <span className="text-sm text-gray-600 whitespace-nowrap">and</span>
                    <select
                      value={propertyData.checkIn?.to || '6pm'}
                      onChange={(e) => handleCheckInChange('to', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      <option value="6pm">6:00 PM</option>
                      <option value="7pm">7:00 PM</option>
                      <option value="8pm">8:00 PM</option>
                      <option value="9pm">9:00 PM</option>
                      <option value="10pm">10:00 PM</option>
                    </select>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Guests can check in anytime during this window
                  </p>
                </div>

                {/* Check-out Time */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Check-out Time
                  </label>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600 whitespace-nowrap">By</span>
                    <select
                      value={propertyData.checkOut || '11am'}
                      onChange={(e) => handleCheckOutChange(e.target.value)}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      <option value="10am">10:00 AM</option>
                      <option value="11am">11:00 AM</option>
                      <option value="12pm">12:00 PM</option>
                      <option value="1pm">1:00 PM</option>
                      <option value="2pm">2:00 PM</option>
                    </select>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Guests must check out by this time
                  </p>
                </div>
              </div>
            </FormSection>

            {/* Access */}
            <FormSection
              title="Access"
              description="How guests get into your property"
            >
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
            </FormSection>

            {/* Important Information */}
            <FormSection
              title="Important information"
              description="These offerings are found in most of our successful properties"
            >
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
            </FormSection>

            {/* Payment Information */}
            <FormSection
              title="Payment information"
              description="Guests may choose to pay at your property, make sure to let travelers know what you accept"
            >
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
            </FormSection>
          </div>
        </div>
      </div>
      
      {/* Fixed Navigation Footer */}
      <div className={styles.fixedFooter}>
        <div className={styles.footerContent}>
          <div className={styles.footerButtons}>
            <button 
              onClick={handlePrevious}
              className={`${styles.button} ${styles.secondary}`}
            >
              Back
            </button>
            <button 
              onClick={handleNext}
              className={`${styles.button} ${styles.primary}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}