function Cell( _x, _y, _s ) {

	this.walls = [true, true, true, true];
	this.linePos = [4];

	this.x = _x;
	this.y = _y;
	this.s = _s;

	this.linePos[0] = new Line( this.x,this.y,this.x+this.s,this.y    , true  );//Up
	this.linePos[1] = new Line( this.x,this.y+this.s,this.x+this.s,this.y+this.s, true  );//Down
	this.linePos[2] = new Line( this.x+this.s,this.y,this.x+this.s,this.y+this.s, false );//Right
	this.linePos[3] = new Line( this.x,this.y,this.x,this.y+this.s    , false );//Left

	this.showBox = function() {
		//default
//		fill(0);
		fill(50);

		//part of maze

		noStroke();
		strokeWeight(0);
		if(this.maze)
			rect(this.x,this.y,this.s,this.s);


	}

	this.showLines = function() {
		strokeWeight(4);
		stroke(0,255,0);
		if( this.walls[0])
			this.linePos[0].show();

		if( this.walls[1])
			this.linePos[1].show();

		if( this.walls[2])
			this.linePos[2].show();

		if( this.walls[3])
			this.linePos[3].show();
	}
}
