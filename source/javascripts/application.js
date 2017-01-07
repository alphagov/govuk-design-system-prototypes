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

    if($(this).siblings("ul").css('display') == 'block'){

      $(this).siblings("ul").toggle('fast');

    } else {
      // Hide all navs
      $('.js-toc-list > ul > li > ul').hide();

      // Show this subnav
      $(this).siblings("ul").toggle('fast');

    }

  });



});
