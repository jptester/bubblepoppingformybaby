//
//  Game class for Entretenimiento Lobo 
//  File: game.js
//  Creator : JP
//  Date: 27/01/2016
//

//
// The namespace of Entretenimiento Lobo
// @namespace
// @name el
//
var el = el || {};

// Game singleton
//
// Creator : JP
// Date: 27/01/2016
//
el.Game = (function () {

	// Private object / singleton instance
	var _game;
	
	// Private creation instance function 
    function createInstance() {
		
		// This is the main object
        var game = new Object();
		
		// Persistence object
		game.persistentObject = null;
		
		// Basic persistence object
		game.persistentObject = new el.LocalPersistence();
		
		// Load game
		game.loadGame = function() {
			return game.persistentObject.loadGame();
		}

		// Load current level
		game.loadCurrentSavedGameLevel = function() {
			return game.persistentObject.currentLevel;
		}
		
		// Load current sub level
		game.loadCurrentSavedGameSubLevel = function() {
			return game.persistentObject.currentSubLevel;
		}
		
		// Saves current game
		game.saveGame = function() {
			return game.persistentObject.saveGame();
		}
		
		// Advertising Networks
		
		// Set up plugins variable
		game.adsNetworksPlugIn = new el.AdsNetworksScope.AdsNetworks();
		
		// Initialize plugins
		game.initPlugIns = function() {
			game.adsNetworksPlugIn.initPlugIns();
		}
		
		// Load Interestitials
		game.loadInterestitials = function() {
			game.adsNetworksPlugIn.loadInterestitials();
		}
		
		// Returns true if there is an interestitial ready
		game.isAnyInterestitialReady = function() {
			return game.adsNetworksPlugIn.isAnyInterestitialReady();
		}
		
		// Play ads
		game.playAds = function() {
			game.adsNetworksPlugIn.playAds();
		}
		
		// return new object
        return game;
    };
		
	// Public methods
    return {
		
		// get instance
        getInstance: function () {
            if (_game === undefined) {
                _game = createInstance();
            }
            return _game;
        },
		
		// Once ad has been dismissed
		adDismissed: function() {
			// Load new ads
			if ( _game ) {
				_game.loadInterestitials();
			}
			else {
				el.gELLog("ERROR: No 'game' variable");
			}
		},		
		
		removeCommand: "remove",
		stopCommand: "stop",
    };
})();