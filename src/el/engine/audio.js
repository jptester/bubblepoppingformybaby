//
//  Audio class for Entretenimiento Lobo 
//  File: audio.js
//  Creator : JP
//  Date: 14/03/2016
//

//
// The namespace of Entretenimiento Lobo
// @namespace
// @name el
//
var el = el || {};


// Constants
el.MAX_SOUND_EFFECTS = 20;

// Just an interface class for audio
//
// Creator : JP
// Date: 27/01/2016
//
el.Audio = (function () {

	// Private object / singleton instance
	var _audio;
	var _queue;
		
	// Private creation instance function 
    function createInstance() {
		
		// This is the main object
        var audio = new Object();
		
		// Add method play effect
		audio.playEffect = playEffect;
		
		// return new object
        return audio;
    };
	
	// Play effect
	function playEffect(url, loop) {
		
		// default value for loop = false
		loop = loop || false;

		// if linux
		if ( cc.sys.isNative && cc.sys.LINUX ) {
			
			// get id
			if ( _queue.length >= el.MAX_SOUND_EFFECTS ) {
				
				var idSound = _queue.splice(0,1);
				if ( idSound[0] != undefined ) {
					cc.audioEngine.stopEffect(idSound[0]);
				}				
			}
			
			// Add sound ID to queue and play it
			_queue.push(cc.audioEngine.playEffect(url, loop));
			
			// Leave
			return;
		}
		
		// if not linux just play the sound
		cc.audioEngine.playEffect(url, loop);
	}
	
	// Public methods
    return {
		
		// get instance
        getInstance: function () {
            if (_audio === undefined) {
                _audio = createInstance();
				_queue = [];
            }
            return _audio;
        },
    };
})();