import React, { useState } from 'react';
import { getReviewInfo, getWorkspaceId } from '../actions/index.js';

// displays under title, shows average and number of reviews
// renders 0 values on no record and message on error
export default ({ reviewInfo = null }) => {

  const [info, setInfo] = useState(reviewInfo);
  // get reviewInfo and simple error handling
  if (info === null) {
    getReviewInfo(getWorkspaceId())
      .then(({ data }) => {
        if (data.status === 404) {
          setInfo({avg: 0, reviewCount: 0});
        } else {
          setInfo(data);
        }
      })
      .catch(() => setInfo(false));
  }

  if (info === null) {
    return <div></div>;
  }

  if (info === false) {
    return <div><h3>There was an error, please try again later.</h3></div>;
  }

  const { avg, reviewCount } = info;
  
  return (
    <div className="reviews-section-stats">
      <span className="fas fa-sm fa-star star"></span>
      { avg } <span className="grey-line">|</span> { reviewCount } Google reviews
    </div>
  );

};