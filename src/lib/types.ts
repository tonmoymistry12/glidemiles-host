
export interface PropertyLocation {
  country: string;
  state: string;
  city: string;
  address: string;
  building?: string;
  postalCode?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Room {
  id: string;
  name: string;
  size: string;
  occupancy: number;
  bathrooms: number;
  minRate: string;
  extraGuestRate: string;
  extraGuestAfter: number;
}

export interface PropertyData {
  email: string;
  propertyName: string;
  propertyType: 'home' | 'hotel' | 'unique' | '';
  subType: string;
  units: 'single' | 'multiple';
  rating: number;
  location: PropertyLocation;
  rooms: Room[];
  cancellationPolicy: '1day' | '3day' | 'nonrefundable';
  checkIn: { from: string; to: string };
  checkOut: string;
  amenities: Record<string, boolean>;
  paymentMethods: Record<string, boolean>;
  photos: {
    property: File[];
    rooms: Record<string, File[]>;
  };
  breakfast: boolean;
  importUrl?: string;
}

// Updated to support React elements for Material-UI icons
export interface PropertyTypeOption {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any; // Material-UI icon component
  title: string;
  description: string;
}

export interface PropertySubtype {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any; // Material-UI icon component
  title: string;
  description: string;
}

export interface StepData {
  id: string;
  label: string;
  completed: boolean;
  current: boolean;
  pending: boolean;
}

export interface Amenity {
  key: string;
  label: string;
}

export interface PaymentMethod {
  key: string;
  label: string;
}

export interface AccessOption {
  key: string;
  label: string;
}