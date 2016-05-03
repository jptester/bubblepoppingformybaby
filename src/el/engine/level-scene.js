// 
//
//  Level Scene
//  File: level-scene.js
//  Creator : JP
//  Date: 30/01/2016
//

//
// The namespace of Entretenimiento Lobo
// @namespace
// @name el
//
var el = el || {};

//
// Abstract level generic scene
// Creator : JP
// Date: 30/01/2016
//
el.LevelScene = cc.Scene.extend({
	
	// current level info
	_levelContent: null, // main content - all level elements for game levels
	_levelLayer: null, // All "in-game" contents but UI
	_uiLayer: null, // UI layer
	_fgLayer: null, // Last layer - for particles and fx
	_sc_bg_fx_ID: null,
	
	// Specific level content
	_sc_background: null, // background as an image, goes into "_levelLayer" layer
	_sc_bg_layer: null, // background as a cocos studio screen, goes into "_levelLayer" layer
	_sc_main_layer: null, // game elements, goes into "_levelLayer" layer
	_sc_front_layer: null, // front layer, goes into "_levelLayer" layer
	_sc_bg_music: null, // background music
	_sc_bg_fx: null, // background sound
	
	ctor: function(levelContent) {

		// Call super constructor
        this._super();
		
		// Get content
		this._levelContent = levelContent;
	},
	
    onEnter:function () {
        this._super();

		// Create a layer and place all objects 
		this._levelLayer = new cc.Layer();
		this.addChild(this._levelLayer);
		
		// Create an UI layer
		this._uiLayer = new cc.Layer();
		this.addChild(this._uiLayer);
		
		// Foreground layer (top of everything)
		this._fgLayer = new cc.Layer();
		this.addChild(this._fgLayer);
		
		// update all inner elements
		this.updateAllElements();
	},
	
	// update all inner elements
	updateAllElements: function() {
		// parse current content - logic fill
		this.parseLevelContentForScene();

		// fill with current content - phisic fill
		this.fillLevelContentForScene();		
	},
	
	// This function will CRUD all elements in scene 
	parseLevelContentForScene: function() {
		// no elements to parse
	},

	// This function will CRUD all elements in scene 
	fillLevelContentForScene: function() {
		
		// if there is no content just leave
		if ( !this._levelContent ) {
			return;
		}

		// Get background and update it
		var bg = this._levelContent.getBackground();
		if ( bg ) {

			// first remove child
			this._levelLayer.removeChild(this._sc_background);
			
			// if remove command
			if ( bg != el.Game.removeCommand ) {
				var size = cc.winSize;
				this._sc_background = new cc.Sprite(bg);
				this._sc_background.setAnchorPoint(new cc.p(0,0));
				this._sc_background.setPosition(0, 0);
				var contentSize = this._sc_background.getContentSize();
				this._sc_background.setScale( size.width / contentSize.width, size.height / contentSize.height );
				this._levelLayer.addChild(this._sc_background);
			}
		}
		
		// Get background CocosStudio Content
		var ccsContent = this._levelContent.getBgCocosStudioContent();
		if ( ccsContent ) {

			// remove previous content
			this._levelLayer.removeChild(this._sc_bg_layer);
			this._sc_bg_layer = new cc.Node();
			
			// if no remove command
			if ( ccsContent != el.Game.removeCommand ) {
				this.getNodeBasedOnContent(ccsContent, this._sc_bg_layer);
				this._levelLayer.addChild(this._sc_bg_layer);
			}
		}
		
		// add main layer (all specific content will go here)
		this._sc_main_layer = new cc.Node();
		this._levelLayer.addChild(this._sc_main_layer);
		
		// Get background CocosStudio Content
		ccsContent = this._levelContent.getFgCocosStudioContent();
		if ( ccsContent ) {
			
			// remove previous content
			this._levelLayer.removeChild(this._sc_front_layer);
			this._sc_front_layer = new cc.Node();
			
			// if no 'remove' command
			if ( ccsContent != el.Game.removeCommand ) {
				this.getNodeBasedOnContent(ccsContent, this._sc_front_layer);
				this._levelLayer.addChild(this._sc_front_layer);
			}
		}
		
		// if music changes, play it
		if ( this._levelContent.getBGMusic() ) {
			if ( this._sc_bg_music != this._levelContent.getBGMusic() || !cc.audioEngine.isMusicPlaying() ) {
				
				// if command = stop
				if ( this._levelContent.getBGMusic() == el.Game.stopCommand ) {
					cc.audioEngine.stopMusic(true);
				}
				else {
					// keep track of sound
					this._sc_bg_music = this._levelContent.getBGMusic();

					// play new sound
					cc.audioEngine.playMusic(this._sc_bg_music, true);			
				}
			}
		}
		
		// if sound changes, play it
		if ( this._levelContent.getBgFxSound() ) {
			
			if ( this._sc_bg_fx != this._levelContent.getBgFxSound() ) {
				
				// if command = stop
				if ( this._levelContent.getBgFxSound() == el.Game.stopCommand ) {
					if ( this._sc_bg_fx_ID != null ) {
						cc.audioEngine.stopEffect(this._sc_bg_fx_ID);
					}
				}
				else {
					// keep track of sound
					this._sc_bg_fx = this._levelContent.getBgFxSound();

					// play new sound
					this._sc_bg_fx_ID = cc.audioEngine.playEffect(this._sc_bg_fx, true);
				}		
			}
		}
	},
	
	// Fill a layer with content
	getNodeBasedOnContent: function(ccsContent, layer, lastFrameCallFunc) {
		
		// optional parameter
		lastFrameCallFunc = lastFrameCallFunc || null;
		
		// if there is a valid content
		if ( ccsContent && layer ) {

			// remove previous content if any
			if ( layer.removeAllChildren ) {
				layer.removeAllChildren();				
			}
			
			// Get content and add it to the node
			el.gGetCCSContent(ccsContent, layer, lastFrameCallFunc);
		}
	}
});