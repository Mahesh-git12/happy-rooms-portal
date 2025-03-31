
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import BookingCard from '@/components/booking/BookingCard';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';
import { Search, Calendar, ArrowRight } from 'lucide-react';
import { bookings, getBookingsByEmail, getRoomById } from '@/data/mockData';

const BookingsPage = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [userBookings, setUserBookings] = useState(bookings); // Initially show all bookings for demo purposes
  const [searched, setSearched] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to find your bookings.",
        variant: "destructive",
      });
      return;
    }
    
    const foundBookings = getBookingsByEmail(email);
    setUserBookings(foundBookings);
    setSearched(true);
    
    if (foundBookings.length === 0) {
      toast({
        title: "No Bookings Found",
        description: "We couldn't find any bookings associated with this email.",
      });
    } else {
      toast({
        title: "Bookings Found",
        description: `We found ${foundBookings.length} booking(s) associated with ${email}.`,
      });
    }
  };
  
  return (
    <Layout>
      {/* Page Header */}
      <section className="py-10 bg-gray-100">
        <div className="hotel-container">
          <h1 className="text-3xl font-bold mb-4">My Bookings</h1>
          <p className="text-gray-600 max-w-3xl">
            View and manage your current bookings. Enter your email address to find all your reservations.
          </p>
        </div>
      </section>
      
      {/* Search Section */}
      <section className="py-8 bg-white border-b">
        <div className="hotel-container max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Find Your Bookings</CardTitle>
              <CardDescription>
                Enter the email address you used when making your reservation.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSearch} className="flex space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input 
                    type="email"
                    placeholder="Your email address"
                    className="pl-9"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button type="submit" className="bg-hotel-700 hover:bg-hotel-800">
                  Search
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Bookings List */}
      <section className="section-padding bg-gray-50">
        <div className="hotel-container">
          {userBookings.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold mb-6">
                {searched ? `Your Bookings (${userBookings.length})` : 'Sample Bookings'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userBookings.map(booking => (
                  <BookingCard 
                    key={booking.id} 
                    booking={booking} 
                    room={getRoomById(booking.roomId)!}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <div className="inline-flex bg-gray-100 p-4 rounded-full mb-4">
                <Calendar className="h-12 w-12 text-hotel-700" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No Bookings Found</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searched 
                  ? `We couldn't find any bookings with the email "${email}". Please check the email address and try again.`
                  : 'Enter your email address above to find your bookings.'}
              </p>
              <Link to="/rooms">
                <Button className="bg-hotel-700 hover:bg-hotel-800">
                  Browse Rooms <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default BookingsPage;
