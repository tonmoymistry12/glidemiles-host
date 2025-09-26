import { 
  Home as HomeIcon,
  Hotel as HotelIcon,
  Castle as CastleIcon,
  Apartment as ApartmentIcon,
  House as HouseIcon,
  Villa as VillaIcon,
  Cabin as CabinIcon,
  Bed as BedIcon,
  Business as BusinessIcon,  
  DirectionsBoat as BoatIcon,
  Landscape as LandscapeIcon,
  Agriculture as FarmIcon
} from '@mui/icons-material';
import { PropertyTypeOption, StepData } from '@/lib/types';

// Property Types with Material-UI Icons
export const PROPERTY_TYPES: PropertyTypeOption[] = [
  {
    id: 'home',
    icon: HomeIcon,
    title: 'Home-type property',
    description: 'Standalone units rented as a whole, such as individual apartments/flats, single bungalows, villas, and guest houses. They offer a residential experience for travelers seeking privacy and self-sufficient stays.'
  },
  {
    id: 'hotel',
    icon: HotelIcon,
    title: 'Hotel-type property',
    description: 'Multiple rented units within one location, such as hotels, motels, serviced apartments, or resorts. They offer shared facilities, standard traveler amenities and services, and a front desk staff.'
  },
  {
    id: 'unique',
    icon: CastleIcon,
    title: 'Unique-type property',
    description: 'Special accommodations such as holiday/caravan parks, houseboats, farm stays, or castles. They appeal to travelers seeking distinctive accommodation experiences that often include related activities.'
  }
];

export const HOME_SUBTYPES = {
  mostCommon: [
    { id: 'apartment', icon: ApartmentIcon, title: 'Apartment/Flat', description: 'Self-contained accommodation unit within a building of similar units.' },
    { id: 'house', icon: HouseIcon, title: 'Entire House', description: 'Independently hosted, freestanding house with a private entrance.' },
    { id: 'villa', icon: VillaIcon, title: 'Villa', description: 'Freestanding luxury vacation house with local décor and atmosphere.' },
    { id: 'bungalow', icon: HomeIcon, title: 'Bungalow', description: 'Basic freestanding accommodation unit in a tropical environment.' },
    { id: 'homestay', icon: HomeIcon, title: 'Homestay', description: 'Rented room within house shared with host, with shared facilities.' }
  ],
  others: [
    { id: 'bnb', icon: BedIcon, title: 'Bed & Breakfast', description: 'Small lodging that offers overnight stays and breakfast.' },
    { id: 'cabin', icon: CabinIcon, title: 'Cabin', description: 'Freestanding rustic box frame or A-frame vacation house in nature.' },
    { id: 'chalet', icon: LandscapeIcon, title: 'Chalet', description: 'Freestanding vacation house in an alpine environment.' },
    { id: 'country', icon: LandscapeIcon, title: 'Country House', description: 'Private home or estate in a rural environment and rustic atmosphere.' },
    { id: 'farm', icon: FarmIcon, title: 'Farm stay', description: 'Room or unit within a working farm or ranch with shared facilities.' },
    { id: 'guest', icon: HomeIcon, title: 'Guest House', description: 'A small, separate house that shares land with a larger residence.' }
  ]
};

export const HOTEL_SUBTYPES = {
  mostCommon: [
    { id: 'hotel', icon: HotelIcon, title: 'Hotel', description: 'Multi-unit accommodation building with shared facilities and services.' },
    { id: 'guesthouse', icon: HomeIcon, title: 'Guest House', description: 'A small, separate house that shares land with a larger residence.' },
    { id: 'serviced', icon: BusinessIcon, title: 'Serviced Apartment', description: 'Apartment unit with cleaning and front desk services.' },
    // { id: 'resort', icon: ResortIcon, title: 'Resort', description: 'Vacation hotel that integrates local environment or geography.' },
    { id: 'hostel', icon: BedIcon, title: 'Hostel', description: 'Budget dormitory bedroom lodging with shared bathrooms.' }
  ],
  others: [
    { id: 'bnb2', icon: BedIcon, title: 'Bed & Breakfast', description: 'Small lodging that offers overnight stays and breakfast.' },
    { id: 'capsule', icon: BusinessIcon, title: 'Capsule Hotel', description: 'Budget accommodation with capsule spaces for sleeping.' },
    { id: 'cruise', icon: BoatIcon, title: 'Cruise', description: 'Room or suite within a boat that moves location during your stay.' }
  ]
};

export const UNIQUE_SUBTYPES = {
  mostCommon: [
    { id: 'capsule2', icon: BusinessIcon, title: 'Capsule Hotel', description: 'Budget accommodation with capsule spaces for sleeping.' },
    { id: 'castle', icon: CastleIcon, title: 'Castle', description: 'Historical stone building with fortification design.' },
    { id: 'cave', icon: LandscapeIcon, title: 'Cave House', description: 'Room within, or entire space enclosed underground.' },
    { id: 'cruise2', icon: BoatIcon, title: 'Cruise', description: 'Room or suite within a boat that moves location during your stay.' },
    { id: 'dome', icon: BusinessIcon, title: 'Dome House', description: 'Freestanding vacation house with a spherical roof or shape.' }
  ],
  others: [
    { id: 'farm2', icon: FarmIcon, title: 'Farm stay', description: 'Room or unit within a working farm or ranch with shared facilities.' },
    { id: 'haveli2', icon: CastleIcon, title: 'Haveli', description: 'Traditional South Asian freestanding house or townhouse.' },
    { id: 'houseboat', icon: BoatIcon, title: 'Houseboat', description: 'Accommodation on a stationary, floating vehicle.' }
  ]
};

export const STEPS: StepData[] = [
  { id: 'basics', label: 'Basics', completed: false, current: false, pending: true },
  { id: 'location', label: 'Location', completed: false, current: false, pending: true },
  { id: 'property-details', label: 'Property details', completed: false, current: false, pending: true },
  { id: 'rooms', label: 'Rooms and details', completed: false, current: false, pending: true },
  { id: 'photos', label: 'Photos', completed: false, current: true, pending: false },
  { id: 'profile', label: 'Profile', completed: false, current: false, pending: true },
  { id: 'publish', label: 'Publish', completed: false, current: false, pending: true }
];

export const AMENITIES = [
  { key: 'ac', label: 'A/C' },
  { key: 'wifi', label: 'Complimentary WiFi in all rooms' },
  { key: 'cleaning', label: 'Daily cleaning' },
  { key: 'pets', label: 'Pets allowed' },
  { key: 'breakfast', label: 'Breakfast (free)' },
  { key: 'laundry', label: 'Laundry service' },
  { key: 'transport', label: 'Transport to airport' },
  { key: 'kitchen', label: 'Shared kitchen' }
];

export const PAYMENT_METHODS = [
  { key: 'visa', label: 'Visa' },
  { key: 'mastercard', label: 'MasterCard' },
  { key: 'amex', label: 'American Express' },
  { key: 'cash', label: 'Cash' },
  { key: 'unionpay', label: 'UnionPay' },
  { key: 'jcb', label: 'JCB' }
];

export const ACCESS_OPTIONS = [
  { key: 'checkinout', label: 'Check-in/out (private)' },
  { key: 'keyless', label: 'Keyless access' },
  { key: 'frontdesk', label: 'Front desk (24-hour)' },
  { key: 'checkin24', label: 'Check-in (24-hour)' },
  { key: 'carpark', label: 'Car park' }
];