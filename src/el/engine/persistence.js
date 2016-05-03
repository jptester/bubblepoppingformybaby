//
//  Persistence interface for Entretenimiento Lobo games
//  File: persistence.js
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
// Abstract Persistence class
//
el.Persistence = el.Class.extend({
	
	// properties
	fullScreen: false,
	bg_music_volume: 0,
	fx_volume: 0,
	email: null,
	currentLevel: 0,
	currentSubLevel: 0,
	gameInfo: null,

	// Private key names for items to be saved
	sFullScreenKey: "fullScreen",
	sBgMusicVolumeKey: "bg_music_volume",
	sFxVolumeKey: "fx_volume",
	sEmailKey: "email",
	sCurrentLevelKey: "currentLevel",
	sCurrentSubLevelKey: "currentSubLevelKey",
	sGameInfoKey: "gameInfo",

	
	// Constructor / initializer of all options
	ctor: function() {
		
		// Abstract class
		if ( this.constructor === el.Persistence ) {
			throw new Error("Can't instantiate abstract class!: el.Persistence");
		}
		
		// default values
		this.fullScreen = false;
		this.bg_music_volume = 0.5;
		this.fx_volume = 0.5;
		this.email = "";
		this.currentLevel = 1;
		this.currentSubLevel = 0;
		this.gameInfo = "";

	},
	
	// save game
	saveGame: function() {
		throw new Error("Can't execute abstract method!: el.Persistence.saveGame");
	},
	
	// load game
	loadGame: function() {
		throw new Error("Can't execute abstract method!: el.Persistence.saveGame");
	},
	
	// replace any incurrance of "=" char
	clearString: function(sString) {
		return sString.trim().replace(/=/g, "");
	},
	
	// This code is buggy but nothing can be done right now since code / encode are not my algorithms
	// so, this is a patch, not the best one though
	// The problem appears once a string has been encoded and then decoded, sometimes 1 or 2 extra chars with
	// Char Code = 0 are added to the resulting string, this code will erase those chars and return a clean string
	fixCodeDecodeBug: function(sString) {
		// remove 0 coded chars at the end of the string
		while ( sString.length > 0 && sString.charCodeAt(sString.length - 1) == 0 ){
			sString = sString.substr(0, sString.length - 1);
		}
		return sString;
	},
	
});


//
// Local Persistence class
//
el.LocalPersistence = el.Persistence.extend({
	
	// storage property
	_localStorage: null,
	
	// Constructor / initializer of all options
	ctor: function() {
		
		// Run prototype or super class constructor
		this._super();
		
		// Saving object 
		this._localStorage = cc.sys.localStorage;

	},
	
	// save game
	saveGame: function() {
		
		// local storage object
		if ( !this._localStorage ) {
			return false;
		}

		this._localStorage.setItem(this.sFullScreenKey, String(this.fullScreen));
		this._localStorage.setItem(this.sBgMusicVolumeKey, String(this.bg_music_volume));
		this._localStorage.setItem(this.sFxVolumeKey, String(this.fx_volume));
		this._localStorage.setItem(this.sCurrentLevelKey, el.gBase64.encode(String(this.currentLevel)));
		this._localStorage.setItem(this.sCurrentSubLevelKey, el.gBase64.encode(String(this.currentSubLevel)));
		this._localStorage.setItem(this.sEmailKey, el.gBase64.encode(this.clearString(this.email)));
		this._localStorage.setItem(this.sGameInfoKey, el.gBase64.encode(this.gameInfo));

		return true;
	},
	
	// load game
	loadGame: function() {

		// local storage object
		if ( !this._localStorage ) {
			return false;
		}

		// parse cookie
		this.fullScreen = Boolean(this._localStorage.getItem(this.sFullScreenKey));
		this.bg_music_volume = Number(this._localStorage.getItem(this.sBgMusicVolumeKey));
		this.fx_volume = Number(this._localStorage.getItem(this.sFxVolumeKey));
		this.email = this.fixCodeDecodeBug(el.gBase64.decode(this._localStorage.getItem(this.sEmailKey)));
		this.currentLevel = Number(this.fixCodeDecodeBug(el.gBase64.decode(this._localStorage.getItem(this.sCurrentLevelKey))));
		this.currentSubLevel = Number(this.fixCodeDecodeBug(el.gBase64.decode(this._localStorage.getItem(this.sCurrentSubLevelKey))));
		this.gameInfo = this.fixCodeDecodeBug(el.gBase64.decode(this._localStorage.getItem(this.sGameInfoKey)));
		
		return true;
	},
	
});


//
// Web Persistence class
//
el.WebPersistence = el.Persistence.extend({
	
	// private properties
	_file: null,
	
	// Constructor / initializer of all options
	ctor: function() {
		
		// Run prototype or super class constructor
		this._super();
	},
	
	// save game
	saveGame: function() {
		return true;
	},
	
	// load game
	loadGame: function() {
		return true;
	}
});