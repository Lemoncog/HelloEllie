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
	graphHor.generateGraph(d3);
	graphVert.generateGraph(d3);
	
});