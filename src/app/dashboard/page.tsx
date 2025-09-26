'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Download, ChevronDown, X } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import dayjs from 'dayjs';
import styles from './page.module.scss';

// Dummy data for bookings
const dummyBookings = [
  {
    id: 'BK001',
    guestName: 'John Smith',
    stayDates: 'Jan 24, 2025 - Jan 26, 2025',
    room: 'Double Room',
    occupancy: '2 adults',
    paymentModel: 'Pay at property',
    status: 'Confirmed',
    bookingDate: 'Jan 20, 2025',
    checkIn: 'Jan 24, 2025',
    checkOut: 'Jan 26, 2025',
    amount: '₹2,400'
  },
  {
    id: 'BK002',
    guestName: 'Sarah Johnson',
    stayDates: 'Jan 25, 2025 - Jan 28, 2025',
    room: 'Single Room',
    occupancy: '1 adult',
    paymentModel: 'Prepaid',
    status: 'Confirmed',
    bookingDate: 'Jan 21, 2025',
    checkIn: 'Jan 25, 2025',
    checkOut: 'Jan 28, 2025',
    amount: '₹3,600'
  },
  {
    id: 'BK003',
    guestName: 'Mike Wilson',
    stayDates: 'Jan 26, 2025 - Jan 29, 2025',
    room: 'Suite',
    occupancy: '2 adults, 1 child',
    paymentModel: 'Pay at property',
    status: 'Amended',
    bookingDate: 'Jan 22, 2025',
    checkIn: 'Jan 26, 2025',
    checkOut: 'Jan 29, 2025',
    amount: '₹4,800'
  },
  {
    id: 'BK004',
    guestName: 'Emily Davis',
    stayDates: 'Jan 27, 2025 - Jan 30, 2025',
    room: 'Twin Room',
    occupancy: '2 adults',
    paymentModel: 'Prepaid',
    status: 'Cancelled',
    bookingDate: 'Jan 23, 2025',
    checkIn: 'Jan 27, 2025',
    checkOut: 'Jan 30, 2025',
    amount: '₹3,600'
  },
  {
    id: 'BK005',
    guestName: 'David Brown',
    stayDates: 'Jan 28, 2025 - Jan 31, 2025',
    room: 'Double Room',
    occupancy: '2 adults',
    paymentModel: 'Pay at property',
    status: 'Confirmed',
    bookingDate: 'Jan 24, 2025',
    checkIn: 'Jan 28, 2025',
    checkOut: 'Jan 31, 2025',
    amount: '₹3,600'
  },
  {
    id: 'BK006',
    guestName: 'Lisa Anderson',
    stayDates: 'Jan 29, 2025 - Feb 1, 2025',
    room: 'Single Room',
    occupancy: '1 adult',
    paymentModel: 'Prepaid',
    status: 'Confirmed',
    bookingDate: 'Jan 25, 2025',
    checkIn: 'Jan 29, 2025',
    checkOut: 'Feb 1, 2025',
    amount: '₹2,400'
  }
];

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDateFrom, setSelectedDateFrom] = useState(dayjs('2025-01-24'));
  const [selectedDateTo, setSelectedDateTo] = useState(dayjs('2025-01-31'));
  const [dateFilterType, setDateFilterType] = useState('Stay dates');
  const [isMounted, setIsMounted] = useState(false);
  const [filters, setFilters] = useState({
    paymentModel: 'All',
    roomType: 'All',
    occupancy: 'All'
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  const tabs = ['All', 'Confirmed', 'Amended', 'Cancelled'];
  
  const tableHeaders = [
    'Booking ID',
    'Guest name', 
    'Stay dates',
    'Room & occupancy',
    'Payment model',
    'Quick actions'
  ];

  // Filter bookings based on search, tab, and filters
  const filteredBookings = useMemo(() => {
    return dummyBookings.filter(booking => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.guestName.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Status filter
      const matchesStatus = selectedTab === 'All' || booking.status === selectedTab;
      
      // Payment model filter
      const matchesPayment = filters.paymentModel === 'All' || booking.paymentModel === filters.paymentModel;
      
      // Room type filter
      const matchesRoom = filters.roomType === 'All' || booking.room === filters.roomType;
      
      // Date filter based on selected type
      let matchesDate = true;
      if (dateFilterType !== 'Stay dates') {
        const fromDate = selectedDateFrom.toDate();
        const toDate = selectedDateTo.toDate();
        
        if (dateFilterType === 'Check-in date') {
          const checkInDate = new Date(booking.checkIn);
          matchesDate = checkInDate >= fromDate && checkInDate <= toDate;
        } else if (dateFilterType === 'Check-out date') {
          const checkOutDate = new Date(booking.checkOut);
          matchesDate = checkOutDate >= fromDate && checkOutDate <= toDate;
        } else if (dateFilterType === 'Booking date') {
          const bookingDate = new Date(booking.bookingDate);
          matchesDate = bookingDate >= fromDate && bookingDate <= toDate;
        }
      }
      
      return matchesSearch && matchesStatus && matchesPayment && matchesRoom && matchesDate;
    });
  }, [searchQuery, selectedTab, filters, dateFilterType, selectedDateFrom, selectedDateTo]);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      paymentModel: 'All',
      roomType: 'All',
      occupancy: 'All'
    });
    setSearchQuery('');
    setSelectedDateFrom(dayjs('2025-01-24'));
    setSelectedDateTo(dayjs('2025-01-31'));
  };

  const handleDateChange = (field: 'from' | 'to', value: dayjs.Dayjs | null) => {
    if (!value) return;
    
    if (field === 'from') {
      setSelectedDateFrom(value);
    } else {
      setSelectedDateTo(value);
    }
  };

  // Prevent hydration issues by not rendering until mounted
  if (!isMounted) {
    return (
      <div className={styles.container}>
        <Header 
          showNavigation={true}
          showUserInfo={true}
          userName="hulala hotel and bar"
          propertyId="65241991"
        />
        <div className={styles.contentWrapper}>
          <div className={styles.maxWidthContainer}>
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
              <div className="h-32 bg-gray-200 rounded mb-6"></div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={styles.container}>
        <Header 
          showNavigation={true}
          showUserInfo={true}
          userName="hulala hotel and bar"
          propertyId="65241991"
        />
      
      <div className={styles.contentWrapper}>
        <div className={styles.maxWidthContainer}>
          <h1 className={styles.pageTitle}>Reservations</h1>
          
          {/* Search and Filters Bar */}
          <div className={styles.searchFiltersCard}>
            <div className={styles.filtersBar}>
              {/* Search Input */}
              <div className={styles.searchInput}>
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Booking ID / Guest name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Date Filter Type Dropdown */}
              <div className={styles.dateFilterDropdown}>
                <FormControl size="small" className={styles.dateFilterSelect}>
                  <InputLabel>Date Type</InputLabel>
                  <Select
                    value={dateFilterType}
                    onChange={(e) => setDateFilterType(e.target.value)}
                    label="Date Type"
                    className={styles.muiSelect}
                  >
                    <MenuItem value="Stay dates">Stay dates</MenuItem>
                    <MenuItem value="Check-in date">Check-in date</MenuItem>
                    <MenuItem value="Check-out date">Check-out date</MenuItem>
                    <MenuItem value="Booking date">Booking date</MenuItem>
                  </Select>
                </FormControl>
              </div>
              
              {/* Date Inputs Group */}
              <div className={styles.dateInputsGroup}>
                {/* From Date Input */}
                <DatePicker
                  label="From"
                  value={selectedDateFrom}
                  onChange={(value) => handleDateChange('from', value)}
                  slotProps={{
                    textField: {
                      size: 'small',
                      className: styles.datePicker,
                    },
                  }}
                />
                
                {/* To Date Input */}
                <DatePicker
                  label="To"
                  value={selectedDateTo}
                  onChange={(value) => handleDateChange('to', value)}
                  slotProps={{
                    textField: {
                      size: 'small',
                      className: styles.datePicker,
                    },
                  }}
                />
              </div>
              
              {/* Filters Button */}
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={styles.filtersButton}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {/* Search Button */}
              <Button size="md">
                Search
              </Button>
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
              <div className={styles.advancedFiltersPanel}>
                <div className={styles.filtersGrid}>
                  {/* Payment Model Filter */}
                  <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Payment Model</label>
                    <select
                      value={filters.paymentModel}
                      onChange={(e) => handleFilterChange('paymentModel', e.target.value)}
                      className={styles.filterSelect}
                    >
                      <option value="All">All</option>
                      <option value="Pay at property">Pay at property</option>
                      <option value="Prepaid">Prepaid</option>
                    </select>
                  </div>

                  {/* Room Type Filter */}
                  <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Room Type</label>
                    <select
                      value={filters.roomType}
                      onChange={(e) => handleFilterChange('roomType', e.target.value)}
                      className={styles.filterSelect}
                    >
                      <option value="All">All</option>
                      <option value="Double Room">Double Room</option>
                      <option value="Single Room">Single Room</option>
                      <option value="Twin Room">Twin Room</option>
                      <option value="Suite">Suite</option>
                    </select>
                  </div>

                  {/* Occupancy Filter */}
                  <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Occupancy</label>
                    <select
                      value={filters.occupancy}
                      onChange={(e) => handleFilterChange('occupancy', e.target.value)}
                      className={styles.filterSelect}
                    >
                      <option value="All">All</option>
                      <option value="1 adult">1 adult</option>
                      <option value="2 adults">2 adults</option>
                      <option value="2 adults, 1 child">2 adults, 1 child</option>
                    </select>
                  </div>
                </div>

                {/* Clear Filters Button */}
                <div className={styles.clearFiltersContainer}>
                  <button
                    onClick={clearFilters}
                    className={styles.clearFiltersButton}
                  >
                    <X className="w-4 h-4" />
                    <span>Clear all filters</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Booking Status Tabs and Table */}
          <div className={styles.bookingTableCard}>
            {/* Tabs */}
            <div className={styles.tableTabs}>
              <nav className={styles.tableTabsNav}>
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`${styles.tableTab} ${tab === selectedTab ? styles.active : ''}`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Table Content */}
            <div className={styles.tableContent}>
              {/* Download Button */}
              <div className={styles.downloadButtonContainer}>
                <button className={styles.downloadButton}>
                  <Download className="w-4 h-4" />
                  <span>Download (.csv)</span>
                </button>
              </div>

              {/* Table Header */}
              <div className={styles.tableHeader}>
                {tableHeaders.map((header) => (
                  <div key={header} className={styles.tableHeaderCell}>
                    {header}
                    {header === 'Stay dates' && (
                      <button className={styles.sortButton}>
                        ⇅
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Table Body */}
              {filteredBookings.length > 0 ? (
                <div className={styles.bookingRows}>
                  {filteredBookings.map((booking) => (
                    <div key={booking.id} className={styles.bookingRow}>
                      {/* Booking ID */}
                      <div className={`${styles.bookingCell} ${styles.bookingId}`}>
                        {booking.id}
                      </div>
                      
                      {/* Guest Name */}
                      <div className={`${styles.bookingCell} ${styles.guestName}`}>
                        {booking.guestName}
                      </div>
                      
                      {/* Stay Dates */}
                      <div className={`${styles.bookingCell} ${styles.stayDates}`}>
                        {booking.stayDates}
                      </div>
                      
                      {/* Room & Occupancy */}
                      <div className={`${styles.bookingCell} ${styles.roomInfo}`}>
                        <div className={styles.roomType}>{booking.room}</div>
                        <div className={styles.occupancy}>{booking.occupancy}</div>
                      </div>
                      
                      {/* Payment Model */}
                      <div className={`${styles.bookingCell} ${styles.paymentModel}`}>
                        {booking.paymentModel}
                      </div>
                      
                      {/* Quick Actions */}
                      <div className={`${styles.bookingCell} ${styles.quickActions}`}>
                        <span className={`${styles.statusBadge} ${styles[booking.status.toLowerCase()]}`}>
                          {booking.status}
                        </span>
                        <button className={styles.viewButton}>
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className={styles.emptyState}>
                  <div className={styles.emptyStateIcon}>
                    <span>📋</span>
                  </div>
                  <h3 className={styles.emptyStateTitle}>No bookings found</h3>
                  <p className={styles.emptyStateDescription}>Try your search again with new dates or filters</p>
                  <button 
                    className={styles.emptyStateButton}
                    onClick={clearFilters}
                  >
                    Start over
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </LocalizationProvider>
  );
}