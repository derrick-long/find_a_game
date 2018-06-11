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
    },

    starPercentage(user,type){
      if(type == 'host'){
        let star_percent = (user.hostReviewAverage/starTotal) * 100;
        return `${Math.round(star_percent / 10) * 10}%`;
      } else {
        let star_percent = (user.playerReviewAverage/starTotal) * 100;
        return `${Math.round(star_percent / 10) * 10}%`;
      }
    }

};
