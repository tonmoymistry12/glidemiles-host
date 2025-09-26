'use client';
import React from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

interface HeaderProps {
  showNavigation?: boolean;
  showUserInfo?: boolean;
  userName?: string;
  propertyId?: string;
}

export const Header: React.FC<HeaderProps> = ({
  showNavigation = false,
  showUserInfo = false,
  userName = '',
  propertyId = ''
}) => {
  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-full mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                {/* <span className="text-2xl font-bold text-blue-600">Glidemiles</span> */}
                {/* <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                </div> */}
                <Image src="/images/logo/glidemiles_black.png" alt="GlideMiles Logo" width={160} height={40} className="w-40 h-10" />
              </div>
              {/*<span className="text-xl text-gray-600 font-normal">Glidemiles</span> */}
              
            </div>
          </div>
          
          {/* Center: Navigation (Dashboard only) */}
          {showNavigation && (
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Performance</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Bookings</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Rates and availability</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Property</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Finance</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Growth programs</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Resources</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Settings</a>
            </nav>
          )}

          {/* Right: User Actions */}
          <div className="flex items-center space-x-4">
            {/* Login/Signup Actions */}
            {!showNavigation && !showUserInfo && (
              <>
                <span className="text-gray-600 text-sm">Not an Glidemiles Partner?</span>
                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded text-sm font-medium hover:bg-blue-50 transition-colors">
                  SIGN UP!
                </button>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Contact us
                </button>
              </>
            )}

            {/* Dashboard User Info */}
            {showUserInfo && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    0
                  </div>
                </div>
                <span className="text-gray-700 text-sm">
                  {propertyId}. {userName}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </div>
            )}

            {/* Language Selector */}
            
          </div>
        </div>
      </div>
    </header>
  );
};