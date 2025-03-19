
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EventCardProps {
  event: {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    image?: string;
    category: string;
  };
  variant?: 'default' | 'horizontal';
  className?: string;
}

export const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  variant = 'default',
  className
}) => {
  const isHorizontal = variant === 'horizontal';
  
  return (
    <motion.div 
      className={cn(
        "bg-white rounded-lg shadow-subtle overflow-hidden card-hover border border-border/30",
        isHorizontal ? "flex" : "flex flex-col",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {/* Event image */}
      <div 
        className={cn(
          "relative overflow-hidden bg-gray-100",
          isHorizontal ? "w-1/3" : "w-full pt-[56.25%]" // 16:9 aspect ratio
        )}
        style={isHorizontal ? { aspectRatio: '1/1' } : {}}
      >
        <div 
          className={cn(
            "absolute inset-0 bg-cover bg-center",
            !isHorizontal && "top-0 left-0 right-0 bottom-0"
          )}
          style={{ 
            backgroundImage: event.image 
              ? `url(${event.image})` 
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}
        />
        
        {/* Category label */}
        <div className="absolute top-2 left-2">
          <span className="chip chip-primary">
            {event.category}
          </span>
        </div>
      </div>
      
      {/* Event content */}
      <div className={cn(
        "flex flex-col p-4",
        isHorizontal ? "w-2/3" : "w-full"
      )}>
        <h3 className="font-bold text-lg line-clamp-2 mb-2">{event.title}</h3>
        
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{event.date}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>
        
        <div className="mt-auto flex space-x-2">
          <Button className="flex-1" size="sm">
            Add to Calendar
          </Button>
          <Button variant="outline" size="sm">
            Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
