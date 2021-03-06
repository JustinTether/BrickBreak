import {detectCollision} from '../src/collisionDetection.js'
export default class Ball {

  constructor (game) {

    this.image = document.getElementById("imgBall");
    this.gameHeight = game.gameHeight;
    this.gameWidth = game.gameWidth;
    this.game = game;

    this.position = {x: 10, y: 400};
    this.speed = {x: 2, y: -2};
    this.size = 25;
    this.reset();
}

  reset() {
    this.position = {x: 10, y: 400};
    this.speed = {x: 2, y: -2};
  }

    draw (ctx){
  ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
  }


  update (deltaTime){
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    //Bouncey bouncey on the wall left or right
    if(this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }
    //Top
    if(this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    //bottom

    if(this.position.y + this.size  > this.gameHeight) {
      this.game.lives--;
      this.reset();
    }


    if(detectCollision(this, this.game.paddle)) {
      if(this.game.paddle.speed < 0) {
      this.speed.y = -this.speed.y;
      this.speed.x = -2;
      this.position.y = this.game.paddle.position.y - this.size;

    }else if(this.game.paddle.speed > 0) {
      this.speed.y = -this.speed.y;
      this.speed.x = 2;
      this.position.y = this.game.paddle.position.y - this.size;
    }else if(this.game.paddle.speed === 0){
      this.speed.y = -this.speed.y;
      this.speed.x = -this.speed.x;
      this.position.y = this.game.paddle.position.y - this.size;

    }


  }


}
}
