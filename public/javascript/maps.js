var map;
var marker;

function initMap() {
  var mapOptions = {
    center: new google.maps.LatLng(40.680898,-8.684059),
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}


function searchAddress(){

  var addressInput = document.getElementById('map-search').value;
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({address: addressInput}, function(results,status){
    if (status == google.maps.GeocoderStatus.OK) {

      var myResult = results[0].geometry.location;

      map.setCenter(myResult);

      map.setZoom(15);
    } else { // if status value is not equal to "google.maps.GeocoderStatus.OK"

      alert("The Geocode was not successful for the following reason: " + status);

    }
  });
}


google.maps.event.addDomListener(window, "load", initMap);

function createMarker(latlng) {
  //clear old marker
  if (marker != undefined && marker != '') {
    marker.setMap(null);
    marker ='';
  }

  marker = new google.maps.Marker({
    map:map,
    position: latlng
  });
}
