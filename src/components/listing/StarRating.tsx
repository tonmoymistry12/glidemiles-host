import React from 'react';
import { Star } from 'lucide-react';
import styles from './StarRating.module.scss';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  maxStars?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRatingChange,
  maxStars = 5
}) => {
  return (
    <div className={styles.starRating}>
      {Array.from({ length: maxStars }, (_, index) => {
        const starNumber = index + 1;
        const isFilled = starNumber <= rating;
        
        return (
          <Star
            key={starNumber}
            className={`${styles.star} ${isFilled ? styles.filled : styles.empty}`}
            onClick={() => onRatingChange(starNumber)}
          />
        );
      })}
    </div>
  );
};
