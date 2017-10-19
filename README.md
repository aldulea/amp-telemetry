# Azure Media Player Telemetry Plugin

A plugin for the Azure Media Player to collect telemetry info.
Used Express + mysql + pug to store and display the telemetry.

Sample database is avalable in the telemetry.sql file.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine.
By default it will start on port 3000.


### Prerequisites

```
node
```

```
npm
```

### Installing

* Download or clone
* Configure database connection in app.js

```
npm install
```

```
npm start
```

```
access http://localhost:3000/
```

On the main page are 7 links:

1. /plugin - starts the video player page with the telemetry plugin
2. /streamInfo - displays stream info from db as table
3. /streamHistory - displays the stream history from db as table
4. /playerEvents - displays player events from db as table
5. /bitrateChanges - displays bitrate changes from db as table
6. /playerStatistics - displays player statistics from db as table
7. /playerErrors - displays player errors from db as table




## Libraries used:

* [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [mysql](https://github.com/mysqljs/mysql) -A pure node.js JavaScript Client implementing the MySql protocol
* [pug](https://pugjs.org) -  Robust, elegant, feature rich template engine for Node.js




## Authors

* **Alexandru Aldulea** - *Initial work* -


