//Loads Mazes created from other program
let microMouse;
let walls = [];

let file;
let w;
let h;
let scl = 25;
let gameOver = false;

function preload() {
	file = loadStrings("Maze1.txt");
}
function setup() {
	createCanvas(500,500);

	w = width/scl;
	h = height/scl;

	microMouse = new Sprite( 0, 0, scl, scl );

	for(let i = 0; i < w*h; i++) {
		walls[i] = [];
	}
	loadMaze();
}

function loadMaze() {
	let cellCounter = 0;
	let wallCounter = 0;
	for( let i = 0; i < file.length-1; i++) {
		let line = file[i];
		let pieces = split(line, " ");
		let x1 = parseInt(pieces[0],10);
		let y1 = parseInt(pieces[1],10);

		let x2 = parseInt(pieces[2],10);
		let y2 = parseInt(pieces[3],10);

		let isShown = true;

		if( pieces[4].localeCompare("f") === 0 ){
			isShown = false;
			console.log("so i never run");
		} else {
			console.log(pieces[4]);
			isShown = true;
		}

		walls[cellCounter][wallCounter] = new Wall(x1,y1,x2,y2,isShown);
		wallCounter++;
		if(wallCounter == 4) {
			wallCounter = 0;
			cellCounter++;
		}
	}
}

function draw() {
	background(100);	
	stroke(0,255,0);
	strokeWeight(4);

	for(let i = 0; i < w*h; i++) {
		for(let j = 0; j < 4; j++) {
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

function wallInFront() {
	microMouse.forward();
	let index = (microMouse.y/scl) + ((microMouse.x/scl)*(w));
	
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

function keyPressed() {
	if(!gameOver){
		if(key == ' ')
			if(!wallInFront())
				microMouse.forward();
		if(keyCode == RIGHT_ARROW)
			microMouse.clockWise();
		if(keyCode == LEFT_ARROW)
			microMouse.counterClockwise();
		if( keyCode == DOWN_ARROW || keyCode == UP_ARROW) {
			microMouse.clockWise();
			microMouse.clockWise();
		}
	}
}
