self.addEventListener('message', function(e) {
	for(var t = 0; t < 1; t ++) {
		var length = e.data[t].length;
		for(var i = 0; i < length; i++) {
			e.data[t][i] = e.data[t][i] >= .02 ? e.data[t][i] - .02 : 0;
		}
		//data.datasets[t].data.push(ants.colonies[t].population)
	}
  self.postMessage(e.data);
}, false);