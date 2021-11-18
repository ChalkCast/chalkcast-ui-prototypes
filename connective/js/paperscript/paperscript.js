<script type="text/paperscript" canvas="home">

    var canvasHeight = paper.view.size.height;
    var canvasWidth =	paper.view.size.width;
    var points = [];
    var lines = [];
  
  
    generateStars(120);
    function generateStars(number) {
      for (i=0; i<number; i++) {
        randX = Math.random()*canvasWidth;
        randY = Math.random()*canvasHeight;
        point = new Point(randX, randY);
        points.push(point);
      }
    }
  
    function removeLines(line)
     {
      var fadeEffect = setInterval(function() {
       if (line.opacity < 0.1)
       {
        line.remove();
        clearInterval(fadeEffect);
       }
       else
       {
        line.opacity -= 0.1;
       }
     }, 100);
     }
  
    function graphGenerator(point) {
      var tempPoints = [];
  
      corner = new Point(point.x-160, point.y-160);
      range = new Rectangle(corner, 320);
      for (i=0; i< points.length; i++) {
        if (range.contains(points[i])) {
          //circle = new Path.Circle(points[i], 1);
          //circle.fillColor = '#fff';
          //var line = new Path.Line(point, points[i]);
          //line.strokeColor = 'rgba(154,88,255,0.4)';
          //lines.push(line);
          tempPoints.push(points[i]);
        }
      }
      for (i=0; i < tempPoints.length-1; i++) {
        for (j=1; j < tempPoints.length-1; j++) {
          var line = new Path.Line(tempPoints[i], tempPoints[j]);
          line.strokeColor = 'rgba(79,161,255,0.1)';
          removeLines(line);
        }
      }
    }
  
    function onMouseDown(event) {
      //path = new Path();
      //path.strokeColor = "white";
      //path.strokeWidth = 2;
      //path.add(event.point);
    }
  
    function onMouseMove(event) {
      graphGenerator(event.point);
    }
  </script>