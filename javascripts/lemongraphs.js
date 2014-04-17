console.log('lemongraphs.js ran');


var GRAPH_HEIGHT = 300;
var GRAPH_WIDTH = 600;

function drawAxis(isX, width, height) {
	drawLine(0, height, isX ? width : 0, isX ? height : 0 , "rgba(0, 0, 0, 0.5)", 5);
}

function drawLine(x, y, width, height, color, lineWidth) {
	var line = two.makeLine(x, y,  width, height);
	line.linewidth = lineWidth;
	line.stroke = color;
}

function drawGrid(xCount, yCount) {
	
	var xStep = GRAPH_WIDTH/xCount;
	var yStep = GRAPH_HEIGHT/yCount;
	var lineColor = "rgba(0, 50, 50, 0.2)";
	
	console.log(xStep);
	console.log(yStep);
	
	for(var x = 0; x < xCount; x++) {
		drawLine(xStep*x, 0, xStep*x, GRAPH_HEIGHT, lineColor, 1);
	}
	for(var y = 0; y < yCount; y++) {
		drawLine(0, yStep*y, GRAPH_WIDTH, yStep*y, lineColor, 1);
	}
}

function drawXAxis() {
	drawAxis(false, GRAPH_WIDTH, GRAPH_HEIGHT);
}

function drawYAxis() {
	drawAxis(true, GRAPH_WIDTH, GRAPH_HEIGHT);
}

function plotBlob(x, y, radius) {
	var circle = two.makeCircle(x, y, radius);
	circle.fill = '#FF8000';
	circle.stroke = 'orangered'; // Accepts all valid css color
	circle.linewidth = 5;
}

// Make an instance of two and place it on the page.

var elem = document.getElementById('draw-shapes').children[0];

console.log(elem);

var params = { width: GRAPH_WIDTH, height: GRAPH_HEIGHT };
var two = new Two(params).appendTo(elem);

drawXAxis();
drawYAxis();
drawGrid(10,10);


for(var count = 0; count < 50; count++) {
	var randomX = Math.random();
	var randomY = Math.random();
	
	plotBlob(GRAPH_WIDTH*randomX, GRAPH_HEIGHT*randomY, 10*Math.random());
}

var circle = two.makeCircle(72, 100, 50);
var rect = two.makeRectangle(213, 100, 100, 100);

// The object returned has many stylable properties:
circle.fill = '#FF8000';
circle.stroke = 'orangered'; // Accepts all valid css color
circle.linewidth = 5;

rect.fill = 'rgb(0, 200, 255)';
rect.opacity = 0.75;
rect.noStroke();

// Don't forget to tell two to render everything
// to the screen
two.update();