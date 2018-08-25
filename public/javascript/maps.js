
//maybe change event to onload? use document.ready probably?

function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: -34.397, lng: 150.644}
  });

}


// function geocodeAddress(geocoder, resultsMap) {
//   var address = document.getElementById('map-search').value;
//   geocoder.geocode({'address': address}, function(results, status) {
//     if (status === 'OK') {
//       resultsMap.setCenter(results[0].geometry.location);
//       // var marker = new google.maps.Marker({
//       //   map: resultsMap,
//       //   position: results[0].geometry.location
//       // });
//     } else {
//       alert('Geocode was not successful for the following reason: ' + status);
//     }
//   });
// }
