import React from 'react';
import { Card } from '@/components/ui/Card';
import { PropertyTypeOption } from '@/lib/types';

interface PropertyTypeCardProps {
  propertyType: PropertyTypeOption;
  selected: boolean;
  onClick: () => void;
}

export const PropertyTypeCard: React.FC<PropertyTypeCardProps> = ({
  propertyType,
  selected,
  onClick
}) => {
  return (
    <Card selected={selected} onClick={onClick}>
      <div className="flex items-start space-x-4">
        {/* Icon with dynamic color based on selection */}
        <div className={`text-3xl transition-colors duration-200 ${
          selected ? 'text-blue-500' : 'text-gray-600'
        }`}>
          {React.createElement(propertyType.icon, {
            style: { 
              fontSize: 32,
              color: selected ? '#3b82f6' : '#6b7280'
            }
          })}
        </div>
                
        <div className="flex-1">
          {/* Title with dynamic color based on selection */}
          <h3 className={`text-lg font-semibold mb-2 transition-colors duration-200 ${
            selected ? 'text-blue-900' : 'text-gray-900'
          }`}>
            {propertyType.title}
          </h3>
                    
          {/* Description stays gray for readability */}
          <p className="text-gray-600 leading-relaxed">
            {propertyType.description}
          </p>
        </div>
      </div>
    </Card>
  );
};