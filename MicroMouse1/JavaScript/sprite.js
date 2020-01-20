function Sprite (_x, _y, _w, _h) {
	this.x = _x;
	this.y = _y;

	this.w = _w;
	this.h = _h;

	this.face = 0;

	this.show = function() {
		fill(255);
		if(this.face == 0){
			stroke(255,0,0);
			line(this.x+(this.w/4), (this.y+this.h)-(this.h/4), (this.x+this.w)-(this.w/4), (this.y+this.h)-(this.h/4));
			noStroke();
			triangle(this.x+(this.w/4), (this.y+this.h)-(h/4), (this.x+this.w)-(this.w/4), (this.y+this.h)-(this.h/4), this.x+(this.w/2), this.y+(this.h/4) );
		}
		if(this.face == 1){
			stroke(255,0,0);
			line(this.x+(this.w/4), this.y+(this.h/4), this.x+(this.w/4), (this.y+this.h)-(this.h/4));
			noStroke();
			triangle(this.x+(this.w/4), this.y+(this.h/4), this.x+(this.w/4), (this.y+this.h)-(this.h/4), (this.x+this.w)-(this.w/4), this.y+(this.h/2) );
		}
		if(this.face == 2){
			stroke(255,0,0);
			line(this.x+(this.w/4), this.y+(this.h/4), (this.x+this.w)-(this.w/4), this.y+(this.h/4));
			noStroke();
			triangle(this.x+(this.w/4), this.y+(this.h/4), (this.x+this.w)-(this.w/4), this.y+(this.h/4), this.x+(this.w/2), (this.y+this.h)-(this.h/4) );
		}
		if(this.face == 3){
			stroke(255,0,0);
			line((this.x+this.w)-(this.w/4), this.y+(this.h/4), (this.x+this.w)-(this.w/4), (this.y+this.h)-(this.h/4));
			noStroke();
			triangle((this.x+this.w)-(this.w/4), this.y+(this.h/4), (this.x+this.w)-(this.w/4), (this.y+this.h)-(this.h/4), this.x+(this.w/4), this.y+(this.h/2) );
		}
	}

	this.clockWise = function() {
		if(this.face==3)
			this.face = 0;
		else
			this.face++;
	}

	this.counterClockwise = function() {
		if(this.face==0)
			this.face = 3;
		else
			this.face--;
	}

	this.forward = function() {
		if(this.face == 0)
			this.y = this.y - this.h;
		else if(this.face == 1)
			this.x = this.x + this.w;
		else if(this.face == 2)
			this.y = this.y + this.h;
		else if(this.face == 3)
			this.x = this.x - this.w;
	}

	this.goBack = function() {
		if(this.face == 0)
			this.y = this.y + this.h;
		else if(this.face == 1)
			this.x = this.x - this.w;
		else if(this.face == 2)
			this.y = this.y - this.h;
		else if(this.face == 3)
			this.x = this.x + this.w;
	}
	
}
