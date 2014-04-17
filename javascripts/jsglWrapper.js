var TDW = (function() {
  var module = {
  		init: function(id) {
  		   	return init(id);
  		},
      	drawLabel: function(x, y, text) {
        	return drawLabel(x, y, text);
      	},
      	drawLine: function(x, y, x2, y2, color, lineWidth) {
      		return drawLine(x, y, x2, y2, color, lineWidth);
      	},
      	drawCircle: function(x, y, radius) {
      		return drawCircle(x, y, radius);
      	}
  };
  return module;
}(TDW));

var jsglGod;

function init(id) {
	jsglGod = new jsgl.Panel(document.getElementById(id));
}

function drawCircle(x, y, radius) {
	var circle = jsglGod.createCircle();
	circle.setCenterLocationXY(x,y);
	circle.setRadius(radius);
	circle.getStroke().setWeight(5);
	circle.getStroke().setColor("rgb(255,0,0)");
	jsglGod.addElement(circle);
}


function drawLine(x, y, x2, y2, color, lineWidth) {
	var polygon = jsglGod.createPolygon();
	polygon.addPointXY(x,y);
	polygon.addPointXY(x2,y2);
	polygon.getStroke().setWeight(lineWidth);
	polygon.getStroke().setColor(color);
	jsglGod.addElement(polygon);
}

function drawLabel(x, y, text) {
	var label = jsglGod.createLabel();
	label.setX(x);
	label.setY(y);
	label.setText(text);
	jsglGod.addElement(label);
}
