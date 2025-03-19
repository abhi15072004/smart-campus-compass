
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

import Navbar from '@/components/Navbar';
import DepartmentCard from '@/components/DepartmentCard';
import AnimatedTransition from '@/components/AnimatedTransition';

// Mock departments data
const DEPARTMENTS = [
  {
    id: 1,
    name: 'Computer Science',
    building: 'Tech Building',
    headName: 'Dr. Sarah Johnson',
    courses: 24,
    openHours: 'Mon-Fri: 9:00 AM - 5:00 PM',
    color: '#4facfe',
  },
  {
    id: 2,
    name: 'Electrical Engineering',
    building: 'Engineering Block',
    headName: 'Prof. Michael Chen',
    courses: 18,
    openHours: 'Mon-Fri: 8:30 AM - 4:30 PM',
    color: '#7367f0',
  },
  {
    id: 3,
    name: 'Business Administration',
    building: 'Management Building',
    headName: 'Dr. Emily Rodriguez',
    courses: 22,
    openHours: 'Mon-Fri: 9:00 AM - 5:00 PM',
    color: '#38b2ac',
  },
  {
    id: 4,
    name: 'Physics',
    building: 'Science Block',
    headName: 'Prof. David Kim',
    courses: 16,
    openHours: 'Mon-Fri: 8:00 AM - 4:00 PM',
    color: '#6c5ce7',
  },
  {
    id: 5,
    name: 'Psychology',
    building: 'Humanities Building',
    headName: 'Dr. Jessica Wang',
    courses: 20,
    openHours: 'Mon-Fri: 9:00 AM - 4:30 PM',
    color: '#ff6b6b',
  },
  {
    id: 6,
    name: 'Mechanical Engineering',
    building: 'Engineering Block',
    headName: 'Prof. Robert Lee',
    courses: 19,
    openHours: 'Mon-Fri: 8:30 AM - 5:30 PM',
    color: '#ffa726',
  },
];

const Departments: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter departments based on search query
  const filteredDepartments = DEPARTMENTS.filter(dept => 
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.headName.toLowerCase().includes(searchQuery.toLowerCase())
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
            Academic Departments
          </motion.h1>
          
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore our various academic departments and learn about faculty, courses, and resources.
          </motion.p>
          
          {/* Search bar */}
          <motion.div 
            className="relative max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search departments..."
              className="pl-10 py-6"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </header>
        
        {/* Department cards */}
        <div className="grid-container py-8">
          {filteredDepartments.length > 0 ? (
            filteredDepartments.map((department, index) => (
              <motion.div
                key={department.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <DepartmentCard department={department} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No departments found matching your search.</p>
            </div>
          )}
        </div>
      </main>
    </AnimatedTransition>
  );
};

export default Departments;
