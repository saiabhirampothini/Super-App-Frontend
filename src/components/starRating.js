import React from "react";
import "../styles/starRating.css";

const StarRating = ({ rating }) => {
  // Convert rating to a number
  
  const parsedRating = parseFloat(rating);

  

  // Validate the parsed rating
  if (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5) {
    return <div>No ratings Yet  </div>;
  }

  const fullStars = Math.floor(parsedRating);
  const hasHalfStar = parsedRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="star-rating">
      {Array(fullStars).fill().map((_, i) => (
        <span key={i} className="star full">★</span>
      ))}
      {hasHalfStar && <span className="star half">★</span>}
      {Array(emptyStars).fill().map((_, i) => (
        <span key={i + fullStars + (hasHalfStar ? 1 : 0)} className="star empty">★</span>
      ))}
    </div>
  );
};

export default StarRating;
