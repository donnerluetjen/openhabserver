# coding: utf-8
unless ENV['UNJAZZY']
  STDOUT.sync
  logger.level = Capistrano::Logger::IMPORTANT

  # Spinner Jazz via: http://jondavidjohn.com/blog/2012/04/cleaning-up-capistrano-deployment-output
  @jazzy_spinner_running = false
  @jazzy_spinner_chars = ['|', '/', '-', '\\'].map { |ch| "\b\e[36m#{ch}\e[0m" }
  @jazzy_spinner = Thread.new do
    loop do
      unless @jazzy_spinner_running
        Thread.stop
      end
      print @jazzy_spinner_chars[0]
      sleep(0.05)
      @jazzy_spinner_chars.push(@jazzy_spinner_chars.shift)
    end
  end

  def start_jazzy_spinner
    print ' '
    @jazzy_spinner_running = true
    @jazzy_spinner.wakeup
  end

  def stop_jazzy_spinner
    @jazzy_spinner_running = false
    print "\b"
  end

  def jazzy_notify(task_name, msg)
    before(task_name) do
      trail = ('.' * (48 - msg.length))
      print("\e[1m-->\e[0m #{msg} #{trail} ")
      start_jazzy_spinner
    end

    after(task_name) do
      stop_jazzy_spinner
      puts("\e[32m✔\e[0m")
    end
  end

  jazzy_notify 'deploy:update_code',       'Updating codebase'
  jazzy_notify 'deploy:assets:precompile', 'Compiling assets'
  jazzy_notify 'deploy:create_symlink',    'Switching to new release'
  jazzy_notify 'deploy:migrate',           'Migrating database'
  jazzy_notify 'deploy:restart',           'Restarting application'

  # You can also include your own stuff
  jazzy_notify 'config:symlink', 'Updating symlinks'
end