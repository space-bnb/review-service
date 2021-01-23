const { ReviewData } = require('../db/models/Review');

//asyncHandler
const ah = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

const checkExists = (item, errMess = 'ID does not exist', status = 404) => {
  if (!item) {
    let err = new Error(errMess);
    err.status = status;
    throw err;
  }
}

//GET @  /reviews-api/info/:workspace-id 
exports.reviewInfo = ah(async (req, res, next) => {
  const { workspaceId } = req.params;
  const reviewData = await ReviewData.findOne({ workspaceId });
  checkExists(reviewData, 'The provided id was not found');
  const { avg, reviewCount } = reviewData;
  res.status(200).json({avg, reviewCount});
});

//GET @  /reviews-api/all/:workspace-id
exports.reviews = ah(async (req, res, next) => {
  const { workspaceId } = req.params;
  const reviewData = await ReviewData.findOne({ workspaceId });
  checkExists(reviewData, 'ID was not found', 404);
  const { reviews } = reviewData;
  res.json({ reviews });  
});

// error for non existing paths
exports.notFound = (req, res) => res.json({status: 404, message: "Path does not exist"});

// error handling endpoint
exports.errors = (err, req, res, next) => res.json({status: err.status || 500, message: err.message || 'There was an error'});

