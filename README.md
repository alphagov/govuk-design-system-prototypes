# GOV.UK design prototypes

Prototypes exploring the idea of putting all our design guidance and tools in a single place.

Currently hosted here: [https://gentle-crag-56748.herokuapp.com/](https://gentle-crag-56748.herokuapp.com/)

## Getting started

To preview or build the prototype:

Install Ruby with Rubygems, perferably with a [Ruby version manager][rvm],
and the [Bundler gem][bundler].

In the application folder type the following to install the required gems:

```
bundle install
```

## Making changes

To make changes edit the source files in the `source` folder.

The content is in markdown files in `source/documentation`. This means the same content can be repourposed in different ways, so we can test different structures.

You can include the content on a page using a partial, like this:

```
<%= partial 'documentation/agile/scrum' %>
```

The navigation and page headings are generated from the data file in the `data` folder. This allows us to quickly try out different navigation structures. The values in the data file determine the URL path. The same values are transformed into the links and page titles by swapping underscores for spaces and capitalising the 1st letter.


## Preview

You can preview the prototype on your own machine by typing:

```
bundle exec middleman server
```

If all goes well something like the following output will be displayed:

```
== The Middleman is loading
== LiveReload accepting connections from ws://192.168.0.8:35729
== View your site at "http://Laptop.local:4567", "http://192.168.0.8:4567"
== Inspect your site configuration at "http://Laptop.local:4567/__middleman", "http://192.168.0.8:4567/__middleman"
```

You should now be able to view a live preview at http://localhost:4567.

## Build

If you want to publish the website without using a build script you may need to
build the static HTML files.

Type the following to build the HTML:

```
bundle exec middleman build
```

This will create a `build` subfolder in the application folder which contains
the HTML and asset files ready to be published.

[rvm]: https://www.ruby-lang.org/en/documentation/installation/#managers
[bundler]: http://bundler.io/
