//= require vendor/jquery
//= require vendor/modernizr
//= require vendor/fixedsticky
//= require start-modules
//= require lunr.min
//= require lunr.stemmer.support
//= require search

// Search
var lunrIndex = null;
var lunrData  = null;

// Menu toggle

$(function () {
  $navToggle = $('.js-mobile-nav-toggle');

  $navToggle.on('click', function () {
    var $subNav = $('.mobile-nav');
    $subNav.toggle();

    $navToggle.toggleClass('active', function () {
      $(subNav).is(":visible"); 
    })
  });

  $subNavToggles = $('.js-mobile-nav-section > a');
  $subNavToggles.on('click', function (event) {
    // event.preventDefault();
    $thisSection = $(this).parents('.js-mobile-nav-section');

    $thisSection.toggleClass('mobile-nav__section--is-open');
    $('.js-mobile-nav-section').not($thisSection).removeClass('mobile-nav__section--is-open');

    return false;
  })
});
