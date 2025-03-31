
// Types for our data models
export interface Room {
  id: string;
  name: string;
  type: 'Standard' | 'Deluxe' | 'Suite' | 'Family';
  price: number;
  description: string;
  capacity: number;
  size: number;
  amenities: string[];
  images: string[];
  featured: boolean;
}

export interface Booking {
  id: string;
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  guestName: string;
  guestEmail: string;
  createdAt: Date;
}

// Mock room data
export const rooms: Room[] = [
  {
    id: '1',
    name: 'Deluxe Ocean View',
    type: 'Deluxe',
    price: 299,
    description: 'Experience luxury with breathtaking ocean views. This spacious deluxe room features a king-size bed, elegant furnishings, and a private balcony where you can enjoy the sunset.',
    capacity: 2,
    size: 45, // size in square meters
    amenities: ['Free WiFi', 'Flat-screen TV', 'Air conditioning', 'Minibar', 'Coffee machine', 'Safe', 'Hairdryer', 'Bathrobe', 'Slippers'],
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      'https://images.unsplash.com/photo-1576675466969-38eeae4b41f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      'https://images.unsplash.com/photo-1552902019-ebcd97aa9aa0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
    ],
    featured: true
  },
  {
    id: '2',
    name: 'Premium King Suite',
    type: 'Suite',
    price: 499,
    description: 'Our premium king suite offers the ultimate luxury experience with a separate living area, a premium king-size bed, and panoramic city views. Perfect for those seeking extra space and comfort.',
    capacity: 2,
    size: 65,
    amenities: ['Free WiFi', 'Flat-screen TV', 'Air conditioning', 'Minibar', 'Coffee machine', 'Safe', 'Hairdryer', 'Bathrobe', 'Slippers', 'Separate living area', 'Work desk', 'Rain shower'],
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
    ],
    featured: true
  },
  {
    id: '3',
    name: 'Standard Twin Room',
    type: 'Standard',
    price: 199,
    description: 'Comfortable and affordable, our standard twin room comes with two single beds, modern amenities, and all the essentials for a pleasant stay.',
    capacity: 2,
    size: 30,
    amenities: ['Free WiFi', 'Flat-screen TV', 'Air conditioning', 'Safe', 'Hairdryer'],
    images: [
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=857&q=80',
      'https://images.unsplash.com/photo-1541123603104-512919d6a96c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      'https://images.unsplash.com/photo-1568495248636-6432b97bd949?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
    ],
    featured: false
  },
  {
    id: '4',
    name: 'Family Room',
    type: 'Family',
    price: 349,
    description: 'Designed for family comfort, this spacious room includes a king-size bed and two single beds, perfect for families traveling with children.',
    capacity: 4,
    size: 55,
    amenities: ['Free WiFi', 'Flat-screen TV', 'Air conditioning', 'Minibar', 'Coffee machine', 'Safe', 'Hairdryer', 'Extra space for children'],
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      'https://images.unsplash.com/photo-1617098474202-0d0d7f60c56b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
    ],
    featured: true
  },
  {
    id: '5',
    name: 'Executive Suite',
    type: 'Suite',
    price: 599,
    description: 'The epitome of luxury, our executive suite features a separate bedroom, spacious living area, premium amenities, and stunning views of the city skyline.',
    capacity: 2,
    size: 75,
    amenities: ['Free WiFi', 'Flat-screen TV', 'Air conditioning', 'Minibar', 'Coffee machine', 'Safe', 'Hairdryer', 'Bathrobe', 'Slippers', 'Separate living area', 'Work desk', 'Rain shower', 'Jacuzzi'],
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
    ],
    featured: false
  },
  {
    id: '6',
    name: 'Cozy Single Room',
    type: 'Standard',
    price: 149,
    description: 'Perfect for solo travelers, our cozy single room offers comfort and convenience without breaking the bank.',
    capacity: 1,
    size: 20,
    amenities: ['Free WiFi', 'Flat-screen TV', 'Air conditioning', 'Safe', 'Hairdryer'],
    images: [
      'https://images.unsplash.com/photo-1587985064135-0366536eab42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      'https://images.unsplash.com/photo-1541123603104-512919d6a96c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      'https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
    ],
    featured: false
  }
];

// Mock booking data
export const bookings: Booking[] = [
  {
    id: 'b1',
    roomId: '1',
    checkIn: new Date('2023-11-10'),
    checkOut: new Date('2023-11-15'),
    guests: 2,
    totalPrice: 1495,
    status: 'confirmed',
    guestName: 'John Doe',
    guestEmail: 'john@example.com',
    createdAt: new Date('2023-10-05')
  },
  {
    id: 'b2',
    roomId: '4',
    checkIn: new Date('2023-12-20'),
    checkOut: new Date('2023-12-27'),
    guests: 3,
    totalPrice: 2443,
    status: 'confirmed',
    guestName: 'Jane Smith',
    guestEmail: 'jane@example.com',
    createdAt: new Date('2023-09-15')
  }
];

// Helper functions to work with the mock data
export const getRoomById = (id: string): Room | undefined => {
  return rooms.find(room => room.id === id);
};

export const getFeaturedRooms = (): Room[] => {
  return rooms.filter(room => room.featured);
};

export const getBookingsByEmail = (email: string): Booking[] => {
  return bookings.filter(booking => booking.guestEmail.toLowerCase() === email.toLowerCase());
};

export const addBooking = (booking: Omit<Booking, 'id' | 'createdAt'>): Booking => {
  const newBooking: Booking = {
    ...booking,
    id: `b${bookings.length + 1}`,
    createdAt: new Date()
  };
  
  bookings.push(newBooking);
  return newBooking;
};

// Function to check if a room is available for a given date range
export const isRoomAvailable = (
  roomId: string, 
  checkIn: Date, 
  checkOut: Date
): boolean => {
  const roomBookings = bookings.filter(
    booking => booking.roomId === roomId && booking.status !== 'cancelled'
  );
  
  for (const booking of roomBookings) {
    // Check if there's any overlap with existing bookings
    if (
      (checkIn >= booking.checkIn && checkIn < booking.checkOut) ||
      (checkOut > booking.checkIn && checkOut <= booking.checkOut) ||
      (checkIn <= booking.checkIn && checkOut >= booking.checkOut)
    ) {
      return false;
    }
  }
  
  return true;
};

// Calculate dates between check-in and check-out
export const getDatesBetween = (start: Date, end: Date): Date[] => {
  const dateArray: Date[] = [];
  let currentDate = new Date(start);
  
  while (currentDate < end) {
    dateArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dateArray;
};

// Calculate the total price for a booking
export const calculateTotalPrice = (roomId: string, checkIn: Date, checkOut: Date): number => {
  const room = getRoomById(roomId);
  if (!room) return 0;
  
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  return room.price * nights;
};
