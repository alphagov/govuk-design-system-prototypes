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

$(function() {

  $('.fixedsticky').fixedsticky();

  // Hide sub-nav by default
  $('.js-toc-list > ul > li > ul').hide();

  // Show current section
  $('.current-section > ul').show();

  var $navItems = $('.js-toc-list > ul > li > a');

  // Toggle subnav if it's clicked
  $navItems.click(function() {

    var wasVisible = $(this).siblings("ul").css('display') == 'block';

    // Hide all open navs, including this one
    $navItems.removeClass('is-active');
    $navItems.siblings('ul').hide();

    // If the clicked nav wasn't visible, show it
    if (!wasVisible) {
      $(this).addClass('is-active');
      $(this).siblings("ul").slideToggle('fast');
    }

  });

});

// Menu toggle

function toggleNav() {
    var $subNav = $('#sub-nav');
    if ($subNav.css('display') === 'none') {
        $subNav.css('display', 'block');
    } else {
        $subNav.css('display', 'none');
    }
}

