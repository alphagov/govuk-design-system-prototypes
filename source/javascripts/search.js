$(function() {
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

  function typeaheadSource (searchTerms, syncResults) {
    if (lunrIndex) {
      var lunrResults = lunrIndex.search(searchTerms);
      syncResults(lunrResults)
    } else {
      syncResults([])
    }
  }

  function typeaheadOnSelect (lunrResult) {
    if (lunrResult) {
      var resultData = lunrData['docs'][lunrResult.ref];
      window.location.href = resultData['url']
    }
  }

  // The value that will be inserted into the `<input>` field when the user confirms.
  function inputValueTemplate (lunrResult) {
    return lunrResult
      ? lunrData['docs'][lunrResult.ref]['title']
      : ''
  }

  function suggestionTemplate (lunrResult) {
    var resultData = lunrData['docs'][lunrResult.ref];
    var breadcrumb = resultData['section'];

    if (resultData['theme']) {
      breadcrumb = breadcrumb + " > " + resultData['theme']
    }

    var resultContent = $('<div>', {class: 'result-inner'}).text(resultData['title'])
      .append(
        $('<div>', {class: 'result-section'}).text(breadcrumb)
      )

    return resultContent.prop('outerHTML')
  }

  AccessibleTypeahead({
    displayMenu: 'overlay',
    element: document.getElementById('search-typeahead'),
    onSelect: typeaheadOnSelect,
    placeholder: 'Search patterns',
    selectOnBlur: false,
    showNoOptionsFound: false,
    source: typeaheadSource,
    templates: {
      inputValue: inputValueTemplate,
      suggestion: suggestionTemplate
    }
  });
});
