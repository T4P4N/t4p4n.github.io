Jekyll::Hooks.register :posts, :post_write do |post|
    all_existing_tags = Dir.entries("tag")
    tags = post['tags'].reject { |t| t.empty? }
    tags = tags.map { |tag|  tag.gsub(",", "") }
    tags = tags.uniq
    tags.each do |tag|
      generate_tag_file(tag) if !all_existing_tags.include?(tag)
    end
  end
  
  def generate_tag_file(tag)
    directory_name = tag.strip
    Dir.mkdir("tag/#{directory_name}") unless File.exists?(directory_name)
    # generate tag file
    File.open("tag/#{tag}/index.html", "wb") do |file|
      file << "---\nlayout: tag\ntag: #{tag}\n---\n"
    end
    # # generate feed file
    # File.open("feeds/#{tag}.xml", "wb") do |file|
    #   file << "---\nlayout: feed\ntag-name: #{tag}\n---\n"
    # end
  end