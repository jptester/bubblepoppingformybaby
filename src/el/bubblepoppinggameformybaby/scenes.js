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
	
    onEnter:function () {
        this._super();
        this._layer = new el.InitLayer(res.sc_gamePlay, true, false );
        this.addChild(this._layer);
		
		// Schedule update
		this.scheduleUpdate();
		
		// set up bubbleGenerator
		this.m_bubblesGenerators = [];

		// start game
		this.startGame();
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
				10,  // updateFrequency
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
				10,  // updateFrequency
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
		
		// update generators
		for ( generator of this.m_bubblesGenerators ) {
			generator.updateGenerator();
		}
	}
});
