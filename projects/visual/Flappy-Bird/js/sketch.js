let bird;
let pipe1, pipe2;
let gameplay;

function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipe1 = new Pipe();
  pipe1.generateNewPipe(width);
  pipe2 = new Pipe();
  pipe2.generateNewPipe(width+width/2);
  gameplay = true;
}

function draw() {
  background(30,144,255);
  if(gameplay){ bird.update(); }
  bird.show();

  if(gameplay){ pipe1.move(); }
  pipe1.show();
  if(gameplay && pipe1.reachedEnd()){
    pipe1.generateNewPipe(width);
  }
  if(gameplay && pipe1.collision(bird)){
    gameplay = false;
  }
  if(gameplay){ pipe2.move(); }
  pipe2.show();
  if(gameplay && pipe2.reachedEnd()){
    pipe2.generateNewPipe(width);
  }
  if(gameplay && pipe2.collision(bird)){
    gameplay = false;
  }
}

function keyPressed() {
  if(key == ' '){
    bird.fly();
  }
  if(keyCode == RETURN && !gameplay){
    setup();
  }
}
