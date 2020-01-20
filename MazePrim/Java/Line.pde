class Line {
	int x1;
	int y1;

	int x2;
	int y2;

	boolean flat;

	Line( int _x1, int _y1, int _x2, int _y2, boolean _flat ) {
		x1 = _x1;
		y1 = _y1;

		x2 = _x2;
		y2 = _y2;
	
		flat = _flat;
	}

	void show() {
		line(x1, y1,  x2, y2);
	}
}
