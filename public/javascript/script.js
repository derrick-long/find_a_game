
var jumbotron =  '<div class="jumbotron jumbotron-fluid mt-4">' +
'<div class="container">' + 
  '<h1 class="display-4">Find a Game </h1>' + 
  '<p class="lead"><a href="/games/add" class="plain-link">Host a game for players</a> or <a href= "/games/map" class="plain-link"> find a game.</a></p>' +
'</div>';


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

//jumbotron outside container 
if ($('#welcome').length > 0){
  $(jumbotron).insertBefore("#main-content");
};