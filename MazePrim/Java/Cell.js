class Cell {
	int x;
	int y;
	int s;

	boolean maze = false;
	boolean visited = false;

	boolean[] walls = {true, true, true, true};
	Line[] linePos = new Line[4];

	Cell(int _x, int _y, int _s){
		x = _x;
		y = _y;
		s = _s;

		linePos[0] = new Line( x,y,x+s,y    , true  );//Up
		linePos[1] = new Line( x,y+s,x+s,y+s, true  );//Down
		linePos[2] = new Line( x+s,y,x+s,y+s, false );//Right
		linePos[3] = new Line( x,y,x,y+s    , false );//Left

	}

	void showBox() {
		//default
//		fill(0);
		fill(50);

		//part of maze

		noStroke();
		strokeWeight(0);
		if(maze)
			rect(x,y,s,s);


	}

	void showLines() {
		strokeWeight(4);
		stroke(0,255,0);
		if( walls[0])
			linePos[0].show();

		if( walls[1])
			linePos[1].show();

		if( walls[2])
			linePos[2].show();

		if( walls[3])
			linePos[3].show();
	}
}
