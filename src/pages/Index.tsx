
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bookmark, Clock, Navigation2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

import Navbar from '@/components/Navbar';
import Map from '@/components/Map';
import SearchBar from '@/components/SearchBar';
import EventCard from '@/components/EventCard';
import AnimatedTransition from '@/components/AnimatedTransition';

// Sample upcoming events
const UPCOMING_EVENTS = [
  {
    id: 1,
    title: 'Annual Tech Symposium 2023',
    date: 'October 15, 2023',
    time: '10:00 AM - 4:00 PM',
    location: 'Main Auditorium',
    category: 'Conference',
  },
  {
    id: 2,
    title: 'Freshman Orientation',
    date: 'September 5, 2023',
    time: '9:00 AM - 12:00 PM',
    location: 'Student Center',
    category: 'Orientation',
  }
];

// Quick links for navigation
const QUICK_LINKS = [
  {
    title: 'Library',
    icon: <Bookmark className="h-5 w-5" />,
    color: 'bg-amber-500',
  },
  {
    title: 'Cafeteria',
    icon: <Clock className="h-5 w-5" />,
    color: 'bg-emerald-500',
  },
  {
    title: 'Student Center',
    icon: <Navigation2 className="h-5 w-5" />,
    color: 'bg-blue-500',
  }
];

const Index: React.FC = () => {
  return (
    <AnimatedTransition className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero section */}
        <section className="pt-8 sm:pt-12 md:pt-16 pb-8">
          <div className="flex flex-col items-center text-center mb-8">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Smart Campus Navigator
            </motion.h1>
            
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discover, navigate, and explore your campus with ease. Find classrooms, events, and services in one place.
            </motion.p>
            
            <SearchBar className="w-full max-w-2xl" />
          </div>
          
          {/* Quick links */}
          <div className="grid grid-cols-3 gap-3 my-6 max-w-md mx-auto">
            {QUICK_LINKS.map((link, index) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Button 
                  variant="outline" 
                  className="w-full h-auto flex flex-col items-center py-4 border border-border/50 bg-white shadow-subtle hover:shadow-elevation hover:border-primary/30"
                >
                  <div className={cn("p-2 rounded-full text-white mb-2", link.color)}>
                    {link.icon}
                  </div>
                  <span className="text-sm font-medium">{link.title}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Map section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Campus Map</h2>
            <Button variant="ghost" size="sm" className="text-primary flex items-center">
              View full map
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow-subtle border border-border/30 overflow-hidden h-[60vh]">
            <Map />
          </div>
        </section>
        
        {/* Upcoming events section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            <Link to="/events">
              <Button variant="ghost" size="sm" className="text-primary flex items-center">
                View all events
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {UPCOMING_EVENTS.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      </main>
    </AnimatedTransition>
  );
};

export default Index;
