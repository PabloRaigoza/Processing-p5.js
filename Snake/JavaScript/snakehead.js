//my snake function
function SnakeHead(x_, y_, s_) {
	this.x = x_;
	this.y = y_;
	this.s = s_;

	this.dir = 5;
	this.speedCounter = 0;
	this.speed = 10;
	this.alive = true;

	this.tailLen = 0;

	this.histX = [];
	this.histY = [];

	this.show = function() {
  		let r = map( this.tailLen, 0, 96, 0, 255 );
		for(let i = 1; i < this.tailLen+1; i++) {
			let temp = this.histX.length-i;
			fill(0,r/(i*.03),0);
			rect( this.histX[temp], this.histY[temp], this.s, this.s );
		}

		fill(0,255,0);
		rect(this.x, this.y, this.s, this.s);

		textSize(36);
		text(floor(this.tailLen), 10, height-10);
	};

	this.move = function()  {
		let tempX = this.x;
		let tempY = this.y;
		if (this.speedCounter === this.speed)
		{
			this.speedCounter = 0;
     		this.recordHist();
			switch(this.dir) {
				case 0:
					tempY = tempY - this.s;
					break;
				case 1:
					tempY = tempY + this.s;
					break;
				case 2:
					tempX = tempX + this.s;
					break;
				case 3:
					tempX = tempX - this.s;
					break;
				default:
					break;
			}
			if( tempX >= 0 && tempX < width && tempY >= 0 && tempY < height ){
				for(let i = 1; i < this.tailLen+1; i++ ) {
					let temp = this.histX.length-i;
					if( tempX == this.histX[temp] && tempY == this.histY[temp] ) {
						this.alive = false;
						break;
					}
				}
				this.x = tempX;
				this.y = tempY;
				this.show();
			} else {
				this.alive = false;
			}
	}
		else {
			this.speedCounter = this.speedCounter + 1;
		}
	};

	this.foodEaten = function() {
		let eaten = false;
		if( this.x == foodX && this.y == foodY ) {
			this.tailLen++;
			eaten = true;
		}
		return eaten;
	};

	this.recordHist = function() {
		let maxScore = (width/this.s)*(height/this.s);
		if( this.histX.length > maxScore ){
			 this.histX.shift();
			 this.histY.shift();
			 console.log("Removed" + this.histX.length );
		}
		this.histX.push(this.x);
		this.histY.push(this.y);
	};

	this.restart = function() {
		this.x = 0;
		this.y = 0;
		this.tailLen = 0;
		this.dir = 5;
		this.alive = true;
	};

}
