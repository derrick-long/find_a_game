

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





// location stuff

//variable error here
function getAddress (latitude, longitude) {
  $.ajax('https://maps.googleapis.com/maps/api/geocode/json?' +
          'latlng=' + latitude + ',' + longitude + '&key=' +
          'AIzaSyDGdCjLNhY1u1ZQhXOHhVgTewhOyj71OuU')
  .then(
    function success (response) {
      console.log('User\'s Address Data is ', response);
    },
    function fail (status) {
      console.log('Request failed.  Returned status of',
                  status);
    }
  );

}

function ipLookUp () {
  $.ajax('https://ipapi.co/json')
  .then(
      function success(response) {
          console.log('User\'s Location Data is ', response);
          console.log('User\'s Country', response.country);
          getAddress(response.latitude, response.longitude);
},

      function fail(data, status) {
          console.log('Request failed.  Returned status of',
                      status);
      }
  );
}


if ("geolocation" in navigator) {
  // check if geolocation is supported/enabled on current browser
  navigator.geolocation.getCurrentPosition(
   function success(position) {
     // for when getting location is a success
     console.log('latitude', position.coords.latitude,
                 'longitude', position.coords.longitude);
     getAddress(position.coords.latitude, position.coords.longitude);
   },
  function error(error_message) {
    // for when getting location results in an error
    console.error('An error has occured while retrieving' +
                  'location', error_message);
    ipLookUp();
  });
} else {
  // geolocation is not supported
  // get your location some other way
  console.log('geolocation is not enabled on this browser');
  ipLookUp();
}
