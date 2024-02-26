function Cell(i, j) {
  this.i = i; // row of cell
  this.j = j; // column of cell
  this.f = 0; // f = g + h
  this.g = 0; // cost of the path from the start cell to this cell
  this.h = 0; // heuristic function
  this.walls = { // whether walls are present around this cell
    top: true,
    bottom: true,
    right: true,
    left: true,
  }
  this.neighbors = { // neighbors of this cell
    top: null,
    right: null,
    bottom: null,
    left: null
  }
  this.visited = false; // if this cell is visited
  this.previous = undefined; // previous cell to this cell in path Mazey travels

  this.show = function(color){ // print the cell
    let x = this.i*cellSize;
    let y = this.j*cellSize;
    stroke(0);
    strokeWeight(1);
    if(this.walls.top)   { line(x         ,y         ,x+cellSize,y         ); }
    if(this.walls.right) { line(x+cellSize,y         ,x+cellSize,y+cellSize); }
    if(this.walls.bottom){ line(x+cellSize,y+cellSize,x         ,y+cellSize); }
    if(this.walls.left)  { line(x         ,y+cellSize,x         ,y         ); }

    if(this.visited){
      fill(200);
      noStroke();
      rect(x, y, cellSize, cellSize);
    }

  }

  this.highlight = function() { // highlight the current cell while creating maze
    let x = this.i*cellSize;
    let y = this.j*cellSize;
    noStroke();
    fill(255, 0, 0);
    rect(x, y, cellSize, cellSize);
  }

  this.specialHighlight = function(color) { // This is Mazey
    let x = this.i*cellSize;
    let y = this.j*cellSize;
    noStroke();
    fill(color);
    circle(x+cellSize/2, y+cellSize/2, cellSize/4);
  }

  this.addNeighbors = function() {
    if(this.neighbors.top == null){ this.neighbors.top = grid[getIndex(i, j-1)]; }
    if(this.neighbors.right == null){ this.neighbors.right = grid[getIndex(i+1, j)]; }
    if(this.neighbors.bottom == null){ this.neighbors.bottom = grid[getIndex(i, j+1)]; }
    if(this.neighbors.left == null){ this.neighbors.left = grid[getIndex(i-1, j)]; }
  }

  this.moveToNeighbor = function() {
    let neighborsList = [];
    let top = this.neighbors.top;
    let right = this.neighbors.right;
    let left = this.neighbors.left;
    let bottom = this.neighbors.bottom;

    if(top && !top.visited){
      neighborsList.push(top);
    }
    if(right && !right.visited){
      neighborsList.push(right);
    }
    if(bottom && !bottom.visited){
      neighborsList.push(bottom);
    }
    if(left && !left.visited){
      neighborsList.push(left);
    }

    if(neighborsList.length > 0){
      let r = floor(random(0, neighborsList.length)); // choose a random neighbor
      // remove walls between this cell and the neighbor chosen randomly
      if(top && neighborsList[r].i == top.i && neighborsList[r].j == top.j) {
        this.walls.top = false;
        grid[getIndex(top.i, top.j)].walls.bottom = false;
      }
      else if(right && neighborsList[r].i == right.i && neighborsList[r].j == right.j) {
        this.walls.right = false;
        grid[getIndex(right.i, right.j)].walls.left = false;
      }
      else if(bottom && neighborsList[r].i == bottom.i && neighborsList[r].j == bottom.j) {
        this.walls.bottom = false;
        grid[getIndex(bottom.i, bottom.j)].walls.top = false;
      }
      else if(left && neighborsList[r].i == left.i && neighborsList[r].j == left.j) {
        this.walls.left = false;
        grid[getIndex(left.i, left.j)].walls.right = false;
      }
      return neighborsList[r]; // move to this neighbor
    }
    return undefined; // all neighbors are visited
  }
}

function getIndex(i, j) {
  if(i<0 || j<0 || i>numCells-1 || j>numCells-1){ return -1; }
  return i*numCells+j;
}
