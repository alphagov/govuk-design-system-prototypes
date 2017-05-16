---
title: Search – GOV.UK design system prototypes
layout: blank
---

[⇠ Back](/)

# Search

Because we're currently using a static site generator there is no server side
application to execute the search. Instead we use a client side implementation
which downloads the [search index] and then the [search logic] happens within
the browser.

We're using a middleman plugin called [middleman-search], which is based on
[lunr.js].

The index is built based on the config within the `activate :search` block in
`/config.rb`. The config allows you to include both fields from the YAML
frontmatter and the pattern's content itself, and for each of these define:

- the boost for that field (how highly a word should score based on the field it
appears in)
- whether the field is used as part of the search index
- whether the field is stored and made available when presenting results
- whether the field is required (if it's missing the pattern will not be indexed)

You can read more about this in the [middleman-search usage docs].

## Advantages of client side search

- Search is nearly instantaneous, with results being displayed in a list
similar to that in the [accessible typeahead].
- Users can very quickly understand how the search behaves and match results
without necessarily having to complete their query terms.
- Searching is very quick, as the index is built at compile time.
- We don't need to worry about infrastructure for a server side application.

## Disadvantages of client side search

- The search functionality will not work if the user has Javascript disabled,
or Javascript fails to run.
- The client has to download the search index on first run, and whenever the
index changes. The search index will likely be hundreds of kilobytes (though
this could be reduced and may be less when gzipped).

## Behaviour

- [Stop words] are not indexed and are removed from queries
- Words are stemmed (English suffixes like 'ing', 'ed', 's' are removed) when
indexing and when running queries. This is so that e.g. 'validating forms' would
find a document called 'Form Validation', but there is some potentially odd
behaviour when no results are found when the user has a query with a partial
stem – i.e. they've got as far as writing 'form validatio'.


[accessible typeahead]: https://github.com/alphagov/accessible-typeahead
[middleman-search]: https://github.com/manastech/middleman-search#usage
[Middleman-search usage docs]: https://github.com/manastech/middleman-search#usage
[lunr.js]: http://lunrjs.com/
[search index]: /search.json
[search logic]: /javascripts/search.js
[Stop words]: https://github.com/olivernn/lunr.js/blob/master/lib/stop_word_filter.js
