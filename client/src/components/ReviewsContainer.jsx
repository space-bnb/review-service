import React from 'react';
import Review from './Review.jsx';
import Title from './Title.jsx';
import Stats from './Stats.jsx';

export default () => {
  return (
  <div className="reviews-section-container">
    <Title />
    <Stats />
    <Review />
  </div>
  );
}