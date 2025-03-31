import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Users, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Room, calculateTotalPrice, isRoomAvailable, addBooking } from '@/data/mockData';

interface BookingFormProps {
  room: Room;
  onSuccess: (bookingId: string) => void;
}

const bookingSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  guests: z.number().min(1).max(10),
  checkIn: z.date({
    required_error: "Check-in date is required",
  }),
  checkOut: z.date({
    required_error: "Check-out date is required",
  }),
}).refine(data => data.checkOut > data.checkIn, {
  message: "Check-out date must be after check-in date",
  path: ["checkOut"],
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const BookingForm: React.FC<BookingFormProps> = ({ room, onSuccess }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      guests: 1,
      checkIn: undefined,
      checkOut: undefined,
    },
  });
  
  const watchCheckIn = form.watch("checkIn");
  const watchCheckOut = form.watch("checkOut");
  
  // Update total price when dates change
  React.useEffect(() => {
    if (watchCheckIn && watchCheckOut) {
      const price = calculateTotalPrice(room.id, watchCheckIn, watchCheckOut);
      setTotalPrice(price);
    } else {
      setTotalPrice(null);
    }
  }, [watchCheckIn, watchCheckOut, room.id]);
  
  function onSubmit(data: BookingFormValues) {
    setIsSubmitting(true);
    
    // Check if the room is available for the selected dates
    if (!isRoomAvailable(room.id, data.checkIn, data.checkOut)) {
      toast({
        title: "Room not available",
        description: "The room is not available for the selected dates. Please choose different dates.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    // Calculate the total price
    const total = calculateTotalPrice(room.id, data.checkIn, data.checkOut);
    
    // Create booking
    try {
      const booking = addBooking({
        roomId: room.id,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        guests: data.guests,
        totalPrice: total,
        status: 'confirmed',
        guestName: data.name,
        guestEmail: data.email,
      });
      
      toast({
        title: "Booking Confirmed!",
        description: `Your booking for ${room.name} has been confirmed.`,
      });
      
      onSuccess(booking.id);
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  // Get tomorrow's date for min check-in
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Get min check-out date (day after selected check-in or tomorrow)
  const minCheckOut = watchCheckIn ? new Date(watchCheckIn) : new Date(tomorrow);
  minCheckOut.setDate(minCheckOut.getDate() + 1);
  
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="bg-hotel-50">
        <CardTitle>Book Your Stay</CardTitle>
        <CardDescription>
          Fill out the form below to book {room.name}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="guests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Guests</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-gray-500" />
                      <Input 
                        type="number" 
                        min={1} 
                        max={room.capacity} 
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value))}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="checkIn"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Check-in Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < tomorrow}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="checkOut"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Check-out Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < minCheckOut}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {totalPrice && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h3 className="font-semibold mb-2">Price Summary</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">
                    ₹{room.price} x {Math.ceil((watchCheckOut.getTime() - watchCheckIn.getTime()) / (1000 * 60 * 60 * 24))} nights
                  </span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="border-t pt-2 font-bold flex justify-between">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>
            )}
            
            <Button type="submit" className="w-full bg-hotel-700 hover:bg-hotel-800" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Confirm Booking"}
              <CreditCard className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardContent>
      
      <CardFooter className="bg-gray-50 flex flex-col items-start text-sm text-gray-500">
        <p>
          <span className="font-semibold">Cancellation Policy:</span> Free cancellation up to 24 hours before check-in.
        </p>
      </CardFooter>
    </Card>
  );
};

export default BookingForm;
