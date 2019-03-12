import Paddle from '../src/paddle.js';
import inputHandler from '../src/input.js';
import Ball from '../src/ball.js';
import Brick from '../src/brick.js';
import {buildLevel, level1, level2, level3} from '../src/levels.js';
//The creation of some gamestate stuff, this will hopefully allow us to set different states the "engine" is in
const gameState = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4
}

//The start of the good stuff, the basis is clear, and you could easily change these things for other games
export default class Game {
  //Here we define some stuff that will be used throughout the game files,
  //as well as creation of game objects (what happens during ~constructing~ the game, get it?)
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.gameState = gameState.MENU;
      //After we've defined the height and width into variables and
      //setting the starting state to MENU, we have to create our objects
      this.paddle = new Paddle(this);
      this.ball = new Ball(this);
      new inputHandler(this.paddle, this);
      //Now some useful variables for the game to use
      this.gameObjects = [];
      this.bricks = [];
      this.lives = 3;
      this.levels = [level1, level2, level3];
      this.currentLevel = 0;


    }
    //Some stuff  to do when starting the game
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







//Here's the actual gameloop
    update(deltaTime) {

      if(this.lives  === 0) this.gameState = gameState.GAMEOVER;

      if(this.gameState === gameState.PAUSED || this.gameState === gameState.MENU || this.gameState === gameState.GAMEOVER) return;

      if(this.bricks.length === 0) {
        this.currentLevel++;
        this.gameState = gameState.NEWLEVEL;
        this.start();
      }

          [...this.gameObjects, ...this.bricks].forEach(object => object.update(deltaTime));

          this.bricks = this.bricks.filter(object => !object.markedForDeletion);
    }

    draw(ctx){
      //Draw the background
      ctx.fillStyle = "black";
      ctx.fillRect(0,0, this.gameWidth, this.gameHeight);
        //Displaying info, like currentLevel and lives!

        ctx.font ="16px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Lives: " + this.lives, 35, 20);
        ctx.fillStyle = "white";
        ctx.fillText("Current Level: " + this.currentLevel +1, 650, 20);

      //Draw the game objects + the bricks in a single array
        [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));

        //Stuff regarding states, pause menus exist here!
        if(this.gameState == gameState.PAUSED){
          ctx.rect(0, 0, this.gameWidth, this.gameHeight);
          ctx.fillStyle = "rgba(0,0,0, 0.5)";
          ctx.fill();
          ctx.font = "30px Arial";
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.fillText("Paused", this.gameWidth/2, this.gameHeight/2);
        }
          //A "menu" But it could easily be changed to something much more elaborate, had you needed it.
        if(this.gameState == gameState.MENU){
          ctx.rect(0, 0, this.gameWidth, this.gameHeight);
          ctx.fillStyle = "rgba(0,0,0, 1)";
          ctx.fill();
          ctx.font = "30px Arial";
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.fillText("Press Spacebar to start ze game!", this.gameWidth/2, this.gameHeight/2);
        }//Obviously, the game over screen..
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
      //Function for toggling pause
    togglePause (){
      //
      if(this.gameState == gameState.PAUSED) {
        this.gameState = gameState.RUNNING;
      }else {
        this.gameState = gameState.PAUSED;
      }
}

}
