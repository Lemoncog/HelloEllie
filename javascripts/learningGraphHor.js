console.log("learningGraphHor.js ran");

$.getJSON("data/commitLog.json", function(data) {
	mainHor(data);
});

function mainHor(data) {

	var GRAPH_HEIGHT = 200;
	var BAR_WIDTH = 30;

	var jsonData = data;

	console.log("jsonData " + jsonData);

	var graphData = jsonData.commits;
	//var insertionsOnly = jsonObjectToArray(graphData, "insertions");

	console.log("graphData " + graphData);
	console.log("graphData[0].insertions " + graphData[0].insertions);

	var maxInsertion = d3.max(graphData, function(d, index) {

		console.log(d);
		console.log(index);

		return d.insertions;
	});

	console.log("maxInsertion " + maxInsertion);
	console.log("GRAPH_HEIGHT " + GRAPH_HEIGHT);
	console.log("BAR_WIDTH " + BAR_WIDTH);

	var normaliseY = d3.scale.linear().domain([0, maxInsertion]).range([0, GRAPH_HEIGHT]);

	console.log(normaliseY);

	var chart = d3.select(".barChartHor");
	chart.attr("width", BAR_WIDTH * graphData.length);
	chart.attr("height", GRAPH_HEIGHT);

	var bar = chart.selectAll("g");
	var barUpdate = bar.data(graphData);

	//Adds SVG tags (wishful thinking!)
	var barEnter = barUpdate.enter().append("g");
	barEnter.attr("transform", function(d, i) {
		return "translate(" + i * BAR_WIDTH + ",0)";
	});

	barEnter.append("rect").attr("y", function(d) {
		return normaliseY(d.insertions);
	}).attr("width", BAR_WIDTH - 1).attr("height", function(d) {
		return GRAPH_HEIGHT - normaliseY(d.insertions);
	});

	barEnter.append("text").attr("x", BAR_WIDTH / 2).attr("y", function(d) {
		return normaliseY(d.insertions) + 5;
	}).attr("dy", ".35em").text(function(d) {
		return d.insertions;
	});
};

function jsonObjectToArray(jsonObjectArray, key) {
	var jsonArray = [];

	for (var i = 0; i < jsonObjectArray.length; i++) {
		jsonArray.push(jsonObjectArray[i][key]);
	};

	return jsonArray;
};
