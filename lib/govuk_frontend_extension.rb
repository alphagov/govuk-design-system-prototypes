# Directory Indexes extension

module GovukFrontend
  class ExampleExtension < ::Middleman::Extension

    # This should run after most other sitemap manipulators so that it
    # gets a chance to modify any new resources that get added.
    self.resource_list_manipulator_priority = 100

    # Update the main sitemap resource list
    # @return Array<Middleman::Sitemap::Resource>
    Contract ResourceList => ResourceList
    def manipulate_resource_list(resources)

      puts "Including examples from GOV.UK Frontend..."
      example_resources = []
      Dir.glob('node_modules/@govuk-frontend/*/*.html') do |filename|
        code = File.open(filename) { |f| f.read }

        component, example = filename.match(/node_modules\/@govuk-frontend\/(.*)\/(.*)\.html/i).captures
        puts "\tincluding #{component}/#{example}"

        r = Middleman::Sitemap::ProxyResource.new(
          app.sitemap,
          "examples/#{component}/#{example}.html",
          'govuk-frontend-example/template.html'
        )

        r.add_metadata(
          locals: { component: component, example: example, snippet: code },
          page: {},
          options: { layout: 'govuk-frontend/layout' }
        )

        example_resources << r
      end

      # Exclude template file from sitemap so it doesn't get built
      d = ::Middleman::Sitemap::Extensions::Ignores::StringIgnoreDescriptor.new('govuk-frontend-example/template.html')
      d.execute_descriptor(app, resources)

      resources + example_resources
    end
  end
end

Middleman::Extensions.register :govuk_frontend_examples do
  GovukFrontend::ExampleExtension
end
