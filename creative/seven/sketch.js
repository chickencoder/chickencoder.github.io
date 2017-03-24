// Harmonograph with noise
// port of @generateme Processing Implementation

// enter - save
// click - change

var time;
var f = [];
var p = [];
var a = [];
var d = [];
var nscale;
var freqs = Array(21).fill(0);
var c;

function renew() {
  background(20);
  f[0] = freqs[floor(random(freqs.length))];
  f[1] = freqs[floor(random(freqs.length))];
  f[2] = freqs[floor(random(freqs.length))];
  f[3] = freqs[floor(random(freqs.length))];

  p[0] = randomGaussian();
  p[1] = randomGaussian();
  p[2] = randomGaussian();
  p[3] = randomGaussian();

  var base_amp = 400;
  a[0] = random(base_amp);
  a[1] = random(base_amp - a[0]);
  a[2] = random(base_amp);
  a[3] = base_amp - a[2];

  d[0] = 0.0001 * (random(1) < 0.1 ? 1.0 : 0.0);
  d[1] = 0;
  d[2] = 0.0001 * (random(1) < 0.1 ? 1.0 : 0.0);
  d[3] = 0;

  time = 0;
  nscale = random(100, 600);

  // Using a large number....
  noiseSeed(floor(random(10000000)));
  console.log("SETUP")
}

function setup() {
  c = createCanvas(windowWidth, windowHeight);
  background(20);
  stroke(220, 10);
  smooth(8);
  noFill();

  alert("Click to generate a new Harmonograph. Press Enter to Download.");

  for (var i = -10; i <= 10; i++) {
    freqs[i + 10] = 4 * i / 10;
  }

  frameRate(10);
  renew();
}

function draw() {
  for (var i = 0; i < 10000; i++) {
    var x = exp(-time * d[0]) * a[0] * sin(f[0] * time + TWO_PI * noise(1.0, time, p[0]) + p[0]) +
            exp(-time * d[1]) * a[1] * sin(f[1] * (noise(sin(time * f[1]), f[1]) + time) + p[1]);

    var y = exp(-time * d[2]) * a[2] * sin(f[2] * time + p[2]) +
            exp(-time * d[3]) * a[3] * sin(f[3] * time + TWO_PI * noise(x / nscale, p[3]) + p[3]);

    point(x + width / 2, y + height / 2);
    time += 0.01;
  }
}

function mouseClicked() {
  renew();
}

function keyPressed() {
  if (keyCode === ENTER) {
    saveCanvas(random(10000).toString(16), 'jpg');
  }
}
