
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Building, Coffee, Book, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock campus data
const CAMPUS_BUILDINGS = [
  { id: 1, name: 'Main Building', type: 'academic', x: 50, y: 30, icon: Building },
  { id: 2, name: 'Science Block', type: 'academic', x: 30, y: 60, icon: Building },
  { id: 3, name: 'Library', type: 'facility', x: 70, y: 40, icon: Book },
  { id: 4, name: 'Cafeteria', type: 'facility', x: 60, y: 70, icon: Coffee },
  { id: 5, name: 'Sports Complex', type: 'facility', x: 80, y: 80, icon: Dumbbell },
  { id: 6, name: 'Computer Science Dept', type: 'academic', x: 40, y: 20, icon: Building },
  { id: 7, name: 'Student Center', type: 'facility', x: 55, y: 50, icon: Building },
];

interface MapPinProps {
  building: typeof CAMPUS_BUILDINGS[0];
  isSelected: boolean;
  onClick: () => void;
}

const MapPinComponent: React.FC<MapPinProps> = ({ building, isSelected, onClick }) => {
  const IconComponent = building.icon;
  
  return (
    <motion.div
      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${building.x}%`, top: `${building.y}%` }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: building.id * 0.1, duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
    >
      <div className={cn(
        "flex flex-col items-center",
        isSelected && "z-10"
      )}>
        <div className={cn(
          "rounded-full p-2 transition-all",
          isSelected ? "bg-primary text-white shadow-lg" : "bg-white text-primary shadow-sm",
          building.type === 'academic' ? "border-blue-500" : "border-emerald-500",
          isSelected && "animate-pulse-shadow"
        )}>
          <IconComponent className="h-5 w-5" />
        </div>
        
        {isSelected && (
          <motion.div 
            className="mt-1 px-2 py-1 bg-white rounded-md shadow-md text-xs font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {building.name}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [selectedBuilding, setSelectedBuilding] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{ x: number, y: number } | null>(null);

  // Simulate user location (in a real app, this would use geolocation)
  useEffect(() => {
    // Simulate moving user
    const interval = setInterval(() => {
      setUserLocation(prev => {
        if (!prev) return { x: 45, y: 45 };
        
        const newX = prev.x + (Math.random() - 0.5) * 0.5;
        const newY = prev.y + (Math.random() - 0.5) * 0.5;
        
        return {
          x: Math.max(0, Math.min(100, newX)),
          y: Math.max(0, Math.min(100, newY))
        };
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Handle map zoom
  const handleZoom = (direction: 'in' | 'out') => {
    setScale(prevScale => {
      if (direction === 'in' && prevScale < 2) return prevScale + 0.1;
      if (direction === 'out' && prevScale > 0.5) return prevScale - 0.1;
      return prevScale;
    });
  };

  // Handle map reset
  const resetMap = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Handle map drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - startPosition.x,
      y: e.clientY - startPosition.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setStartPosition({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - startPosition.x,
      y: touch.clientY - startPosition.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-blue-50/30 rounded-lg">
      {/* Map container with drag controls */}
      <div 
        ref={mapRef}
        className={cn(
          "relative w-full h-full cursor-grab overflow-hidden",
          isDragging && "cursor-grabbing"
        )}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Map content */}
        <div
          className="absolute inset-0 transition-transform duration-200 ease-out"
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center',
            backgroundImage: "url('/campus-map-bg.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Background grid for visual effect */}
          <div className="absolute inset-0 w-full h-full" style={{
            backgroundImage: "linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }} />
          
          {/* Map buildings */}
          {CAMPUS_BUILDINGS.map((building) => (
            <MapPinComponent
              key={building.id}
              building={building}
              isSelected={selectedBuilding === building.id}
              onClick={() => setSelectedBuilding(building.id)}
            />
          ))}
          
          {/* User location indicator */}
          {userLocation && (
            <motion.div
              className="absolute z-10"
              style={{ 
                left: `${userLocation.x}%`, 
                top: `${userLocation.y}%`,
                transform: 'translate(-50%, -50%)' 
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping" style={{ width: 30, height: 30 }} />
                <div className="relative z-10 bg-primary rounded-full p-1.5">
                  <Navigation className="h-4 w-4 text-white" />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Map controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button
          variant="secondary"
          size="icon"
          className="bg-white/80 backdrop-blur-sm shadow-md"
          onClick={() => handleZoom('in')}
        >
          <span className="text-xl font-bold">+</span>
        </Button>
        
        <Button
          variant="secondary"
          size="icon"
          className="bg-white/80 backdrop-blur-sm shadow-md"
          onClick={() => handleZoom('out')}
        >
          <span className="text-xl font-bold">-</span>
        </Button>
        
        <Button
          variant="secondary"
          size="icon"
          className="bg-white/80 backdrop-blur-sm shadow-md"
          onClick={resetMap}
        >
          <MapPin className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Building information card */}
      {selectedBuilding && (
        <motion.div
          className="absolute bottom-4 left-4 max-w-xs glass rounded-lg shadow-elevation p-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {(() => {
                const building = CAMPUS_BUILDINGS.find(b => b.id === selectedBuilding);
                const IconComponent = building?.icon || Building;
                return <IconComponent className="h-5 w-5 text-primary" />;
              })()}
              <h3 className="font-semibold">
                {CAMPUS_BUILDINGS.find(b => b.id === selectedBuilding)?.name}
              </h3>
            </div>
            
            <p className="text-sm text-muted-foreground">
              {selectedBuilding === 1 
                ? "Main administrative building. Houses the principal's office, administrative departments, and several classrooms."
                : "Tap the navigation button to get directions to this location."}
            </p>
            
            <div className="flex gap-2 mt-2">
              <Button className="w-full" size="sm">
                <Navigation className="mr-2 h-4 w-4" />
                Navigate
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setSelectedBuilding(null)}>
                Close
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Map;
