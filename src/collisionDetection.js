export function detectCollision(ball, gameObjects){

  let bottomOfBall = ball.position.y + ball.size;
  let topOfBall = ball.position.y;
  let topOfObject = gameObjects.position.y;
  let leftSideOfObject = gameObjects.position.x;
  let rightSideOfObject = gameObjects.position.x + gameObjects.width;
  let bottomOfObject = gameObjects.position.y + gameObjects.height;



  if(bottomOfBall >= topOfObject
    && topOfBall <= bottomOfObject
    && ball.position.x >= leftSideOfObject
    && ball.position.x + ball.size <= rightSideOfObject

  ) {
    return true;
  } else {
    return false;
  }









}
