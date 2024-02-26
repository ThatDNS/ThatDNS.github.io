function Bird() {
  this.x = 100;
  this.y = height/2;
  this.gravity = 0.5;
  this.velocity = 0;

  this.show = function() {
    fill(255,255,0);
    circle(this.x, this.y, 20);
  }

  this.update = function() {
    this.velocity += this.gravity; // acceleration
    this.y += this.velocity;

    if(this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if(this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }

  this.fly = function() {
    this.velocity = -10;
  }
}
