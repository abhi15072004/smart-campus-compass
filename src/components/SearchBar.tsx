
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Mock search results
const SEARCH_ITEMS = [
  { id: 1, name: 'Main Building', type: 'building', icon: '🏛️' },
  { id: 2, name: 'Computer Science Department', type: 'department', icon: '💻' },
  { id: 3, name: 'Library', type: 'facility', icon: '📚' },
  { id: 4, name: 'Cafeteria', type: 'facility', icon: '🍽️' },
  { id: 5, name: 'Sports Complex', type: 'facility', icon: '🏀' },
  { id: 6, name: 'John Smith (Professor)', type: 'person', icon: '👨‍🏫' },
  { id: 7, name: 'College Annual Fest', type: 'event', icon: '🎉' },
];

interface SearchBarProps {
  className?: string;
  onSelect?: (item: typeof SEARCH_ITEMS[0]) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  className,
  onSelect = () => {}
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  // Filter search results based on query
  const filteredResults = searchQuery.trim() 
    ? SEARCH_ITEMS.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleClear = () => {
    setSearchQuery('');
  };

  const handleSelect = (item: typeof SEARCH_ITEMS[0]) => {
    onSelect(item);
    setSearchQuery('');
    setIsFocused(false);
  };

  return (
    <div className={cn("relative z-20", className)}>
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for buildings, departments, or events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="pl-10 pr-10 py-6 bg-white/90 backdrop-blur-sm shadow-sm rounded-full focus:ring-2 focus:ring-primary/30 transition-all"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
          <Search className="h-5 w-5" />
        </div>
        
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isFocused && filteredResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden z-20"
          >
            <div className="max-h-60 overflow-y-auto p-2">
              {filteredResults.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center p-2 hover:bg-secondary rounded-md cursor-pointer"
                  onClick={() => handleSelect(item)}
                >
                  <span className="text-lg mr-2">{item.icon}</span>
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Backdrop for closing search results */}
      {isFocused && filteredResults.length > 0 && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setIsFocused(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;
