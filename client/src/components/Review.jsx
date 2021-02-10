import React, { useState } from 'react';

// this component will render individual reviews
export default ({ review }) => {
  // convert ISO date-time to string and add to state
  let rawDate = '';
  if (review.date) {
    rawDate = new Date (review.date).toString().split(' ').slice(1, 4);
    rawDate[1] = rawDate[1] + ', ';
    rawDate = rawDate.join(' ');
  }

  // check content needs to be truncated
  const limitContent = review.content.length > 40 ? true : false;

  //add to state
  const [date, setDate] = useState(rawDate);
  const [readLimit, setLimit] = useState(limitContent);

  // function to remove readLimit to see all content
  const handleReadMore = () => {
    setLimit(false);
  };

  const Stars = () => (
    <div className="reviews-section-stars">
       { new Array(review.rating).fill( <span className="fas fa-star fa-xs star-small"></span>) }
    </div>
  );

  const ReadMore = () => <a className="blue-links read-more" onClick={handleReadMore}>&nbsp; Read more</a>;

  return (
    <div className="reviews-section-card">
      <p className="reviews-section-author">{ review.author }</p>
      <p className="reviews-section-date">{ date || '' } </p>
      <Stars />
      <div className="reviews-section-content">
        <p>
          {/* if content is long, truncate and display read more button */}
          { readLimit ? review.content.slice(0, 40).concat(' ...') : review.content }
          { readLimit ?  <ReadMore /> : '' }
        </p>

      </div>
    </div>
  );
};