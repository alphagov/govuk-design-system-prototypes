module GithubHelpers

  def issues_link(title = nil)
    if title
      label = title.downcase.strip.gsub(' ', '+').gsub(/[^\w\+]/, '')
      "#{repo_root}/issues?q=is%3Aissue+is%3Aopen+label%3A%22#{label}%22"
    else
      "#{repo_root}/issues?q=is%3Aissue+is%3Aopen"
    end
  end

  def edit_link
    "#{repo_root}/blob/master/source/#{current_page.file_descriptor.normalized_relative_path}"
  end

  def history_link
    "#{repo_root}/commits/master/source/#{ current_page.file_descriptor.normalized_relative_path }"
  end

private

  def repo_root
    "https://github.com/alphagov/govuk_design_prototypes"
  end
end
