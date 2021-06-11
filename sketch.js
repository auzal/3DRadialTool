let paths = [];
let newPath = null;

let freeRotation = false;
let currRotationY = 0;
let currRotationX = 0;

let debugFont;
let fpsHistory = [];
let currFPS = 0;


function preload(){
  debugFont = loadFont("assets/IBMPlexMono-ThinItalic.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
//  strokeCap(ROUND);
}

function draw() {
//  ortho();
  background(40);
  renderFPS();
//  console.log(currRotationY);
  if(freeRotation){
      currRotationY += 1;
      currRotationX += .5;

  }

  rotateY(radians(currRotationY));
  rotateX(radians(currRotationX));
  for(let i = 0 ; i < paths.length ; i ++){
    paths[i].render();
  }
  if(newPath!=null){
    newPath.render();
  }

  renderOrigin();

  if(keyIsPressed){
    if(keyCode === LEFT_ARROW){
      currRotationY -= 1;
    }else if(keyCode === RIGHT_ARROW){
      currRotationY += 1;
    } else if(keyCode === UP_ARROW){
        currRotationX += 1;
      }else if(keyCode === DOWN_ARROW){
        currRotationX -= 1;
      }

//    currRotationY = abs(currRotationY % 360);
  }
}

function keyPressed(){
  if(key === ' '){
    freeRotation = !freeRotation;
    if(!freeRotation){
//      currRotationY = 0;
    }
  }
}


function mouseDragged(){
  newPath.addPoint(mouseX, mouseY);
}

function mousePressed(){
  newPath = new Path(mouseX, mouseY, -currRotationY, -currRotationX);
}

function mouseReleased(){
  if(newPath.getVertexCount() > 1){
    paths.push(newPath);
  }
  newPath = null;
}

function renderOrigin(){
  push();
  strokeWeight(1);
  stroke(255);
  let l = 10;
  line(-l,0,l,0);
  line(0,-l,0,l);
  pop();
}

function renderFPS(){
  push();
  if(frameCount % 10 === 0){
    currFPS = frameRate();
  }
  textFont(debugFont);
  textSize(20);
  translate(-width/2 + 20, - height/2 + 40);
  fill(255);
  text(nfc(currFPS,1),0,0);

//  console.log(fpsHistory.length);
  //renderFPSHIstory();


  pop();
}


function renderFPSHIstory(){
  fpsHistory.push(frameRate());
  let l = 40;
  if(fpsHistory.length > l){
    fpsHistory.splice(0,1);
  }
  translate(0,40);
  strokeWeight(1);
  stroke(255);
  for(let i = 0 ; i < fpsHistory.length-1 ; i++){
    let val1 = fpsHistory[i]/3;
    let val2 = fpsHistory[i+1]/3;
    line(i,-val1,i+1,-val2);
  }

  stroke(255,255,0,90);
  line(0,0,l,0);
  line(0,-20,l,-20);

}
