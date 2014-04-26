console.log("BlobGraph ran");

var BlobGraph = function() {

	var xAxisKey;
	var yAxisKey;

	this.costomiseMappings = function(axisKeyX, axisKeyY) {
		xAxisKey = axisKeyX;
		yAxisKey = axisKeyY;
	};

	this.generateGraph = function(d3, data) {
		var graphData = data.commits;
		
		var MARGIN = { top : 20, right : 30, bottom : 30, left: 40};
		var GRAPH_HEIGHT = 500 - MARGIN.top - MARGIN.bottom;
		var GRAPH_WIDTH = 800 - MARGIN.left - MARGIN.right;
		var jsonData = data;
		
		console.log("yAxisKey = " + yAxisKey);
		
		var maxInsertion = d3.max(graphData, function(d, index) {			
			return d[yAxisKey];
		});

		var normaliseX = d3.scale.ordinal().rangeRoundBands([0, GRAPH_WIDTH], .1);
		var normaliseY = d3.scale.linear().range([GRAPH_HEIGHT, 0]);
		
		normaliseX.domain(graphData.map(function(d){ return d[xAxisKey];}));
		normaliseY.domain([0, maxInsertion]);

		console.log(normaliseY);
		
		var xAxis = d3.svg.axis();
		xAxis.scale(normaliseX);
		xAxis.orient("bottom");
		
		var yAxis = d3.svg.axis();
    	yAxis.scale(normaliseY);
    	yAxis.orient("left");
    	yAxis.ticks(10, "%");

		//Note - This is actually the g object!
		var chart = d3.select(".graphPlaceholder")
		.attr("width", GRAPH_WIDTH + MARGIN.left + MARGIN.right)
		.attr("height", GRAPH_HEIGHT + MARGIN.top + MARGIN.bottom)
		.append("g").attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")");
				
		chart.append("g")
		.attr("class", "x axis")
    	.attr("transform", "translate(0," + GRAPH_HEIGHT + ")")
    	.call(xAxis);

		chart.append("g")
      	.attr("class", "y axis")
      	.call(yAxis)
      	.append("text")
      	.text("Health")
      	.append("text")
      	.attr("transform", "rotate(-90)")
      	.attr("y", 6)
      	.attr("dy", ".71em")
      	.style("text-anchor", "end")
      	.text("Frequency");
    	    		
		var barEnter = chart.selectAll(".bar")
		.data(graphData)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", function(d) {
			return normaliseX(d[xAxisKey]);
		})
		.attr("y", function(d) {
			return normaliseY(d[yAxisKey]);
		})
		.attr("width", normaliseX.rangeBand() )
		.attr("height", function(d) {
			return GRAPH_HEIGHT - normaliseY(d[yAxisKey]);
		});
	};

	var jsonObjectToArray = function(jsonObjectArray, key) {
		var jsonArray = [];

		for (var i = 0; i < jsonObjectArray.length; i++) {
			jsonArray.push(jsonObjectArray[i][key]);
		};

		return jsonArray;
	};
};
