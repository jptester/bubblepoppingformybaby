// 
//
//  Thermometer
//  File: thermometer.js
//  Creator : JP
//  Date: 13/04/2016
//

//
// The namespace of Entretenimiento Lobo
// @namespace
// @name el
//
var el = el || {};

//
// Global variables
// 
el.thermometer = el.thermometer || {};
el.thermometer.TYPE = {
	HORIZONTAL_LEFT_TO_RIGHT: 0,
	HORIZONTAL_RIGHT_TO_LEFT: 1,
	VERTICAL_BOTTOM_UP: 2,
	VERTICAL_TOP_DOWN: 3
};

//
//  Main class for thermometer
//  Creator : JP
//  Date: 13/04/2016
//
el.thermometer.Thermometer = el.Class.extend({
    
	// Type of thermometer
	m_type: el.thermometer.TYPE.HORIZONTAL_LEFT_TO_RIGHT,
	_incrementalBar: null,
	_percentShown: 1,
	_width: 0,
	_heigth: 0,
	_position: null,
    
	//
	// Constructor
	//
	ctor:function ( type, val, sprite ) {
        
		// if valid type
		if ( type != undefined ) {
			
			// set type
			this.m_type = type;			
		}
		
		// set val
		this._percentShown = val;
		
		// incremental bar
		this._incrementalBar = sprite;
		
		// get dimensions
		this._width = this._incrementalBar.width;
		this._heigth = this._incrementalBar.height;
		
		// Set anchor point as 0,0 for convenience
		this._incrementalBar.setAnchorPoint(0,1);
		this._incrementalBar.setPosition(this._incrementalBar.getPosition().x - this._width / 2, this._incrementalBar.getPosition().y + this._heigth / 2 );
		this._position = this._incrementalBar.getPosition();
		
		// Show percent in bar
		this.setPercent(this._percentShown);
    },
	
	//
	// Shows a percent in the bar
	//
	showPercent: function() {

		// if valid bar
		if ( !this._incrementalBar ) {
			return;
		}
		
		/*
		var width = newSprite.width;
		var height = newSprite.height;
		var x_init = 256;
		var y_init = 0;
		var x_fin = 512;
		var y_fin = 256;
		var width_fin = x_fin - x_init;
		var height_fin = y_fin - y_init;
		newSprite.setPosition(400-width/2+x_init,240+height/2-y_init);
		newSprite.setTextureRect(cc.rect(x_init,y_init,width_fin,height_fin));
		*/


		// Points
		var x_init_Point = 0;
		var x_final_Point = this._width;
		var y_init_Point = 0;
		var y_final_Point = this._heigth;		
		
		// progress value
		switch ( this.m_type ) {
			case el.thermometer.TYPE.HORIZONTAL_LEFT_TO_RIGHT:
				x_final_Point = x_final_Point * this._percentShown;
				break;
			case el.thermometer.TYPE.HORIZONTAL_RIGHT_TO_LEFT:
				x_init_Point = this._width - ( x_final_Point * this._percentShown );
				break;
			case el.thermometer.TYPE.VERTICAL_TOP_DOWN:
				y_final_Point = y_final_Point * this._percentShown;
				break;
			case el.thermometer.TYPE.VERTICAL_BOTTOM_UP:
				y_init_Point = this._heigth - ( y_final_Point * this._percentShown );
				break;			
		}
				
		// Get current rect
		var rect = cc.rect(x_init_Point, y_init_Point, x_final_Point - x_init_Point, y_final_Point - y_init_Point);
		
		// Set current rect
		this._incrementalBar.setTextureRect(rect);
		this._incrementalBar.setPosition(this._position.x + x_init_Point, this._position.y - y_init_Point);
		
	},
	
	//
	// Set value 
	//
	setPercent: function(val) {
		
		// val must be between 0 and 1
		val = val < 0 ? 0 : val;
		val = val > 1 ? 1 : val;
		
		// set value
		this._percentShown = val;
		
		// Show current percent
		this.showPercent();
	},
	
	//
	// Get value
	//
	getPercent: function() {
		return this._percentShown;
	},
	
	//
	// Get bar sprite
	//
	getSprite: function() {
		return this._incrementalBar;
	}	
});

