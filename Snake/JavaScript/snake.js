let myHead;
let foodX;
let foodY;
let scl = 40;
let canvas;

function setup() {
	canvas = createCanvas(
		(window.innerWidth) - (2)*(20),
		(window.innerHeight)- (2)*(20)
	);
	canvas.position(
		(20),
		(20)
	);

	myHead = new SnakeHead(0, 0, scl);
	pickFoodLocation();
	strokeWeight(1);
	stroke(0);
}

function pickFoodLocation() {
	foodX = (round( random(((width -scl)/scl)) ) * scl);
	foodY = (round( random(((height-scl)/scl)) ) * scl);
}

function draw() {
	background(50);
	if ( myHead.alive != false ) {
		myHead.move();
		myHead.show();
		if ( myHead.foodEaten() ) {
			myHead.move();
			pickFoodLocation();
		}
		fill(255,0,0);
		rect( foodX, foodY, scl, scl );
	} else {
		let gameOverMsg = "Game Over";
		textSize(32);
		textAlign(CENTER, CENTER);
		text(gameOverMsg, width/2, height/2);
		textAlign( CENTER, BOTTOM );
		text( floor(myHead.tailLen), width/2, (height/2)-10 );
	}
}

function keyPressed() {
	if(locked) {
		event.preventDefault();
		switch(keyCode) {
			case UP_ARROW: {
				myHead.dir = 0;
				break;
			}
			case DOWN_ARROW: {
				myHead.dir = 1;
				break;
			}
			case RIGHT_ARROW: {
				myHead.dir = 2;
				break;
			}
			case LEFT_ARROW: {
				myHead.dir = 3;
				break;
			}
			default: {
				break;
			}
		}
		if(key === ' ' && myHead.alive === false ) {
			myHead.restart();
			pickFoodLocation();
		}
	}
}

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
