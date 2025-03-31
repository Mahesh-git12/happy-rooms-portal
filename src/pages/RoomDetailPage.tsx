
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import RoomDetail from '@/components/room/RoomDetail';
import BookingForm from '@/components/booking/BookingForm';
import RoomCard from '@/components/room/RoomCard';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';
import { getRoomById, rooms } from '@/data/mockData';

const RoomDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState(getRoomById(id || ''));
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [similarRooms, setSimilarRooms] = useState(rooms.slice(0, 3));
  
  useEffect(() => {
    // Get room data
    const roomData = getRoomById(id || '');
    setRoom(roomData);
    
    // If room not found, no need to load similar rooms
    if (!roomData) return;
    
    // Get similar rooms (same type or similar price range)
    const similar = rooms
      .filter(r => r.id !== roomData.id && (r.type === roomData.type || Math.abs(r.price - roomData.price) < 100))
      .slice(0, 3);
    
    setSimilarRooms(similar);
    
    // Reset booking form visibility when room changes
    setShowBookingForm(false);
  }, [id]);
  
  const handleBookNow = () => {
    setShowBookingForm(true);
    
    // Scroll to booking form
    setTimeout(() => {
      document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const handleBookingSuccess = (bookingId: string) => {
    navigate(`/bookings`);
  };
  
  if (!room) {
    return (
      <Layout>
        <div className="hotel-container py-20">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Room Not Found</AlertTitle>
            <AlertDescription>
              The room you're looking for doesn't exist or has been removed.
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="hotel-container py-10">
        <RoomDetail room={room} onBookNow={handleBookNow} />
        
        {showBookingForm && (
          <div id="booking-form" className="mt-10 flex justify-center">
            <BookingForm room={room} onSuccess={handleBookingSuccess} />
          </div>
        )}
        
        {similarRooms.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Similar Rooms You Might Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarRooms.map(room => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RoomDetailPage;
