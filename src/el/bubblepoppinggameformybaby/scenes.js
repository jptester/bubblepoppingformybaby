// 
//
//  Generic Screens
//  File: scenes.js
//  Creator : JP
//  Date: 14/01/2016
//

//
// The namespace of Entretenimiento Lobo
// @namespace
// @name el
//
var el = el || {};

//
//  Main layer for any CocosStudio scene
//  Creator : JP
//  Date: 20/01/2016
//
el.InitLayer = cc.Layer.extend({
    sprite:null,
    ctor:function (sFile, bPlayAnimation, bLoopAnimation, lastFrameCallFunc) {
        
		//////////////////////////////
        // 1. super init first
        this._super();

		// Get node
		var node;
		var action;
		el.gELLog("ccs.load : " + sFile);
		var json = ccs.load(sFile);
		node = json.node;
        this.addChild(node);

		// If there is an animation
		if ( bPlayAnimation ) {
			var action = json.action;
			if (action) {
				
				// action must be instance of cc.Action
				if ( action instanceof ccs.ActionTimeline ) {
					node.runAction(action);
					
					// If there is a valid function for last frame animation
					if ( !bLoopAnimation && lastFrameCallFunc ) {
						action.setLastFrameCallFunc(lastFrameCallFunc);
					}
					else {
						if ( bLoopAnimation && lastFrameCallFunc ) {
							el.gELLog("Loop will not make possible to play last frame call function for scene in file: " + sFile);
						}
					}

					// Play animation
					action.gotoFrameAndPlay(0, action.getDuration(), bLoopAnimation); //play animation
				}
				else {
					el.gELLog("Animation for scene file: " + sFile + " not a compatible format or type");
				}
			}
			else {
				el.gELLog("Missing animation for scene file: " + sFile);
			}
		}

        return true;
    }
});

//
// Splash screen - First screen for game
// Creator : JP
// Date: 20/01/2016
//
el.SplashScreen = el.LevelScene.extend({
    onEnter:function () {
        this._super();
        var layer = new el.InitLayer(res.sc_splashscreen, true, false, this.nextScene);
        this.addChild(layer);
    },
	nextScene:function(sNextScene) {
		cc.director.runScene(new cc.TransitionFade(1, new el.MainLevel()));
	}
});


//
// Main level - Game play screen
// Creator : JP
// Date: 20/01/2016
//
el.MainLevel = cc.Scene.extend({
	
	// bubbles creators
	m_bubblesGenerators: null,
	
	// private properties
	_layer: null,
	
	// ui elements
	m_counter: null,
	m_optButton: null,
	
    onEnter:function () {
        this._super();
		
		// if no layer
		if ( !this._layer ) {
			this._layer = new el.InitLayer(res.sc_gamePlay, true, false );
			this.addChild(this._layer);
			
			// Schedule update
			this.scheduleUpdate();
			
			// set up bubbleGenerator
			this.m_bubblesGenerators = [];
			
			// Load UI elements and provide them with functionality
			this.setupUI();

			// start game
			this.startGame();
		}
		
		// enable options button
		if ( this.m_optButton ) {
			this.m_optButton.setEnabled(true);
		}
		

    },
	
	//
	// Setup UI
	//
	setupUI:function() {
		
		// Get the options button
		this.m_optButton = el.gFindFirstChildInInnerTreeByName(this, "btn_options");
		if ( this.m_optButton && this.m_optButton instanceof ccui.Button ) {
			this.m_optButton.addTouchEventListener(this.optionsPopup, this);
		}
		
		// Get the counter
		this.m_counter = el.gFindFirstChildInInnerTreeByName(this, "txt_counter");
		if ( this.m_counter ) {
			this.m_counter.getCounterValue = function() {
				return parseInt( this.getString(), 10 );
			}
			this.m_counter.setCounterValue = function(value) {
				this.setString(("000" + value).slice(-4));
			}
		}
	},
	
	//
	// Create options pop-up
	//
	optionsPopup:function(targetButton, event) {
		
		// if released touch/click
		if ( cc.EventListener.TOUCH_ALL_AT_ONCE == event ) {
			// only do it once
			if ( this.m_optButton.isEnabled() ) {
				// Pop up new scene
				cc.director.pushScene(new cc.TransitionFade(0.25, new el.optionsPopUpScene()));
			}

			// disable button
			if ( this.m_optButton ) {
				this.m_optButton.setEnabled(false);
			}
		}
	},
	
	
	//
	// Config buttons
	//
	startGame:function() {
				
		// create n bubbles generators
		{	
			// new bubble generator
			// ID = 0
			var bubbleGenerator = new el.bubble.BubbleGenerator(
				cc.p(0,200), // position
				cc.p(250,350), // direction
				1, // frequencyPerSecond
				12,  // updateFrequency
				5,  // maxBubbles
				4,  // maxGravity 
				[res.img_blue_bubble, res.img_green_bubble, res.img_red_bubble, res.img_yellow_bubble], // bubblesArray
				this._layer // bubblesArray, parentNode
			);
			
			// add bubble generator to array
			this.m_bubblesGenerators.push(bubbleGenerator);
			
			// new bubble generator
			// ID = 1
			bubbleGenerator = new el.bubble.BubbleGenerator(
				cc.p(800,200), // position
				cc.p(550,350), // direction x=250 y=100 diff
				1.5, // frequencyPerSecond
				12,  // updateFrequency
				6,  // maxBubbles
				3,  // maxGravity 
				[res.img_blue_bubble, res.img_green_bubble, res.img_red_bubble, res.img_yellow_bubble], // bubblesArray
				this._layer // bubblesArray, parentNode
			);
			
			// add bubble generator to array
			this.m_bubblesGenerators.push(bubbleGenerator);
		}
	},
	
	//
	//   Update every element inside game (this is gameplay)
	//
	update: function(dt) {
						
		// call super function
		this._super(dt);
		
		// bubbles popped at same time
		var iBubblesPopped = 0;
		
		// update generators
		for ( generator of this.m_bubblesGenerators ) {
			generator.updateGenerator();
			iBubblesPopped += generator.getBubblesPopped();
		}
		
		// If more than 'n' bubbles are popped - do something special
		// Thanx John!
		if ( iBubblesPopped >= el.bubble.BubblesPoppedMultipleHit ) {
			el.Audio.getInstance().playEffect(res.snd_baby_sound_sfx);
		}
	}
});

