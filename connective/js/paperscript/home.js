var canvasHeight = paper.view.size.height;
var canvasWidth = paper.view.size.width;
var points = [];
var lines = [];

var counter = 0;

function onMouseDown(event) {
  //path = new Path();
  //path.strokeColor = "white";
  //path.strokeWidth = 2;
  //path.add(event.point);
}

function onMouseMove(event) {
  //graphGenerator(event.point);
  if (counter === 2) {
    counter = 0;
    var circle = new Path.Circle(event.point, 10);
    circle.fillColor = '#ffffff';
    shrinkCircle(circle, 0.9);
  } else {
    counter++;
  }
}

function shrinkCircle(circle, scale) {
  circle.scale(scale);
  if (scale <= 0) {
    circle.remove();
    return;
  } else {
    scale -= 0.1;
    setTimeout(function () {
      shrinkCircle(circle, scale);
    }, 100); // try again in 300 milliseconds
  }
}
