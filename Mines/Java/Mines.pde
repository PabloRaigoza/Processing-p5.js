Block[] board;
int w;
int h;
int totalBlocks;
int scl = 30;
int numOfMines = 25;
boolean gameOver = false;
int found = 0;

void setup() {
	size(600, 450);

	w = width/scl;
	h = height/scl;

	totalBlocks = w*h;
	board = new Block[totalBlocks];

	boolean[] randomMines = new boolean[totalBlocks];
	int spotsChosen = 0;

	for (int i = 0; i < randomMines.length; i++) {
		randomMines[i] = false;
	}

	boolean run = true;
	while(run){
		int randNum = floor( random(totalBlocks) );
		boolean chosen = false;
		
		if( randomMines[randNum] == false ) {
			randomMines[randNum] = true;
			spotsChosen++;
		}

		for( int i = 0; i < w; i++ ){
			if( i == randNum || ((h-1)*w)+i == randNum ){
				randomMines[randNum] = false;
				spotsChosen--;
			}
		}

		for( int i = 0; i < h-1; i++ ){
			if( i*w == randNum ||  (i*w) + (w-1) == randNum ){
				randomMines[randNum] = false;
				spotsChosen--;
			}
		}

		if(spotsChosen==numOfMines)
			run = false;
	}

	for(int i=0;i<w;i++){
		for(int j=0;j<h;j++){
			int index = i+j*w;
			if(randomMines[index] == true)
				board[index] = new Block( i*scl, j*scl, scl, true );
			else
				board[index] = new Block( i*scl, j*scl, scl, false );

			if( i==0 || j==0 || i == w-1 || j == h-1 )
				board[index].edge = true;
			
		}
	}

	for(int i=0;i<w;i++){
		for(int j=0;j<h;j++){
			int index = i+j*w;
			if( board[index].mine == false && board[index].edge == false ) {
				board[index].minesAround = checkAround( board[index] );
			}
		}
	}

	strokeWeight(0);


}

int checkAround( Block testBlock ) {
	int mineCounter = 0;
	for( int i = 0; i < 3; i++ ){
		for( int j = 0; j < 3; j++ ){
			int x = floor(testBlock.x) + ( (i*scl) - scl );
			int y = floor(testBlock.y) + ( (j*scl) - scl );
			int index = (x/scl)+( (y/scl) * w);			
			if( x != testBlock.x/scl && y != testBlock.y/scl ){
				if( board[index].mine )
					mineCounter++;
			}
		}
	}
	return mineCounter;
}

void showAround( Block testBlock ) {
	Block[] surround;

	for( int i = 0; i < 3; i++ ){
		for( int j = 0; j < 3; j++ ){
			int x = floor(testBlock.x) + ( (i*scl) - scl );
			int y = floor(testBlock.y) + ( (j*scl) - scl );
			int index = (x/scl)+( (y/scl) * w);			

			if( x != testBlock.x/scl && y != testBlock.y/scl ){
				if( !board[index].shown && !board[index].mine && !board[index].edge ){
					board[index].shown = true;
					if( board[index].minesAround == 0 ){
						showAround( board[index] );					
					}
				}
			}
		}
	}
}

void draw() {
	background(150);

	if(!gameOver){
		for(int i=0;i<board.length;i++) {
			board[i].show();		
		}
	}
	else {
		for(int i=0;i<board.length;i++) {
			board[i].shown = true;
			if(board[i].mine){
				board[i].guessed = true;
			}
			else{
				board[i].guessed = false;
			}
			board[i].show();
		}
	}
	if(found >= numOfMines){
		textSize(64);
		textAlign(CENTER, CENTER);
		text("Victory!", width/2, height/2);
		gameOver = true;
	}

}

void mousePressed() {
	for( int i = 0; i < w; i++ ){
		for( int j = 0; j < h; j++ ){
			int index = i+j*w;
			if( mouseX > board[index].x && mouseX < board[index].x+scl && mouseY > board[index].y && mouseY < board[index].y+scl){
				if(!board[index].shown && !board[index].mine && !board[index].edge && mouseButton == LEFT){
					board[index].shown = true;
					if( board[index].minesAround == 0 ){
						showAround( board[index] );
					}
				} else if( mouseButton == RIGHT && !board[index].shown ){
						if(board[index].guessed){
							board[index].guessed = false;
							if(board[index].mine)
								found--;
						}
						else {
							board[index].guessed = true;
							if(board[index].mine)
								found++;
						}
				}	else if( board[index].mine && mouseButton == LEFT ){
						gameOver = true;
						println("GAME OVER");	
					}
			}
		}
	}
}

void keyPressed(){
	if(key == ' '){
		for(int i = 0; i < board.length; i++){
			board[i].shown = false;
			board[i].guessed = false;
			gameOver = false;
		}
	}
}


