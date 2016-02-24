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
		
		removeCommand: "remove",
		stopCommand: "stop",
    };
})();