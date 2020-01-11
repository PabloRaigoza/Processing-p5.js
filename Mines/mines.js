let board = [];
let w;
let h;
let totalBlocks;
let scl = 30;
let numOfMines = 25;

let gameOver = false;
let found = 0;

let spacePressed = false;

function setup() {
	createCanvas( 810, 600 );
	w = width /scl;
	h = height/scl;

	totalBlocks = w*h;
	board = new Array(totalBlocks);

	let randomMines = new Array(totalBlocks);
	let spotsChosen = 0;

	for( let i = 0; i < randomMines.length; i++ ){
		randomMines[i] = false;
	}

	let run = true;
	while(run){
		let randNum = floor( random(totalBlocks) );
		
		if( randomMines[randNum] === false ) {// If it has not been chosen, OK
			randomMines[randNum] = true;
			spotsChosen++;
		}

		for( let i = 0; i < w; i++ ){
			if( i === randNum || ((h-1)*w)+i === randNum ){// Top edge? NO
				randomMines[randNum] = false;              // Bottom edge? NO
				spotsChosen--;
			}
		}

		for( let i = 0; i < h-1; i++ ){
			if( i*w === randNum ||  (i*w) + (w-1) === randNum ){// Left edge? NO
				randomMines[randNum] = false;                   // Right edge? NO
				spotsChosen--;
			}
		}

		if(spotsChosen === numOfMines)
			run = false;
	}




	//Assign new board array
	for(let i=0;i<w;i++){
		for(let j=0;j<h;j++){
			let index = i+j*w;
			if(randomMines[index] === true)
				board[index] = new Block( i*scl, j*scl, scl, true );
			else
				board[index] = new Block( i*scl, j*scl, scl, false );

			if( i===0 || j===0 || i === w-1 || j === h-1 )
				board[index].edge = true;
			
		}
	}

	for(let i=0;i<w;i++){
		for(let j=0;j<h;j++){
			let index = i+j*w;
			if( board[index].mine === false && board[index].edge === false ) {
				board[index].minesAround = checkAround( board[index] );
			}
		}
	}

	strokeWeight(0);
}

function checkAround( testBlock ) {
	let mineCounter = 0;
	for( let i = 0; i < 3; i++ ){
		for( let j = 0; j < 3; j++ ){
			let x = floor(testBlock.x) + ( (i*scl) - scl );
			let y = floor(testBlock.y) + ( (j*scl) - scl );
			let index = (x/scl)+( (y/scl) * w);			
			if( x != testBlock.x/scl && y != testBlock.y/scl ){
				if( board[index].mine )
					mineCounter++;
			}
		}
	}
	return mineCounter;
}



function showAround( testBlock ) {
	let surround = [];

	for( let i = 0; i < 3; i++ ){
		for( let j = 0; j < 3; j++ ){
			let x = floor(testBlock.x) + ( (i*scl) - scl );
			let y = floor(testBlock.y) + ( (j*scl) - scl );
			let index = (x/scl)+( (y/scl) * w);			

			if( x != testBlock.x/scl && y != testBlock.y/scl ){
				if( !board[index].shown && !board[index].mine && !board[index].edge ){
					board[index].shown = true;
					if( board[index].minesAround === 0 ){
						showAround( board[index] );			
					}
				}
			}
		}
	}
}





function draw(){
	background(150);

	if(!gameOver){
		for(let i=0;i<board.length;i++) {
			board[i].show();		
		}
	}
	else {
		for(let i=0;i<board.length;i++) {
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

function mousePressed() {
	for( let i = 0; i < w; i++ ){
		for( let j = 0; j < h; j++ ){
			let index = i+j*w;
			if( mouseX > board[index].x && mouseX < board[index].x+scl && mouseY > board[index].y && mouseY < board[index].y+scl){
				if(!board[index].shown && !board[index].mine && !board[index].edge && mouseButton === LEFT ){
					board[index].shown = true;
					if( board[index].minesAround == 0 ){
						showAround( board[index] );
					}
				} else if( mouseButton === RIGHT && !board[index].shown ){
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
				}	else if( board[index].mine && mouseButton === LEFT && mouseButton != RIGHT ){
						gameOver = true;
						console.log("GAME OVER");	
					}
			}
		}
	}
}

function keyPressed(){
	if(keyCode === ENTER ){
		for(let i = 0; i < board.length; i++){
			board[i].shown = false;
			board[i].guessed = false;
			gameOver = false;
		}
	}
}
/*
let locked = false;

function mouseClicked() {
	if (!locked && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height ) {
		locked = true;
		requestPointerLock();
	} else {
		exitPointerLock();
		locked = false;
	}
}
*/

