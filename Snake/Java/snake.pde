SnakeHead myHead;
int foodX;
int foodY;
int scl = 20;
void setup() {
  size( 600, 420 );
  myHead = new SnakeHead(0, 0, scl);
  pickFoodLocation();
}

void pickFoodLocation() {
  foodX = (round( random(((width -scl)/scl)) ) * scl);
  foodY = (round( random(((height-scl)/scl)) ) * scl);

  println(foodX, foodY);
}
void draw() {
  background(50);
  if (myHead.alive != false ) {
    myHead.move();
    myHead.show();
    if ( myHead.foodEaten()) {
      pickFoodLocation();
    }
  } else {
    String gameOverMsg = "Game Over";
    textSize(32);
    textAlign(CENTER, CENTER);
    text(gameOverMsg, 300, 200);
    textAlign( CENTER, BOTTOM );
    text( floor(myHead.tailLen), 300, 300 );
  }
  strokeWeight(1);
  stroke(0);
  fill(255,0,0);
  rect( foodX, foodY, scl, scl );
}

void keyPressed() {
  if (key == CODED)
    switch(keyCode) {
    case UP:
      {
        myHead.dir = 0;
        break;
      }
    case DOWN:
      {
        myHead.dir = 1;        
        break;
      }
    case RIGHT:
      {
        myHead.dir = 2;
        break;
      }
    case LEFT:
      {
        myHead.dir = 3;
        break;
      }
  }
  else {
    if(key == ' ' && myHead.alive == false ) {
      myHead.restart();
      pickFoodLocation();
    }
  }
}
