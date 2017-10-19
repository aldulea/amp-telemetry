var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var mysql = require('mysql');

var app = express();

//setup connetion to db here!!
function getMySQLConnection() {
	return mysql.createConnection({
	  host     : '127.0.0.1',
	  user     : 'root',
	  password : '',
	  database : 'telemetry',
	  multipleStatements: true
	});
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//map /plugin to static html page
app.use('/plugin', express.static(path.join(__dirname, 'plugin')));


app.use('/', index);

app.get('/streamInfo', function(req, res) {
	var streamInfoList = [];

	// Connect to MySQL database.
	var connection = getMySQLConnection();
	connection.connect();

	// Do the query to get data.
	connection.query('SELECT * FROM stream_info', function(err, rows, fields) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
	  		// Loop check on each row
	  		for (var i = 0; i < rows.length; i++) {

	  			// Create an object to save current row's data
		  		var streamInfo = {
		  			'id':rows[i].id,
		  			'streamId':rows[i].streamId,
		  			'manifestUrl':rows[i].manifestUrl,
		  			'protocol':rows[i].protocol,
		  			'availableVidBitrates': rows[i].availableVidBitrates,
		  			'availableAudBitrates': rows[i].availableAudBitrates,
		  			'availableSubs': rows[i].availableSubs,
		  			'isLive': rows[i].isLive
		  		}
		  		// Add object into array
		  		streamInfoList.push(streamInfo);
	  	}

	  	// Render index.pug page using array 
	  	res.render('streaminfo', {"streamInfoList": streamInfoList});
	  	}
	});

	// Close the MySQL connection
	connection.end();
	
});


app.get('/streamHistory', function(req, res) {
	var streamHistory = [];

	// Connect to MySQL database.
	var connection = getMySQLConnection();
	connection.connect();

	// Do the query to get data.
	connection.query('SELECT * FROM stream_history', function(err, rows, fields) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {

	  	// Render index.pug page using array 
	  	res.render('streamhistory', {"streamHistoryList": rows});
	  	}
	});

	// Close the MySQL connection
	connection.end();
	
});

app.get('/playerEvents', function(req, res) {


	// Connect to MySQL database.
	var connection = getMySQLConnection();
	connection.connect();

	// Do the query to get data.
	connection.query('SELECT * FROM player_events', function(err, rows, fields) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {

	  	// Render index.pug page using array 
	  	res.render('playerevents', {"playerEvents": rows});
	  	}
	});

	// Close the MySQL connection
	connection.end();
	
});

app.get('/bitrateChanges', function(req, res) {

	// Connect to MySQL database.
	var connection = getMySQLConnection();
	connection.connect();

	// Do the query to get data.
	connection.query('SELECT * FROM bitrate_changes', function(err, rows, fields) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {

	  	// Render index.pug page using array 
	  	res.render('bitratechanges', {"bitrateChanges": rows});
	  	}
	});

	// Close the MySQL connection
	connection.end();
	
});

app.get('/playerStatistics', function(req, res) {

	// Connect to MySQL database.
	var connection = getMySQLConnection();
	connection.connect();

	// Do the query to get data.
	connection.query('SELECT * FROM player_statistics', function(err, rows, fields) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {

	  	// Render index.pug page using array 
	  	res.render('playerstatistics', {"playerStatistics": rows});
	  	}
	});

	// Close the MySQL connection
	connection.end();
	
});



app.get('/playerErrors', function(req, res) {

	// Connect to MySQL database.
	var connection = getMySQLConnection();
	connection.connect();

	// Do the query to get data.
	connection.query('SELECT * FROM player_errors', function(err, rows, fields) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {

	  	// Render index.pug page using array 
	  	res.render('playererrors', {"playerErrors": rows});
	  	}
	});

	// Close the MySQL connection
	connection.end();
	
});


