console.log('lemongraphs.js ran');


var GRAPH_HEIGHT = 300;
var GRAPH_WIDTH = 600;


function drawLabel(x, y, text) {
	var label = jsglGod.createLabel();
	label.setX(x);
	label.setY(y);
	label.setText(text);
	jsglGod.addElement(label);
}

function drawAxis(isX, width, height) {
	drawLine(0, height, isX ? width : 0, isX ? height : 0 , "rgba(0, 0, 0, 0.5)", 5);
}

function drawLine(x, y, x2, y2, color, lineWidth) {
	var polygon = jsglGod.createPolygon();
	polygon.addPointXY(x,y);
	polygon.addPointXY(x2,y2);
	polygon.getStroke().setWeight(lineWidth);
	polygon.getStroke().setColor(color);
	jsglGod.addElement(polygon);
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
	var circle = jsglGod.createCircle();
	circle.setCenterLocationXY(x,y);
	circle.setRadius(radius);
	circle.getStroke().setWeight(5);
	circle.getStroke().setColor("rgb(255,0,0)");
	jsglGod.addElement(circle);
}

function plotDummyData() {
	var color = "rgba(0, 0, 0, 0.5)";
	
	var plottedBlobs = [];
	
	for(var count = 0; count < 50; count++) {
		var randomX = Math.random();
		var randomY = Math.random();
		
		var x = GRAPH_WIDTH*randomX;
		var y = GRAPH_HEIGHT*randomY;
		
		plottedBlobs.push({ x: x, y: y });
	}	
	
	for(var count = 0; count < plottedBlobs.length; count++) {
		var prevX = count > 0 ? plottedBlobs[count-1].x : 0;
		var prevY = count > 0 ? plottedBlobs[count-1].y : 0;
		
		var x = plottedBlobs[count].x;
		var y = plottedBlobs[count].y;
		
		drawLine(x, y, prevX, prevY, color, 1);
	}
	
	for(var count = 0; count < plottedBlobs.length; count++) {
		var x = plottedBlobs[count].x;
		var y = plottedBlobs[count].y;
		
		plotBlob(x, y, 10*Math.random());
	}
	
	drawLabel(10, 20, "Jason");
	drawLabel(10, 50, "WOOP WOOP");
}

// Make an instance of two and place it on the page.

//var elem = document.getElementById('draw-shapes').children[0];
var jsglGod = new jsgl.Panel(document.getElementById("draw-shapes"));

console.log(jsglGod);

// var params = { width: GRAPH_WIDTH, height: GRAPH_HEIGHT };
// var two = new Two(params).appendTo(elem);

drawXAxis();
drawYAxis();
drawGrid(10,10);
plotDummyData();