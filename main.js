// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// balls.length

let colors = [];

let balls = [];

while (balls.length < 25) {
  let size = random(10, 20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
    size
  );

  balls.push(ball);
}








// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}


Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}



Ball.prototype.update = function () {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
    //right
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
    //left
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
    //bottom
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
    //top
  }



  if ((this.x + this.size) >= width || (this.x - this.size) <= 0 || (this.y + this.size) >= height || (this.y - this.size) <= 0) {
    let splitChance = random(0, 50)
    
    if (splitChance == 50) {
      
      this.size = this.size / 2

      let ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(width, height),
        this.y,
        this.velX + 20,
        this.velY,
        this.color,
        this.size
        
      );
    
      balls.push(ball);
    }
  }

  this.x += this.velX;
  this.y += this.velY;
}

Ball.prototype.collisionDetect = function () {
  for (let j = 0; j < balls.length; j++) {
    if (this !== balls[j]) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        if(this.color == balls[j].color){
          console.log("samsies")
          this.size += balls[j].size;
          balls.splice(j, 1);
          j--;
        }
        else{
          this.size += balls[j].size;
        balls.splice(j, 1);
        j--;
        }
        




      



      }
    }
  }
};




// let testBall = new Ball(50, 100, 4, 4, 'green', 10)

// testBall.draw()








function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();

    if(balls.length == 2){
      if(balls[0].color == balls[1].color)
        console.log(balls[0].color + "WINS")
    }
    else if(balls.length == 1){
      console.log(balls[0].color + "WINS")
    }

    
    
  }

  requestAnimationFrame(loop);
}

// loop()


for(let p = 0; p < balls.length; p++){
  
  colors.push(balls[p].color)
  console.log(colors)
}