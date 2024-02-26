let snake; // snake object
let gridSize = 10; // grid size (same as snake width and food size)
let food; // food vector

// Initial Setup
function setup() {
  createCanvas(600, 600);
  snake = new Snake();
  frameRate(10); // Limiting frame rate to make the game easier and similar to old snake game
  generateFood();
}

// Make food appear in correct grid (basic maths)
function generateFood() {
  let cols = floor(width/gridSize);
  let rows = floor(height/gridSize);
  food = createVector(floor(random(cols)), floor(random(rows))); // food vector in grid
  food.mult(gridSize);
}

function draw() {
  background(50);
  snake.death(); // checks for collisions and kills snake if positive
  snake.update(); // updates snake based on speed and tail size
  snake.show(); // displays the tail and head

  if(snake.canEat(food)){
    snake.total++; // increase size of snake's body
    generateFood(); // food at new location
  }

  fill(255, 0, 100); // food color
  rect(food.x, food.y, gridSize, gridSize); // food
}

// Changing direction
function keyPressed() {
  // Logic: Don't allow snake to turn opposite to its current direction
  if(snake.xspeed !== 0 && snake.yspeed !== 1 && keyCode == UP_ARROW){
    snake.dir(0, -1);
  }else if(snake.xspeed !== 0 && snake.yspeed !== -1 && keyCode == DOWN_ARROW){
    snake.dir(0, 1);
  }else if(snake.xspeed !== -1 && snake.yspeed !== 0 && keyCode == RIGHT_ARROW){
    snake.dir(1, 0);
  }else if(snake.xspeed !== 1 && snake.yspeed !== 0 && keyCode == LEFT_ARROW){
    snake.dir(-1, 0);
  }
}
