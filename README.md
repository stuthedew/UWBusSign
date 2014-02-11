UWBusSign
=========

##About
This is a node.js app to display the bus arrival times for the Madison (WI) Metro. The app works by scraping the Madison Metro [Accesible Text Site](http://webwatch.cityofmadison.com/webwatch/ada.aspx), and storing them in a mongoDB database. The soones six busses are then displayed on an arrival board utilizing Express. It is designed to run on a Raspberry Pi as eiter a stand-alone unit or as a server-client scheme with a single Raspberry Pi storing the times and hosting the database, and multiple clientRaspberry Pi's each running its own screen.

![alt text](https://raw.github.com/stuthedew/UWBusSign/master/public/images/Screenshot.png "UWBus sign screenshot")


##Install on Raspberry Pi
This setup assumes you have a Raspberry Pi up and running (locales set, root directory expanded etc). If not, run `sudo raspi-config` and follow prompts.


### Step 1 - Install Node.js

Make sure you're running the current version of Raspbian:
```
sudo raspi-config
sudo reboot
```

Upon restart:
```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install
```

Install required dependinces:
```
sudo apt-get install git-core git scons build-essential scons libpcre++-dev xulrunner-dev libboost-dev libboost-program-options-dev libboost-thread-dev libboost-filesystem-dev screen 
```

Install Node.js:
```
wget http://nodejs.org/dist/v0.11.10/node-v0.11.10-linux-arm-pi.tar.gz
tar -xvzf node-v0.11.10-linux-arm-pi.tar.gz
sudo mkdir /opt/node
sudo cp -r node-v0.10.2-linux-arm-pi/* /opt/node
```

Add the node directy to the `PATH` variable:
```
sudo nano /etc/profile

```
Add the following lines afer the last line:
```
...
NODE_JS_HOME="/opt/node"
PATH="$PATH:$NODE_JS_HOME/bin"
export PATH
...
```

Reboot to apply changes.
```
sudo reboot
```


