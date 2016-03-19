// 
//
//  Game config file
//  File: game-config.js
//  Creator : JP
//  Date: 20/01/2016
//

//
// The namespace of Entretenimiento Lobo
// @namespace
// @name el
//
var el = el || {};

//
// The namespace of current game: bubble
// @namespace
// @name bubble
//
el.bubble = el.bubble || {};

// Strings
el.bubble.str_DefaultLanguage = "es";
el.bubble.str_LocalizationPathFileName = "res/langs/";
el.bubble.str_LocalizationFileTailName = "_localization.plist";

// Sounds settings
el.bubble.fSoundFXVolume = 0.5;
el.bubble.fMusicVolume = 1;

// Types of content in this game
el.bubble.LEVEL_TYPES = el.bubble.LEVEL_TYPES || {
	COMIC: 0,
	STRATEGY: 1,
	CASUAL: 2
};

// Ads plug-in initializer
el.gInitPlugIns = function() {
	
	// if native
	if ( cc.sys.isNative && cc.sys.OS_ANDROID == cc.sys.os ) {
				
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
		});
		
		// Init plugin
		if( !inMobiPlugin.init() ) {
			el.gELlog("No inMobi plug-in available. No initialize was possible");
			return;
		}
		
		// Set log max level
		// Uncomment only for debug purposes
		//inMobiPlugin.setLogLevel(inMobiPlugin.SBIMSDKLogLevel.kIMSDKLogLevelDebug);
		
		// No hardware-acceleration
		// Uncomment only for debug purposes
		//inMobiPlugin.disableHardwareAccelerationForInterstitial();

		// Load Interestial
		inMobiPlugin.loadInterstitial();
	}
};

//
// Once ready show ads
//
el.gPlayInMobiAd = function() {
	
	// show interstitial
	if (sdkbox.PluginInMobi.isInterstitialReady()) {
		cc.log('inmobi interstitial ad is ready');
		sdkbox.PluginInMobi.showInterstitial();
	} else {
		cc.log('inmobi interstitial ad is not ready');
	}

};