// '': empty; 'o': zero; 'x': cross
let grid = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

let players = ['o', 'x'];
let currentPlayer;
let w, h;

function setup() {
  createCanvas(400, 400);
  currentPlayer = players[0];
  w = width/3;
  h = height/3;
}

function draw() {
  background(220);

  // draw lines
  strokeWeight(1);
  for(let i=1; i<3; i++){
    line(w*i, 0, w*i, height);
    line(0, h*i, width, h*i);
  }

  // current grid situation
  textSize(32);
  strokeWeight(2);
  for(let row=0; row<3; row++){
    for(let col=0; col<3; col++){
      let x = w*col + w/2;
      let y = h*row + h/2;
      let cellContent = grid[row][col];
      if(cellContent == players[0]){
        noFill();
        ellipse(x,y,w/2);
      }else if(cellContent == players[1]){
        let off = w/4;
        line(x-off, y-off, x+off, y+off);
        line(x+off, y-off, x-off, y+off);
      }
    }
  }

  let winner = getWinner();
  if(winner != null){
    console.log(winner + " won!");
    noLoop();
  }
}

function getWinner() {
  let winner = null;
  // check rows
  for(let row=0; row<3; row++){
    if(grid[row][0] == grid[row][1] && grid[row][1] == grid[row][2] && grid[row][0] != ''){
      let x = w/2;
      let y = h*row + h/2;
      strokeWeight(4);
      stroke(255, 0, 0);
      line(x-w/4, y, x+2*w+(w/4), y);
      winner = grid[row][0];
      break;
    }
  }
  // check cols
  for(let col=0; col<3; col++){
    if(grid[0][col] == grid[1][col] && grid[1][col] == grid[2][col] && grid[0][col] != ''){
      let x = w*col + w/2;
      let y = h/2;
      strokeWeight(4);
      stroke(255, 0, 0);
      line(x, y-h/4, x, y+2*h+(h/4));
      winner = grid[0][col];
      break;
    }
  }
  // check diagnols
  if(grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2] && grid[0][0] != ''){
    strokeWeight(4);
    stroke(255, 0, 0);
    line(w/4, h/4, width - (w/4), height - (h/4));
    winner = grid[0][0];
  }
  if(grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0] && grid[0][2] != ''){
    strokeWeight(4);
    stroke(255, 0, 0);
    line(width - (w/4), h/4, w/4, height - (h/4));
    winner = grid[0][2];
  }
  return winner;
}

function mousePressed() {
  let w = width/3;
  let h = height/3;
  let xVal = floor(mouseX/w), yVal = floor(mouseY/h);
  if(grid[yVal][xVal] == ''){
    grid[yVal][xVal] = currentPlayer;
    currentPlayer = (currentPlayer == players[0]) ? players[1] : players[0];
  }
}

function keyPressed() {
  if(keyCode == 32){ // space to restart game
    for(let row=0; row<3; row++){
      for(let col=0; col<3; col++){
        grid[row][col] = '';
      }
    }
  }
}
