
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, User, BookOpen, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DepartmentCardProps {
  department: {
    id: number;
    name: string;
    building: string;
    headName: string;
    courses: number;
    openHours: string;
    image?: string;
    color?: string;
  };
  className?: string;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({ 
  department, 
  className 
}) => {
  // Generate a default gradient if no color is provided
  const defaultGradient = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
  const defaultColor = '#4facfe';
  
  return (
    <motion.div 
      className={cn(
        "bg-white rounded-lg shadow-subtle overflow-hidden h-full card-hover border border-border/30",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {/* Department header */}
      <div 
        className="p-6 text-white"
        style={{ 
          background: department.color 
            ? `linear-gradient(135deg, ${department.color} 0%, ${adjustColor(department.color, -20)} 100%)` 
            : defaultGradient,
        }}
      >
        <span className="inline-block text-xs font-medium uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full mb-2">
          Department
        </span>
        <h3 className="font-bold text-xl mb-1">{department.name}</h3>
        <div className="flex items-center text-sm text-white/80">
          <Building2 className="h-4 w-4 mr-1 flex-shrink-0" />
          <span>{department.building}</span>
        </div>
      </div>
      
      {/* Department content */}
      <div className="p-4">
        <div className="flex flex-col space-y-3 mb-4">
          <div className="flex items-center text-sm">
            <User className="h-4 w-4 mr-2 flex-shrink-0 text-muted-foreground" />
            <div>
              <span className="text-muted-foreground">Department Head:</span>
              <span className="font-medium ml-1">{department.headName}</span>
            </div>
          </div>
          
          <div className="flex items-center text-sm">
            <BookOpen className="h-4 w-4 mr-2 flex-shrink-0 text-muted-foreground" />
            <div>
              <span className="text-muted-foreground">Courses Offered:</span>
              <span className="font-medium ml-1">{department.courses}</span>
            </div>
          </div>
          
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0 text-muted-foreground" />
            <div>
              <span className="text-muted-foreground">Office Hours:</span>
              <span className="font-medium ml-1">{department.openHours}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <Link to={`/departments/${department.id}`}>
            <Button 
              className="w-full"
              style={{ 
                backgroundColor: department.color || defaultColor,
                '--tw-ring-color': department.color || defaultColor,
              } as React.CSSProperties}
            >
              View Department
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

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

export default DepartmentCard;
