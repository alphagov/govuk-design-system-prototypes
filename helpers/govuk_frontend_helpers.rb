module GovukFrontendHelpers
  def frontend_example(component, example)
    code = File.open("node_modules/@govuk-frontend/#{component}/#{example}.html", 'rb') { |f| f.read }

    partial "govuk-frontend-example/wrapper", locals: {
      component: component,
      example: example,
      snippet: code
    }
  end
end
