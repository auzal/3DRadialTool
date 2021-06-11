class Path{

  constructor(x, y, rotationAngleY, rotationAngleX){
    this.points = [];
    this.points.push(createVector(x - width/2, y - height/2));
    this.rotationY = rotationAngleY;
    this.rotationX = rotationAngleX;
    this.minDistance = 3;

    let colorA = color(254, 251, 242);

    let colorB = color(120);

    this.c = lerpColor(colorA, colorB, random(1.0));


  }

  render(){
    push();

    rotateX(radians(this.rotationX));
      rotateY(radians(this.rotationY));
    strokeWeight(2);
    stroke(this.c);
    noFill();
    beginShape();
    for(let i = 0 ; i < this.points.length -1 ; i++){
      let x = this.points[i].x;
      let y = this.points[i].y;
      x += noise((x+frameCount) * 0.05 ) * 10;
      y += noise((y) * 0.05) * 10;
      let z = noise((y + frameCount) * 0.05, (x + frameCount) * 0.05) * 10;
      vertex(x, y, z);
      //ellipse(this.points[i].x, this.points[i].y, 5, 5);
    //  line(this.points[i].x, this.points[i].y, this.points[i+1].x, this.points[i+1].y);
    }
   endShape();
    pop();
  }

  update(){

  }

  addPoint(x, y){
    x -= width/2;
    y -= height/2;
    if(dist(x,y, this.points[this.points.length-1].x, this.points[this.points.length-1].y) > this.minDistance){
      this.points.push(createVector(x , y ));
    }
  }

  getVertexCount(){
    return this.points.length;
  }

}
