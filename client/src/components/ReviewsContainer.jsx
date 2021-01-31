import React, { useState } from 'react';
import ReviewsList from './ReviewsList.jsx';
import Title from './Title.jsx';
import Stats from './Stats.jsx';
import { getReviewInfo, getWorkspaceId } from '../actions/index.js';

// container component for review section
// renders empty on error or no record
export default ({ exists = null}) => {
  const [recordExists, setExists] = useState(exists);
  // simple handling for errors and non-existent records
  if (recordExists === null) {
    getReviewInfo(getWorkspaceId())
      .then(({ data }) => {
        if (data.success === false && data.status === 404) {
          setExists(false)
        } else {
          setExists(true);
        }
      })
      .catch(err => setExists(false))
  }

  // return empty if error or no record
  if (recordExists === null || recordExists === false) {
    return <div></div>
  }

  return (
  <div className="reviews-section-container">
    <Title />
    <Stats />
    <ReviewsList />
  </div>
  );
;} 