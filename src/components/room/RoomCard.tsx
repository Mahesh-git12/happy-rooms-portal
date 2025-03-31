
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BedDouble, Users, Maximize, ArrowRight } from 'lucide-react';
import { Room } from '@/data/mockData';

interface RoomCardProps {
  room: Room;
  featured?: boolean;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, featured = false }) => {
  return (
    <Card className={`overflow-hidden ${featured ? 'shadow-lg' : 'shadow-md'} transition-shadow hover:shadow-xl`}>
      <div className="relative">
        <img 
          src={room.images[0]} 
          alt={room.name} 
          className={`w-full object-cover ${featured ? 'h-72' : 'h-60'}`}
        />
        <Badge className="absolute top-4 right-4 bg-hotel-700">{room.type}</Badge>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
        
        <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4" />
            <span>{room.capacity} {room.capacity === 1 ? 'Person' : 'People'}</span>
          </div>
          <div className="flex items-center">
            <BedDouble className="mr-1 h-4 w-4" />
            <span>{room.type}</span>
          </div>
          <div className="flex items-center">
            <Maximize className="mr-1 h-4 w-4" />
            <span>{room.size} m²</span>
          </div>
        </div>
        
        <p className="text-gray-700 line-clamp-3 mb-4">
          {room.description}
        </p>
        
        <div className="font-bold text-2xl text-hotel-800">
          ₹{room.price}<span className="text-sm text-gray-500 font-normal">/night</span>
        </div>
      </CardContent>
      
      <CardFooter className="border-t p-6 bg-gray-50">
        <div className="w-full flex justify-between items-center">
          <Link to={`/rooms/${room.id}`}>
            <Button variant="ghost" className="text-hotel-700 hover:text-hotel-800 hover:bg-gray-100 p-0">
              View Details <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
          
          <Link to={`/rooms/${room.id}`}>
            <Button className="bg-hotel-700 hover:bg-hotel-800">
              Book Now
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
