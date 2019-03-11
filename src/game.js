import Paddle from '../src/paddle';
import inputHandler from '../src/input';
import Ball from '../src/ball.js';
import Brick from '../src/brick';
import {buildLevel, level1, level2} from '../src/levels';

const gameState = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4
}


export default class Game {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.gameState = gameState.MENU;
      this.paddle = new Paddle(this);
      this.ball = new Ball(this);
      new inputHandler(this.paddle, this);
      this.gameObjects = [];
      this.bricks = [];
      this.lives = 1;
      this.levels = [level1, level2];
      this.currentLevel = 0;


    }

    start() {
      if(this.gameState != gameState.MENU && this.gameState != gameState.NEWLEVEL) return;

      this.bricks = buildLevel(this, this.levels[this.currentLevel]);
      this.ball.reset();

      this.gameObjects = [
        this.ball,
        this.paddle,
      ]

      this.gameState = gameState.RUNNING;

    }








    update(deltaTime) {

      if(this.lives  === 0) this.gameState = gameState.GAMEOVER;

      if(this.gameState === gameState.PAUSED || this.gameState === gameState.MENU || this.gameState === gameState.GAMEOVER) return;

      if(this.bricks.length === 0) {
        this.currentLevel++;
        this.gameState = gameState.NEWLEVEL;
        game.start();
      }

          [...this.gameObjects, ...this.bricks].forEach(object => object.update(deltaTime));

          this.bricks = this.bricks.filter(object => !object.markedForDeletion);
    }

    draw(ctx){
      ctx.fillStyle = "black";
      ctx.fillRect(0,0, this.gameWidth, this.gameHeight);
        [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));


        if(this.gameState == gameState.PAUSED){
          ctx.rect(0, 0, this.gameWidth, this.gameHeight);
          ctx.fillStyle = "rgba(0,0,0, 0.5)";
          ctx.fill();
          ctx.font = "30px Arial";
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.fillText("Paused", this.gameWidth/2, this.gameHeight/2);
        }

        if(this.gameState == gameState.MENU){
          ctx.rect(0, 0, this.gameWidth, this.gameHeight);
          ctx.fillStyle = "rgba(0,0,0, 1)";
          ctx.fill();
          ctx.font = "30px Arial";
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.fillText("Press Spacebar to start ze game!", this.gameWidth/2, this.gameHeight/2);
        }
        if(this.gameState == gameState.GAMEOVER){
          ctx.rect(0, 0, this.gameWidth, this.gameHeight);
          ctx.fillStyle = "rgba(0,0,0, 1)";
          ctx.fill();
          ctx.font = "30px Arial";
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.fillText("You have lost! Never fear, try again!", this.gameWidth/2, this.gameHeight/2);
        }
    }

    togglePause (){
      //
      if(this.gameState == gameState.PAUSED) {
        this.gameState = gameState.RUNNING;
      }else {
        this.gameState = gameState.PAUSED;
      }
}

}
