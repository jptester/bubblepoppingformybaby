// 
//
//  Game Scene
//  File: game-scenes.js
//  Creator : JP
//  Date: 25/01/2016
//

//
// The namespace of Entretenimiento Lobo
// @namespace
// @name el
//

var el = el || {};

//
// Game level manager
// Creator : JP
// Date: 25/01/2016
//
el.GameLevelManager = (function () {

	// Private object / singleton instance
	var gameLevelManager;

	// DO NOT USE "this." pointer in order to access these properties, they are private
	// Private properties
	var _gameTree;
	var _currentLevelKey;
	var _currentLevel;
		
	// Private creation instance function 
    function createInstance() {
		
		// This is the main object
        var gamelevelmanger = new Object();
		
		// Load all game scenes
		if ( !loadGameTreeLevels() ) {
			el.gELLog("No content loaded");
		}
		
		// Load first level
		gamelevelmanger.loadFirstLevelScene = function() {

			// key for first level
			var firstKey = 1;
			
			// there must be at least one level
			if ( _gameTree.size > 0 ) {
				
				// get pointer to first element at level map
				var mapIter = _gameTree.keys();
				
				// if valid pointer load first element
				firstKey = mapIter.next().value;
			}
						
			// Load that level by key
			return gamelevelmanger.loadSceneByKey(firstKey);
		}
		
		// Loads a level by key and returns a new scene depending on the content itself
		gamelevelmanger.loadSceneByKey = function(levelKey) {
			
			// currentGame
			
			// if there is no main tree level content, exit
			if ( _gameTree.size <= 0 ) {
				el.gELLog("No content available to load from");
				return new el.LevelScene(null);
			}
			
			// levelKey must exist and be valid
			if ( !levelKey ) {
				el.gELLog("No valid level key for game");
				return new el.LevelScene(null);
			}
			
			// keep last key
			_currentLevelKey = levelKey;
			
			// Get level by key
			_currentLevel = _gameTree.get(_currentLevelKey);
			
			// Look into game level map
			if ( !_currentLevel ) {
				_currentLevelKey = _currentLevel = undefined;
				el.gELLog("No valid level content for key: " + levelKey);
				return new el.LevelScene(null);
			}
			
			// log current level content
			el.gELLog("Current scene: " + _currentLevelKey + "." + _currentLevel._subLevelKey);
			
			return _currentLevel.getNewScene();
		};
		
		// Set sub level key
		gamelevelmanger.setSubLevelKey = function(subLevelKey) {
			_currentSubLevel = subLevelKey;
		};
		
		// Get sub level key
		gamelevelmanger.getSubLevelKey = function() {
			return _currentSubLevel;
		};

		// Returns curren loaded scene
		gamelevelmanger.getNextContentScene = function() {
			
			// if there is no current content, return first level
			if ( !_currentLevel ) {
				el.gELLog("No valid start point for \"next\" content");
				return gamelevelmanger.loadFirstLevelScene;
			}
			
			// If there is still content, load it
			if ( _currentLevel.isThereNextContent() ) {
				
				// load next content within this scene
				_currentLevel.getNextContent();
				
				// log current level content
				el.gELLog("Current level: " + _currentLevelKey + "." + _currentLevel._subLevelKey);

				// do not change scene
				return null;
			}
			
			return gamelevelmanger.getNextLevelScene();
		};
		
		// Returns curren loaded scene
		gamelevelmanger.getNextLevelScene = function() {
			// look into game tree and find "next" level
			
			// get pointer to first element within map
			var mapIter = _gameTree.keys();
			
			// keys
			var key;

			// find current key
			do {
				// get next key
				key = mapIter.next();
			} while ( key.value !== undefined && key.value != _currentLevelKey );
			
			// if key was found
			if ( key ) {
				// move one key forward
				key = mapIter.next();
				
				// if there is a valid next level
				if ( key.value ) {
					// and if there is a valid next level, load that level
					return gamelevelmanger.loadSceneByKey(key.value);
				}
			}
			
			// If final level has been reached, go to default "after all levels" scene
			return el.getDefaultAfterLevelsScene();
		};
		
		// return new object
        return gamelevelmanger;
    };
	
	// Reads every level of the game and puts it into a key - value map
    function loadGameTreeLevels() {
		
		// Codes for each level
		var id = 0;
		
		// Level map for all levels
		_gameTree = new Map();
		
		// Read tree game
		for ( var i = 0; i < el.vortice.levels.length; i++) {
			
			var content = el.vortice.levels[i]["content"];
			var bHidden = el.vortice.levels[i]["hidden"];
			
			// Check to see if there is a problem or empty content
			if ( content === undefined || bHidden === undefined ) {
				el.gELLog("No valid level tree branch");
				_gameTree.clear();
				return false;
			}
			
			// Level content must be valid
			if ( content.type === undefined ) {
				el.gELLog("No valid level content");
				_gameTree.clear();
				return false;
			}
			
			// Create a new code
			id++;
			
			// Get level content and put it into game tree map
			var levelContent;
			switch(content.type) {
				case el.vortice.LEVEL_TYPES.COMIC:
					levelContent = new el.ComicContent(bHidden, id, content);
					break;
				case el.vortice.LEVEL_TYPES.STRATEGY:
					levelContent = new el.LevelContent(bHidden, id, content);
					break;
				default:
					levelContent = new el.LevelContent(bHidden, id, content);
			};
						
			// Level content
			_gameTree.set(id, levelContent);
		};
		
		return true;
    };

	// Public method
    return {
        getInstance: function () {
            if (gameLevelManager === undefined) {
                gameLevelManager = createInstance();
            }
            return gameLevelManager;
        }
    };
})();