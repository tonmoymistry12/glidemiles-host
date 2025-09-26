import { create } from 'zustand';
import { PropertyData, StepData } from '@/lib/types';

interface ListingStore {
  currentStep: string;
  propertyData: Partial<PropertyData>;
  steps: StepData[];
  
  setCurrentStep: (step: string) => void;
  updatePropertyData: (data: Partial<PropertyData>) => void;
  updateStepStatus: (stepId: string, status: Partial<Pick<StepData, 'completed' | 'current' | 'pending'>>) => void;
  resetData: () => void;
  resetListing: () => void; // <-- ADDED THIS LINE
  nextStep: () => void;
  previousStep: () => void;
  
  getCurrentStepData: () => StepData | undefined;
  getCompletedStepsCount: () => number;
  canProceedToNext: () => boolean;
}

const INITIAL_STEPS: StepData[] = [
  { id: 'basics', label: 'Basics', completed: false, current: true, pending: false },
  { id: 'location', label: 'Location', completed: false, current: false, pending: true },
  { id: 'property-details', label: 'Property details', completed: false, current: false, pending: true },
  { id: 'rooms', label: 'Rooms and details', completed: false, current: false, pending: true },
  { id: 'photos', label: 'Photos', completed: false, current: false, pending: true },
  { id: 'profile', label: 'Profile', completed: false, current: false, pending: true },
  { id: 'publish', label: 'Publish', completed: false, current: false, pending: true }
];

const STEP_ORDER = [
  'login',
  'otp', 
  'listing-options',
  'property-type',
  'property-subtype',
  'units',
  'basics',
  'location',
  'property-details',
  'rooms',
  'photos',
  'profile',
  'publish'
];

export const useListingStore = create<ListingStore>((set, get) => ({
  currentStep: 'login',
  propertyData: {
    email: 'test.t@gmail.com',
    propertyName: 'Sam Land',
    location: {
      country: 'India',
      state: 'West Bengal',
      city: 'Kalna',
      address: ', Pandua'
    },
    rating: 4,
    units: 'single',
    rooms: [{
      id: '1',
      name: 'Double Room',
      size: '120',
      occupancy: 3,
      bathrooms: 2,
      minRate: '1200',
      extraGuestRate: '1200',
      extraGuestAfter: 2
    }],
    cancellationPolicy: '1day',
    checkIn: { from: '3pm', to: '6pm' },
    checkOut: '11am',
    amenities: {
      ac: true,
      wifi: false,
      cleaning: true,
      pets: false,
      breakfast: false,
      laundry: false,
      transport: false,
      kitchen: true,
      checkinout: true,
      keyless: false,
      frontDesk: true,
      checkin24: true,
      parking: false
    },
    paymentMethods: {
      visa: false,
      mastercard: true,
      amex: false,
      cash: false,
      unionpay: true,
      jcb: false
    },
    breakfast: false,
    photos: {
      property: [],
      rooms: {}
    }
  },
  steps: INITIAL_STEPS,

  setCurrentStep: (step) => {
    set((state) => ({
      currentStep: step,
      steps: state.steps.map(s => ({
        ...s,
        current: s.id === step
      }))
    }));
  },

  updatePropertyData: (data) => {
    set((state) => ({
      propertyData: { ...state.propertyData, ...data }
    }));
  },

  updateStepStatus: (stepId, status) => {
    set((state) => ({
      steps: state.steps.map(step => 
        step.id === stepId 
          ? { ...step, ...status }
          : step
      )
    }));
  },

  resetData: () => {
    set({
      currentStep: 'login',
      propertyData: {},
      steps: INITIAL_STEPS
    });
  },

  resetListing: () => {
    set({
      currentStep: 'login',
      propertyData: {
        email: 'test.t@gmail.com',
        propertyName: 'Sam Land',
        location: {
          country: 'India',
          state: 'West Bengal',
          city: 'Kalna',
          address: ', Pandua'
        },
        rating: 4,
        units: 'single',
        rooms: [{
          id: '1',
          name: 'Double Room',
          size: '120',
          occupancy: 3,
          bathrooms: 2,
          minRate: '1200',
          extraGuestRate: '1200',
          extraGuestAfter: 2
        }],
        cancellationPolicy: '1day',
        checkIn: { from: '3pm', to: '6pm' },
        checkOut: '11am',
        amenities: {
          ac: true,
          wifi: false,
          cleaning: true,
          pets: false,
          breakfast: false,
          laundry: false,
          transport: false,
          kitchen: true,
          checkinout: true,
          keyless: false,
          frontDesk: true,
          checkin24: true,
          parking: false
        },
        paymentMethods: {
          visa: false,
          mastercard: true,
          amex: false,
          cash: false,
          unionpay: true,
          jcb: false
        },
        breakfast: false,
        photos: {
          property: [],
          rooms: {}
        }
      },
      steps: INITIAL_STEPS
    });
  }, // <-- ADDED THIS ENTIRE METHOD

  nextStep: () => {
    const { currentStep } = get();
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex < STEP_ORDER.length - 1) {
      const nextStep = STEP_ORDER[currentIndex + 1];
      get().setCurrentStep(nextStep);
    }
  },

  previousStep: () => {
    const { currentStep } = get();
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex > 0) {
      const prevStep = STEP_ORDER[currentIndex - 1];
      get().setCurrentStep(prevStep);
    }
  },

  getCurrentStepData: () => {
    const { currentStep, steps } = get();
    return steps.find(step => step.id === currentStep);
  },

  getCompletedStepsCount: () => {
    const { steps } = get();
    return steps.filter(step => step.completed).length;
  },

  canProceedToNext: () => {
    const { currentStep, propertyData } = get();
    
    switch (currentStep) {
      case 'login':
        return !!propertyData.email;
      case 'property-type':
        return !!propertyData.propertyType;
      case 'property-subtype':
        return !!propertyData.subType;
      case 'units':
        return !!propertyData.units;
      case 'basics':
        return !!(propertyData.propertyName && propertyData.rating);
      case 'location':
        return !!(propertyData.location?.country && propertyData.location?.city);
      case 'property-details':
        return !!(propertyData.cancellationPolicy && propertyData.checkIn && propertyData.checkOut);
      case 'rooms':
        return !!(propertyData.rooms && propertyData.rooms.length > 0);
      default:
        return true;
    }
  }
}));