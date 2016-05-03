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
	
	// InMobi plugin property
	var _m_inMobiPlugIn;
	
	// AdMob plug in property
	var _m_adMobPlugIn;
		
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
		
		// Load Interestitials
		game.loadInterestitials = _loadInterestitials;
		
		// Returns true if there is an interestitial ready
		game.isAnyInterestitialReady = function() {
			
			if ( cc.sys.OS_ANDROID == cc.sys.os && el.bubble.bool_ImplementAds ) {
				
				if ( _m_inMobiPlugIn && sdkbox.PluginInMobi.isInterstitialReady() )
					return true;
				
				if ( _m_adMobPlugIn && sdkbox.PluginAdMob.isAvailable(el.bubble.AdMobAdName) )
					return true;
			}
			
			return false;
		}
		
		// Play ads
		game.playAds = function() {
			// depending on the priority of ads and availability show the next ad
			if ( cc.sys.OS_ANDROID == cc.sys.os && el.bubble.bool_ImplementAds ) {
				// if InMob Ad ready play it
				if ( _m_inMobiPlugIn && sdkbox.PluginInMobi.isInterstitialReady() ) {
					_playInMobiAd();
				}
				else {
					if ( _m_adMobPlugIn && sdkbox.PluginAdMob.isAvailable(el.bubble.AdMobAdName) ) {
						_playAdMobAd();
					}
				}
			}			
		}
		
		// return new object
        return game;
    };
	
	// Ads plug-ins initializer
	function _initPlugIns() {
		
		// Init inMobi
		_initInMobiPlugIn();	

		// Init AdMob
		_initAdMobPlugIn();
		
		// Load interestitials
		_loadInterestitials();
		
	};

	// Load inMobi Interestial
	function _loadInMobiInterestitial() {
		// If there is a valid inMobi plugin
		if ( _m_inMobiPlugIn ) {
			var result = sdkbox.PluginInMobi.loadInterstitial();
			el.gELLog("inmobi: Loading inMobi Interestitial... " + (result ? result : "NO INFO"));
		}
	};
		
	// Load adMob Interestial
	function _loadAdMobInterestitial() {
		// If there is a valid adMob plugin
		if ( _m_adMobPlugIn ) {				
			// Cache current banner
			var result = sdkbox.PluginAdMob.cache(el.bubble.AdMobAdName);
			el.gELLog("adMob: Loading adMob Interestitial... " + (result ? result : "NO INFO"));
		}
	};
	
	// Load Interestitials
	function _loadInterestitials() {			
		// Load inMobi ads
		_loadInMobiInterestitial();
		
		// Load AdMob ads
		_loadAdMobInterestitial();
	}
		
	// Once ready show ads
	function _playInMobiAd() {
		
		// show interstitial
		if ( _m_inMobiPlugIn && sdkbox.PluginInMobi.isInterstitialReady() ) {
			sdkbox.PluginInMobi.showInterstitial();
		} else {
			cc.log('inmobi: interstitial ad is not ready');
		}				
	};
			
	// Once ready show ads
	function _playAdMobAd() {
		
		// show interstitial
		if ( _m_adMobPlugIn && sdkbox.PluginAdMob.isAvailable(el.bubble.AdMobAdName) ) {
			sdkbox.PluginAdMob.show(el.bubble.AdMobAdName);
		} else {
			cc.log('adMob: admob interstitial ad is not ready');
		}				
	};
	
	// InMobi PlugIn initializer
	function _initInMobiPlugIn() {

		// Init inMobi plug-in
		var inMobiPlugin = sdkbox.PluginInMobi;
		
		if ( !inMobiPlugin ) {
			el.gELLog("inmobi: No valid inMobi plugin");
			return;
		}
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
					el.Game.getInstance().loadInterestitials();
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
			el.gELLog("No inMobi plug-in available. No initialize was possible");
			return;
		}
			
		// Set log max level
		if ( cc.game.config.debugMode == 1 ) {
			inMobiPlugin.setLogLevel(inMobiPlugin.SBIMSDKLogLevel.kIMSDKLogLevelDebug);
		}
		
		// No hardware-acceleration
		// Uncomment only for debug purposes
		//inMobiPlugin.disableHardwareAccelerationForInterstitial();		
	};

	// Init AdMob plugin
	function _initAdMobPlugIn() {

		// Plug in variable
		var adMobPlugin = sdkbox.PluginAdMob;
		
		// if valid plugin 
		if ( adMobPlugin ) {
			
			// Set call back methods
			adMobPlugin.setListener({
				adViewDidReceiveAd : function(name) { console.log("adMob: AdMob ad successfuly loaded"); },
				adViewDidFailToReceiveAdWithError : function(name, msg) { el.gELLog("adMob: Failed to show ad from AdMob: " + name + " with error: " + msg); },
				adViewWillPresentScreen : function(name) { },
				adViewDidDismissScreen : function(name) { },
				//adViewWillDismissScreen : function(name) { },
				//adViewWillLeaveApplication : function(name) { }
			});
			
			// Init adMob plugin
			_m_adMobPlugIn = adMobPlugin.init();
			
			if ( !_m_adMobPlugIn ) {
				el.gELLog("adMob: No valid AdMob plugin");
				return;
			}
		}
		else {
			el.gELLog("admob: No valid admob plugin");			
		}
	};
		
	// Public methods
    return {
		
		// get instance
        getInstance: function () {
            if (_game === undefined) {
                _game = createInstance();
				_m_inMobiPlugIn = false;
				_m_adMobPlugIn = false;
            }
            return _game;
        },
		
		// Once ad has been dismissed
		adDismissed: function() {
			// Load new ads
			_game.loadInterestitials();
		},		
		
		removeCommand: "remove",
		stopCommand: "stop",
    };
})();