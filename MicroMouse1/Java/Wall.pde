class Wall {
	int x1;
	int y1;

	int x2;
	int y2;

	boolean solid = false;

	Wall( int _x1, int _y1, int _x2, int _y2, boolean _solid ) {
		x1 = _x1;
		y1 = _y1;

		x2 = _x2;
		y2 = _y2;
	
		solid = _solid;
	}

	void show() {
		if(solid)
			line(x1, y1,  x2, y2);
	}
}
