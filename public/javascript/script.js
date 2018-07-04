

const starTotal = 5;

//star ratings

function makeStars(value) {
  const starPercentage = (value.dataset.rating/starTotal) * 100;
  const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
  value.getElementsByClassName(value.dataset.id)[0].style.width = starPercentageRounded;

}




if ($(".rating")[0]){

  let ratings = Array.from(document.getElementsByClassName('rating'));

  ratings.forEach(function(rating){

    makeStars(rating);
  });
}


// "active tabs"

$( document ).ready(function() {
    if(document.querySelector(".tab")){
    $('a').each(function() {
    if ($(this).prop('href') == window.location.href) {
      $(this).addClass('active');
    }
  });
      }
});


// "active links"
$( document ).ready(function() {
  $('a').each(function(){
    if($(this).prop('href')== window.location.href){
      $(this).attr("id","selected");
    }
  });
});


//preselect edit values
$( document ).ready(function() {
    if(document.querySelector(".edit-form")){

        let selectors = Array.from(document.getElementsByClassName('edit-select'));
        selectors.forEach(function(selector){
        $(selector).val(selector.dataset.gameselect);

      });
    }
});

//maps stuff
//add if only run on pages with the map element 
function initMap(){
  var options = {
    zoom:8,
    center: {lat: 42.3601, lng: -71.0895}
  };
  var map = new google.maps.Map(document.getElementById('map'), options);
}
