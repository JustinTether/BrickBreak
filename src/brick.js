import {detectCollision} from '../src/collisionDetection.js';
export default class Brick {
    constructor(game, position, type, maxLife, damage) {
      this.blueBrick = document.getElementById("blueBrick");
      this.greenBrick = document.getElementById("greenBrick");
      this.greenBrickBroken = document.getElementById("greenBrickBroken");
      this.speedUp = document.getElementById("speedUp");
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
                if(this.type === 3) this.game.ball.speed.y++;
              if(this.damage === this.maxLife) {
                this.markedForDeletion = true;
                }


      }

    }



    draw(ctx) {
      switch(this.type) {
        case 1:
          ctx.drawImage(this.blueBrick, this.position.x, this.position.y, this.width, this.height);
          break;

          case 2:
          if(this.damage > 0) {
              ctx.drawImage(this.greenBrickBroken, this.position.x, this.position.y, this.width, this.height);
          } else {
          ctx.drawImage(this.greenBrick, this.position.x, this.position.y, this.width, this.height);
          }
            break;

            case 3:
              ctx.drawImage(this.speedUp, this.position.x, this.position.y, this.width, this.height);


      }

    }
}
