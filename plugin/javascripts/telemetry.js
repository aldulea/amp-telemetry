 (function () {
            amp.plugin('telemetry', function (options) {

                var player = this;
                var intervalId = null;

            	var txtLog = document.getElementById("txtLog");
            	var sendTelemetryInterval = (options != null && options.hasOwnProperty('sendTelemetryInterval') && options.sendTelemetryInterval != null) ? options.sendTelemetryInterval : 30 * 1000; //30 sec default collection rate
            	var streamInfo = {manifestUrl: "", protocol:"", availableVidBitrates:[], availableAudBitrates:[], availableSubs:[], isLive: true};
                var bitrateChangeEvts = [];
               	var playerEvents = [];
               	var playerStatistics = {timeBuffering:0, avgBufferAvailable:0};
               	var streamHistory = {audio:{}, video:{}};
                var playerErrors = [];
               	
               	var isBuffering = false;
               	var timeBufferingStarted = 0;
                var init = function () {



                    console.log("plugin telemetry initialized with player ", player);
      
                  player.addEventListener(amp.eventName.loadedmetadata, function () {

                  intervalId = setInterval(sendTelemetry, sendTelemetryInterval);


                  player.addEventListener(amp.eventName.downloadbitratechanged, logBitrateEvent);
                  player.addEventListener(amp.eventName.playbackbitratechanged, logBitrateEvent);
                  player.addEventListener(amp.eventName.play, logEvent);
                  player.addEventListener(amp.eventName.playing, logEvent);
                  player.addEventListener(amp.eventName.pause, logEvent);
                  player.addEventListener(amp.eventName.skip, logEvent);
                  player.addEventListener(amp.eventName.ended, logEvent);
                  player.addEventListener(amp.eventName.volumechange, logEvent);
                  player.addEventListener(amp.eventName.waiting, logEvent);
                  player.addEventListener(amp.eventName.error, logEvent);
                  player.addEventListener(amp.eventName.fullscreenchange, logEvent);
                  var videoBuffer = player.videoBufferData();
                  var audioBuffer = player.audioBufferData();

                if (videoBuffer) {
                videoBuffer.addEventListener(amp.bufferDataEventName.downloadrequested, logVideoBufferData);
                videoBuffer.addEventListener(amp.bufferDataEventName.downloadcompleted, logVideoBufferData);
                videoBuffer.addEventListener(amp.bufferDataEventName.downloadfailed, logVideoBufferData);
                }

               if (audioBuffer) {
                audioBuffer.addEventListener(amp.bufferDataEventName.downloadrequested, logAudioBufferData);
                audioBuffer.addEventListener(amp.bufferDataEventName.downloadcompleted, logAudioBufferData);
                audioBuffer.addEventListener(amp.bufferDataEventName.downloadfailed, logAudioBufferData);
               }

               window.addEventListener("onbeforeunload", onUnload, false);

              function logBitrateEvent(evt) {
                var ev = {time: new Date().getTime(), type: evt.type};
                bitrateChangeEvts.push(ev);

                //in case I want to react to birate changed
                switch(evt.type) {
                	case amp.eventName.downloadbitratechanged:
                	break;
                	case amp.eventName.playbackbitratechanged:
                	break;
                	default:
                	break;
                }

            }

            function logVideoBufferData(evt) { logBufferData(evt, "video", videoBuffer); };
            function logAudioBufferData(evt) { logBufferData(evt, "audio", audioBuffer); };

            function logBufferData(evt, type, bufferData) {
            	
            	switch (evt.type) {
            		case amp.bufferDataEventName.downloadcompleted:
            		  var bitrate = bufferData.downloadCompleted.mediaDownload.bitrate;
            		  if (streamHistory[type].hasOwnProperty(bitrate)) {
            		  	 streamHistory[type][bitrate].fragmentsDownloaded += 1;
            		  	 streamHistory[type][bitrate].bytesDownloaded += bufferData.downloadCompleted.totalBytes;


            		  } else {
            		  	 streamHistory[type][bitrate] = {fragmentsDownloaded: 1, fragmentsFailed: 0,bytesDownloaded : bufferData.downloadCompleted.totalBytes};
            		  }
            		break;
            		  
            		case amp.bufferDataEventName.downloadfailed:  
            		var bitrate = bufferData.downloadFailed.mediaDownload.bitrate;
            		if (streamHistory[type].hasOwnProperty(bitrate)) {
            		  	 streamHistory[type][bitrate].fragmentsFailed += 1;
            		 
            		  } else {
            		  	 streamHistory[type][bitrate] = {fragmentsDownloaded: 0, fragmentsFailed: 1,bytesDownloaded : 0};
            		  }  
            		break;
            		default:
            		break;
            	}
            }


       		 });
                }

             

                function startCollecting() {
               		console.log("setting interval for telemetry collection..");
                	intervalId = setInterval(trackPlay(), collectTelemetryInterval);
                }

           

                function getStreamInfo() {
                	streamInfo.manifestUrl = player.currentSrc();
                    streamInfo.streamId = extractStreamId(streamInfo.manifestUrl);
                	streamInfo.protocol = player.currentType();
                	streamInfo.availableVidBitrates = getAvailableVidBitrates(); 
                	streamInfo.availableAudBitrates = getAvailableAudioBitrates();
                	streamInfo.isLive = player.isLive() == true ? "live" : "vod";
                }

                //Extract stream id from manifest url
                function extractStreamId(manifest) {
                var sourceManifest = "";
                
                sourceManifest = manifest.split("//")[1];
                if (sourceManifest.match(/.ism\/manifest/i)) {
                    sourceManifest = sourceManifest.split(/.ism\/manifest/i)[0] + ".ism/manifest";
                }
                return sourceManifest;
                }

                function getAvailableBuffer() {
            		var buffered = player.buffered();
            		var currentTime = player.currentTime();

            		if (!buffered) {
                	return -1;
           			}
           			var buffSec = buffered.end(buffered.length - 1) - currentTime;
            		return Math.round(buffSec * 1000); //return time in miliseconds
        		}

                function getAvailableVidBitrates() {
                	var st = player.currentVideoStreamList();
                	if (typeof(st) == 'undefined') return [];
                	var streams = st.streams;
                	var result = [];
                	for (var i = 0; i< streams.length; i++) {
                		var tracks = streams[i].tracks;
                		for (var j = 0; j< tracks.length; j++) {
                 			var bitRateType = {bitrate:tracks[j].bitrate, height:tracks[j].height, width: tracks[j].width};
                 			result.push(bitRateType)
                 		}
                	}
                	
                	return result;
                }

                 function getAvailableAudioBitrates() {
                	var st = player.currentAudioStreamList();
                	if (typeof(st) == 'undefined') return [];
                	var streams = st.streams;
                	var result = [];
                	for (var i = 0; i< streams.length; i++) {
                			result.push(streams[i].bitrate);
                 		
                	}
                	
                	return result;
                }

              


              function logEvent (evt) {


   
                	switch (evt.type) {

                		//treating player events
                		case amp.eventName.pause:
                		case amp.eventName.skip:
                		case amp.eventName.play:
                		case amp.eventName.volumechange:
                		case amp.eventName.ended:
                		case amp.eventName.fullscreenchange:
                		

                		var newEvt = {streamId: streamInfo.streamId, evTpe: evt.type, timeStamp: new Date().getTime() };
                		playerEvents.push(newEvt);
                		break;

                		case amp.eventName.waiting:
                		isBuffering = true;
                		timeBufferingStarted = new Date().getTime();
                		var newEvt = {streamId: streamInfo.streamId, evTpe: evt.type, timeStamp: new Date().getTime() };
                		playerEvents.push(newEvt);
                		break;

                		case amp.eventName.playing:
                		getStreamInfo();
                		if (isBuffering) {
                			isBuffering = false;
                			var now = new Date().getTime();
                			playerStatistics.timeBuffering += now - timeBufferingStarted;
                		}
                		break;

                        case amp.eventName.error:
                        var errorDetails = player.error();
                        var code = errorDetails.code;
                        var newEvt = {streamId: streamInfo.streamId, errorCode: code, timeStamp: new Date().getTime() };
                        playerErrors.push(newEvt);

                        break;

                		case amp.eventName.ended:

                		var newEvt = {streamId: streamInfo.streamId, evTpe: evt.type, timeStamp: new Date().getTime() };
                		playerEvents.push(newEvt);
                        sendTelemetry();
                        if (intervalId != null) {
                            clearInterval(intervalId);
                            intervalId = null;
                        }
                        break;
                		default:
                		console.log("Event not treated! ", evt);
                		break;

                	}

                }

                function sendTelemetry() {
                	getStreamInfo();
                	playerStatistics.avgBufferAvailable = getAvailableBuffer();
                	var json = {
                		"streamInfo": streamInfo,
                		"streamHistory": streamHistory, 
                		"playerEvents": playerEvents,
                		"playerStatistics": playerStatistics,
                		"bitrateChangeEvts": bitrateChangeEvts,
                		"streamHistory": streamHistory,
                        "playerErrors": playerErrors
                	}
                
                	//console.log(JSON.stringify(json));
                    $.ajax({
                    type: "POST",
                    url: "/saveTelemetry",
                    processData: false,
                    contentType: 'application/json',
                    data: JSON.stringify(json),
                    success: function(r) {
                        console.log("Telemetry Saved!");
                    }})


                	resetValues();
    
                }


                function resetValues() {
                streamInfo = {manifestUrl: "", protocol:"", availableVidBitrates:[], availableAudBitrates:[], availableSubs:[], isLive: true};
                bitrateChangeEvts = [];
                playerEvents = [];
                playerStatistics = {timeBuffering:0, avgBufferAvailable:0};
               	streamHistory = {audio:{}, video:{}};
                playerErrors = [];
				timeBufferingStarted = 0;
                }

                function onUnload() {
                	sendTelemetry();
                }


            

                // initialize the plugin
                init();
            });
        }).call(this);