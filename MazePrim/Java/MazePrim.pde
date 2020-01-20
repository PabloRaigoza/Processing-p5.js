PrintWriter output;

Cell[][] board;
ArrayList<Line> wallList = new ArrayList<Line>();

int w;
int h;
int scl = 25;

boolean done = false;

void setup() {
	size(500,500);

	w = width/scl;
	h = height/scl;

	board = new Cell[w][h];
	output = createWriter("../CreatedMazes/Maze1.txt");

	for( int i = 0; i < w; i++ ){
		for( int j = 0; j < h; j++ ){
			board[i][j] = new Cell( i*scl,j*scl,scl );
		}
	}

	board[1][1].maze = true;
	addWalls( 1, 1 );
}

void addWalls( int i, int j ) {
	wallList.add( board[i][j].linePos[0] );
	wallList.add( board[i][j].linePos[1] );
	wallList.add( board[i][j].linePos[2] );
	wallList.add( board[i][j].linePos[3] );
}

void draw() {
	background(100);
	for( int i = 0; i < w; i++ ){
		for( int j = 0; j < h; j++ ){
			board[i][j].showBox();
		}
	}

	for( int i = 0; i < w; i++ ){
		for( int j = 0; j < h; j++ ){
			board[i][j].showLines();
		}
	}

	if( wallList.size() > 0 ) {
		int index = floor(random(wallList.size()));
		int upLeftX = 0;
		int upLeftY = 0;

		if( wallList.get(index).flat ) {
			upLeftX = wallList.get(index).x1;    //cell x pos
			upLeftY = wallList.get(index).y1-scl;//cell y pos
		}
		else {
			upLeftX = wallList.get(index).x1-scl;
			upLeftY = wallList.get(index).y1;
		}



		int downRightX = wallList.get(index).x1;  //cell x pos
		int downY = wallList.get(index).y1;  //cell y pos

		int aboveLeftI = -1;
		int aboveLeftJ = -1;

		int belowRightI = -1;
		int belowRightJ = -1;

		for(int i = 0; i < w; i++) {
			for(int j = 0; j < h; j++) {
				if( board[i][j].x == upLeftX && board[i][j].y == upLeftY ) {
					aboveLeftI = i;
					aboveLeftJ = j;
				} else if( board[i][j].x == downRightX && board[i][j].y == downY ) {
					belowRightI = i;
					belowRightJ = j;
				}
			}
		}
		if( aboveLeftI >= 0 && aboveLeftJ >= 0 && belowRightI >= 0 && belowRightJ >= 0 ) {
			if(board[aboveLeftI][aboveLeftJ].maze && !board[belowRightI][belowRightJ].maze) {
				if(wallList.get(index).flat){
					board[aboveLeftI][aboveLeftJ].walls[1] = false;
					board[belowRightI][belowRightJ].walls[0] = false;
				} else {
					board[aboveLeftI][aboveLeftJ].walls[2] = false;
					board[belowRightI][belowRightJ].walls[3] = false;
				}

				board[belowRightI][belowRightJ].maze = true;
				addWalls(belowRightI,belowRightJ);
				}
				if(board[belowRightI][belowRightJ].maze && !board[aboveLeftI][aboveLeftJ].maze) {
					if(wallList.get(index).flat){
						board[aboveLeftI][aboveLeftJ].walls[1] = false;
						board[belowRightI][belowRightJ].walls[0] = false;
					} else{
						board[aboveLeftI][aboveLeftJ].walls[2] = false;
						board[belowRightI][belowRightJ].walls[3] = false;
					}

					board[aboveLeftI][aboveLeftJ].maze = true;
					addWalls(aboveLeftI,aboveLeftJ);
				}
			}
		wallList.remove(index);
	}
	else if(!done) {
		for( int i = 0; i < w; i++ ){
			for( int j = 0; j < h; j++ ){
				for(int n = 0; n < 4; n++ ){
					char flat;
					if(board[i][j].walls[n]){
						flat = 't';
					}
					else{
						flat = 'f';
					}

					output.println( board[i][j].linePos[n].x1 +" "+ 
													board[i][j].linePos[n].y1 +" "+
													board[i][j].linePos[n].x2 +" "+
													board[i][j].linePos[n].y2 +" "+
													flat);
				}
			}
		}
		done = true;
	}
	if(done){
		output.flush();
		output.close();
		exit();
	}
}
