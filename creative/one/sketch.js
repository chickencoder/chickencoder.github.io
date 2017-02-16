/**
 * Ideas:
 * a flower, purple, factral spiraling out from centre
 * rotation...
 */

var n1 = 0;
var c1 = 5;

var n2 = 0;
var c2 = 5;

var n3 = 0;
var c3 = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  colorMode(HSB);
}

function draw() {
  // GREEN
  translate(width/2, height/2);

  var a1 = n1 * radians(137.5);
  var r1 = c1 * sqrt(n1);

  var x1 = r1 * cos(a1);
  var y1 = r1 * sin(a1);

  noStroke();
  var colour = noise(x1, y1);
  colour = map(colour, 0, 1, 100, 200);
  fill(colour, 100, 200);
  ellipse(x1, y1, 4);

  n1 += 1;

  // BLUE
  translate(300, 0);

  var a2 = n2 * radians(137.5);
  var r2 = c2 * sqrt(n2);

  var x2 = r2 * cos(a2);
  var y2 = r2 * sin(a2);

  noStroke();
  var colour = noise(x2, y2);
  colour = map(colour, 0, 1, 200, 300);
  fill(colour, 100, 200);
  ellipse(x2, y2, 4);

  n2 += 1;


  // RED
  translate(-600, 0);

  var a3 = n3 * radians(137.5);
  var r3 = c3 * sqrt(n3);

  var x3 = r3 * cos(a3);
  var y3 = r3 * sin(a3);

  noStroke();
  var colour = noise(x3, y3);
  colour = map(colour, 0, 1, 0, 50);
  fill(colour, 100, 200);
  ellipse(x3, y3, 4);

  n3 += 1;
}
