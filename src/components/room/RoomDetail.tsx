
import React, { useState } from 'react';
import { 
  BedDouble, 
  Users, 
  Maximize, 
  Check, 
  Calendar, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Room } from '@/data/mockData';

interface RoomDetailProps {
  room: Room;
  onBookNow: () => void;
}

const RoomDetail: React.FC<RoomDetailProps> = ({ room, onBookNow }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        {/* Image Gallery */}
        <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20 z-10" />
          
          <img 
            src={room.images[activeImageIndex]} 
            alt={`${room.name} - Photo ${activeImageIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 transform hover:scale-105"
          />
          
          {/* Image Navigation Controls */}
          <div className="absolute inset-0 flex items-center justify-between z-20 px-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="bg-white/70 hover:bg-white text-gray-800 rounded-full"
              onClick={prevImage}
            >
              <ChevronLeft size={24} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="bg-white/70 hover:bg-white text-gray-800 rounded-full"
              onClick={nextImage}
            >
              <ChevronRight size={24} />
            </Button>
          </div>
          
          {/* Image Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
            {room.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === activeImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setActiveImageIndex(index)}
              />
            ))}
          </div>
          
          {/* Room Type Badge */}
          <Badge className="absolute top-4 right-4 z-20 bg-hotel-700 text-white px-3 py-1">
            {room.type}
          </Badge>
        </div>
      </div>
      
      {/* Room Details */}
      <div className="p-6">
        <div className="flex flex-wrap items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{room.name}</h1>
            <div className="flex flex-wrap gap-4 text-gray-600">
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
          </div>
          
          <div className="text-right">
            <p className="text-3xl font-bold text-hotel-800">₹{room.price}</p>
            <p className="text-gray-500">per night</p>
          </div>
        </div>
        
        <div className="mb-8">
          <Button 
            onClick={onBookNow} 
            className="w-full md:w-auto bg-hotel-700 hover:bg-hotel-800 text-white"
          >
            <Calendar className="mr-2 h-4 w-4" /> Book Now
          </Button>
        </div>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">{room.description}</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-3">Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4">
              {room.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
