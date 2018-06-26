// so now we scale this for all values on the page, iterate through them and then call our helper
// method for each

const starTotal = 5;


if ($(".rating")[0]){

  let ratings = Array.from(document.getElementsByClassName('rating'));

  ratings.forEach(function(rating){

    makeStars(rating);
  });
}




$( document ).ready(function() {
    if(document.querySelector(".tab")){
      $(function(){
          $('.tab').click(function(event) {
            event.preventDefault();
              $(this).toggleClass('active');
          });
      });

    }
});




   function makeStars(value) {
     const starPercentage = (value.dataset.rating/starTotal) * 100;
     const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
     value.getElementsByClassName(value.dataset.id)[0].style.width = starPercentageRounded;

   }
