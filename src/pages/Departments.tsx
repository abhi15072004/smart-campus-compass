
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

import Navbar from '@/components/Navbar';
import DepartmentCard from '@/components/DepartmentCard';
import AnimatedTransition from '@/components/AnimatedTransition';

// Mock departments data - structured for easier database migration
const DEPARTMENTS = [
  {
    id: 1,
    name: 'Computer Science',
    building_id: 1,
    building_name: 'Tech Building',
    head_id: 1,
    head_name: 'Dr. Sarah Johnson',
    head_email: 'sarah.johnson@example.edu',
    courses_count: 24,
    open_hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
    color: '#4facfe',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Electrical Engineering',
    building_id: 2,
    building_name: 'Engineering Block',
    head_id: 2,
    head_name: 'Prof. Michael Chen',
    head_email: 'michael.chen@example.edu',
    courses_count: 18,
    open_hours: 'Mon-Fri: 8:30 AM - 4:30 PM',
    color: '#7367f0',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 3,
    name: 'Business Administration',
    building_id: 3,
    building_name: 'Management Building',
    head_id: 3,
    head_name: 'Dr. Emily Rodriguez',
    head_email: 'emily.rodriguez@example.edu',
    courses_count: 22,
    open_hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
    color: '#38b2ac',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 4,
    name: 'Physics',
    building_id: 4,
    building_name: 'Science Block',
    head_id: 4,
    head_name: 'Prof. David Kim',
    head_email: 'david.kim@example.edu',
    courses_count: 16,
    open_hours: 'Mon-Fri: 8:00 AM - 4:00 PM',
    color: '#6c5ce7',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 5,
    name: 'Psychology',
    building_id: 5,
    building_name: 'Humanities Building',
    head_id: 5,
    head_name: 'Dr. Jessica Wang',
    head_email: 'jessica.wang@example.edu',
    courses_count: 20,
    open_hours: 'Mon-Fri: 9:00 AM - 4:30 PM',
    color: '#ff6b6b',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 6,
    name: 'Mechanical Engineering',
    building_id: 2,
    building_name: 'Engineering Block',
    head_id: 6,
    head_name: 'Prof. Robert Lee',
    head_email: 'robert.lee@example.edu',
    courses_count: 19,
    open_hours: 'Mon-Fri: 8:30 AM - 5:30 PM',
    color: '#ffa726',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
];

// Format department data for the DepartmentCard component
const formatDepartmentForDisplay = (dept: any) => {
  return {
    id: dept.id,
    name: dept.name,
    building: dept.building_name,
    headName: dept.head_name,
    courses: dept.courses_count,
    openHours: dept.open_hours,
    color: dept.color
  };
};

const Departments: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter departments based on search query
  const filteredDepartments = DEPARTMENTS.filter(dept => 
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.building_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.head_name.toLowerCase().includes(searchQuery.toLowerCase())
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
          {filteredDepartments.length > 0 ? (
            filteredDepartments.map((department, index) => (
              <motion.div
                key={department.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <DepartmentCard department={formatDepartmentForDisplay(department)} />
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
