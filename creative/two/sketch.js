var mic, fft;
var angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  noFill();

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(0);
  var spectrum = fft.analyze();

  stroke(255);
  strokeWeight(2);
  beginShape();
  translate(width/2, height/2);
  for (var i = 0; i < spectrum.length; i++) {
    var y = map(spectrum[i], 0, 255, height, 0);
    stroke(map(spectrum[i], 0, 255, 0, 300), 255, 255);
    rotate(radians(angle));
    vertex(i-width/2, y-height/2);
    angle += 0.2;
  }
  endShape();


}