//
// Options scene
// Creator : JP
// Date: 15/03/2016
//
el.optionsPopUpScene = cc.Scene.extend({
	
	//
	// On enter function
	//
	onEnter:function () {
      
		this._super();

		// Create initial layer
		this.addChild(new el.InitLayer(res.sc_optionsPopup, true, false ));
		
		// Load UI elements and provide them with functionality
		this.setupUI();

    },
	
	//
	// Setup UI
	//
	setupUI:function() {
		
		// Get the 'leave' or x button
		var returnButton = el.gFindFirstChildInInnerTreeByName(this, "btn_x");
		if ( returnButton && returnButton instanceof ccui.Button ) {
			returnButton.addTouchEventListener(this.optionsPopup, this);
		}

		// Set up "exit" button
		var btn_Quit = el.gFindFirstChildInInnerTreeByName(this, "btn_quit");
		if ( btn_Quit && btn_Quit instanceof ccui.Button ) {

			// If app is native
			if ( cc.sys.isNative )
			{
				// Add touch event listener
				btn_Quit.addTouchEventListener(this.quitGame, this);
			}
			else {
				btn_Quit.setEnabled(false);
				btn_Quit.setBright(false);
			}
		}
		
		// Set up sound effects volume slider
		var slider_sfx_volume = el.gFindFirstChildInInnerTreeByName(this, "slider_sfx_volume");
		if ( slider_sfx_volume && slider_sfx_volume instanceof ccui.Slider ) {			
			// Set current level
			var volume = cc.audioEngine.getEffectsVolume();
			slider_sfx_volume.setPercent(volume * 100);
			slider_sfx_volume.addTouchEventListener( this.sfxVolumeChange, this );
		}
		
		// Set up music volume slider
		var slider_music_volume = el.gFindFirstChildInInnerTreeByName(this, "slider_music_volume");
		if ( slider_music_volume && slider_music_volume instanceof ccui.Slider ) {			
			// Set current level
			var volume = cc.audioEngine.getMusicVolume();
			slider_music_volume.setPercent(volume * 100);
			slider_music_volume.addTouchEventListener( this.musicVolumeChange, this );
		}
	},
	
	//
	// sfxVolumeChange volume change
	//
	sfxVolumeChange: function( sender, type ) {
        if ( cc.EventListener.TOUCH_ALL_AT_ONCE == type ) {
			// get new percent value
			var percent = sender.getPercent();
			cc.audioEngine.setEffectsVolume(percent / 100);
			el.Audio.getInstance().playEffect(res.snd_creation_sfx);
        }
	},
	
	//
	// Music VolumeChange event handler
	//
	musicVolumeChange: function( sender, type ) {
        if ( cc.EventListener.TOUCH_ALL_AT_ONCE == type ) {
			// get new percent value
			var percent = sender.getPercent();
			cc.audioEngine.setMusicVolume(percent / 100);
        }
	},
	
	//
	// Pop pop-up menu
	//
	optionsPopup:function(sender, type) {

		// If button touched
		if ( cc.EventListener.TOUCH_ALL_AT_ONCE == type ) {
			// return to previous scene  
			cc.director.popScene();
		}
	},
	
	//
	// Quit game
	//
	quitGame: function(sender, type){
		
		// If button touched
		if ( cc.EventListener.TOUCH_ALL_AT_ONCE == type ) {
			// If native app
			if (cc.sys.isNative)
			{
				cc.director.end();
			}
			else {
				window.history && window.history.go(-1);
			}
		}
	}
});
