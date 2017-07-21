module NavigationHelpers

  PATTERNS_ROOT = "design-patterns/patterns/"

  def navigation
    @navigation ||= YAML.load_file('config/navigation.yml')
  end

  def current_section
    section_for_resource(current_resource)
  end

  def theme_for_current_pattern
    section_slug = section_for_resource(current_resource)
    theme_slug = theme_for_resource(current_resource)

    themes_for_section(section_slug)[theme_slug]
  end

  def section_for_resource(resource)
    path = resource.path.sub(PATTERNS_ROOT, '')
    path.split("/").reject { |segment| segment.include? '.html' }.first
  end

  def theme_for_resource(resource)
    if section_uses_themes?(section_for_resource(resource))
      path = resource.path.sub(PATTERNS_ROOT, '')
      parts = path.split("/").reject { |segment| segment.include? '.html' }
      parts[1]
    else
      nil
    end
  end

  def themes_for_section(section_slug)
    section_title = slug_to_string(section_slug)
    map_to_slugs(navigation[section_title])
  end

  def patterns_in_theme(section_slug, theme_slug)
    sitemap.resources.select do |resource|
      resource.data.title &&
      resource.path.start_with?("#{PATTERNS_ROOT}#{section_slug}/#{theme_slug}") &&
      !resource.path.start_with?("#{PATTERNS_ROOT}#{section_slug}/index.html")
    end.sort_by { |resource| resource.data.title }
  end

  def patterns_in_section(section_slug)
    sitemap.resources.select do |resource|
      resource.data.title &&
      resource.path.start_with?("#{PATTERNS_ROOT}#{section_slug}/") &&
      !resource.path.start_with?("#{PATTERNS_ROOT}#{section_slug}/index.html")
    end.sort_by { |resource| resource.data.title }
  end

  def sections
    map_to_slugs(navigation.keys)
  end

  def slug_to_string(slug)
    sections[slug]
  end

  def section_uses_themes?(section_slug)
    section_title = slug_to_string(section_slug)
    navigation[section_title]&.any?
  end

private

  def slugify(string)
    string.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  end

  def map_to_slugs(array)
    array.each_with_object(Hash.new) do |string, output|
      slug = slugify(string)

      output[slug] = string
    end
  end
end
