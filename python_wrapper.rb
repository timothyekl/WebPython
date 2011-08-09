require 'open3'

class PythonWrapper
  
  attr_accessor :pyin
  attr_accessor :pyout
  attr_accessor :pyerr

  def initialize
    self.pyin, self.pyout, self.pyerr = Open3.popen3("python -i")
  end

  def read_nonblock(stream = self.pyout)
    response = ""
    while true:
      begin
        response += stream.read_nonblock(1)
      rescue Errno::EAGAIN
        break
      end
    end
    return response
  end

  def read_stdout
    return self.read_nonblock(stream = self.pyout)
  end

  def read_stderr
    return self.read_nonblock(stream = self.pyerr)
  end

  def read_all
    return self.read_stdout + self.read_stderr
  end

  def input(input = "")
    self.pyin.write(input + "\n")
    self.pyin.flush
  end
end
