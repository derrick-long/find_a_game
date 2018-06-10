module.exports = {
  // get ratings average/both host/player
//add if later
  ratingsAverage(user,type) {
      let total = 0;
      if(type == 'host'){
        let divide_by = user.hostReviews.length;
        user.hostReviews.forEach(function(review){
          total += review.reviewScore;
        });
        return total/divide_by;
      } else {
        let divide_by = user.playerReviews.length;
        user.playerReviews.forEach(function(review){
          total += review.reviewScore;
        });
        return total/divide_by;
      }
    }
};
