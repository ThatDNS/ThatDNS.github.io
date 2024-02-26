function Pipe() {
  this.pos = 0;
  this.top = 0;
  this.bottom = 0;

  this.width = 20;
  this.x = width;
  this.y = 0;
  this.velocity = 2;

  this.generateNewPipe = function(x) {
    this.x = x;
    this.pos = random(height/5, height-(height/5));
    this.top = this.pos - random(60, 100);
    this.bottom = this.pos + random(60, 100);
    // print(this.top + " " + this.bottom);
  }

  this.show = function() {
    fill(0,255,0);
    rect(this.x, 0, this.width, this.top);
    rect(this.x, this.bottom, this.width, height-this.bottom);
  }

  this.move = function() {
    this.x -= this.velocity;
  }

  this.reachedEnd = function() {
    return this.x < -this.width;
  }

  // not so accurate :P
  this.collision = function(bird) {
    return (bird.y+10 < this.top || bird.y-10 > this.bottom) &&
          (bird.x+10 > this.x && bird.x-10 < this.x + this.width);
  }
}
