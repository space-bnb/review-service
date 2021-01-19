const { ReviewData } = require('../db/models/Review');

//asyncHandler
const ah = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

//GET @  /reviews-api/info/:workspace-id 
exports.reviewInfo = ah(async (req, res, next) => {
  const { workspaceId } = req.params;
  const reviewData = await ReviewData.findOne({ workspaceId });

  if (!reviewData) {
    let err = new Error("This id number provided does not exist");
    err.status = 404;
    throw err;
  }

  const { avg, reviewCount } = reviewData;

  res.status(200).json({avg, reviewCount});
});

//GET @  /reviews-api/all/:workspace-id
exports.reviews = ah((req, res, next) => {
  res.json(`review id ${req.params.workspaceId}`);
});

// error for non existing paths
exports.notFound = (req, res) => res.json({status: 404, message: "Path does not exist"});

// error handling endpoint
exports.errors = (err, req, res, next) => res.json({status: err.status || 500, message: err.message || 'There was an error'});

