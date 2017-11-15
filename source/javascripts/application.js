//= require vendor/jquery
//= require vendor/modernizr
//= require vendor/fixedsticky
//= require vendor/clipboard
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

  // Tabs mode
  $('ul.tabs li a').click( function(e){
    e.preventDefault()

		var tab_id = $(this).attr('href')

		$('ul.tabs li').removeClass('current')
		$('.tab-content').removeClass('current')

		$(this).parent().addClass('current')
		$(tab_id).addClass('current')
	})

  $('ul.tabs li:first-child a').click()

  // Accordion mode
  $('.tab_drawer_heading').click( function(e){
    e.preventDefault()

		var tab_id = $(this).attr('href')

		$('.tab_drawer_heading').removeClass('current')
		$('.tab-content').removeClass('current')

		$(this).addClass('current')
		$(tab_id).addClass('current')
	})

  // Close current tab
  $('.tab-content').append('<a class="close chevron top" href="#close">Close</a>')
  $('.close').click( function(e){
    e.preventDefault()
    $('ul.tabs li').removeClass('current')
    $('.tab_drawer_heading').removeClass('current')
    $('.tab-content').removeClass('current')
  })

  // Copy to clipboard
  $('.tab-content pre code').parent().prepend('<a class="copy" href="#copy">Copy</a>')
  new Clipboard('.copy', {
      target: function(trigger) {
          return trigger.nextElementSibling
      }
  }).on('success', function(e) {
    e.clearSelection()
  })

});
