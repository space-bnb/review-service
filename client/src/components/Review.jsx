import React from 'react';

export default () => {
  return (
    <div className="reviews-section-card">
      <p className="reviews-section-author">Real Person</p>
      <p className="reviews-section-date">10 November 1775</p>
      <div className="reviews-section-stars">
        <span className="fas fa-star fa-xs star-small"></span><span className="fas fa-star fa-xs star-small"></span><span className="fas fa-star fa-xs star-small"></span>
      </div>
      <div className="reviews-section-content">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, dolorum. Molestiae dolore repellat, laboriosam quia rerum labore perspiciatis architecto tempore expedita dolor iste quis eaque at earum dolorem minus temporibus eius ducimus deserunt inventore consequatur! 
          <br/>
          <a href="">Read more</a>
      </div>
    </div>
  )
};