var logLocation = "../gitLog.raw";

console.log("trying " + logLocation);

$.get(logLocation, function(data) {
	
	console.log(data);
	
	var logFile = $(data);

	console.log(logFile);

	var lines = logFile.split("\n");
	
	for (var i = 0, len = lines.length; i < len; i++) {
		console.log("line" + lines[i]);
	}
});
