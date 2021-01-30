import axios from 'axios';

const reviewsAll = 'http://localhost:5002/api/reviews/all/';
const reviewsInfo = 'http://localhost:5002/api/reviews/info/';

export const getReviewInfo = (workspaceId) => {
  return axios.get(`${reviewsInfo}${workspaceId}`).catch(err => false);
};

export const getReviews = (workspaceId) => {
  return axios.get(`${reviewsAll}${workspaceId}`).catch(err => false);
};

export const getWorkspaceId = () => {
  const splitUrl = window.location.pathname.split('/').filter(el => el);
  return splitUrl[splitUrl.length - 1];
}