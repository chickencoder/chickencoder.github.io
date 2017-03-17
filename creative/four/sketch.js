var gridScale = 10;
var cols, rows;

function getGridPos(x, y) {
  return [(width / gridScale) * x, (height / gridScale) * y];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  strokeWeight(5);
  noFill();
  colorMode(HSB);
  smooth();
  // noLoop();
  cols = Math.floor(width / gridScale);
  rows = Math.floor(height / gridScale);
}

function randomBezier(startX, startY, scale) {
  var x1 = random(scale) + startX;
  var x2 = random(scale) + startX;
  var x3 = random(scale) + startX;
  var x4 = random(scale) + startX;

  var y1 = random(scale) + startY;
  var y2 = random(scale) + startY;
  var y3 = random(scale) + startY;
  var y4 = random(scale) + startY;

  bezier(x1,y1,x2,y2,x3,y3,x4,y4);
  return [x4, y4];
}

function draw() {
  background(0);
  for (var col = 0; col < cols; col++) {
    for (var row = 0; row < rows; row++) {
      stroke(random(255), 80, 255);
      var pos = getGridPos(row, col);
      randomBezier(pos[0], pos[1], 100);
    }
  }
}
