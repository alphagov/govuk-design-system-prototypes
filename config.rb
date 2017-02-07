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

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)

# Set up routes for V1 prototype

data.v1nav.sections.each do |section|

  # Iterate over pages in section
  if defined?(section.pages)
    section.pages.each do |page|

      # Set up proxy
      proxy "/v1/#{section.name}/#{page}/index.html", "/v1/index.html", :locals => { :page => page, :section => section.name }, :ignore => true
    
    end
  end

end

# Set up routes for V2 prototype

data.v2bnav.sections.each do |section|

  # Iterate over pages in section
  if defined?(section.pages)
    section.pages.each do |page|

      # Set up proxy
      proxy "/v2/#{section.name}/#{page}/index.html", "/v2/index.html", :locals => { :page => page, :section => section.name }, :ignore => true
    
    end
  end

end

# Set up routes for V3 prototype

data.v3nav.sections.each do |section|

  # Iterate over pages in section
  if defined?(section.pages)
    section.pages.each do |page|

      # Set up proxy
      proxy "/v3/#{section.name}/#{page}/index.html", "/v3/index.html", :locals => { :page => page, :section => section.name }, :ignore => true
    
    end
  end

end

# Set up routes for V4 prototype

data.v4nav.sections.each do |section|

  # Iterate over pages in section
  if defined?(section.pages)
    section.pages.each do |page|

      # Set up proxy
      proxy "/v4/#{section.name}/#{page}/index.html", "/v4/index.html", :locals => { :page => page, :section => section.name }, :ignore => true
    
    end
  end

end

# Set up routes for V5 prototype

data.v5nav.sections.each do |section|

  # Iterate over pages in section
  if defined?(section.pages)
    section.pages.each do |page|

      # Set up proxy
      proxy "/v5/#{section.name}/#{page}/index.html", "/v5/index.html", :locals => { :page => page, :section => section.name }, :ignore => true
    
    end
  end

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
