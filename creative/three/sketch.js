/////////////////////// DEFAULT
var iters = 7;
var string = "F";
var axiom = "";
var rules = {
  "F":"S-S++S+",
  "S":"[[S]]F"
};
var angle = 90;
var currentAngle = 0;
var step = 40;
var x, y;
var stack = [];
///////////////////////

function randomSystem() {
  // Return axiom, rules, angle
  var system = {};
  system["iters"] = floor(random(2, 10))
  system["angle"] = floor(random(10, 180));

  var symbols = ["A", "B", "C", "D", "E"];
  var tokens = ["F", "+", "-", "[", "]", "F", "F"];
  var numOfRules = floor(random(1, symbols.length-1))

  system["rules"] = {};
  for (var rule = 0; rule < numOfRules; rule++) {
    // Add ruleIds to tokens
    var ruleIds = symbols.slice(0, numOfRules);
    ruleIds.forEach(function(rule) {
      tokens.push(rule);
    });

    var numOfTokens = floor(random(1, 20));
    var ruleString = "";
    for (var token = 0; token < numOfTokens; token++) {
      var t = tokens[floor(random(tokens.length-1))];
      ruleString += t;
    }
    if (ruleString.indexOf("F") == -1) {
      ruleString += "F";
    }
    system["rules"][symbols[rule]] = ruleString;
  }

  var lengthOfAxiom = floor(random(1, 8));
  var axiom = "";
  for (var axiomChar = 0; axiomChar < lengthOfAxiom; axiomChar++) {
    // Pick random from symbol or token
    var ruleSymbols = Object.keys(system["rules"]);
    axiom += ruleSymbols[floor(random(ruleSymbols.length-1))]
  }
  system["axiom"] = axiom;

  return system;
}

function lsystem(string) {
  var out = "";
  string.split("").forEach(function(char) {
    var match = false;
    Object.keys(rules).forEach(function(rule) {
      if (char == rule) {
        out += rules[rule];
        match = true;
      }
    });
    if (!match) out += char;
  });
  return out;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  noLoop();
  strokeWeight(5);
  background(0);
  colorMode(HSB);

  var system = randomSystem();
  axiom = system.axiom;
  string = system.axiom;
  rules = system.rules;
  iters = system.iters;
  angle = system.angle;
}

function draw() {
  console.log("Randomly generated lsystem: ");
  console.log("Axiom: ", string);
  console.log("Rules: ", rules);
  console.log("Angle: ", angle);
  console.log("Iters: ", iters);

  textSize(16);
  fill(0, 0, 100);
  textFont("monospace");

  text("Axiom: " + axiom, 10, 30);
  text("Rules: " + JSON.stringify(rules), 10, 50);
  text("Angle: " + angle.toString(), 10, 70);
  text("Iters: " + iters.toString(), 10, 90);
  text("Refresh to generate a new system.", 10, height-30);

  var hue = random(0, 300);
  stroke(hue, 255, 255);

  for (var i = 0; i < iters; i++) {
    string = lsystem(string);
  }

  string.split("").forEach(function(prod) {
    if (prod == "F") {
      var x1 = x + step * cos(radians(currentAngle));
      var y1 = y + step * sin(radians(currentAngle));
      line(x, y, x1, y1);
      x = x1;
      y = y1;
    } else if (prod == "+") {
      currentAngle += angle;
    } else if (prod == "-") {
      currentAngle -= angle;
    } else if (prod == "[") {
      // Push
      stack.push([x, y, currentAngle]);
    } else if (prod == "]") {
      // Pop
      if (stack.length > 0) {
        var state = stack.pop();
        x = state[0];
        y = state[1];
        currentAngle = state[2];
      }
    }
  });
}

/*
  Good ones:
  =====
  Axiom:  AABABB  sketch.js:89:3
  Rules:  Object { A: "F+F+", B: "-F-CFB-+[BB]A+CFAB-", C: "[BF]BFF[ABA-B]FC" }
  Angle:  120
  Iters:  5
  ======
  Axiom:  BABBBAA  sketch.js:90:3
  Rules:  Object { A: "F+F+AA[F+++]FF[AFA", B: "CA-AF[FA+BFA-AB-", C: "A-AFFF]CB]]CAF[BA" }  sketch.js:91:3
  Angle:  112  sketch.js:92:3
  Iters:  7
*/
