import React from 'react';
import styles from './FormSection.module.scss';

interface FormSectionProps {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  className = ''
}) => {
  return (
    <div className={`${styles.formSection} ${className}`}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      {description && (
        <p className={styles.sectionDescription}>{description}</p>
      )}
      {children}
    </div>
  );
};
