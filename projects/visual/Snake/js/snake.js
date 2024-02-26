function Snake() {
  this.x = 0; // position of head on X axis
  this.y = 0; // position of head on Y axis
  this.xspeed = 1; // direction of head on X axis
  this.yspeed = 0; // direction of head Y axis
  this.total = 0; // size of tail/body
  this.tail = []; // stores snake's body except head

  this.show = function() {
    fill(255);
    for(let i=0; i<this.tail.length; i++){ // create snake's body
      rect(this.tail[i].x, this.tail[i].y, gridSize, gridSize);
    }
    rect(this.x, this.y, gridSize, gridSize); // create snake's head
  }

  this.update = function() {
    // Logic: Don't update if snake's head is against canvas boundary
    if((this.x > 0 || (this.xspeed != -1 && this.yspeed != 0)) &&
      (this.x < width-gridSize || (this.xspeed != 1 && this.yspeed != 0)) &&
      (this.y > 0 || (this.xspeed != 0 && this.yspeed != -1)) &&
      (this.y < height-gridSize || (this.xspeed != 0 && this.yspeed != 1))){
      if(this.total === this.tail.length){
        // shifting the body
        for(let i=0; i<this.tail.length-1; i++){
          this.tail[i] = this.tail[i+1];
        }
      }
      // adding current head to the front of body (tail)
      this.tail[this.total-1] = createVector(this.x, this.y);
    }
    this.x = this.x + this.xspeed*gridSize; // Move in X axis
    this.y = this.y + this.yspeed*gridSize; // Move in Y axis
    // Don't move out of canvas
    this.x = constrain(this.x, 0, width-gridSize);
    this.y = constrain(this.y, 0, height-gridSize);
  }

  // Change direction
  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.canEat = function(food){
    let d = dist(this.x, this.y, food.x, food.y); // distance between snake's head and food
    return (d < 1);
  }

  this.death = function(){
    // if collision, restart the game
    for(let i=0; i<this.tail.length; i++){
      let pos = this.tail[i];
      let d = dist(this.x, this.y, pos.x, pos.y);
      if(d < 1){
        this.total = 0;
        this.tail = [];
      }
    }
  }

}
