
import React from 'react';
import Layout from '@/components/Layout';
import SearchForm from '@/components/search/SearchForm';
import RoomCard from '@/components/room/RoomCard';
import { Button } from "@/components/ui/button";
import { ArrowRight, BedDouble, Key, Coffee, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFeaturedRooms } from '@/data/mockData';

const Index = () => {
  const featuredRooms = getFeaturedRooms();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-hotel-950 to-hotel-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Luxury Hotel Room" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        <div className="relative hotel-container py-20 md:py-32 flex flex-col items-center text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Experience Luxury & Comfort</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Book your perfect stay with us and enjoy the finest accommodations and amenities.
          </p>
          
          <div className="w-full max-w-4xl mt-10">
            <SearchForm />
          </div>
        </div>
      </section>
      
      {/* Featured Rooms Section */}
      <section className="section-padding bg-white">
        <div className="hotel-container">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Rooms</h2>
            <Link to="/rooms">
              <Button variant="ghost" className="text-hotel-700 font-medium">
                View All Rooms <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map(room => (
              <RoomCard key={room.id} room={room} featured />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="hotel-container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-hotel-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BedDouble className="h-8 w-8 text-hotel-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comfortable Rooms</h3>
              <p className="text-gray-600">
                Enjoy our spacious and well-appointed rooms designed for your comfort.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-hotel-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Key className="h-8 w-8 text-hotel-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Check-in</h3>
              <p className="text-gray-600">
                Quick and hassle-free check-in process to get you settled in no time.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-hotel-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="h-8 w-8 text-hotel-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Amenities</h3>
              <p className="text-gray-600">
                Enjoy a range of premium amenities designed to enhance your stay.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-hotel-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-hotel-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">5-Star Service</h3>
              <p className="text-gray-600">
                Experience our exceptional service that puts your needs first.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-hotel-700 text-white">
        <div className="hotel-container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Perfect Stay?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Browse our selection of rooms and find the perfect accommodation for your needs.
          </p>
          <Link to="/rooms">
            <Button className="bg-white text-hotel-800 hover:bg-gray-100">
              View All Rooms
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
