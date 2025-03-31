
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { BedDouble, Calendar, Users } from 'lucide-react';
import { Booking, Room } from '@/data/mockData';

interface BookingCardProps {
  booking: Booking;
  room: Room;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, room }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-40">
        <img 
          src={room.images[0]} 
          alt={room.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h3 className="text-white text-xl font-bold">{room.name}</h3>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{room.name}</CardTitle>
          <Badge className={`capitalize ${getStatusColor(booking.status)}`}>
            {booking.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 pt-0">
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Check-in:</span>
            </div>
            <span className="font-medium">{format(booking.checkIn, "MMM dd, yyyy")}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Check-out:</span>
            </div>
            <span className="font-medium">{format(booking.checkOut, "MMM dd, yyyy")}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              <span>Guests:</span>
            </div>
            <span className="font-medium">{booking.guests}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <BedDouble className="h-4 w-4 mr-2" />
              <span>Room Type:</span>
            </div>
            <span className="font-medium">{room.type}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t bg-gray-50 flex justify-between">
        <div className="text-gray-600 text-sm">
          Booked on {format(booking.createdAt, "MMM dd, yyyy")}
        </div>
        <div className="font-bold text-hotel-800">
          ${booking.totalPrice}
        </div>
      </CardFooter>
    </Card>
  );
};

export default BookingCard;
