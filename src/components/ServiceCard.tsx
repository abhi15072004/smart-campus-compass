
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  service: {
    id: number;
    name: string;
    description: string;
    hours: string;
    location: string;
    contact: string;
    icon: React.ReactNode;
    color?: string;
  };
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  className 
}) => {
  return (
    <motion.div 
      className={cn(
        "bg-white rounded-lg shadow-subtle overflow-hidden card-hover h-full border border-border/30",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="p-6">
        {/* Icon and title */}
        <div className="flex items-center mb-4">
          <div 
            className="p-3 rounded-lg mr-4 text-white"
            style={{ backgroundColor: service.color || '#3b82f6' }}
          >
            {service.icon}
          </div>
          <h3 className="font-bold text-lg">{service.name}</h3>
        </div>
        
        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {service.description}
        </p>
        
        {/* Service details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0 text-muted-foreground" />
            <span>{service.hours}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-muted-foreground" />
            <span>{service.location}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 mr-2 flex-shrink-0 text-muted-foreground" />
            <span>{service.contact}</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="mt-4 flex space-x-2">
          <Button className="flex-1">Locate</Button>
          <Button variant="outline">Details</Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
