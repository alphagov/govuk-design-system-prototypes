module GithubHelpers

  def issues_link(title = nil)
    if title
      label = title.downcase.strip.gsub(' ', '+').gsub(/[^\w\+]/, '')
      "https://github.com/alphagov/govuk_design_prototypes/issues?q=is%3Aissue+is%3Aopen+label%3A%22#{label}%22"
    else
      "https://github.com/alphagov/govuk_design_prototypes/issues?q=is%3Aissue+is%3Aopen"
    end
  end

  def edit_link
    "https://github.com/alphagov/govuk_design_prototypes/blob/master/source/#{current_page.file_descriptor.normalized_relative_path}"
  end
end
