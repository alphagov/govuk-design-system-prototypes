(function($, root) {
  "use strict";
  root.GOVUK = root.GOVUK || {};
  GOVUK.Modules = GOVUK.Modules || {};

  GOVUK.modules = {
    find: function(container) {
      var modules,
          moduleSelector = '[data-module]',
          container = container || $('body');

      modules = container.find(moduleSelector);

      // Container could be a module too
      if (container.is(moduleSelector)) {
        modules = modules.add(container);
      }

      return modules;
    },

    start: function(container) {
      var modules = this.find(container);

      for (var i = 0, l = modules.length; i < l; i++) {
        var module,
            element = $(modules[i]),
            type = camelCaseAndCapitalise(element.data('module')),
            started = element.data('module-started');


        if (typeof GOVUK.Modules[type] === "function" && !started) {
          module = new GOVUK.Modules[type]();
          module.start(element);
          element.data('module-started', true);
        }
      }

      // eg selectable-table to SelectableTable
      function camelCaseAndCapitalise(string) {
        return capitaliseFirstLetter(camelCase(string));
      }

      // http://stackoverflow.com/questions/6660977/convert-hyphens-to-camel-case-camelcase
      function camelCase(string) {
        return string.replace(/-([a-z])/g, function (g) {
          return g[1].toUpperCase();
        });
      }

      // http://stackoverflow.com/questions/1026069/capitalize-the-first-letter-of-string-in-javascript
      function capitaliseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    }
  }
})(jQuery, window);
(function($, Modules) {
  'use strict';

  Modules.TableOfContents = function () {
    var $html = $('html');
    var $toc;

    this.start = function ($element) {
      var $closeLink = $element.find('.js-toc-close');
      var $tocList = $element.find('.js-toc-list');

      $toc = $element;

      fixRubberBandingInIOS();

      // Need delegated handler for show link as sticky polyfill recreates element
      $html.on('click.toc', '.js-toc-show', preventingScrolling(openNavigation));
      $closeLink.on('click.toc', preventingScrolling(closeNavigation));
      $tocList.on('click.toc', 'a', closeNavigation);
    };

    function fixRubberBandingInIOS() {
      // By default when the table of contents is at the top or bottom,
      // scrolling in that direction will scroll the body 'behind' the table of
      // contents. Fix this by preventing ever reaching the top or bottom of the
      // table of contents (by 1 pixel).
      // 
      // http://blog.christoffer.me/six-things-i-learnt-about-ios-safaris-rubber-band-scrolling/
      $toc.on("touchstart.toc", function () {
        var $this = $(this),
          top = $this.scrollTop(),
          totalScroll = $this.prop('scrollHeight'),
          currentScroll = top + $this.prop('offsetHeight');

        if (top === 0) {
          $this.scrollTop(1);
        } else if (currentScroll === totalScroll) {
          $this.scrollTop(top - 1);
        }
      });
    }

    function openNavigation() {
      $html.addClass('toc-open');
    }

    function closeNavigation() {
      $html.removeClass('toc-open');
    }

    function preventingScrolling(callback) {
      return function (event) {
        event.preventDefault();
        callback();
      }
    }
  };
})(jQuery, window.GOVUK.Modules);


// require modules/highlighted-nav

$(document).ready(function() {
  GOVUK.modules.start();
});
