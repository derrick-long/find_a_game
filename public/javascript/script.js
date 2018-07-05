

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
var map;
   var infowindow;

   function initMap() {
     var pyrmont = {lat: -33.867, lng: 151.195};

     map = new google.maps.Map(document.getElementById('map'), {
       center: pyrmont,
       zoom: 15
     });

     infowindow = new google.maps.InfoWindow();
     var service = new google.maps.places.PlacesService(map);
     service.nearbySearch({
       location: pyrmont,
       radius: 500,
       type: ['store']
     }, callback);
   }

   function callback(results, status) {
     if (status === google.maps.places.PlacesServiceStatus.OK) {
       for (var i = 0; i < results.length; i++) {
         createMarker(results[i]);
       }
     }
   }

   function createMarker(place) {
     var placeLoc = place.geometry.location;
     var marker = new google.maps.Marker({
       map: map,
       position: place.geometry.location
     });

     google.maps.event.addListener(marker, 'click', function() {
       infowindow.setContent(place.name);
       infowindow.open(map, this);
     });
   }
