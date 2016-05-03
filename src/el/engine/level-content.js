// 
//
//  Level content
//  File: level-content.js
//  Creator : JP
//  Date: 27/01/2016
//

//
// The namespace of Entretenimiento Lobo
// @namespace
// @name el
//

var el = el || {};

//
// Level content
//
el.LevelContent = el.Class.extend({
	
	// private properties
	_bHidden: null,
	_background: null,
	_bg_cocostudiocontent: null,
	_fg_cocostudiocontent: null,
	_bg_sound: null,
	_bg_music: null,
	_containerScene: null,
	_subLevelKey: 0,
	
	// Constructor for level
	ctor:function (bHidden, id, content) {
				
		// Set private properties
		this._bHidden = bHidden;
		this._id = id;
		
		// Get image background
		if ( content.background != undefined && content.background.length > 0) {
			this._background = content.background;
		}

		// Get background cocos studio content
		if ( content.bg_cocostudiocontent != undefined && content.bg_cocostudiocontent.length > 0) {
			this._bg_cocostudiocontent = content.bg_cocostudiocontent;
		}

		// Get front content cocos studio content
		if ( content.fg_cocostudiocontent != undefined && content.fg_cocostudiocontent.length > 0) {
			this._fg_cocostudiocontent = content.fg_cocostudiocontent;
		}

		// Get music and sound background
		if ( content.bg_sound != undefined && content.bg_sound.length > 0) {
			this._bg_sound = content.bg_sound;
		}

		// Get music and sound background
		if ( content.bg_music != undefined && content.bg_music.length > 0) {
			this._bg_music = content.bg_music;
		}
	},

	// Returns true if content is hidden false otherwise
	isHidden: function() {
		return this._bHidden;
	},
	
	// returns a corresponding scene type
	getNewScene: function() {		
	
		// Create a new scene
		this._containerScene = new el.LevelScene(this);
	
		// for level content (engine default level) return a stardarx 
		return this._containerScene;
	},
		
	// Get info from content
	getBackground: function () {
		return this._background;
	},

	// Get info from cocos studio content
	getBgCocosStudioContent: function () {
		return this._bg_cocostudiocontent;
	},
	
	// Get info from cocos studio content
	getFgCocosStudioContent: function () {
		return this._fg_cocostudiocontent;
	},

	// Get info from content
	getBGMusic: function () {
		return this._bg_music;
	},

	// Get info from content
	getBgFxSound: function () {
		return this._bg_sound;
	},
	
	// set sub level key
	setSubLevelKey: function (subLevelKey) {
		this._subLevelKey = subLevelKey;
	},

	// returns true if there are more level content
	isThereNextContent: function () {
		return false;
	},
	
	// sets next available content within this content
	// for default content, there is only one content and no children
	getNextContent: function () {
		return false;
	},
});