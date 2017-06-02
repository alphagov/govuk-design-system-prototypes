# GOV.UK design prototypes

Prototypes exploring the idea of putting all our design guidance and tools in a single place.

Currently hosted here: https://govuk-design-system-prototypes.cloudapps.digital/

## HMRC design patterns

HMRC versions of patterns are documented on a fork of this repo located here: https://github.com/hmrc/govuk_design_prototypes

The prototype contaning these patterns is hosted here: http://hmrc-design-language-prototype.herokuapp.com/design-patterns/patterns/

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


## Deploy

Prototypes are deployed to [govuk-design-system-prototypes.cloudapps.digital/](https://govuk-design-system-prototypes.cloudapps.digital/), using [GOV.UK PaaS](https://www.cloud.service.gov.uk/).

To deploy run `./script/deploy`. This will build the latest version of the
prototype and deploy it to the app name as specified in manifest.yml.

You'll need access to the the `gds-design` org and `prototypes` space. Contact
the team to get this.

The latest version should always be pushed to:

`govuk-design-system-prototypes.cloudapps.digital`

When deploying a historical version from a previous round of research, update
the app name in manifest.yml so that it deploys to a new app with the round
number in, following the format:

````
govuk-design-system-prototypes-round-4-v2.cloudapps.digital
govuk-design-system-prototypes-round-4-v1.cloudapps.digital
govuk-design-system-prototypes-round-3.cloudapps.digital
govuk-design-system-prototypes-round-2.cloudapps.digital
govuk-design-system-prototypes-round-1.cloudapps.digital
````

The v1/v2 suffix is only required if substantial changes are made in the middle
of a research round.


