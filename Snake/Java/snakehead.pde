class SnakeHead {
  float x;
  float y;
  float s;
  int dir = 5;
  float speedCounter;
  float speed = 10;
  boolean alive = true;
  
  float tailLen = 0;
  
  ArrayList<Float> histX = new ArrayList<Float>();
  ArrayList<Float> histY = new ArrayList<Float>();
  
  SnakeHead( float x_, float y_, float s_ ) {
    x = x_;
    y = y_;
    s = s_;
  }

  void show() {
    strokeWeight(0);
    stroke(0);
    float r = map( tailLen, 0, 96, 0, 255 );
    for(int i = 1; i < tailLen+1; i++) {
      int temp = histX.size()-i;
      fill(0,0,r/(i*.03));
      rect( histX.get(temp), histY.get(temp), s, s );
    }
    fill(0,255,0);
    rect(x, y, s, s);
    
    textSize(36);
    text(floor(tailLen), 10, height-10);
  }

  void move() {
    float tempX = x;
    float tempY = y;
    if (speedCounter == speed)
    {
      speedCounter = 0;
      recordHist();
      switch(dir) {
      case 0: {
          tempY = tempY - s;
          break;
        }
      case 1: {
          tempY = tempY + s;
          break;
        }
      case 2: {
          tempX = tempX + s;
          break;
        }
      case 3: {
          tempX = tempX - s;
          break;
        }
       default: {
          break;
        }
      }
      if( tempX >= 0 && tempX < width && tempY >= 0 && tempY < height ){
        for(int i = 1; i < tailLen+1; i++ ) {
          int temp = histX.size()-i;
          if( tempX == histX.get(temp) && tempY == histY.get(temp) ) {
            alive = false;
            println("Game Over");
            break; 
          }
        }
        x = tempX;
        y = tempY;
        show();
      } else {
        alive = false;
        println("Game Over");
      }
    }
    else {
      speedCounter++;
    }
  }
  
  boolean foodEaten() {
    boolean eaten = false;
    if( x == foodX && y == foodY ) {
      tailLen++;
      eaten = true;      
    }
    return eaten;
  }
  
  void recordHist() {
    float maxScore = (width/s)*(height/s);
    if( histX.size() > maxScore ){
       histX.remove(0);
       histY.remove(0);
       println("Removed" + histX.size());
    }
    histX.add(x);
    histY.add(y);
  }
  
  void restart() {
    x = 0;
    y = 0;
    tailLen = 0;
    dir = 5;
    alive = true;
  }
  
}
