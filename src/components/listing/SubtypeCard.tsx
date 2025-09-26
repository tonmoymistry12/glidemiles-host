import React from 'react';
import { Card } from '@/components/ui/Card';
import { PropertySubtype } from '@/lib/types';

interface SubtypeCardProps {
  subtype: PropertySubtype;
  selected: boolean;
  onClick: () => void;
}

export const SubtypeCard: React.FC<SubtypeCardProps> = ({
  subtype,
  selected,
  onClick
}) => {
  return (
    <Card 
      selected={selected} 
      onClick={onClick}
      className="h-full aspect-square"
    >
      <div className="flex flex-col items-center justify-center h-full text-center">
        {/* Icon container with background color change */}
        <div className={`w-10 h-10 rounded-lg mb-3 flex items-center justify-center transition-colors duration-200 ${
          selected ? 'bg-blue-100' : 'bg-gray-100'
        }`}>
          {React.createElement(subtype.icon, {
            style: { 
              fontSize: 20,
              color: selected ? '#2563eb' : '#6b7280'
            }
          })}
        </div>
                
        {/* Title with dynamic color */}
        <h4 className={`text-sm font-semibold mb-2 transition-colors duration-200 ${
          selected ? 'text-blue-900' : 'text-gray-900'
        }`}>
          {subtype.title}
        </h4>
                
        <p className="text-xs text-gray-600 leading-relaxed">
          {subtype.description}
        </p>
      </div>
    </Card>
  );
};