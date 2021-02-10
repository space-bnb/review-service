import React, { useState } from 'react';
import ReviewsList from './ReviewsList.jsx';
import Title from './Title.jsx';
import Stats from './Stats.jsx';
import { getReviewInfo, getWorkspaceId } from '../actions/index.js';

// container component for review section
// renders empty on error or no record
export default ({ exists = null, reviewsList = null, reviewInfo = null }) => {
  const [recordExists, setExists] = useState(exists);
  // simple handling for errors and non-existent records
  if (recordExists === null) {
    getReviewInfo(getWorkspaceId())
      .then(({ data }) => {
        if (data.success === false) {
          setExists(false);
        } else {
          setExists(true);
        }
      })
      .catch(err => setExists(false))
  }

  // return empty if error or no record
  if (recordExists === null || recordExists === false) {
    return <></>;
  }

  return (
  <div className="reviews-section-container">
    <Title/>
    <Stats reviewInfo={reviewInfo}/>
    <ReviewsList reviewsList={reviewsList}/>
  </div>
  );
;} 