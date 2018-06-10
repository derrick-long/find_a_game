module.exports = {
  // get ratings average/both host/player
//add if later
  ratingsAverage(user) {
    let total = 0;
    let divide_by = user.hostReviews.length;
    user.hostReviews.forEach(function(review){
      total += review.reviewScore;
    });
    return total/divide_by;
  }
};
