#!/usr/bin/env ruby

require 'sinatra'

require 'haml'
require 'sass'

require 'guid'

require 'python_wrapper'

configure do
  enable :sessions
  set :wrappers, {}
end

get '/' do
  if session[:guid].nil?
    session[:guid] = Guid.new.to_s
  end

  guid = session[:guid]
  settings.wrappers[guid] = PythonWrapper.new

  sleep 0.2

  @text = settings.wrappers[guid].read_all[0..-6]

  haml :index
end

post '/input' do
  input = params[:input]

  wrapper = settings.wrappers[session[:guid]]
  wrapper.input input

  output = ""
  while output.index(">>>").nil? and output.index("...").nil?
    sleep 0.2
    output += wrapper.read_all
  end

  return output[0..-6]
end

get '/main.css' do
  sass :stylesheet
end

run! if __FILE__ == $0
