
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Book, 
  Utensils, 
  Dumbbell, 
  Bus, 
  FirstAid, 
  Coffee,
  Wifi,
  Printer,
  Droplet,
  ParkingSquare
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import ServiceCard from '@/components/ServiceCard';
import AnimatedTransition from '@/components/AnimatedTransition';

// Mock services data
const SERVICES = [
  {
    id: 1,
    name: 'Library',
    description: 'Our state-of-the-art library houses over 100,000 books, journals, and digital resources. It provides quiet study spaces, group study rooms, and computer workstations.',
    hours: 'Mon-Fri: 8:00 AM - 10:00 PM, Sat-Sun: 10:00 AM - 6:00 PM',
    location: 'Central Campus',
    contact: '(555) 123-4567',
    icon: <Book className="h-5 w-5" />,
    color: '#3b82f6',
  },
  {
    id: 2,
    name: 'Cafeteria',
    description: 'The main dining hall offers a variety of nutritious and delicious food options including vegetarian, vegan, and gluten-free meals. Meal plans are available for students.',
    hours: 'Mon-Fri: 7:00 AM - 8:00 PM, Sat-Sun: 8:00 AM - 7:00 PM',
    location: 'Student Center, Ground Floor',
    contact: '(555) 123-4568',
    icon: <Utensils className="h-5 w-5" />,
    color: '#ef4444',
  },
  {
    id: 3,
    name: 'Sports Complex',
    description: 'Our sports facilities include a gymnasium, swimming pool, tennis courts, and a fitness center with modern equipment. Personal trainers are available for assistance.',
    hours: 'Mon-Fri: 6:00 AM - 9:00 PM, Sat-Sun: 8:00 AM - 6:00 PM',
    location: 'East Campus',
    contact: '(555) 123-4569',
    icon: <Dumbbell className="h-5 w-5" />,
    color: '#22c55e',
  },
  {
    id: 4,
    name: 'Campus Shuttle',
    description: 'Free shuttle service connecting different parts of the campus and nearby off-campus housing areas. Shuttles run every 15 minutes during peak hours.',
    hours: 'Mon-Fri: 7:00 AM - 10:00 PM, Sat: 9:00 AM - 6:00 PM',
    location: 'Various Stops Around Campus',
    contact: '(555) 123-4570',
    icon: <Bus className="h-5 w-5" />,
    color: '#f59e0b',
  },
  {
    id: 5,
    name: 'Health Center',
    description: 'Provides primary healthcare services, mental health counseling, and wellness programs for all students. Emergency services are available during operating hours.',
    hours: 'Mon-Fri: 8:00 AM - 5:00 PM, Sat: 9:00 AM - 2:00 PM (Emergency Only)',
    location: 'Student Services Building, 1st Floor',
    contact: '(555) 123-4571',
    icon: <FirstAid className="h-5 w-5" />,
    color: '#ec4899',
  },
  {
    id: 6,
    name: 'Coffee Shop',
    description: 'A cozy spot to grab coffee, tea, and snacks while studying or meeting with friends. Features specialty coffee drinks and fresh pastries daily.',
    hours: 'Mon-Fri: 7:00 AM - 8:00 PM, Sat-Sun: 8:00 AM - 6:00 PM',
    location: 'Library Building, Ground Floor',
    contact: '(555) 123-4572',
    icon: <Coffee className="h-5 w-5" />,
    color: '#8b5cf6',
  },
  {
    id: 7,
    name: 'WiFi Network',
    description: 'High-speed wireless internet access available throughout the campus. Connect using your student credentials for secure access.',
    hours: '24/7',
    location: 'Campus-wide',
    contact: 'helpdesk@campus.edu',
    icon: <Wifi className="h-5 w-5" />,
    color: '#06b6d4',
  },
  {
    id: 8,
    name: 'Printing Services',
    description: 'Self-service and professional printing options available. Each student receives a printing allowance per semester.',
    hours: 'Mon-Fri: 8:00 AM - 8:00 PM, Sat: 10:00 AM - 4:00 PM',
    location: 'Library & Computer Labs',
    contact: '(555) 123-4573',
    icon: <Printer className="h-5 w-5" />,
    color: '#64748b',
  },
  {
    id: 9,
    name: 'Water Stations',
    description: 'Filtered water refill stations located throughout campus. Bring your reusable bottle and help reduce plastic waste.',
    hours: '24/7',
    location: 'All Academic Buildings & Dormitories',
    contact: 'facilities@campus.edu',
    icon: <Droplet className="h-5 w-5" />,
    color: '#0ea5e9',
  },
  {
    id: 10,
    name: 'Parking',
    description: 'Student and visitor parking available with valid permits. Electric vehicle charging stations available in select lots.',
    hours: '24/7 (Permit Required)',
    location: 'Multiple Lots Around Campus',
    contact: 'parking@campus.edu',
    icon: <ParkingSquare className="h-5 w-5" />,
    color: '#475569',
  },
];

// Group services by type
const SERVICE_CATEGORIES = [
  {
    title: 'Food & Dining',
    services: SERVICES.filter(service => 
      ['Cafeteria', 'Coffee Shop'].includes(service.name)
    ),
  },
  {
    title: 'Health & Wellness',
    services: SERVICES.filter(service => 
      ['Health Center', 'Sports Complex'].includes(service.name)
    ),
  },
  {
    title: 'Study & Resources',
    services: SERVICES.filter(service => 
      ['Library', 'Printing Services', 'WiFi Network'].includes(service.name)
    ),
  },
  {
    title: 'Campus Facilities',
    services: SERVICES.filter(service => 
      ['Campus Shuttle', 'Water Stations', 'Parking'].includes(service.name)
    ),
  },
];

const Services: React.FC = () => {
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
            Campus Services
          </motion.h1>
          
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover the various services and facilities available to make your campus life convenient and enjoyable.
          </motion.p>
        </header>
        
        {/* Service Categories */}
        {SERVICE_CATEGORIES.map((category, categoryIndex) => (
          <section key={category.title} className="my-12">
            <motion.h2 
              className="text-2xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
            >
              {category.title}
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.services.map((service, serviceIndex) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: categoryIndex * 0.1 + serviceIndex * 0.1 
                  }}
                >
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </div>
          </section>
        ))}
        
        {/* Emergency Services Highlight */}
        <section className="my-12">
          <motion.div 
            className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white p-6 sm:p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                <div className="bg-white/20 p-4 rounded-full">
                  <FirstAid className="h-12 w-12" />
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-2">Emergency Services</h3>
                <p className="mb-4">Campus security and emergency medical services are available 24/7. In case of emergency, please call the campus emergency number.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                    <p className="text-sm font-medium">Emergency Number</p>
                    <p className="text-xl font-bold">555-123-9111</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                    <p className="text-sm font-medium">Security Office</p>
                    <p className="text-xl font-bold">555-123-9222</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </AnimatedTransition>
  );
};

export default Services;
