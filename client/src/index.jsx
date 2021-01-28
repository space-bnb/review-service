import React from 'react';
import ReactDOM from 'react-dom';
import ReviewsContainer from './components/ReviewsContainer.jsx';
import './index.scss';

const ReviewsService = () => {
  return (
    <div>
      <ReviewsContainer />
    </div>
  );
};

ReactDOM.render(<ReviewsService />, document.getElementById('reviews-service'));