class String
  def common_start(other)
    common = ""
    0.upto([self.length, other.length].min).each do |i|
      if self[i] == other[i]
        common += self[i].chr
      end
    end
    return common
  end

  def dedent
    lines = self.split("\n")
    if lines.length == 0
      return self
    end

    whitespace = /(^\s*)/.match(lines[0])
    common_space = lines[1..lines.length].reduce { |memo, obj| memo.common_start(obj) }
    return lines.map { |line| line[common_space.length-1..line.length] }.join("\n")
  end
end
