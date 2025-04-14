import { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/24/outline';

const Rating = ({
  initialRating,
  legendText,
  onChange,
  maxStars = 5,
  isRow = true,
  className = ''
}) => {
  const [rating, setRating] = useState(initialRating);
  const ratingArray = Array.from({ length: maxStars }, (v, k) => maxStars - k);

  const handleChange = (value) => {
    console.log(value);

    setRating(value);
    onChange?.(value);
  };

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  return (
    <fieldset className={className}>
      {legendText && <legend>{legendText}</legend>}
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
    </fieldset>
  );
};

export default Rating;
