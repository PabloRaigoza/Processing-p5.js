function Wall(_x1, _y1, _x2, _y2, _solid) {
	this.x1 = _x1;
	this.y1 = _y1;

	this.x2 = _x2;
	this.y2 = _y2;

	this.solid = _solid;

	this.show = function() {
		if(this.solid)
			line(this.x1, this.y1,  this.x2, this.y2);
	}
}
