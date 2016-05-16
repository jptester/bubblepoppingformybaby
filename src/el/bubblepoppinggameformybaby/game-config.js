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

// Namescope for Ads Networks
el.AdsNetworksScope = el.AdsNetworksScope || {};
el.AdsNetworksScope.bool_ImplementAds = true;
el.AdsNetworksScope.AdMobAdName = "BannerGeneral"; // Ads name for AdMob

// Sounds settings
el.bubble.fSoundFXVolume = 0.5;
el.bubble.fMusicVolume = 1;

// Types of content in this game
el.bubble.LEVEL_TYPES = el.bubble.LEVEL_TYPES || {
	COMIC: 0,
	STRATEGY: 1,
	CASUAL: 2
};

