//Web Audio Variables
var context;
var analyser;
var buffer;
var url = 'http://127.0.0.1:8887/data/voyager.mp3'
var array = new Array();
//Tempo from beat detection
var finalTempo;

try {
	if(typeof webkitAudioContext === 'function' || 'webkitAudioContext' in window) {
		context = new webkitAudioContext();
	}
	else {
		context = new AudioContext();
	}
}
catch(e) {
	$('#info').text('Web Audio API is not supported in this browser');
}

// Web Audio
var request = new XMLHttpRequest();
request.open('GET', url, true);
request.responseType = "arraybuffer";
request.onload = function() {
    context.decodeAudioData(
        request.response,
        function(buffer) {
			prepare(buffer);
			/*
			offlineContext.oncomplete = function(e) {
				var filteredBuffer = e.renderedBuffer;
				console.log('filtered');
				array = new Uint8Array(filteredBuffer);
				analyser.getByteFrequencyData(array);
				boost = 0;
				for (var i = 0; i < array.length; i++) {
		            boost += array[i];
		        }
				boost = boost / array.length;
				console.log(array);
			};*/
			/*
            if(!buffer) {
                // Error decoding file data
                return;
            }
            sourceJs = context.createScriptProcessor(2048, 1, 1);
			sourceJs.buffer = buffer;
			sourceJs.connect(context.destination);
			analyser = context.createAnalyser();
			analyser.smoothingTimeConstant = 0.6;
			analyser.fftSize = 512;

			source = context.createBufferSource();
			source.buffer = buffer;
			source.loop = true;

			source.connect(analyser);
			analyser.connect(sourceJs);
			source.connect(context.destination);

			sourceJs.onaudioprocess = function(e) {
				array = new Uint8Array(analyser.frequencyBinCount);
				analyser.getByteFrequencyData(array);
				boost = 0;
				for (var i = 0; i < array.length; i++) {
		            boost += array[i];
		        }
		        boost = boost / array.length;
			};
			
			var offlineContext = new OfflineAudioContext(1, buffer.length, buffer.sampleRate);
			var offlineSource = offlineContext.createBufferSource();
			offlineSource.buffer = buffer;

			var filter = offlineContext.createBiquadFilter();
			offlineSource.connect(filter);
			filter.connect(offlineContext.destination);
			filter.type = 'low pass';
			filter.frequency.value = 440;
			offlineSource.connect(filter);
			filter.connect(offlineContext.destination);

			source.start(0);
			offlineSource.start(0);

			offlineContext.startRendering();
			offlineContext.oncomplete = function(e) {
				var filteredBuffer = e.renderedBuffer;
				var data = filteredBuffer.getChannelData(0);
				var max = arrayMax(data);
				var min = arrayMin(data);
				var threshold = min + (max - min) * 0.98;
				var peaks = getPeaksAtThreshold(data, threshold);
				var intervalCounts = countIntervalsBetweenNearbyPeaks(peaks);
				var tempoCounts = groupNeighborsByTempo(intervalCounts);
				tempoCounts.sort(function(a, b) {
				  return b.count - a.count;
				});
				if (tempoCounts.length) {
				  console.log(tempoCounts[0].tempo);
				}
			}*/
        },

        function(error) {
            // Decoding error
        }
    );
};
request.send();

function prepare(buffer) {
	console.log(buffer.getChannelData(0))
	var offlineContext = new OfflineAudioContext(1, buffer.length, buffer.sampleRate);
	var source = offlineContext.createBufferSource();
	source.buffer = buffer;
	var filter = offlineContext.createBiquadFilter();
	filter.type = "lowpass";
	source.connect(filter);
	filter.connect(offlineContext.destination);
	source.start(0);
	offlineContext.startRendering();
	
	offlineContext.oncomplete = function(e_) {
		//console.log('e = '+e_.renderedBuffer.getChannelData(0));
		finalTempo = process(e_);
		
		var song = context.createScriptProcessor(2048, 1, 1);
		song.buffer = e_;
		song.connect(context.destination);
		analyser = context.createAnalyser();
		analyser.smoothingTimeConstant = 0.6;
		analyser.fftSize = 512;

		source_ = context.createBufferSource();
		source_.buffer = buffer;
		source_.loop = false;

		source_.connect(analyser);
		analyser.connect(song);
		source_.connect(context.destination);

		song.onaudioprocess = function (e) {
			array = new Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(array);
			boost = 0;
			for (var i = 0; i < array.length; i++) {
				boost += array[i];
			}
			boost = boost / array.length;
		};
		source_.start(0);
	};
  }
