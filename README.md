UWBusSign
=========

##About
This is a node.js app to display the bus arrival times for the Madison (WI) Metro. The app works by scraping the Madison Metro [Accesible Text Site](http://webwatch.cityofmadison.com/webwatch/ada.aspx), and storing them in a mongoDB database. The soones six busses are then displayed on an arrival board utilizing Express. It is designed to run on a Raspberry Pi as eiter a stand-alone unit or as a server-client scheme with a single Raspberry Pi storing the times and hosting the database, and multiple clientRaspberry Pi's each running its own screen.

![alt text](https://github.com/stuthedew/USBusSign/master/src/public/images/Screenshot.png "UWBus sign screenshot")


##Install on Raspberry Pi
