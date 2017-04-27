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
page "/design-patterns/patterns/*", :layout => "design_pattern"

# Search
# https://github.com/manastech/middleman-search#usage
activate :search do |search|
  search.resources = ['design-patterns/patterns']

  search.before_index = Proc.new do |to_index, to_store, resource|
    throw(:skip) if resource.data.status&.downcase == "backlog" || 
      !["all", nil].include?(resource.data.department&.downcase)
  end

  search.fields = {
    # Index the title, but also make it available when showing results
    title:   {boost: 100, store: true, required: true},

    # Index these
    aliases: {boost: 50},
    content: {boost: 1, index: true, store: false},

    # Just make these available when presenting search results
    url:     {index: false, store: true},
    section: {index: false, store: true, required: true},
    theme:   {index: false, store: true}
  }
end

# Feature Flags
set :use_theme_in_nav, true


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