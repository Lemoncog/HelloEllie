console.log("learningGraphVert.js ran");

$.getJSON("data/commitLog.json", function(data) {
	mainVert(data);
}); 

function mainVert (data) {
	
	var GRAPH_WIDTH = 400;
	var BAR_HEIGHT = 20;

	
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
	console.log("GRAPH_WIDTH " + GRAPH_WIDTH);

	var normaliseX = d3.scale.linear()
	.domain([0, maxInsertion])
	.range([0, GRAPH_WIDTH]);
	
	console.log(normaliseX);

	var chart = d3.select(".barChartVert");
	chart.attr("width", GRAPH_WIDTH);
	chart.attr("height", BAR_HEIGHT * graphData.length);
	
	var bar = chart.selectAll("g");
	var barUpdate = bar.data(graphData);
	
	//Adds SVG tags (wishful thinking!)
	var barEnter = barUpdate.enter().append("g");
	barEnter.attr("transform", function(d, i) { return "translate(0,"+ i * BAR_HEIGHT + ")"; });

	barEnter.append("rect")
	.attr("width", function(d) { return normaliseX(d.insertions);})
	.attr("height", BAR_HEIGHT - 1);

	barEnter.append("text")
	.attr("x", function(d) { return normaliseX(d.insertions) - 3;})
	.attr("y", BAR_HEIGHT /2 )
	.attr("dy", ".35em")
	.text(function(d) { return d.insertions;});
};


function jsonObjectToArray(jsonObjectArray, key) {
	var jsonArray = [];

	for (var i = 0; i < jsonObjectArray.length; i++) {
		jsonArray.push(jsonObjectArray[i][key]);
	};

	return jsonArray;
};
