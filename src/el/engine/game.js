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
	
	// InMobi plugin value
	var _m_inMobiPlugIn;
		
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
		
		// Initialize plugins
		game.initPlugIns = _initPlugIns;
		
		// Load Interestial
		game.loadInMobiInterestitial = function () {
			// If there is a valid inMobi plugin
			if ( _m_inMobiPlugIn ) {
				sdkbox.PluginInMobi.loadInterstitial();
			}
		};
		
		// Returns true if interestitial is ready
		game.isInMobiInterestitialReady = function() {
			return cc.sys.OS_ANDROID == cc.sys.os && el.bubble.bool_ImplementAds ? sdkbox.PluginInMobi.isInterstitialReady() : false;
		}
		
		// Once ready show ads
		game.playInMobiAd = function() {
			
			// if android and 
			if ( cc.sys.OS_ANDROID == cc.sys.os && el.bubble.bool_ImplementAds ) {
				// show interstitial
				if ( sdkbox.PluginInMobi.isInterstitialReady() ) {
					sdkbox.PluginInMobi.showInterstitial();
				} else {
					cc.log('inmobi interstitial ad is not ready');
				}				
			}			
		};
				
		// return new object
        return game;
    };
	
	// Ads plug-ins initializer
	function _initPlugIns() {
		
		// Init inMobi
		initInMobiPlugIn();		
	};
	
	// InMobi PlugIn initializer
	function initInMobiPlugIn() {

		// Init inMobi plug-in
		var inMobiPlugin = sdkbox.PluginInMobi;
		/*
		inMobiPlugin.setListener({
			bannerDidFinishLoading: function() { console.log('inmobi: bannerDidFinishLoading'); },
			bannerDidFailToLoadWithError: function(code, description) { console.log('inmobi: bannerDidFailToLoadWithError code:' + code + ' desc:' + description); },
			bannerDidInteractWithParams: function(params) { console.log('inmobi: bannerDidInteractWithParams'); },
			userWillLeaveApplicationFromBanner: function() { console.log('inmobi: userWillLeaveApplicationFromBanner'); },
			bannerWillPresentScreen: function() { console.log('inmobi: bannerWillPresentScreen'); },
			bannerDidPresentScreen: function() { console.log('inmobi: bannerDidPresentScreen'); },
			bannerWillDismissScreen: function() { console.log('inmobi: bannerWillDismissScreen'); },
			bannerDidDismissScreen: function() { console.log('inmobi: bannerDidDismissScreen'); },
			bannerRewardActionCompletedWithRewards: function(rewards) { console.log('inmobi: bannerRewardActionCompletedWithRewards'); },
			interstitialDidFinishLoading: function() { el.gPlayInMobiAd(); console.log('inmobi: interstitialDidFinishLoading'); },
			interstitialDidFailToLoadWithError: function(code, description) { console.log('inmobi: interstitialDidFailToLoadWithError code:' + code + ' desc:' + description); },
			interstitialWillPresent: function() { console.log('inmobi: interstitialWillPresent'); },
			interstitialDidPresent: function() { console.log('inmobi: interstitialDidPresent'); },
			interstitialDidFailToPresentWithError: function(code, description) { console.log('inmobi: interstitialDidFailToPresentWithError code:' + code + ' desc:' + description); },
			interstitialWillDismiss: function() { console.log('inmobi: interstitialWillDismiss'); },
			interstitialDidDismiss: function() { console.log('inmobi: interstitialDidDismiss'); },
			interstitialDidInteractWithParams: function(params) { console.log('inmobi: interstitialDidInteractWithParams'); },
			interstitialRewardActionCompletedWithRewards: function(rewards) { console.log('inmobi: interstitialRewardActionCompletedWithRewards'); },
			userWillLeaveApplicationFromInterstitial: function() { console.log('inmobi: userWillLeaveApplicationFromInterstitial'); }
		});*/
		
		// Set events listener
		inMobiPlugin.setListener({
			interstitialDidFinishLoading: function() { console.log('inmobi: interstitialDidFinishLoading'); },
			interstitialDidFailToLoadWithError: function(code, description) {
				console.log('inmobi: interstitialDidFailToLoadWithError code:' + code + ' desc:' + description); 
				if ( el.bubble.bool_AdsMaxNumberOfAttempsToLoad-- >= 0 ) { 
					el.Game.getInstance().loadInMobiInterestitial(); 
				}
			},
			interstitialWillPresent: function() { console.log('inmobi: interstitialWillPresent'); },
			interstitialDidPresent: function() { console.log('inmobi: interstitialDidPresent'); },
			interstitialDidFailToPresentWithError: function(code, description) { console.log('inmobi: interstitialDidFailToPresentWithError code:' + code + ' desc:' + description); },
			interstitialWillDismiss: function() { console.log('inmobi: interstitialWillDismiss'); },
			interstitialDidDismiss: function() { 
				console.log('inmobi: interstitialDidDismiss'); 
				el.Game.adDismissed();
			},
			interstitialDidInteractWithParams: function(params) { console.log('inmobi: interstitialDidInteractWithParams'); },
			interstitialRewardActionCompletedWithRewards: function(rewards) { console.log('inmobi: interstitialRewardActionCompletedWithRewards'); },
			userWillLeaveApplicationFromInterstitial: function() { console.log('inmobi: userWillLeaveApplicationFromInterstitial'); }
		});
			
		// Get result of initializing the plug in
		_m_inMobiPlugIn = inMobiPlugin.init();
		
		// Init plugin
		if( !_m_inMobiPlugIn ) {
			el.gELlog("No inMobi plug-in available. No initialize was possible");
			return;
		}
			
		// Set log max level
		// Uncomment only for debug purposes
		//inMobiPlugin.setLogLevel(inMobiPlugin.SBIMSDKLogLevel.kIMSDKLogLevelDebug);
		
		// No hardware-acceleration
		// Uncomment only for debug purposes
		//inMobiPlugin.disableHardwareAccelerationForInterstitial();		
	};
		
	// Public methods
    return {
		
		// get instance
        getInstance: function () {
            if (_game === undefined) {
                _game = createInstance();
				_m_inMobiPlugIn = false;
            }
            return _game;
        },
		
		// Once ad has been dismissed
		adDismissed: function() {
			// if killing the app
			el.Game.getInstance().loadInMobiInterestitial();
		},		
		
		removeCommand: "remove",
		stopCommand: "stop",
    };
})();