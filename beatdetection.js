function process(e) {
	console.log('processing')
	var filteredBuffer = e.renderedBuffer;
	console.log(filteredBuffer)
	//If you want to analyze both channels, use the other channel later
	var data = new Float32Array();
	data = filteredBuffer.getChannelData(0);
	console.log('channel data')
	//var data = e;
	var max = arrayMax(data);
	console.log('max: '+max);
	var min = arrayMin(data);
	var threshold = min + (max - min) * 0.98;
	var peaks = getPeaksAtThreshold(data, threshold);
	console.log('peaks: '+peaks);
	var intervalCounts = countIntervalsBetweenNearbyPeaks(peaks);
	console.log('intervalCounts[0]: '+intervalCounts[0].interval+', '+intervalCounts[0].count);
	var tempoCounts = groupNeighborsByTempo(intervalCounts);
	console.log('tempoCounts: '+tempoCounts);
	tempoCounts.sort(function(a, b) {
	  return b.count - a.count;
	});
	if (tempoCounts.length) {
	  console.log('final tempo: '+tempoCounts[0].tempo);
	  return tempoCounts[0].tempo;

	}
}

function getPeaksAtThreshold(data, threshold) {
	var peaksArray = [];
	var length = data.length;
	for (var i = 0; i < length;) {
		if (data[i] > threshold) {
			peaksArray.push(i);
			// Skip forward ~ 1/4s to get past this peak.
			i += 10000;
		}
		i++;
	}
	return peaksArray;
}

function countIntervalsBetweenNearbyPeaks(peaks) {
	var intervalCounts = [];
	peaks.forEach(function (peak, index) {
		for (var i = 0; i < 10; i++) {
			var interval = peaks[index + i] - peak;
			var foundInterval = intervalCounts.some(function (intervalCount) {
				if (intervalCount.interval === interval)
					return intervalCount.count++;
			});
			if (!isNaN(interval) && interval !== 0 && !foundInterval) {
				intervalCounts.push({
					interval: interval,
					count: 1
				});
			}
		}
	});
	return intervalCounts;
}


function groupNeighborsByTempo(intervalCounts) {
	var tempoCounts = [];
	intervalCounts.forEach(function (intervalCount) {
		//Convert an interval to tempo
		var theoreticalTempo = 60 / (intervalCount.interval / 44100);
		theoreticalTempo = Math.round(theoreticalTempo);
		if (theoreticalTempo === 0) {
			return;
		}
		// Adjust the tempo to fit within the 90-180 BPM range
		while (theoreticalTempo < 90) {

			theoreticalTempo *= 2;
		}
		while (theoreticalTempo > 180) {
			theoreticalTempo /= 2;
		}
		var foundTempo = tempoCounts.some(function (tempoCount) {
			if (tempoCount.tempo === theoreticalTempo) return tempoCount.count += intervalCount.count;
		});
		if (!foundTempo) {
			tempoCounts.push({
				tempo: theoreticalTempo,
				count: intervalCount.count
			});
		}
	});
	return tempoCounts;
}

function arrayMin(arr) {
	var len = arr.length,
		min = Infinity;
	while (len--) {
		if (arr[len] < min) {
			min = arr[len];
		}
	}
	return min;
}

function arrayMax(arr) {
	var len = arr.length,
		max = -Infinity;
	while (len--) {
		if (arr[len] > max) {
			max = arr[len];
		}
	}
	return max;
}