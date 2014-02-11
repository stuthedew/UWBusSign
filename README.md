UWBusSign
=========

##About
This is a node.js app to display the bus arrival times for the Madison (WI) Metro. The app works by scraping the Madison Metro [Accesible Text Site](http://webwatch.cityofmadison.com/webwatch/ada.aspx), and storing them in a mongoDB database. The soones six busses are then displayed on an arrival board utilizing Express. It is designed to run on a Raspberry Pi as eiter a stand-alone unit or as a server-client scheme with a single Raspberry Pi storing the times and hosting the database, and multiple clientRaspberry Pi's each running its own screen.

![alt text](https://raw.github.com/stuthedew/UWBusSign/master/public/images/Screenshot.png "UWBus sign screenshot")


##Install on Raspberry Pi (running a stand-alone scheme)
This setup assumes you have a Raspberry Pi up and running (locales set, root directory expanded etc). If not, run `sudo raspi-config` and follow prompts.

### Step 1 - Update and install dependencies.


Make sure you're running the current version of Raspbian:
```sh
sudo raspi-config
sudo reboot
```

Upon restart:
```sh
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install
```

Install required dependencies:
```sh
sudo apt-get install git-core git scons build-essential scons libpcre++-dev xulrunner-dev libboost-dev libboost-program-options-dev libboost-thread-dev libboost-filesystem-dev screen usbmount
```

### Step 2 - Install Node.js.

Get Node.js and install:
```sh
wget http://nodejs.org/dist/v0.11.10/node-v0.11.10-linux-arm-pi.tar.gz
tar -xvzf node-v0.11.10-linux-arm-pi.tar.gz
sudo mkdir /opt/node
sudo cp -r node-v0.10.2-linux-arm-pi/* /opt/node
```

Add the node directory to `PATH`:
```sh
sudo nano /etc/profile
```
Add the following lines to `etc/profile` after the last line:
```sh
...
NODE_JS_HOME="/opt/node"
PATH="$PATH:$NODE_JS_HOME/bin"
export PATH
```

Reboot to apply changes.
```sh
sudo reboot
```

### Step 3 - Install UWBusSign.

```sh
git clone git://github.com/stuthedew/UWBusSign.git
cd UWBusSign
npm install
```

### Step 4 - Install MongoDB.
```sh
git clone git://github.com/RickP/mongopi.git
cd mongopi
```

(Takes a **LONG** time to build. )
```sh
sudo screen -Dms sconsBuild sudo scons 
```

(Also takes a long time).
**Optional**: View build process using `sudo screen -r sconsBuild`. Detach with `Ctl-A-D`.

```sh
sudo screen -Dms sconsInstall sudo scons --prefix=/opt/mongo install
```

**Optional**: View build process using `sudo screen -r sconsInstall`. Detach with `Ctl-A-D`.

```sh
scons -c
```

##Start UWBusSign App

###Step 1 - Configure MongoDB to autostart.

1.. Add the mongoDB directory to `PATH`:
```sh
sudo nano /etc/profile
```

2.. Add the following lines to `etc/profile` after the last line:
```sh
...
MONGODB_HOME="/opt/mongo"
PATH="$PATH:MONGODB_HOME_JS_HOME/bin"
export PATH
```
3.. Create database directory:
```sh
#Assumes you are using a usb thumb drive and have usbmount installed (from install step 1).
#Database file will be updated frequently. Using a flash drive will increase the longevity of the Raspberry Pi SD card.

sudo mkdir /media/usb/mongoDB
sudo mkdir /media/usb/mongoDB/data
```

4.. Add the following to `/etc/rc.local` after the last line:

```sh
...

sudo screen -dmS mongo ./mongod --dbpath /media/usb/mongoDB/data
# Access session using 'sudo screen -r mongo'. Detach with Ctl-A-D.
```

###Step 2 - Configure UWBusSign App to autostart

1.. Add the following to `/etc/rc.local` after the last line:

```sh
...
cd /home/pi/UWBusSign
node app.js
```
