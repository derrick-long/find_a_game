// like the css only approach but need only whole numbers
// replace objects with the user/player object, only allow  them to review once per game

if ($(".profile")[0]){
  makeStars(".hostRating");
} else {
  console.log('not here');
}

//can just take the value from our div showing the ratings
// probably the best way to do it, might have to go back and change the helpers
// also put it in hidden input if needed
// need a way to handle more than one on one page
// either need to pass an object from back end and manipulate here or?




    // // Run getRatings when DOM loads
    // document.addEventListener('DOMContentLoaded', getRatings);
    //
    // // Form Elements
    // const productSelect = document.getElementById('product-select');
    // const ratingControl = document.getElementById('rating-control');
    //
    // // Init product
    // let product;

    // Product select change
    // productSelect.addEventListener('change', (e) => {
    //   product = e.target.value;
      // Enable rating control
    //   ratingControl.disabled = false;
    //   ratingControl.value = ratings[product];
    // });

    // Rating control change
    // ratingControl.addEventListener('blur', (e) => {
    //   const rating = e.target.value;

      // Make sure 5 or under
      // if (rating > 5) {
      //   alert('Please rate 1 - 5');
      //   return;
      // }

      // Change rating
    //   ratings[product] = rating;
    //
    //   getRatings();
    // });

    // Get ratings
    // function getRatings() {
    //   for (let rating in ratings) {
    //     // Get percentage
    //     const starPercentage = (ratings[rating] / starsTotal) * 100;
    //
    //     // Round to nearest 10
    //     const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    //
    //     // Set width of stars-inner to percentage
    //     document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded;
    //
    //     // Add number rating
    //     document.querySelector(`.${rating} .number-rating`).innerHTML = ratings[rating];
    //   }

    // }



   function makeStars (classname){
     let value = $(classname).html();
     const starPercentage = (value/5) * 100;
     const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
     document.querySelector(`.stars-inner`).style.width = starPercentageRounded;
   }
