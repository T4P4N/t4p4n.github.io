class Blurb
  attr_accessor :content, :time, :mood

  def initialize(mood, content="")
    @time    = Time.now
    @content = content[0..39]
    @mood    = mood
  end

  def moodify
    if    @mood == :sad
      return ":("
    elsif @mood == :happy
      return ":)"
    # Add other moods here
    end

    # The default mood
    ":|"
  end
end

class Blurbalizer
  def initialize(title)
    @title  = title
    @blurbs = []
  end

  def add_a_blurb(mood, content)
    @blurbs << Blurb.new(mood, content)
  end

  def show_timeline
    puts "Blurbalizer: #{@title} has #{@blurbs.count} Blurbs"
    puts "Mood | Blurbs #{"".ljust(33)}| Date & Time"

    @blurbs.sort_by { |t|
      t.time
    }.each { |t|
      puts "#{t.mood.ljust(4).rjust(2)}| #{t.content.ljust(40)}| #{t.time}"
    }
  end
end

myapp = Blurbalizer.new("T4P4N")

myapp.add_a_blurb("😀", "Hello world!")
sleep 1
myapp.add_a_blurb("😀", "Ruby's syntax is easy")
sleep 1
myapp.add_a_blurb("😥", "But there some caveats in hashmaps")
sleep 1
myapp.add_a_blurb("😥", "aka dictionaries assignment syntax")
sleep 1
myapp.add_a_blurb("😀", "also ljust is great for displaying data")
sleep 1
myapp.add_a_blurb("😥", "Goodbye world!")
sleep 1
myapp.show_timeline