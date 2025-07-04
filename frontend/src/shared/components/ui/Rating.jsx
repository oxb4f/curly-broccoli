import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/outline';

const Rating = ({
  initialRating,
  headerText,
  onChange,
  maxStars = 5,
  isRow = true,
  className = ''
}) => {
  const [rating, setRating] = useState(initialRating);
  const ratingArray = Array.from({ length: maxStars }, (v, k) => maxStars - k);

  const handleChange = (value) => {
    setRating(value);
    onChange?.(value);
  };

  return (
    <div className={className}>
      {headerText && <h3>{headerText}</h3>}
      <div className={`flex ${isRow ? 'flex-row-reverse' : 'flex-col-reverse'}`}>
        {ratingArray.map((ratingValue) => (
          <label
            key={ratingValue}
            className={`relative px-0.5 cursor-pointer
              [&:hover>*]:text-transparent [&:hover>*]:fill-pr-rating-mute 
              [&:hover~label>*]:text-transparent [&:hover~label>*]:fill-pr-rating-mute`}
          >
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              className="screen-reader-only peer"
              onChange={() => handleChange(ratingValue)}
            />
            <span className="screen-reader-only">{ratingValue}</span>
            <StarIcon
              className={`size-6 peer-focus:!text-pr-text  ${
                ratingValue <= rating ? 'fill-pr-rating text-pr-rating' : 'text-pr-text'
              }`}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default Rating;
