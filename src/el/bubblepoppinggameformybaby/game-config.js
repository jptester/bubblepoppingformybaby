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
	if ( cc.sys.isNative ) {
		
		// Init inMobi plug-in
		//sdkbox.PluginInMobi.init();
		
		var plugin = sdkbox.PluginInMobi;
		plugin.setListener({
			bannerDidFinishLoading: function() { console.log('bannerDidFinishLoading'); },
			bannerDidFailToLoadWithError: function(code, description) { console.log('bannerDidFailToLoadWithError code:' + code + ' desc:' + description); },
			bannerDidInteractWithParams: function(params) { console.log('bannerDidInteractWithParams'); },
			userWillLeaveApplicationFromBanner: function() { console.log('userWillLeaveApplicationFromBanner'); },
			bannerWillPresentScreen: function() { console.log('bannerWillPresentScreen'); },
			bannerDidPresentScreen: function() { console.log('bannerDidPresentScreen'); },
			bannerWillDismissScreen: function() { console.log('bannerWillDismissScreen'); },
			bannerDidDismissScreen: function() { console.log('bannerDidDismissScreen'); },
			bannerRewardActionCompletedWithRewards: function(rewards) { console.log('bannerRewardActionCompletedWithRewards'); },
			terstitialDidFinishLoading: function() { console.log('interstitialDidFinishLoading'); },
			interstitialDidFailToLoadWithError: function(code, description) { console.log('interstitialDidFailToLoadWithError code:' + code + ' desc:' + description); },
			interstitialWillPresent: function() { console.log('interstitialWillPresent'); },
			interstitialDidPresent: function() { console.log('interstitialDidPresent'); },
			interstitialDidFailToPresentWithError: function(code, description) { console.log('interstitialDidFailToPresentWithError code:' + code + ' desc:' + description); },
			interstitialWillDismiss: function() { console.log('interstitialWillDismiss'); },
			interstitialDidDismiss: function() { console.log('interstitialDidDismiss'); },
			interstitialDidInteractWithParams: function(params) { console.log('interstitialDidInteractWithParams'); },
			interstitialRewardActionCompletedWithRewards: function(rewards) { console.log('interstitialRewardActionCompletedWithRewards'); },
			userWillLeaveApplicationFromInterstitial: function() { console.log('userWillLeaveApplicationFromInterstitial'); }
		});
		plugin.init();
	}
};
