#!/usr/bin/env bash

# this file is copied into ../.git/hooks and made executable

echo "Post commit routine started"

# there is no local post update hook
# so I could create a script that runs the push and then
# when push has completed, runs the cap deploy command