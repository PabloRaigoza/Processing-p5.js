//Loads Mazes created from other program
Sprite microMouse;
Wall[][] walls;

int w;
int h;
int scl = 25;
boolean gameOver = false;
void setup() {
	size(500,500);

	w = width/scl;
	h = height/scl;

	microMouse = new Sprite( 0, 0, scl, scl );
	
	walls = new Wall[w*h][4];
	loadMaze();
}

void loadMaze() {
	BufferedReader reader = createReader("../CreatedMazes/Maze8.txt");
	String line = null;
	int cellCounter = 0;
	int wallCounter = 0;
	try {
		while ((line = reader.readLine()) != null) {
			String[] pieces = split(line, " ");
			int x1 = int(pieces[0]);
			int y1 = int(pieces[1]);

			int x2 = int(pieces[2]);
			int y2 = int(pieces[3]);

			boolean isShown = false;

			if( pieces[4].equals("t") )
				isShown = true;

			walls[cellCounter][wallCounter] = new Wall(x1,y1,x2,y2,isShown);
			wallCounter++;
			if(wallCounter == 4) {
				wallCounter = 0;
				cellCounter++;
			}
		}
		reader.close();
	} catch (IOException e) {
		e.printStackTrace();
	}
}

void draw() {
	background(100);	
	stroke(0,255,0);
	strokeWeight(4);

	for(int i = 0; i < w*h; i++) {
		for(int j = 0; j < 4; j++) {
			walls[i][j].show();
		}
	}

	noStroke();
	microMouse.show();

	if(gameOver) {
		textSize(64);
		textAlign(CENTER);
		fill(0);
		text("GAME OVER", width/2, height/2);
	}
	if(microMouse.x == width-scl && microMouse.y == height-scl)
		gameOver = true;
}

boolean wallInFront() {
	microMouse.forward();
	int index = (microMouse.y/scl) + ((microMouse.x/scl)*(w));
	
	if(index >= 0 && microMouse.x < width && microMouse.y < height) {
		if(microMouse.face == 0 && walls[index][1].solid) {
			microMouse.goBack();
			return true;
		}
		else if(microMouse.face == 1 && walls[index][3].solid) {
			microMouse.goBack();
			return true;
		}
		else if(microMouse.face == 2 && walls[index][0].solid) {
			microMouse.goBack();
			return true;
		}
		else if(microMouse.face == 3 && walls[index][2].solid) {
			microMouse.goBack();
			return true;
		}
	}
	else {
		microMouse.goBack();
		return true;
	}
	microMouse.goBack();
	return false;
}

void keyPressed() {
	if(!gameOver){
		if(key == ' ')
			if(!wallInFront())
				microMouse.forward();
		if(keyCode == RIGHT)
			microMouse.clockWise();
		if(keyCode == LEFT)
			microMouse.counterClockwise();
		if( keyCode == DOWN || keyCode == UP) {
			microMouse.clockWise();
			microMouse.clockWise();
		}
	}
}
