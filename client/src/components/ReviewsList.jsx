import React, { useState } from 'react';
import Review from './Review.jsx';
import { getReviews, getWorkspaceId } from '../actions/index.js';

// This component renders individual views and controls the limit of reviews displayed
export default ({ reviewsList = null }) => {
  // unless testing reviewsList will be null, fetches reviews and adds to state
  // show limits number of displayed reviews up to 9, moreReviews controls if external link is shown
  const [allReviews, setReviews] = useState(reviewsList);
  const [show, setShow] = useState(3);
  const [moreReviews, setMoreReviews] = useState(false);

  if (allReviews === null) {
    getReviews(getWorkspaceId())
      .then(({ data }) => {
        //simple handling if record does not exist
        if (data.status === 404) {
          setReviews([]);
        } else {
          const { reviews } = data;
          if (reviews.length > 9) {
            setMoreReviews(true);
          }
          setReviews(reviews.slice(0,9));
        }
      })
      .catch(() => setReviews(false));
  }

  // handle text reveal
  const handleShowMore = () => {
    if (show < 9) {
      setShow(show + 3);
    }
  }

  // case handling
  if (allReviews === null) {
    return <div></div>
  }

  if (allReviews === false) {
    return <div>There was an error</div>
  }

  if (allReviews.length === 0) {
    return (
      <div>
        <h3>No reviews</h3>
      </div>
    )
  }

  // external link if total number if reviews exceeds 9 and 9 reviews are currently being displayed
  const SeeAll = () => (
    <a href="http://google.com" id="reviews-see-all-btn" className="blue-links" target="_blank">See all &#8594; </a>
  );

  // increases limit of reviews displayed by 3, up to 9, 
  // only displays if total reviews is more than current limit, does not display when current limit is 9
  const LoadMore = () => (
    <a id="reviews-load-more-btn" className="blue-links" onClick={handleShowMore}>Load more</a>
  );

  // map reviews up to value of show
  // display buttons to show up to 9 reviews and external link if more than 9 reviews exist
  return (
    <>
      { allReviews.slice(0, show).map(review => <Review review={review} />)}
      <br/>

      { (allReviews.length > show && show < 9) && <LoadMore /> }

      { (moreReviews && show >= 9) && <SeeAll /> }
    </>
  );

};