app.post('/saveTelemetry', function(req,res){

	var connection = getMySQLConnection();
	connection.connect();

	var sql ="";
	//sql for stream info
	var sqlStream = "INSERT INTO stream_info (streamId, manifestUrl, protocol, availableVidBitrates, availableAudBitrates, availableSubs, isLive) VALUES ?";
	var streamInfo = req.body.streamInfo;
	

	//saving player events first
	
	var sqlPlayerEvents = "INSERT INTO player_events (streamId, eventType, time) VALUES ?";
	var playerEvents = req.body.playerEvents;
	//create nested array for multiple insert
	var playerEventsVals = new Array();
	for (var i = 0; i < playerEvents.length; i++) {
		var itm = playerEvents[i];
		//grab values manually, js cant assure obj keys order
		playerEventsVals.push([streamInfo.streamId, itm.evTpe, itm.timeStamp]);

	}

	
	var avVidBitrates = streamInfo.availableVidBitrates;

	//saving stream info
	//concatenate values from available bitrates 
	//TODO: save in this in different table, use join for display
	var vBitRatesString = "";
	if (avVidBitrates.length > 0) {
		for (var i = 0; i < avVidBitrates.length; i++) {
			//{"bitrate":1490441,"height":540,"width":960}
			var itm = avVidBitrates[i];
			vBitRatesString += "bitrate:"+itm.bitrate + ", h:"+ itm.height + ", w:" + itm.width + ";";

		}
	}
	var streamInfoArr = [streamInfo.streamId,streamInfo.manifestUrl, streamInfo.protocol, vBitRatesString, streamInfo.availableAudBitrates.toString(), streamInfo.availableSubs.toString(), streamInfo.isLive];

	//sql for stream history
	var sqlStreamHistory = "INSERT INTO stream_history (streamId, bitrate, bitrateType, downloadedFragments, failedFragments, bytesDownloaded) VALUES ?";
	var strHistory= req.body.streamHistory;
	var streamHistorysArray = [];

	//constructuing array of values of each bitrate history 
	//again grab values manually to assure the right order 
	//bitrates were grouped by type
	for (var brType in strHistory) {
	var obj = strHistory[brType];
	for (var key in obj){
    if (obj.hasOwnProperty(key)) {
         var bitrate = key;
         var bitrateType = brType;
         var downloadedFragments = obj[key]['fragmentsDownloaded'];
         var failedFragments = obj[key]['fragmentsFailed'];
         var bytesDownloaded = obj[key]['bytesDownloaded'];
         var valsAsArray = [streamInfo.streamId, bitrate, bitrateType, downloadedFragments, failedFragments, bytesDownloaded];
         streamHistorysArray.push(valsAsArray);

    	}
		}
	}
	

	//prepare players stats for db 
	var sqlPlayerStats = "INSERT INTO player_statistics (streamId, timeBuffering, averageBuffer) VALUES ?";
	var playerStats = req.body.playerStatistics;
	var playerStatsAsArray = [streamInfo.streamId, playerStats.timeBuffering, playerStats.avgBufferAvailable];
	console.log("playerStats", playerStatsAsArray);
	//prepaere player errors for db 
	
	
	var playerErrors = req.body.playerErrors;
	var sqlPlayerErrors = "";
	var playerErrorsVals = new Array();
	//create nested array for multiple insert
	if (playerErrors.length > 0) {
	sqlPlayerErrors = "INSERT INTO player_errors (streamId, errorCode, time) VALUES ?";
	for (var i = 0; i < playerErrors.length; i++) {
		var itm = playerErrors[i];
		//grab values manually, js cant assure obj keys order
		playerErrorsVals.push([streamInfo.streamId, itm.errorCode, itm.timeStamp]);

	}
	}

	var bitrateChanged = req.body.bitrateChangeEvts;
	var sqlBrChanged = "";
	var brChangedVals = new Array();
	//create nested array for multiple insert
	if (bitrateChanged.length > 0) {
	sqlBrChanged = "INSERT INTO bitrate_changes (streamId, type, time) VALUES ?";
	for (var i = 0; i < bitrateChanged.length; i++) {
		var itm = bitrateChanged[i];
		//grab values manually, js cant assure obj keys order
		brChangedVals.push([streamInfo.streamId, itm.type, itm.time]);

	}
	}



	//constructing final sql + nested array for values, prevent errors if some arrays are empty
	var valsToInsert = new Array();
	var sql = "";
	
	//adding stream info
	sql += sqlStream + "; ";
	valsToInsert.push([streamInfoArr]);

	//adding player events if they exist
	if (playerEventsVals.length > 0) {
		sql += sqlPlayerEvents + "; ";
		valsToInsert.push(playerEventsVals);
	}

	//adding stream info history
	if (streamHistorysArray.length > 0) {
		sql += sqlStreamHistory + "; ";
		valsToInsert.push(streamHistorysArray);
	}

	sql += sqlPlayerStats + "; ";
	valsToInsert.push([playerStatsAsArray]);

	//adding bitrate change 
	if (brChangedVals.length > 0) {
		sql += sqlBrChanged + "; ";
		valsToInsert.push(brChangedVals);
	}

	//adding errors 
	if (playerErrorsVals.length > 0) {
		sql += sqlPlayerErrors + "; ";
		valsToInsert.push(playerErrorsVals);
	}


	connection.query(sql, valsToInsert, function(err) {	 	
    if (err) res.status(500).json({"status_code": 500,"status_message": "internal server error"});
    connection.end();
    res.json({success : "Saved Successfully", status : 200});
  
	});

});





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
