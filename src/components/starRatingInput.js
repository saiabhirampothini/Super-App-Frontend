import React from 'react';

const StarRatingInput = ({ rating, onRatingChange }) => {
  const handleClick = (value) => {
    console.log("stars selected are"+value);
    onRatingChange(value);
  };

  return (
    <div className="star-rating-input">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${rating >= star ? 'selected' : ''}`}
          onClick={() => handleClick(star)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRatingInput;
