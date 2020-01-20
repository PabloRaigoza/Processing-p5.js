class Sprite {
	int x;
	int y;

	int w;
	int h;

	int face = 0;

	Sprite(int _x, int _y, int _w, int _h) {
		x = _x;
		y = _y;

		w = _w;
		h = _h;
	}

	void show() {
		fill(255);
		if(face == 0){
			stroke(255,0,0);
			line(x+(w/4), (y+h)-(h/4), (x+w)-(w/4), (y+h)-(h/4));
			noStroke();
			triangle(x+(w/4), (y+h)-(h/4), (x+w)-(w/4), (y+h)-(h/4), x+(w/2), y+(h/4) );
		}
		if(face == 1){
			stroke(255,0,0);
			line(x+(w/4), y+(h/4), x+(w/4), (y+h)-(h/4));
			noStroke();
			triangle(x+(w/4), y+(h/4), x+(w/4), (y+h)-(h/4), (x+w)-(w/4), y+(h/2) );
		}
		if(face == 2){
			stroke(255,0,0);
			line(x+(w/4), y+(h/4), (x+w)-(w/4), y+(h/4));
			noStroke();
			triangle(x+(w/4), y+(h/4), (x+w)-(w/4), y+(h/4), x+(w/2), (y+h)-(h/4) );
		}
		if(face == 3){
			stroke(255,0,0);
			line((x+w)-(w/4), y+(h/4), (x+w)-(w/4), (y+h)-(h/4));
			noStroke();
			triangle((x+w)-(w/4), y+(h/4), (x+w)-(w/4), (y+h)-(h/4), x+(w/4), y+(h/2) );
		}
	}

	void clockWise() {
		if(face==3)
			face = 0;
		else
			face++;
	}

	void counterClockwise() {
		if(face==0)
			face = 3;
		else
			face--;
	}

	void forward() {
		if(face == 0)
			y = y - h;
		else if(face == 1)
			x = x + w;
		else if(face == 2)
			y = y + h;
		else if(face == 3)
			x = x - w;
	}

	void goBack() {
		if(face == 0)
			y = y + h;
		else if(face == 1)
			x = x - w;
		else if(face == 2)
			y = y - h;
		else if(face == 3)
			x = x + w;
	}
	
}
