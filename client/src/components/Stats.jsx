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
        if (data.success === false) {
          setInfo(false);
        } else {
          setInfo(data);
        }
      })
      .catch(() => setInfo(false));
  }

  if (info === null) {
    return <></>;
  }

  if (info === false) {
    return <></>;
  }

  const { avg, reviewCount } = info;
  
  return (
    <div className="reviews-section-stats">
      <span className="fas fa-sm fa-star star"></span>
      { avg } <span className="grey-line">|</span> { reviewCount } Google reviews
    </div>
  );

};