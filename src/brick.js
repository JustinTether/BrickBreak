import {detectCollision} from '../src/collisionDetection';
export default class Brick {
    constructor(game, position, type, maxLife, damage) {
      this.blueBrick = document.getElementById("blueBrick");
      this.greenBrick = document.getElementById("greenBrick");
      this.gameHeight = game.gameHeight;
      this.gameWidth = game.gameWidth;
      this.game = game;
      this.type = type;
      this.maxLife = maxLife;
      this.damage = damage;

      this.position = position;
      this.width = 64;
      this.height = 25;

      this.markedForDeletion = false;
  }


    update() {
      if(detectCollision(this.game.ball, this)) {
        this.game.ball.speed.y = -this.game.ball.speed.y;
              this.damage++;

              if(this.damage === this.maxLife) {
                this.markedForDeletion = true;
                }


      }

    }



    draw(ctx) {
      if(this.type === 1) {
      ctx.drawImage(this.blueBrick, this.position.x, this.position.y, this.width, this.height);
      //console.log(this.type);
}else if(this.type === 2) {
    ctx.drawImage(this.greenBrick, this.position.x, this.position.y, this.width, this.height);
  //  console.log(this.type);
  }

    }
}
