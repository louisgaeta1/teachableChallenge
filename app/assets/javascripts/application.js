// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require_tree .

$(document).ready(function(){
  $.ajax({
    method: 'Get',
    url: '/favorites',
    data: 'favorites=' + window.localStorage.getItem('favorites')
  })
  .done(function(response){
    $('#favorites').html(response);
  })
  $(".gem-search").on("submit", function(e){
    e.preventDefault();
    var $form = $(this);
    $.ajax({
      method: $form.attr("method"),
      url: $form.attr("action"),
      data: $form.serialize(),
    })
    .done(function(response){
      $('#results').html(response);
      var fav = loadFavorites();
      var stars = $('.fa-star-o')
      markFavorites(fav, stars);
      $form.trigger('reset');
      colorForm($form, 'black');
    })
    .fail(function(response){
      $('#results').html(response.responseText);
      colorForm($form, 'red');
    })
  });

  $('#results').on('click','.fa-star-o', function(e){
    favorite(this);
  });

  $('#results').on('click','.fa-star', function(e){
    unfavorite(this);
  });

  $('#favorites').on('click','.fa-star', function(e){
    unfavorite(this);
    $(this.parentElement).remove()
    if ($('#fav-list').html().trim() === ""){
      $('#fav-list').html("<p>None</p>");
    }
  });

});


function loadFavorites() {
  let favorites = window.localStorage.getItem('favorites');
  favorites = favorites ? JSON.parse(favorites) : [];
  return favorites;
};

function unfavorite(star){
  unmarkFav(star);
  var fav = loadFavorites();
  var index = fav.indexOf(starToGem(star));
  fav.splice(index, 1);
  window.localStorage.clear();
  window.localStorage.setItem("favorites", JSON.stringify(fav));
}

function favorite(star){
  markFav(star);
  var fav = loadFavorites();
  fav.push(starToGem(star));
  window.localStorage.setItem("favorites", JSON.stringify(fav));
}

function colorForm(form, color){
  form.css('color', color);
  form.css('border', '1px solid ' + color);
}

function markFavorites(favorites, stars){
  stars.each(function(){
    if (favorites.includes(starToGem(this))){
      markFav(this);
    }
  });
}

function markFav(star){
  $(star).addClass('fa-star').removeClass('fa-star-o');
}

function unmarkFav(star){
  $(star).addClass('fa-star-o').removeClass('fa-star');
}

function starToGem(star){
  return star.parentElement.innerText.trim();
}
