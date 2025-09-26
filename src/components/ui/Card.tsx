import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  selected?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  selected = false,
  onClick
}) => {
  return (
    <div
      className={cn(
        'border-2 rounded-lg p-2.5 cursor-pointer transition-all shadow-xl shadow--gray-200 duration-200 ease-in-out',
        'hover:shadow-md',
        selected 
          ? 'border-blue-500 bg-blue-50 shadow-sm ring-1 ring-blue-200' 
          : 'border-gray-200 bg-white hover:border-gray-300',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Alternative: If you want even more visual feedback, here's an enhanced version
// export const EnhancedCard: React.FC<CardProps> = ({
//   children,
//   className,
//   selected = false,
//   onClick
// }) => {
//   return (
//     <div
//       className={cn(
//         'border-2 rounded-lg p-6 transition-all duration-300 ease-in-out',
//         'transform hover:scale-[1.02] hover:shadow-lg',
//         selected 
//           ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-md ring-2 ring-blue-200 scale-[1.01]' 
//           : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/30',
//         onClick && 'cursor-pointer',
//         className
//       )}
//       onClick={onClick}
//     >
//       {children}
//     </div>
//   );
// };