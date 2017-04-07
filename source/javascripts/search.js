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
});
