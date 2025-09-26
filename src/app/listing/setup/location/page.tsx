'use client';
import React, { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { useListingStore } from '@/store/listingStore';

// Google Maps configuration
const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = ["places"];
const mapContainerStyle = {
  width: '100%',
  height: '256px', // h-64 equivalent
  borderRadius: '8px'
};

const defaultCenter = {
  lat: 22.9868, // Kolkata coordinates as default
  lng: 87.8550
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};


export default function LocationPage() {
  const router = useRouter();
  const { propertyData, updatePropertyData, setCurrentStep, updateStepStatus } = useListingStore();
  
  // Map state
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.LatLng | null>(null);
  const [searchValue, setSearchValue] = useState('');
  
  // Refs for autocomplete
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Initialize map center and marker from stored data
  const [center, setCenter] = useState(() => {
    if (propertyData.location?.coordinates) {
      return {
        lat: propertyData.location.coordinates.lat,
        lng: propertyData.location.coordinates.lng
      };
    }
    return defaultCenter;
  });

  // Geocode address from form fields
  const geocodeAddress = useCallback(async () => {
    if (!map) return;
    
    const { country, state, city, address } = propertyData.location || {};
    const fullAddress = [address, city, state, country].filter(Boolean).join(', ');
    
    if (!fullAddress) return;

    const geocoder = new google.maps.Geocoder();
    
    try {
      const result = await geocoder.geocode({ address: fullAddress });
      if (result.results[0]) {
        const location = result.results[0].geometry.location;
        const newCenter = { lat: location.lat(), lng: location.lng() };
        
        setCenter(newCenter);
        setMarker(location);
        map.panTo(newCenter);
        
        // Update coordinates in store
        updatePropertyData({
          location: {
            country: propertyData.location?.country || '',
            state: propertyData.location?.state || '',
            city: propertyData.location?.city || '',
            address: propertyData.location?.address || '',
            building: propertyData.location?.building || '',
            postalCode: propertyData.location?.postalCode || '',
            coordinates: newCenter
          }
        });
      }
    } catch (error) {
      console.error('Geocoding failed:', error);
    }
  }, [map, updatePropertyData, propertyData.location]);

  // Debounce geocoding to avoid too many API calls
  const debounceGeocode = useCallback(
    debounce(geocodeAddress, 1000),
    [geocodeAddress]
  );

  const handleLocationChange = (field: string, value: string) => {
    updatePropertyData({
      location: {
        country: propertyData.location?.country || '',
        state: propertyData.location?.state || '',
        city: propertyData.location?.city || '',
        address: propertyData.location?.address || '',
        building: propertyData.location?.building || '',
        postalCode: propertyData.location?.postalCode || '',
        coordinates: propertyData.location?.coordinates,
        [field]: value
      }
    });
    
    // If address fields change, geocode the new address
    if (['country', 'state', 'city', 'address'].includes(field)) {
      debounceGeocode();
    }
  };

  // Handle map load
  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    
    // Set initial marker if coordinates exist
    if (propertyData.location?.coordinates) {
      const coords = new google.maps.LatLng(
        propertyData.location.coordinates.lat,
        propertyData.location.coordinates.lng
      );
      setMarker(coords);
    }
  }, [propertyData.location?.coordinates]);

  // Handle autocomplete load
  const onAutocompleteLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  // Handle place selection from search
  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      
      if (place.geometry && place.geometry.location) {
        const location = place.geometry.location;
        const newCenter = { lat: location.lat(), lng: location.lng() };
        
        setCenter(newCenter);
        setMarker(location);
        
        if (map) {
          map.panTo(newCenter);
          map.setZoom(15);
        }

        // Parse place components to update form fields
        const addressComponents = place.address_components || [];
        const locationData = {
          country: '',
          state: '',
          city: '',
          address: '',
          building: propertyData.location?.building || '',
          postalCode: '',
          coordinates: newCenter
        };

        addressComponents.forEach((component) => {
          const types = component.types;
          
          if (types.includes('country')) {
            locationData.country = component.long_name;
          } else if (types.includes('administrative_area_level_1')) {
            locationData.state = component.long_name;
          } else if (types.includes('locality') || types.includes('administrative_area_level_2')) {
            locationData.city = component.long_name;
          } else if (types.includes('postal_code')) {
            locationData.postalCode = component.long_name;
          }
        });

        // Set street address
        if (place.formatted_address) {
          const streetNumber = addressComponents.find(c => c.types.includes('street_number'))?.long_name || '';
          const route = addressComponents.find(c => c.types.includes('route'))?.long_name || '';
          locationData.address = [streetNumber, route].filter(Boolean).join(' ');
        }

        // Update all location data
        updatePropertyData({
          location: locationData
        });

        setSearchValue(place.formatted_address || '');
      }
    }
  };

  // Reverse geocode coordinates to address
  const reverseGeocode = useCallback(async (latLng: google.maps.LatLng) => {
    if (!map) return;
    
    const geocoder = new google.maps.Geocoder();
    
    try {
      const result = await geocoder.geocode({ location: latLng });
      if (result.results[0]) {
        const place = result.results[0];
        const addressComponents = place.address_components || [];
        
        const locationData = {
          country: '',
          state: '',
          city: '',
          address: '',
          building: propertyData.location?.building || '',
          postalCode: '',
          coordinates: { lat: latLng.lat(), lng: latLng.lng() }
        };

        addressComponents.forEach((component) => {
          const types = component.types;
          
          if (types.includes('country')) {
            locationData.country = component.long_name;
          } else if (types.includes('administrative_area_level_1')) {
            locationData.state = component.long_name;
          } else if (types.includes('locality') || types.includes('administrative_area_level_2')) {
            locationData.city = component.long_name;
          } else if (types.includes('postal_code')) {
            locationData.postalCode = component.long_name;
          }
        });

        // Set street address
        const streetNumber = addressComponents.find(c => c.types.includes('street_number'))?.long_name || '';
        const route = addressComponents.find(c => c.types.includes('route'))?.long_name || '';
        locationData.address = [streetNumber, route].filter(Boolean).join(' ');

        // Update location data
        updatePropertyData({
          location: locationData
        });

        setSearchValue(place.formatted_address || '');
      }
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
    }
  }, [map, updatePropertyData, propertyData.location]);

  // Handle map click to place marker
  const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setMarker(event.latLng);
      const newCenter = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      
      // Update coordinates
      updatePropertyData({
        location: {
          country: propertyData.location?.country || '',
          state: propertyData.location?.state || '',
          city: propertyData.location?.city || '',
          address: propertyData.location?.address || '',
          building: propertyData.location?.building || '',
          postalCode: propertyData.location?.postalCode || '',
          coordinates: newCenter
        }
      });

      // Reverse geocode to get address
      reverseGeocode(event.latLng);
    }
  }, [propertyData.location, reverseGeocode, updatePropertyData]);

  const handleNext = () => {
    updateStepStatus('location', { completed: true, current: false });
    updateStepStatus('property-details', { current: true, pending: false });
    setCurrentStep('property-details');
    router.push('/listing/setup/property-details');
  };

  const handlePrevious = () => {
    updateStepStatus('location', { current: false });
    updateStepStatus('basics', { current: true });
    setCurrentStep('basics');
    router.push('/listing/setup/basics');
  };

  const countryOptions = [
    { value: 'India', label: 'India' },
    { value: 'United States', label: 'United States' },
    { value: 'United Kingdom', label: 'United Kingdom' }
  ];

  const stateOptions = [
    { value: 'West Bengal', label: 'West Bengal' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Maharashtra', label: 'Maharashtra' }
  ];

  const cityOptions = [
    { value: 'Kalna', label: 'Kalna' },
    { value: 'Kolkata', label: 'Kolkata' },
    { value: 'Durgapur', label: 'Durgapur' }
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-sm md:max-w-lg lg:max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Where is your property located?
        </h1>
        
        {/* Search Input with Google Places Autocomplete */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
            libraries={libraries}
          >
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400 z-10" />
              <Autocomplete
                onLoad={onAutocompleteLoad}
                onPlaceChanged={onPlaceChanged}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for your property location"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </Autocomplete>
            </div>
          </LoadScript>
          <p className="text-sm text-gray-500">Enter a location</p>
        </div>

        {/* Property Location Form */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Property location</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Select
              label="Country/Region"
              options={countryOptions}
              value={propertyData.location?.country || ''}
              onChange={(e) => handleLocationChange('country', e.target.value)}
            />
            <Select
              label="State/Province"
              options={stateOptions}
              value={propertyData.location?.state || ''}
              onChange={(e) => handleLocationChange('state', e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Select
              label="City"
              options={cityOptions}
              value={propertyData.location?.city || ''}
              onChange={(e) => handleLocationChange('city', e.target.value)}
            />
            <Input
              label="Street address"
              value={propertyData.location?.address || ''}
              onChange={(e) => handleLocationChange('address', e.target.value)}
              placeholder=", Pandua"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Building, floor or unit number (optional)"
              value={propertyData.location?.building || ''}
              onChange={(e) => handleLocationChange('building', e.target.value)}
            />
            <Input
              label="ZIP/Postal code (optional)"
              value={propertyData.location?.postalCode || ''}
              onChange={(e) => handleLocationChange('postalCode', e.target.value)}
            />
          </div>
        </div>

        {/* Google Map */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
            libraries={libraries}
          >
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={13}
              onLoad={onMapLoad}
              onClick={onMapClick}
              options={mapOptions}
            >
              {marker && (
                <Marker
                  position={marker}
                  draggable={true}
                  onDragEnd={(e) => {
                    if (e.latLng) {
                      setMarker(e.latLng);
                      reverseGeocode(e.latLng);
                    }
                  }}
                />
              )}
            </GoogleMap>
          </LoadScript>
          
          <div className="flex items-center mt-4 space-x-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <p className="text-sm text-gray-600">
              Is this the correct location of your property? If not, click on the map or drag the pin to the correct location.
            </p>
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

// Utility function for debouncing
function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}