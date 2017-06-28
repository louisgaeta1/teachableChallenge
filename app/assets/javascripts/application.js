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
  $(".gem-search").on("submit", function(e){
    e.preventDefault();
    $form = $(this);
    $.ajax({
      method: $form.attr("method"),
      url: $form.attr("action"),
      data: $form.serialize(),
    })
    .done(function(response){
      $('#results').html(response);
      $form.trigger('reset');
      $form.css('color','black')
      $('#results').css('color', 'black')
    })
    .fail(function(response){
      $('#results').html(response.responseText);
      $form.css('color','red')
      $('#results').css('color', 'red')
    })
  });
  $('#results').on('click','.star', function(e){
    console.log('Star Clicked');
  })
});
