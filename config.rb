require 'lib/tech_docs_html_renderer'

###
# Page options, layouts, aliases and proxies
###

set :markdown_engine, :redcarpet
set :markdown,
    renderer: TechDocsHTMLRenderer.new(
      with_toc_data: true
    ),
    fenced_code_blocks: true,
    tables: true

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false


# Design patterns have a different default layout
page "/v9/govuk_design_patterns/patterns/*", :layout => "v9_design_pattern"


# Create discussion pages for all the patterns
ready do

  pattern_root = "/v9/govuk_design_patterns/patterns/" 

  sitemap.resources.select { |r| 
    r.data.section && 
    r.data.discuss &&
    r.url.start_with?(pattern_root)
  }.each do |pattern|

    proxy "#{pattern.url}discussion.html", "/v9/govuk_design_patterns/discussion.html", :locals => { 
      :discuss  => pattern.data.discuss,
      :section  => pattern.data.section,
      :title    => pattern.data.title,
      :status   => pattern.data.status,
      :url      => pattern.url
    }, :ignore => true

  end

end


# Set up routes for V8 prototype

data.v8nav.sections.each do |section|
  # Iterate over pages in section
  if defined?(section.pages)
    section.pages.each do |page|
      # Set up proxy
      proxy "/v8/#{section.name}/#{page.name}/index.html", "/v8/index.html", :locals => { :page => page, :section => section }, :ignore => true  
    end
  end
end

# Search
# https://github.com/manastech/middleman-search#usage
activate :search do |search|
  search.resources = ['v9/govuk_design_patterns/patterns']

  search.fields = {
    # Index the title, but also make it available when showing results
    title:   {boost: 100, store: true, required: true},

    # Index these
    aliases: {boost: 50},
    content: {index: true, store: false},

    # Just make these available when presenting search results
    url:     {index: false, store: true},
    section: {index: false, store: true, required: true},
    theme:   {index: false, store: true}
  }
end


# General configuration

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

activate :autoprefixer
activate :sprockets
activate :syntax

###
# Helpers
###

helpers do
  require 'table_of_contents/helpers'
  include TableOfContents::Helpers
end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript
end

###
# Tech Docs-specific configuration
###

config[:tech_docs] = YAML.load_file('config/tech-docs.yml')
                         .with_indifferent_access
