let board = [];
let wallList = [];

let w;
let h;
let scl = 25;

function setup() {
	createCanvas(500,500);

	w = width/scl;
	h = height/scl;

	for( let i = 0; i < w; i++ ){
		board[i] = [];
	}

	for( let i = 0; i < w; i++ ){
		for( let j = 0; j < h; j++ ){
			board[i][j] = new Cell( i*scl,j*scl,scl );
		}
	}

	board[1][1].maze = true;
	addWalls( 1, 1 );
}

function addWalls( i, j ) {
	wallList.push( board[i][j].linePos[0] );
	wallList.push( board[i][j].linePos[1] );
	wallList.push( board[i][j].linePos[2] );
	wallList.push( board[i][j].linePos[3] );
}

function draw() {
	background(100);
	for( let i = 0; i < w; i++ ){
		for( let j = 0; j < h; j++ ){
			board[i][j].showBox();
		}
	}

	for( let i = 0; i < w; i++ ){
		for( let j = 0; j < h; j++ ){
			board[i][j].showLines();
		}
	}

	if( wallList.length > 0 ) {
		let index = floor(random(wallList.length));
		if( wallList[index].flat ) {
//			prletln("flat");
			let upX = wallList[index].x1;    //cell x pos
			let upY = wallList[index].y1-scl;//cell y pos

			let downX = wallList[index].x1;  //cell x pos
			let downY = wallList[index].y1;  //cell y pos

			let aboveI = -1;
			let aboveJ = -1;

			let belowI = -1;
			let belowJ = -1;
			let visitCounter = 0;

			for(let i = 0; i < w; i++) {
				for(let j = 0; j < h; j++) {
					if( board[i][j].x == upX && board[i][j].y == upY ) {
						aboveI = i;
						aboveJ = j;
					} else if( board[i][j].x == downX && board[i][j].y == downY ) {
						belowI = i;
						belowJ = j;
					}
				}
			}

			if( aboveI >= 0 && aboveJ >= 0 && belowI >= 0 && belowJ >= 0 ) {
				if(board[aboveI][aboveJ].maze && !board[belowI][belowJ].maze) {
					board[aboveI][aboveJ].walls[1] = false;
					board[belowI][belowJ].walls[0] = false;

					board[belowI][belowJ].maze = true;
					addWalls(belowI,belowJ);
				}
				if(board[belowI][belowJ].maze && !board[aboveI][aboveJ].maze) {
					board[aboveI][aboveJ].walls[1] = false;
					board[belowI][belowJ].walls[0] = false;

					board[aboveI][aboveJ].maze = true;
					addWalls(aboveI,aboveJ);
				}
			}







		}
		else if( !wallList[index].flat ) {
//			prletln("vertical");
			let leftX = wallList[index].x1-scl;    //cell x pos
			let leftY = wallList[index].y1;//cell y pos

			let rightX = wallList[index].x1;  //cell x pos
			let rightY = wallList[index].y1;  //cell y pos

			let leftI = -1;
			let leftJ = -1;

			let rightI = -1;
			let rightJ = -1;
			let visitCounter = 0;

			for(let i = 0; i < w; i++) {
				for(let j = 0; j < h; j++) {
					if( board[i][j].x == leftX && board[i][j].y ==leftY ) {
						leftI = i;
						leftJ = j;
					} else if( board[i][j].x == rightX && board[i][j].y == rightY ) {
						rightI = i;
						rightJ = j;
					}
				}
			}

			if( leftI >= 0 && leftJ >= 0 && rightI >= 0 && rightJ >= 0 ) {
				if(board[leftI][leftJ].maze && !board[rightI][rightJ].maze) {
					board[leftI][leftJ].walls[2] = false;
					board[rightI][rightJ].walls[3] = false;

					board[rightI][rightJ].maze = true;
					addWalls(rightI,rightJ);
				}
				if(board[rightI][rightJ].maze && !board[leftI][leftJ].maze) {
					board[leftI][leftJ].walls[2] = false;
					board[rightI][rightJ].walls[3] = false;

					board[leftI][leftJ].maze = true;
					addWalls(leftI,leftJ);
				}
			}	
		}






		wallList.splice(index,1);
	}

}
