const express = require('express');
const { ReviewImages, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

//Delete a Review Image
router.delete("/:imageId", requireAuth, async (req, res) => {
  const {id} = req.user;
  const {imageId} = req.params;

  const imageWithReview = await ReviewImages.findOne({
      where: {id: imageId},
      include: {model: Review}
  });

  const imageToDelete = await ReviewImages.findByPk(imageId);

  if (imageToDelete){
      if (id === imageWithReview.Reviews.userId){
          await imageToDelete.destroy();
          res.json({
              "message": "Successfully deleted"
          });

      } else {
          res.status(403);
          res.json({
              "message": "Forbidden"
          });
      }

  } else {
      res.status(404);
      res.json({
          "message": "Review Image couldn't be found"
      });
  }

});
module.exports = router
