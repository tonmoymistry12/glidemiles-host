'use client';
import React, { useState } from 'react';
import { Search, Filter, Download, Calendar } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('Jan 24, 2025 - Jan 31, 2025');

  const tabs = ['All', 'Confirmed', 'Amended', 'Cancelled'];
  
  const tableHeaders = [
    'Booking ID',
    'Guest name', 
    'Stay dates',
    'Room & occupancy',
    'Payment model',
    'Quick actions'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        showNavigation={true}
        showUserInfo={true}
        userName="hulala hotel and bar"
        propertyId="65241991"
      />
      
      <div className="pt-16 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Reservations</h1>
          
          {/* Search and Filters Bar */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center space-x-4 mb-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Booking ID / Guest name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Stay Dates Dropdown */}
              <div className="relative">
                <select className="px-4 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Stay dates</option>
                  <option>Check-in date</option>
                  <option>Check-out date</option>
                  <option>Booking date</option>
                </select>
              </div>
              
              {/* Date Range Input */}
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Date range"
                />
              </div>
              
              {/* Filters Button */}
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Filter className="w-4 h-4" />
                <span>Filters: All applied</span>
              </button>
              
              {/* Search Button */}
              <Button size="md">
                Search
              </Button>
            </div>
          </div>

          {/* Booking Status Tabs and Table */}
          <div className="bg-white rounded-lg shadow-sm">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                      tab === selectedTab 
                        ? 'border-blue-500 text-blue-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Table Content */}
            <div className="p-6">
              {/* Download Button */}
              <div className="flex justify-end mb-4">
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm">
                  <Download className="w-4 h-4" />
                  <span>Download (.csv)</span>
                </button>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-6 gap-4 py-3 border-b border-gray-200 font-medium text-sm text-gray-700 mb-4">
                {tableHeaders.map((header) => (
                  <div key={header} className="text-left">
                    {header}
                    {header === 'Stay dates' && (
                      <button className="ml-1 text-gray-400 hover:text-gray-600">
                        ⇅
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Empty State */}
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl text-gray-400">📋</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                <p className="text-gray-500 mb-4">Try your search again with new dates or filters</p>
                <button 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => {
                    setSearchQuery('');
                    setDateRange('');
                    setSelectedTab('All');
                  }}
                >
                  Start over
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}