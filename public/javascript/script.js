// like the css only approach but need only whole numbers
// replace objects with the user/player object, only allow  them to review once per game


//so we need to make mongodb objects available here in order to DISPLAY our ratings, or maybe just move this stuff
//into a route


// Initial Ratings

//this functionality but replace these ratings with values stored on users
    const ratings = {
      demo: 3
    };

    // Total Stars
    const starsTotal = 5;

    // Run getRatings when DOM loads
    document.addEventListener('DOMContentLoaded', getRatings);

    // Form Elements
    const productSelect = document.getElementById('product-select');
    const ratingControl = document.getElementById('rating-control');

    // Init product
    let product;

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
    function getRatings() {
      for (let rating in ratings) {
        // Get percentage
        const starPercentage = (ratings[rating] / starsTotal) * 100;

        // Round to nearest 10
        const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

        // Set width of stars-inner to percentage
        document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded;

        // Add number rating
        document.querySelector(`.${rating} .number-rating`).innerHTML = ratings[rating];
      }
    }
