//= require vendor/jquery
//= require lunr.min
//= require lunr.stemmer.support

// Search
var lunrIndex = null;
var lunrData  = null;

// Download index data
$.ajax({
  url: '/search.json',
  cache: true,
  method: 'GET',
  success: function(data) {
    lunrData = data;
    lunrIndex = lunr.Index.load(lunrData.index);

    $(function () {
      var url = new URL(window.location);
      var q = url.searchParams.get("q");
      var results = lunrIndex.search(q);

      $('.js-search-query').val(q);

      var template = $('.js-result-template').html();
      $('.js-result-count').text(results.length);

      $.each(results, function(_, result) {
        var resultData = lunrData['docs'][result.ref];
        var $out = $(template);

        $('.js-result-link', $out)
          .text(resultData['title'] + " - GOV.UK Design System")
          .attr('href', resultData['url']);

        $('.js-result-display-url', $out)
          .text("https://govuk-design-system-prototypes.cloudapps.digital" + resultData['url']);

        $('.js-result-description', $out)
          .text(resultData['description'] ? resultData['description'] : "");

        $('.js-results').append($out);
      });
    });
  }
});
