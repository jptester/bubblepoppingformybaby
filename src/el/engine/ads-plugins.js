// 
//
//  All about ads networks and funtionality
//
//  File: ads-plugins.js
//  Creator : JP
//  Date: 15/05/2016
//

//
//  Current Ads networks:
//		- AdMob
//		- InMobi
//

//
// The namespace of Entretenimiento Lobo
// @namespace
// @name el
//
var el = el || {};

//
// Global variable
//
//
el.AdsNetworksScope = el.AdsNetworksScope || {};
el.AdsNetworksScope.AdsCurrentNumberOfAttempsToLoad = 0;
el.AdsNetworksScope.AdsMaxNumberOfAttempsToLoad = 5;
el.AdsNetworksScope.AdsPlugInBusy = false;


//  Ads networks class
//  Creator : JP
//  Date: 15/05/2016
//
el.AdsNetworksScope.AdsNetworks = el.Class.extend({
	
	//
	// Properties
	//
	
	// InMobi plugin flag
	_m_inMobiPlugIn: null,
	
	// AdMob plug flag
	_m_adMobPlugIn: null,		
	
	
	//
	// Methods
	//
	
	// Constructor
	ctor: function() {
		
		// Set up plug-ins
		this._m_inMobiPlugIn = false;
		this._m_adMobPlugIn = false;
	},
	
	//
	// Returns true if environment is adequate for ads
	//
	isAdsNetworkAvailable: function() {
		
		// If debug log this is not a right environment for ads
		if ( cc.game.config.debugMode == 1 ) {
			
			// If not a native OS for mobile
			if ( cc.sys.OS_ANDROID != cc.sys.os ) {
				el.gELLog("INFO: This is not the right environment for Ads");
			}
			
			// If Ads not implemented by game configuration
			if ( !el.AdsNetworksScope.bool_ImplementAds ) {
				el.gELLog("INFO: Ads for this game have been set to off");
			}
		}
		
		return cc.sys.OS_ANDROID == cc.sys.os && el.AdsNetworksScope.bool_ImplementAds;
	},
	
	// Initialize plugins
	initPlugIns: function() {
		
		// If right environment
		if ( !this.isAdsNetworkAvailable() ) {
			return;
		}
		
		// Init inMobi
		if ( !this._m_inMobiPlugIn ) {
			this._initInMobiPlugIn();	
		}

		// Init AdMob
		if ( !this._m_adMobPlugIn ) {
			this._initAdMobPlugIn();
		}
	},
	
		// InMobi PlugIn initializer
	_initInMobiPlugIn: function() {

		// Init inMobi plug-in
		var inMobiPlugin = sdkbox.PluginInMobi;
		
		if ( !inMobiPlugin ) {
			el.gELLog("inmobi: No valid inMobi plugin");
			return;
		}
		
		//inMobiPlugin.setListener({
		//	bannerDidFinishLoading: function() { console.log('inmobi: bannerDidFinishLoading'); },
		//	bannerDidFailToLoadWithError: function(code, description) { console.log('inmobi: bannerDidFailToLoadWithError code:' + code + ' desc:' + description); },
		//	bannerDidInteractWithParams: function(params) { console.log('inmobi: bannerDidInteractWithParams'); },
		//	userWillLeaveApplicationFromBanner: function() { console.log('inmobi: userWillLeaveApplicationFromBanner'); },
		//	bannerWillPresentScreen: function() { console.log('inmobi: bannerWillPresentScreen'); },
		//	bannerDidPresentScreen: function() { console.log('inmobi: bannerDidPresentScreen'); },
		//	bannerWillDismissScreen: function() { console.log('inmobi: bannerWillDismissScreen'); },
		//	bannerDidDismissScreen: function() { console.log('inmobi: bannerDidDismissScreen'); },
		//	bannerRewardActionCompletedWithRewards: function(rewards) { console.log('inmobi: bannerRewardActionCompletedWithRewards'); },
		//	interstitialDidFinishLoading: function() { el.gPlayInMobiAd(); console.log('inmobi: interstitialDidFinishLoading'); },
		//	interstitialDidFailToLoadWithError: function(code, description) { console.log('inmobi: interstitialDidFailToLoadWithError code:' + code + ' desc:' + description); },
		//	interstitialWillPresent: function() { console.log('inmobi: interstitialWillPresent'); },
		//	interstitialDidPresent: function() { console.log('inmobi: interstitialDidPresent'); },
		//	interstitialDidFailToPresentWithError: function(code, description) { console.log('inmobi: interstitialDidFailToPresentWithError code:' + code + ' desc:' + description); },
		//	interstitialWillDismiss: function() { console.log('inmobi: interstitialWillDismiss'); },
		//	interstitialDidDismiss: function() { console.log('inmobi: interstitialDidDismiss'); },
		//	interstitialDidInteractWithParams: function(params) { console.log('inmobi: interstitialDidInteractWithParams'); },
		//	interstitialRewardActionCompletedWithRewards: function(rewards) { console.log('inmobi: interstitialRewardActionCompletedWithRewards'); },
		//	userWillLeaveApplicationFromInterstitial: function() { console.log('inmobi: userWillLeaveApplicationFromInterstitial'); }
		//});
		
		// Set events listener
		inMobiPlugin.setListener({
			interstitialDidFinishLoading: function() { console.log('inmobi: interstitialDidFinishLoading'); },
			interstitialDidFailToLoadWithError: function(code, description) {
				el.AdsNetworksScope.AdsCurrentNumberOfAttempsToLoad++;
				console.log('inmobi: Attemp number:' + el.AdsNetworksScope.AdsCurrentNumberOfAttempsToLoad + '\nInterstitialDidFailToLoadWithError code: ' + code + '\ndesc: ' + description); 
				el.AdsNetworksScope.AdsCurrentNumberOfAttempsToLoad = code != 5 ? el.AdsNetworksScope.AdsCurrentNumberOfAttempsToLoad : el.AdsNetworksScope.AdsMaxNumberOfAttempsToLoad;
				el.AdsNetworksScope.AdsPlugInBusy = false;
				el.Game.getInstance().loadInterestitials();
			},
			interstitialWillPresent: function() { console.log('inmobi: interstitialWillPresent'); },
			interstitialDidPresent: function() { console.log('inmobi: interstitialDidPresent'); },
			interstitialDidFailToPresentWithError: function(code, description) { console.log('inmobi: interstitialDidFailToPresentWithError code:' + code + ' desc:' + description); },
			interstitialWillDismiss: function() { console.log('inmobi: interstitialWillDismiss'); },
			interstitialDidDismiss: function() { 
				console.log('inmobi: interstitialDidDismiss'); 
				el.AdsNetworksScope.AdsPlugInBusy = false;
				el.Game.adDismissed();
			},
			interstitialDidInteractWithParams: function(params) { console.log('inmobi: interstitialDidInteractWithParams'); },
			interstitialRewardActionCompletedWithRewards: function(rewards) { console.log('inmobi: interstitialRewardActionCompletedWithRewards'); },
			userWillLeaveApplicationFromInterstitial: function() { console.log('inmobi: userWillLeaveApplicationFromInterstitial'); }
		});
			
		// Get result of initializing the plug in
		this._m_inMobiPlugIn = inMobiPlugin.init();
		
		// Init plugin
		if( !this._m_inMobiPlugIn ) {
			el.gELLog("inmobi: No inMobi plug-in available. No initialize was possible");
			return;
		}
			
		// Set log max level
		if ( cc.game.config.debugMode == 1 ) {

			// Log some info
			el.gELLog("inmobi: _m_inMobiPlugIn = " + this._m_inMobiPlugIn);

			// Set log level
			inMobiPlugin.setLogLevel(inMobiPlugin.SBIMSDKLogLevel.kIMSDKLogLevelDebug);
			
			// No hardware-acceleration - only for debugging purposes
			inMobiPlugin.disableHardwareAccelerationForInterstitial();		
		}		
	},
	
	// Init AdMob plugin
	_initAdMobPlugIn: function() {

		// Plug in variable
		var adMobPlugin = sdkbox.PluginAdMob;
		
		// if valid plugin 
		if ( adMobPlugin ) {
			
			// Set call back methods
			adMobPlugin.setListener({
				adViewDidReceiveAd : function(name) { console.log("adMob: AdMob ad successfuly loaded"); },
				adViewDidFailToReceiveAdWithError : function(name, msg) { 
					el.gELLog("adMob: Failed to show ad from AdMob: " + name + " with error: " + msg); 
					el.AdsNetworksScope.AdsCurrentNumberOfAttempsToLoad--;
					el.AdsNetworksScope.AdsPlugInBusy = false;
				},
				adViewWillPresentScreen : function(name) { },
				adViewDidDismissScreen : function(name) {
					console.log("adMob: AdMob ad successfuly dismissed");
					el.AdsNetworksScope.AdsPlugInBusy = false;
					el.Game.adDismissed();
				},
				//adViewWillDismissScreen : function(name) { },
				//adViewWillLeaveApplication : function(name) { }
			});
			
			// Init adMob plugin
			this._m_adMobPlugIn = adMobPlugin.init();
			
			if ( !this._m_adMobPlugIn ) {
				el.gELLog("adMob: No valid AdMob plugin");
				return;
			}
			else if ( cc.game.config.debugMode == 1 ) {
				el.gELLog("adMob: _m_adMobPlugIn = " + this._m_adMobPlugIn);
			}
		}
		else {
			el.gELLog("admob: No valid admob plugin");			
		}
	},
	
	// Load Interestitials
	loadInterestitials: function() {
		
		// If plug in is busy, leave
		if ( el.AdsNetworksScope.AdsPlugInBusy ) {
			
			// Log if in debug
			if ( cc.game.config.debugMode == 1 ) {
				el.gELLog("WARNING: Plugin is already busy trying to load Interestitial");
			}
			
			return;
		}
		
		// If right environment
		if ( !this.isAdsNetworkAvailable() ) {
			return;
		}
		
		// if enough tries with inMobi, move to next
		if ( el.AdsNetworksScope.AdsCurrentNumberOfAttempsToLoad < el.AdsNetworksScope.AdsMaxNumberOfAttempsToLoad ) {
			
			// Load inMobi ads
			this._loadInMobiInterestitial();
			return;
		}
		
		// Load AdMob ads
		this._loadAdMobInterestitial();		
	},
	
	// Load inMobi Interestial
	_loadInMobiInterestitial: function() {
		
		// If there is a valid inMobi plugin
		if ( this._m_inMobiPlugIn ) {
			
			// Try to load Interestitial
			var result = sdkbox.PluginInMobi.loadInterstitial();
			
			// set plug in to busy
			el.AdsNetworksScope.AdsPlugInBusy = true;
			
			el.gELLog("inmobi: Loading inMobi Interestitial... " + (result ? result : "NO INFO"));
		}
		else if ( cc.game.config.debugMode == 1 ) {
			throw new Error("inmobi: no inmobi plug in ready");
		}
	},
		
	// Load adMob Interestial
	_loadAdMobInterestitial: function() {
		
		// If there is a valid adMob plugin
		if ( this._m_adMobPlugIn ) {
			
			// Cache current banner
			var result = sdkbox.PluginAdMob.cache(el.AdsNetworksScope.AdMobAdName);
			
			// Set plug in to busy
			el.AdsNetworksScope.AdsPlugInBusy = true;
			
			el.gELLog("adMob: Loading adMob Interestitial... " + (result ? result : "NO INFO"));
		}
		else if ( cc.game.config.debugMode == 1 ) {
			throw new Error("adMob: no admob plug in ready");
		}
	},
		
	// Returns true if there is an interestitial ready
	isAnyInterestitialReady: function() {
			
		// If right environment
		if ( !this.isAdsNetworkAvailable() ) {
			return false;
		}
		
		// Check for inmobi plugin
		if ( this._m_inMobiPlugIn && sdkbox.PluginInMobi.isInterstitialReady() ) {
			return true;
		}

		// Check for adMob plugin
		if ( this._m_adMobPlugIn && sdkbox.PluginAdMob.isAvailable(el.AdsNetworksScope.AdMobAdName) ) {
			return true;
		}
		
		// No ad available
		if ( cc.game.config.debugMode == 1 ) {
			el.gELLog("INFO: No ads available to show");
		}
		
		return false;
	},
		
	// Play ads
	playAds: function() {
		
		// If right environment
		if ( !this.isAdsNetworkAvailable() ) {
			return false;
		}

		// depending on the priority of ads and availability show the next ad
		
		// if InMob Ad ready play it
		if ( this._m_inMobiPlugIn && sdkbox.PluginInMobi.isInterstitialReady() ) {
			this._playInMobiAd();
		}
		// Try additional networks
		else {
			
			// Trying Admob
			if ( this._m_adMobPlugIn && sdkbox.PluginAdMob.isAvailable(el.AdsNetworksScope.AdMobAdName) ) {
				this._playAdMobAd();
			}
		}
	},	
	
	// Once ready show ads
	_playInMobiAd: function() {
		
		// show interstitial
		if ( this._m_inMobiPlugIn && sdkbox.PluginInMobi.isInterstitialReady() ) {
			sdkbox.PluginInMobi.showInterstitial();
		} else {
			cc.log('inmobi: interstitial ad is not ready');
		}				
	},
			
	// Once ready show ads
	_playAdMobAd: function() {
		
		// show interstitial
		if ( this._m_adMobPlugIn && sdkbox.PluginAdMob.isAvailable(el.AdsNetworksScope.AdMobAdName) ) {
			sdkbox.PluginAdMob.show(el.AdsNetworksScope.AdMobAdName);
		} else {
			cc.log('adMob: admob interstitial ad is not ready');
		}				
	}

});
