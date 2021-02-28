const reviewsAll = '/api/reviews/all/';
const reviewsInfo = '/api/reviews/info/';

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