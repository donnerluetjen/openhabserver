# config valid only for Capistrano 3.1
# lock '3.1.0'

set :application, 'openhab'
set :repo_url, 'https://github.com/donnerluetjen/openhabserver.git'

# Default branch is :master
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }

# Default deploy_to directory is /var/www/my_app
set :deploy_via, :remote_cache
set :deploy_to, '~/applications/openhab'
set :deploy_user, 'pi'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# there are :debug, :info, :warn, :error, :fatal
set :log_level, :info

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, %w{config/database.yml}

# Default value for linked_dirs is []
# set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
set :keep_releases, 20

# files which need to be symlinked to other parts of the
# filesystem. For example nginx virtualhosts, log rotation
# init scripts etc.
# set(:symlinks, [
#   {
#     source: "nginx.conf",
#     link: "/etc/openhab/configurations/#{fetch(:full_app_name)}"
#   },
#   {
#     source: "unicorn_init.sh",
#     link: "/etc/init.d/unicorn_#{fetch(:full_app_name)}"
#   },
#   {
#     source: "log_rotation",
#    link: "/etc/logrotate.d/#{fetch(:full_app_name)}"
#   },
#   {
#     source: "monit",
#     link: "/etc/monit/conf.d/#{fetch(:full_app_name)}.conf"
#   }
# ])

namespace :deploy do

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      # Your restart mechanism here, for example:
      # execute :touch, release_path.join('tmp/restart.txt')
    end
  end

  after :publishing, :restart

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

end
