console.log("LearningGraphVert ran");

var LearningGraphVert = function() {

	var xAxisKey;
	var yAxisKey;
	console.log('LearningGraphVert Constr ran');

	this.costomiseMappings = function(xKey, yKey) {
		xAxisKey = xKey;
		yAxisKey = yKey;

		console.log('xAxisKey + yAxisKey ' + xAxisKey + yAxisKey);
	};

	this.generateGraph = function(d3, data) {

		console.log('generateGraph start');

		var GRAPH_WIDTH = 400;
		var BAR_HEIGHT = 20;

		var jsonData = data;

		console.log("jsonData " + jsonData);

		var graphData = jsonData.commits;

		//This means in this function, can't access xAxisKey as its scope is not this function!
		console.log('this.xAxisKey + this.yAxisKey ' + this.xAxisKey + this.yAxisKey);
		console.log('xAxisKey + yAxisKey ' + xAxisKey + yAxisKey);

		var maxChanges = d3.max(graphData, function(d, index) {
			console.log('innerxAxisKey ' + xAxisKey);

			return d[xAxisKey];
		});

		console.log("maxChanges " + maxChanges);
		console.log("GRAPH_WIDTH " + GRAPH_WIDTH);

		var normaliseX = d3.scale.linear().domain([0, maxChanges]).range([0, GRAPH_WIDTH]);

		console.log(normaliseX);

		var chart = d3.select(".barChartVert");
		chart.attr("width", GRAPH_WIDTH);
		chart.attr("height", BAR_HEIGHT * graphData.length);

		var bar = chart.selectAll("g");
		var barUpdate = bar.data(graphData);

		//Adds SVG tags (wishful thinking!)
		var barEnter = barUpdate.enter().append("g");
		barEnter.attr("transform", function(d, i) {
			return "translate(0," + i * BAR_HEIGHT + ")";
		});

		barEnter.append("rect").attr("width", function(d) {
			return normaliseX(d[xAxisKey]);
		}).attr("height", BAR_HEIGHT - 1);

		barEnter.append("text").attr("x", function(d) {
			return normaliseX(d[xAxisKey]) - 3;
		}).attr("y", BAR_HEIGHT / 2).attr("dy", ".35em").text(function(d) {
			return d[xAxisKey];
		});
	};

	function jsonObjectToArray(jsonObjectArray, key) {
		var jsonArray = [];

		for (var i = 0; i < jsonObjectArray.length; i++) {
			jsonArray.push(jsonObjectArray[i][key]);
		};

		return jsonArray;
	};
};