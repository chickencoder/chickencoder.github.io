var logo;
var rot = 0;
var canvas;
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  logo = loadImage("logo.png");
  colorMode(HSB);
  frameRate(10);
}

function draw() {
  // save(canvas);
  fill(random(360), 255, 255);
  background(random(360), 255, 255);
  noStroke();
  beginShape();
  vertex_no = random(3, 20);
  for (var i = 0; i < vertex_no; i++) {
    vertex(random(width), random(height+height));
  }
  endShape();

  translate(width/2, height/2);
  var rw = logo.width * 1.5;
  var rh = logo.height * 1.5;
  // rect(0 - rw / 2, 0 - rh / 2, rw, rh);
  scale(1.25*noise(frameCount*0.04, frameCount%5));
  rotate(radians(rot));
  image(logo, 0 - logo.width / 2, 0 - logo.height / 2);
  // rot += 4;
}
