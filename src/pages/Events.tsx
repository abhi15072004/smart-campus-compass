
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, Calendar, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Navbar from '@/components/Navbar';
import EventCard from '@/components/EventCard';
import AnimatedTransition from '@/components/AnimatedTransition';

// Mock events data
const EVENTS = [
  {
    id: 1,
    title: 'Annual Tech Symposium 2023',
    date: 'October 15, 2023',
    time: '10:00 AM - 4:00 PM',
    location: 'Main Auditorium',
    category: 'Conference',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 2,
    title: 'Freshman Orientation',
    date: 'September 5, 2023',
    time: '9:00 AM - 12:00 PM',
    location: 'Student Center',
    category: 'Orientation',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 3,
    title: 'Career Fair - Fall 2023',
    date: 'November 10, 2023',
    time: '11:00 AM - 3:00 PM',
    location: 'Sports Complex',
    category: 'Career',
    image: 'https://images.unsplash.com/photo-1560439514-4e9645039924?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 4,
    title: 'Research Showcase',
    date: 'December 8, 2023',
    time: '2:00 PM - 6:00 PM',
    location: 'Science Building Atrium',
    category: 'Academic',
    image: 'https://images.unsplash.com/photo-1576615278542-f22ce6002b3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 5,
    title: 'Student Film Festival',
    date: 'October 22, 2023',
    time: '6:00 PM - 9:00 PM',
    location: 'Arts Center',
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 6,
    title: 'Alumni Homecoming',
    date: 'November 18, 2023',
    time: '5:00 PM - 10:00 PM',
    location: 'Main Campus Quad',
    category: 'Social',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
];

const Events: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter events based on search query
  const filteredEvents = EVENTS.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <AnimatedTransition className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <header className="py-10 text-center">
          <motion.h1 
            className="text-3xl sm:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Campus Events
          </motion.h1>
          
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Stay updated with the latest events, workshops, and activities happening on campus.
          </motion.p>
          
          {/* Search and filter */}
          <motion.div 
            className="relative max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search events..."
              className="pl-10 py-6"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </header>
        
        {/* Events tabs */}
        <Tabs defaultValue="all" className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="career">Career</TabsTrigger>
            </TabsList>
            
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid-container py-4">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No events found matching your search.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="academic" className="mt-0">
            <div className="grid-container py-4">
              {filteredEvents
                .filter(event => ['Academic', 'Conference'].includes(event.category))
                .map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="social" className="mt-0">
            <div className="grid-container py-4">
              {filteredEvents
                .filter(event => ['Social', 'Cultural'].includes(event.category))
                .map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="career" className="mt-0">
            <div className="grid-container py-4">
              {filteredEvents
                .filter(event => ['Career'].includes(event.category))
                .map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Upcoming calendar section */}
        <section className="mt-16">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Upcoming This Month</h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-subtle border border-border/30 overflow-hidden p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredEvents.slice(0, 4).map((event, index) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  variant="horizontal" 
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </AnimatedTransition>
  );
};

export default Events;
