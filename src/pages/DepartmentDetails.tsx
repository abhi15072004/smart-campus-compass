
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Clock, 
  BookOpen,
  Calendar,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';

// Mock department data
const DEPARTMENTS = [
  {
    id: '1',
    name: 'Computer Science',
    building: 'Tech Building, 3rd Floor',
    headName: 'Dr. Sarah Johnson',
    email: 'cs@example.edu',
    phone: '(555) 123-4567',
    courses: 24,
    openHours: 'Mon-Fri: 9:00 AM - 5:00 PM',
    color: '#4facfe',
    description: 'The Department of Computer Science is dedicated to providing students with a comprehensive education in theoretical and applied computer science. Our curriculum emphasizes problem-solving, critical thinking, and hands-on experience with cutting-edge technologies.',
    faculty: [
      { id: 1, name: 'Dr. Sarah Johnson', position: 'Department Head', specialization: 'Artificial Intelligence' },
      { id: 2, name: 'Prof. Michael Chen', position: 'Associate Professor', specialization: 'Cybersecurity' },
      { id: 3, name: 'Dr. Emily Rodriguez', position: 'Assistant Professor', specialization: 'Machine Learning' },
      { id: 4, name: 'Prof. David Kim', position: 'Lecturer', specialization: 'Software Engineering' },
    ],
    courses: [
      { id: 101, code: 'CS101', name: 'Introduction to Programming', credits: 3 },
      { id: 102, code: 'CS201', name: 'Data Structures and Algorithms', credits: 4 },
      { id: 103, code: 'CS301', name: 'Database Systems', credits: 3 },
      { id: 104, code: 'CS401', name: 'Artificial Intelligence', credits: 4 },
      { id: 105, code: 'CS451', name: 'Computer Networks', credits: 3 },
    ],
    events: [
      { id: 201, name: 'Tech Symposium', date: 'October 15, 2023', time: '10:00 AM - 4:00 PM' },
      { id: 202, name: 'Coding Competition', date: 'November 5, 2023', time: '9:00 AM - 6:00 PM' },
    ]
  },
  // More departments would be defined here...
];

const DepartmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the department with the matching ID
  const department = DEPARTMENTS.find(dept => dept.id === id);
  
  // If department not found, show error
  if (!department) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Department Not Found</h1>
        <Link to="/departments">
          <Button>Go Back to Departments</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <AnimatedTransition className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <Link to="/departments">
            <Button variant="ghost" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Departments
            </Button>
          </Link>
        </div>
        
        {/* Department header */}
        <header 
          className="p-8 rounded-lg text-white mb-8"
          style={{ 
            background: `linear-gradient(135deg, ${department.color} 0%, ${adjustColor(department.color, -20)} 100%)`,
          }}
        >
          <div className="max-w-4xl mx-auto">
            <span className="inline-block text-xs font-medium uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full mb-2">
              Department
            </span>
            <h1 className="text-3xl font-bold mb-4">{department.name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex items-center text-white/90">
                <Building2 className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{department.building}</span>
              </div>
              
              <div className="flex items-center text-white/90">
                <User className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{department.headName}</span>
              </div>
              
              <div className="flex items-center text-white/90">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{department.email}</span>
              </div>
              
              <div className="flex items-center text-white/90">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{department.phone}</span>
              </div>
              
              <div className="flex items-center text-white/90">
                <BookOpen className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{department.courses.length} Courses Offered</span>
              </div>
              
              <div className="flex items-center text-white/90">
                <Clock className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{department.openHours}</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Department content */}
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="faculty">Faculty</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-subtle border border-border/30">
                <h2 className="text-xl font-semibold mb-4">About the Department</h2>
                <p className="text-muted-foreground">{department.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-subtle border border-border/30">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-700 mr-3">
                      <Bookmark className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">Resources</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="text-sm text-muted-foreground">Computer Labs: 4</li>
                    <li className="text-sm text-muted-foreground">Research Facilities: 2</li>
                    <li className="text-sm text-muted-foreground">Student Study Areas: 3</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-subtle border border-border/30">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-full bg-green-100 text-green-700 mr-3">
                      <Graduation className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">Programs</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="text-sm text-muted-foreground">B.Sc. Computer Science</li>
                    <li className="text-sm text-muted-foreground">M.Sc. Computer Science</li>
                    <li className="text-sm text-muted-foreground">Ph.D. Computer Science</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="faculty">
              <div className="bg-white rounded-lg shadow-subtle border border-border/30 overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">Faculty Members</h2>
                  <p className="text-sm text-muted-foreground">Meet our dedicated team of professors and instructors</p>
                </div>
                
                <div className="divide-y">
                  {department.faculty.map((faculty) => (
                    <div key={faculty.id} className="p-6 hover:bg-muted/20 transition-colors">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                          <User className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{faculty.name}</h3>
                          <p className="text-sm text-muted-foreground">{faculty.position}</p>
                          <p className="text-sm mt-1">Specialization: {faculty.specialization}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="courses">
              <div className="bg-white rounded-lg shadow-subtle border border-border/30 overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">Courses Offered</h2>
                  <p className="text-sm text-muted-foreground">Current courses available in this department</p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/30">
                      <tr className="text-left">
                        <th className="p-4 font-medium">Code</th>
                        <th className="p-4 font-medium">Course Name</th>
                        <th className="p-4 font-medium text-right">Credits</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {department.courses.map((course) => (
                        <tr key={course.id} className="hover:bg-muted/20 transition-colors">
                          <td className="p-4 font-medium">{course.code}</td>
                          <td className="p-4">{course.name}</td>
                          <td className="p-4 text-right">{course.credits}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="events">
              <div className="bg-white rounded-lg shadow-subtle border border-border/30 overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">Upcoming Department Events</h2>
                  <p className="text-sm text-muted-foreground">Stay updated with department activities</p>
                </div>
                
                <div className="divide-y">
                  {department.events.map((event) => (
                    <div key={event.id} className="p-6 hover:bg-muted/20 transition-colors">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                          <Calendar className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{event.name}</h3>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                          <p className="text-sm text-muted-foreground">{event.time}</p>
                          <Button className="mt-2" size="sm">Add to Calendar</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </AnimatedTransition>
  );
};

// Helper components
const Bookmark = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
  </svg>
);

const Graduation = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
  </svg>
);

// Helper function to adjust color brightness
function adjustColor(color: string, amount: number): string {
  // Remove # if present
  color = color.replace('#', '');
  
  // Parse the color
  const R = parseInt(color.substring(0, 2), 16);
  const G = parseInt(color.substring(2, 4), 16);
  const B = parseInt(color.substring(4, 6), 16);
  
  // Adjust the color
  const newR = Math.max(0, Math.min(255, R + amount));
  const newG = Math.max(0, Math.min(255, G + amount));
  const newB = Math.max(0, Math.min(255, B + amount));
  
  // Convert back to hex
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

export default DepartmentDetails;
