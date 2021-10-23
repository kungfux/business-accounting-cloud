#!/bin/sh
#http-server -p 80 ./client/dist/bac -a 0.0.0.0 -d 0 -g 1 --no-dotfiles --cors
ws --spa index.html --directory ./client/dist/bac --log.format dev --port 80
#--cors.origin "*"