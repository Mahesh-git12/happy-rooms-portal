
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BedDouble, Calendar, User, Menu, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-4 border-b shadow-sm bg-white">
        <div className="hotel-container">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BedDouble className="h-8 w-8 text-hotel-700" />
              <span className="text-2xl font-serif font-bold text-hotel-950">Mahesh Hotels</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-hotel-700 transition-colors font-medium">
                Home
              </Link>
              <Link to="/rooms" className="text-gray-700 hover:text-hotel-700 transition-colors font-medium">
                Rooms
              </Link>
              <Link to="/bookings" className="text-gray-700 hover:text-hotel-700 transition-colors font-medium">
                My Bookings
              </Link>
              <Button variant="outline" className="border-hotel-700 text-hotel-700 hover:bg-hotel-50" onClick={handleLoginClick}>
                <User className="mr-2 h-4 w-4" /> Login
              </Button>
            </nav>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-md text-gray-700"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 space-y-4 pb-4 animate-fade-in">
              <Link 
                to="/" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/rooms" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Rooms
              </Link>
              <Link 
                to="/bookings" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Bookings
              </Link>
              <Button variant="outline" className="w-full justify-start border-hotel-700 text-hotel-700 hover:bg-hotel-50" onClick={handleLoginClick}>
                <User className="mr-2 h-4 w-4" /> Login
              </Button>
            </nav>
          )}
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="py-8 bg-gray-100 border-t">
        <div className="hotel-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Mahesh Hotels</h3>
              <p className="text-gray-600">
                The perfect stay for your perfect holiday. Luxury comfort at affordable prices.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-600 hover:text-hotel-700">Home</Link></li>
                <li><Link to="/rooms" className="text-gray-600 hover:text-hotel-700">Rooms</Link></li>
                <li><Link to="/bookings" className="text-gray-600 hover:text-hotel-700">My Bookings</Link></li>
                <li><Link to="/login" className="text-gray-600 hover:text-hotel-700">Login</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <address className="not-italic text-gray-600">
                <p>Church Street</p>
                <p>Bangalore, 560001</p>
                <p>Email: info@maheshhotels.com</p>
                <p>Phone: +91 7075028858</p>
              </address>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-500">
              © {new Date().getFullYear()} Mahesh Hotels. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
