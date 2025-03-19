
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Map, 
  Building2, 
  Calendar, 
  Utensils, 
  Bell, 
  Menu, 
  X,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: 'Map', path: '/', icon: Map },
  { name: 'Departments', path: '/departments', icon: Building2 },
  { name: 'Events', path: '/events', icon: Calendar },
  { name: 'Services', path: '/services', icon: Utensils },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 sm:px-6 lg:px-8",
        isScrolled 
          ? "py-2 glass shadow-subtle" 
          : "py-4 bg-transparent"
      )}
    >
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Map className="h-8 w-8 text-primary" />
          </motion.div>
          <motion.span 
            className="font-bold text-xl tracking-tight"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Campus<span className="text-primary">Navigator</span>
          </motion.span>
        </Link>

        {/* Desktop navigation */}
        {!isMobile && (
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.name} to={item.path}>
                  <Button 
                    variant={isActive ? "default" : "ghost"} 
                    size="sm"
                    className={cn(
                      "gap-2 font-medium",
                      isActive 
                        ? "bg-primary/10 text-primary hover:bg-primary/20" 
                        : "hover:bg-secondary"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-primary" />
          </Button>
          
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>

          {/* Mobile menu toggle */}
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </nav>

      {/* Mobile navigation menu */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass mt-2 rounded-lg p-4 overflow-hidden"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.name} to={item.path}>
                    <Button 
                      variant={isActive ? "default" : "ghost"} 
                      className={cn(
                        "w-full justify-start gap-2",
                        isActive 
                          ? "bg-primary/10 text-primary hover:bg-primary/20" 
                          : "hover:bg-secondary"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
