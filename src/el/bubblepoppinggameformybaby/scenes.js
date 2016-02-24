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
//  Splash screen
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
// Main menu - Main menu screen for game
// Creator : JP
// Date: 20/01/2016
//
el.MainLevel = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new el.InitLayer(res.sc_gamePlay, true, false );
        this.addChild(layer);
		
		// Config buttons
		this.startGame();
    },
	
	//
	// Config buttons
	//
	startGame:function() {
		
	},
});
