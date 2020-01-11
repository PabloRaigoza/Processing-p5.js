class Block {
	float x;
	float y;

	float s;
	boolean mine = false;
	
	boolean edge = false;
	boolean shown = false;

	boolean guessed = false;

	color c = 255;

	int minesAround = 0;

	Block( float _x, float _y, float _s, boolean _mine ) {
		x = _x;
		y = _y;
		s = _s;
		mine = _mine;
		if(mine) {
			c = 150;
		}
	}

	void show()	{
		fill(c);
		if(edge){
			fill( 200, 50, 50 );
			rect( x, y, s, s );
		}	else if( (!shown && guessed) || (shown && mine) ){
			fill(150);
			rect( x, y, s, s );
			fill(0);
			textSize(18);
			textAlign( CENTER, CENTER );
			text( "#", x+(s/2), y+(s/2));
		}	else if(shown && !mine){
			rect( x, y, s, s );
			if(!edge && !mine && minesAround != 0){
				fill(0);
				textSize(18);
				textAlign( CENTER, CENTER );
				text( minesAround, x+(s/2), y+(s/2));
			}
		}
	}

}
