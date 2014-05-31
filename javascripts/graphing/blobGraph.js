console.log("BlobGraph ran");

var BlobGraph = function() {
	this.generateGraph = function(d3, data) {
		var graphData = data;
		
		var MARGIN = { top : 20, right : 30, bottom : 30, left: 40};
		var GRAPH_HEIGHT = 500 - MARGIN.top - MARGIN.bottom;
		var GRAPH_WIDTH = 9999 - MARGIN.left - MARGIN.right;
		
		var normaliseX = d3.scale.ordinal().rangeRoundBands([0, GRAPH_WIDTH], .1);
		var normaliseY = d3.scale.linear().range([GRAPH_HEIGHT, 0]);
		var normaliseRadius = d3.scale.linear().range([120, 5]);
		
		normaliseX.domain(graphData.map(function(d){ return d.commitNo}));
		normaliseY.domain([0, 1]);

		console.log(normaliseY);
		
		var xAxis = d3.svg.axis();
		xAxis.scale(normaliseX);
		xAxis.orient("bottom");
		
		var yAxis = d3.svg.axis();
    	yAxis.scale(normaliseY);
    	yAxis.orient("left");

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
    	
		var barEnter = chart.selectAll(".circles")
		.data(graphData)
		.enter().append("circle")
		.attr("class", "blobs")
		.attr("cx", function(d) {
			return normaliseX(d.commitNo);
		})
		.attr("cy", function(d) {
			return normaliseY(d.circle.scl);
		})
		.attr("width", normaliseX.rangeBand() )
		.attr("r", function(d) {
			return normaliseRadius(d.circle.scl);
		})
		.style("fill", function(d) {
			return d.circle.color;
		})
		.on('click', function(d, i) {
      		alert(d.hoverOn.title + "\n" + d.hoverOn.subtitle + "\n" + d.hoverOn.description);
      	});
		
		    	  
    	var authors = chart.selectAll(".authors")
    	.data(graphData)
    	.attr("class", "label")
    	.enter().append("text")
    	.text(function(d) {
    		return d.hoverOn.title;
    	})
    	.attr("x", function(d) {
			return normaliseX(d.commitNo);
		})
		.attr("y", function(d) {
			return normaliseY(d.circle.scl);
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
