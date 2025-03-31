
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import RoomCard from '@/components/room/RoomCard';
import SearchForm from '@/components/search/SearchForm';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { rooms, Room } from '@/data/mockData';
import { Search } from 'lucide-react';

const RoomsPage = () => {
  const location = useLocation();
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(rooms);
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [capacityFilter, setCapacityFilter] = useState(1);
  const [priceFilter, setPriceFilter] = useState([600]);
  
  // Parse search params if they exist
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const guests = searchParams.get('guests');
    
    if (guests) {
      setCapacityFilter(parseInt(guests));
    }
    
    // Apply filters immediately
    applyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);
  
  // Filter rooms when filter values change
  useEffect(() => {
    applyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameFilter, typeFilter, capacityFilter, priceFilter]);
  
  const applyFilters = () => {
    let filtered = rooms;
    
    // Filter by name
    if (nameFilter) {
      filtered = filtered.filter(room => 
        room.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
    
    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(room => 
        room.type === typeFilter
      );
    }
    
    // Filter by capacity
    filtered = filtered.filter(room => 
      room.capacity >= capacityFilter
    );
    
    // Filter by price
    filtered = filtered.filter(room => 
      room.price <= priceFilter[0]
    );
    
    setFilteredRooms(filtered);
  };
  
  return (
    <Layout>
      {/* Page Header */}
      <section className="py-10 bg-gray-100">
        <div className="hotel-container">
          <h1 className="text-3xl font-bold mb-4">Our Rooms</h1>
          <p className="text-gray-600 max-w-3xl">
            Browse our selection of premium rooms and suites. Use the filters to find the perfect accommodation for your stay.
          </p>
        </div>
      </section>
      
      {/* Search Form */}
      <section className="py-8 bg-white border-b">
        <div className="hotel-container">
          <SearchForm />
        </div>
      </section>
      
      <section className="section-padding bg-gray-50">
        <div className="hotel-container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Filters</h2>
                <Separator className="mb-4" />
                
                <div className="space-y-6">
                  {/* Search by name */}
                  <div>
                    <Label htmlFor="search">Search by Name</Label>
                    <div className="relative mt-1">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input 
                        id="search"
                        placeholder="Room name" 
                        className="pl-8"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {/* Filter by type */}
                  <div>
                    <Label htmlFor="type">Room Type</Label>
                    <Select
                      value={typeFilter}
                      onValueChange={setTypeFilter}
                    >
                      <SelectTrigger id="type" className="mt-1">
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Standard">Standard</SelectItem>
                        <SelectItem value="Deluxe">Deluxe</SelectItem>
                        <SelectItem value="Suite">Suite</SelectItem>
                        <SelectItem value="Family">Family</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Filter by capacity */}
                  <div>
                    <Label htmlFor="capacity">Guests (min {capacityFilter})</Label>
                    <Select
                      value={capacityFilter.toString()}
                      onValueChange={(val) => setCapacityFilter(parseInt(val))}
                    >
                      <SelectTrigger id="capacity" className="mt-1">
                        <SelectValue placeholder="Select capacity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Person</SelectItem>
                        <SelectItem value="2">2 People</SelectItem>
                        <SelectItem value="3">3 People</SelectItem>
                        <SelectItem value="4">4+ People</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Filter by price */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="price">Max Price: ${priceFilter[0]}</Label>
                    </div>
                    <Slider
                      id="price"
                      min={100}
                      max={1000}
                      step={50}
                      value={priceFilter}
                      onValueChange={setPriceFilter}
                    />
                    <div className="flex justify-between mt-1 text-sm text-gray-500">
                      <span>$100</span>
                      <span>$1000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Room Results */}
            <div className="lg:col-span-3">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {filteredRooms.length} {filteredRooms.length === 1 ? 'Room' : 'Rooms'} Found
                </h2>
              </div>
              
              {filteredRooms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredRooms.map(room => (
                    <RoomCard key={room.id} room={room} />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <h3 className="text-xl font-semibold mb-2">No Rooms Found</h3>
                  <p className="text-gray-600">
                    Try adjusting your filters to find available rooms.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RoomsPage;
