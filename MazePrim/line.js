function Line( _x1, _y1, _x2, _y2, _flat) {
	this.x1 = _x1;
	this.y1 = _y1;

	this.x2 = _x2;
	this.y2 = _y2;

	this.flat = _flat;

	this.show = function() {
		line(this.x1, this.y1,  this.x2, this.y2);
	}
}
