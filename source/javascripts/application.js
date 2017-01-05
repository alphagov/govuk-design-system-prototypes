//= require vendor/jquery
//= require vendor/modernizr
//= require vendor/fixedsticky
//= require start-modules

$(function() {

  $('.fixedsticky').fixedsticky();

  // Hide sub-nav by default
  $('.js-toc-list > ul > li > ul').hide();

  // Show current section
  $('.current-section > ul').show();

  // Toggle subnav if it's clicked
  $('.js-toc-list > ul > li > a').click(function(){

  	console.log('woo');

  	$('.js-toc-list > ul > li > ul').hide();
  	$(this).siblings("ul").toggle('fast');

  });



});
