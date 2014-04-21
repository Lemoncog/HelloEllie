console.log('This would be the main JS file.');

requirejs.config({
	paths : {
		d3 : 'd3'
	},
	'learningGraphHor': ['d3'],
    'learningGraphVert': ['d3']
});


require(['jquery-1.11.0', 'd3', 'learningGraphHor', 'learningGraphVert'], function(jquery, d3, graphHor, graphVert) {
	console.log('d3 : ' + d3);
	console.log('Everything is loaded!');
	console.log('graphHor ' + graphHor);
	//generateGraph(graphHor, d3);
	generateGraph(new graphVert(), d3);
});

function generateGraph(graphLib, d3) {
	console.log("graphLib " + graphLib);


	graphLib.costomiseMappings('filesChanged', 'insertions');

	$.getJSON("data/commitLog.json", function(data) {
				graphLib.generateGraph(d3, data);
	});
};
