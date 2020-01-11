function Block( x, y, s, mine ){
	this.x = x;
	this.y = y;
	this.s = s;
	this.mine = mine;

	this.edge = false;
	this.shown = false;

	this.guessed = false;

	this.c = 255;

	this.minesAround = 0;

	this.update = function(){
		if(mine)
			c = 150;
	}

	this.show = function(){
		fill(this.c);
		if(this.edge){
			fill( 200, 50, 50 );
			rect( this.x, this.y, this.s, this.s );
		}	else if( (!this.shown && this.guessed) || (this.shown && this.mine) ){
			fill(150);
			rect( this.x, this.y, this.s, this.s );
			fill(0);
			textSize(18);
			textAlign( CENTER, CENTER );
			text( "#", this.x+(this.s/2), this.y+(this.s/2));
		}	else if(this.shown && !this.mine){
			rect( this.x, this.y, this.s, this.s );
			if(!this.edge && !this.mine && this.minesAround != 0){
				fill(0);
				textSize(18);
				textAlign( CENTER, CENTER );
				text( this.minesAround, this.x+(this.s/2), this.y+(this.s/2));
			}
		}
	}
}
