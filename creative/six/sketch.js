var scl = 20;
var cols, rows;
var inc = 0.01;
var zoff = 0;
var noOfParticles = 300;
var particles = [];
var cl;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  cols = floor(width / scl);
  rows = floor(height / scl);
  cl = color(51, 51, 51, 0.1);

  flowfield = new Array(cols * rows);

  for (var i = 0; i < noOfParticles; i++) {
    particles[i] = new Particle();
  }
  frameRate(25);
}

function draw() {
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 50);
    }
    yoff += inc;
    zoff += 0.0003;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}
