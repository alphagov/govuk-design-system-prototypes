$(function() {

  const kc = {
    13: 'enter',
    27: 'escape',
    38: 'up',
    40: 'down'
  }

  // Download index data
  $.ajax({
    url: '/search.json',
    cache: true,
    method: 'GET',
    success: function(data) {
      lunrData = data;
      lunrIndex = lunr.Index.load(lunrData.index);
    }
  });

  var $resultsContainer = $('.js-search-results');

  function getActiveResultPosition() {
    return $('.active-result', $resultsContainer).index();
  }

  function handleUpArrow(event) {
    if (getActiveResultPosition() == 0) {
      $('.active-result').removeClass('active-result');
    } else {
      var $prevElement = $('.active-result').prev();

      $('li', $resultsContainer).removeClass('active-result');
      $prevElement.addClass('active-result');
    }

    event.preventDefault();
  }

  function handleDownArrow(event) {
    if (getActiveResultPosition() === -1) {
      var $nextElement = $('li', $resultsContainer).first();
    } else {
      var $nextElement = $('li.active-result').next();
    }

    if ($nextElement.length) {
      $('li', $resultsContainer).removeClass('active-result');
      $nextElement.addClass('active-result');
    }

    event.preventDefault();
  }

  function handleEnter(event) {
    var activeLink = $('li.active-result a');

    if (activeLink.length) {
      window.location = activeLink.attr('href');
    }
  }

  $('#pattern-search-text').on('focus', function (event) {
    if ($('li', $resultsContainer).length) {
      $resultsContainer.css('display', 'block');
    }
  });

  $('#pattern-search-text').on('blur', function (event) {
    setTimeout(function () {
      $resultsContainer.css('display', 'none');
    }, 150);
  });

  $('#pattern-search-text').on('keydown', function (evt) {
    switch (kc[evt.keyCode]) {
      case 'up':
        handleUpArrow(evt)
        break
      case 'down':
        handleDownArrow(evt)
        break
      case 'enter':
        handleEnter(evt)
        break
      case 'escape':
        // this.handleComponentBlur({
        //   query: this.state.query
        // })
        break
      default:
        break
    }
  });

  $resultsContainer.on('mouseover', 'li', function() {
    $('.active-result').removeClass('active-result');
    $(this).addClass('active-result');
  })

  $('#pattern-search-text').on('input', function() {
    if (!lunrIndex) {
      return;
    }

    var searchTerms = $(this).val();
    var results = lunrIndex.search(searchTerms);

    $resultsContainer.empty();

    $.each(results, function(_, result) {
      var resultData = lunrData['docs'][result.ref];
      var breadcrumb = resultData['section'];

      // if (resultData['theme']) {
      //   breadcrumb = breadcrumb + " > " + resultData['theme']
      // }

      var resultItem = $('<li />').append(
        $('<a>', {href: resultData['url']}).text(resultData['title']).append(
          $('<span>', {class: 'result-section'}).text(breadcrumb)
        )
      );

      $resultsContainer.append(resultItem);
    });

    if ($('li', $resultsContainer).length) {
      $resultsContainer.css('display', 'block');
    } else {
      $resultsContainer.css('display', 'none');
    }

  });
});
