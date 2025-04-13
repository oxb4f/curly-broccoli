import { useEffect, useState } from 'react';
import formatDate from '../../../utils/formatDate';
import { StarIcon } from '@heroicons/react/24/outline';

const Rating = ({ initialRating = 3, legendText, maxStars = 5, step = 1, className = '' }) => {
  const [rating, setRating] = useState(initialRating);
  console.log();
  const ratingArray = Array.from({ length: maxStars }, (v, k) => maxStars - k);
  return (
    <fieldset className="size-fit" style={{ '--hovered-rating': 0 }}>
      {legendText && <legend>{legendText}</legend>}
      <div className={`flex flex-row-reverse gap-1 ${className}`}>
        {ratingArray.map((ratingValue) => (
          <label
            key={ratingValue}
            className={`relative cursor-pointer [&:hover ~ label .star]:fill-pr-rating`}
            data-rating={ratingValue}
          >
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              className="absolute inset-0 opacity-0"
              onChange={() => setRating(ratingValue)}
            />
            <span className="absolute inset-0 opacity-0">{ratingValue}</span>
            <StarIcon
              className={`star size-6 text-pr-text ${
                ratingValue <= rating ? 'fill-pr-rating text-pr-rating' : ''
              }`}
            />
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default Rating;
