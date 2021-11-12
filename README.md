# Business Accounting Cloud

Business Accounting Cloud (or BAC) is client-server application that consists of 2 main parts:
* Server app written on NodeJS and fastify
* Client app written on Angular

## Configuration for Ubuntu server
### Server side
* Install NodeJS
  * `curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -`
  * `sudo apt-get install -y nodejs`
* Install Python
  * `sudo apt-get install -y python`
  * `npm install --build-from-source --python=/usr/bin/python3`
* Install SQLite3
  * `sudo apt-get install make gcc g++`
  * `sudo apt-get install sqlite3`
* Run
  * `cd server`
  * `npm install`
  * `npm start`

### Client side
* Run
  * `cd client`
  * `npm install`
  * `npm run build`

## Quick start
* `sudo apt-get install screen`
* `npm i -g local-web-server`
* `sudo /home/ubuntu/bac/hostApp.sh &`
* `screen`, then `/home/ubuntu/bac/startApi.sh &`, then `Ctrl+A` and `D` to detach from screen session (`screen -r` to restore)
