var map;
var marker;

function initMap() {
  var mapOptions = {
    center: new google.maps.LatLng(40.680898,-8.684059),
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}
google.maps.event.addDomListener(window, "load", initialize);

function searchAddress(){
  var addressInput = document.getElementbyId('map-search').value;
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({address: addressInput}, function(results,status){
    if (status == google.maps.GeocoderStatus.OK) {

    }
  }
}



if ($("#map")[0]){
  initMap();
}
