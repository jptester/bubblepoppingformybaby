// 
//
//  Face Thermometer for Bubble Popping
//  File: facethermometer.js
//  Creator : JP
//  Date: 12/05/2016
//

//
// The namespace of Entretenimiento Lobo
// @namespace
// @name el
//
var el = el || {};

//
// Global variables and scopes (namespaces)
// 
el.bubble = el.bubble || {};

//
//  Main class for the face thermometer
//  Creator : JP
//  Date: 12/05/2016
//
el.bubble.FaceThermometer = el.thermometer.Thermometer.extend({
    
	// Thermometer
	_m_faces: null,
    
	//
	// Constructor
	//
	ctor:function ( type, val, sprite, spritesFaces ) {
        
		//////////////////////////////
        // 1. super init first
        this._super( type, val, sprite );
				
		this._m_faces = spritesFaces;
    },
	
	//
	// Set value 
	//
	setPercent: function(val) {
		
		//////////////////////////////
        // 1. super init first
        this._super( val );
		
		// if there are faces
		if ( this._m_faces ) {
		
			// Steps
			var fSteps = 1 / (this._m_faces.length + 1) ;
			
			// if percent is low enough show faces
			for ( var iFace = this._m_faces.length; iFace > 0; iFace-- ) {
				
				// If no face
				if ( this._m_faces[iFace - 1] == undefined ) {
					break;
				}
				
				// Every face is hidden by default
				this._m_faces[iFace - 1].setVisible(false);					

				// if val is not big enough
				if ( val >= fSteps * iFace ) {
					this._m_faces[iFace - 1].setVisible(true);
					break;
				}
			}
		}
	},	
});

