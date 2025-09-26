import React from 'react';
import { Info, Check, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const alertVariants = {
  info: {
    container: 'bg-blue-50 border-blue-200 text-blue-800',
    icon: Info,
    iconBg: 'bg-blue-600'
  },
  success: {
    container: 'bg-green-50 border-green-200 text-green-800',
    icon: Check,
    iconBg: 'bg-green-600'
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    icon: AlertTriangle,
    iconBg: 'bg-yellow-600'
  },
  error: {
    container: 'bg-red-50 border-red-200 text-red-800',
    icon: X,
    iconBg: 'bg-red-600'
  }
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  className
}) => {
  const { container, icon: Icon, iconBg } = alertVariants[variant];

  return (
    <div className={cn('border rounded-lg p-4', container, className)}>
      <div className="flex items-start space-x-3">
        <div className={cn('w-5 h-5 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5', iconBg)}>
          <Icon className="w-3 h-3" />
        </div>
        <div className="flex-1">
          {title && (
            <h3 className="font-semibold mb-1">{title}</h3>
          )}
          <div className="text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};