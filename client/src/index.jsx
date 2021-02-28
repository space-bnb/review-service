
import ReviewsContainer from './components/ReviewsContainer.jsx';
import './index.scss';
import Stats from './components/Stats.jsx';

const ReviewsService = () => {
  return (
      <ReviewsContainer />
  );
};

ReactDOM.render(<ReviewsService />, document.getElementById('reviews'));
ReactDOM.render(<Stats />, document.getElementById('header-review-stats'));