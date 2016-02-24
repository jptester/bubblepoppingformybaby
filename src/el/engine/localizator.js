// 
//
//  Localizator
//  File: localizator.js
//  Creator : JP
//  Date: 22/01/2016
//

//
// The namespace of Entretenimiento Lobo
// @namespace
// @name el
//
var el = el || {};

// Global Variables
el.gNoTranslationFoundText = "<unknown text>";
el.gNoLocalizationYet = "<no localization>";

// Singleton definition class
el.gLocalizator = (function () {

	// Singleton variable
    var localization;

	// Private creation method
    function createInstance() {
		
		// Private properties
		// This is the main object
        var object = new Object();
		
		// It has a keyMap property which contains the whole translation
		var keyMap;
		
		// end of private properties
		
		// Public methods through singleton instance access
		// This function loads a language into the keyMap property
		object.loadLocalization = function (sLanguage) {
		
			// Get language or default language
			sLanguage = sLanguage || el.vortice.str_DefaultLanguage;
			
			// if string is not empty
			if ( sLanguage.length <= 0 ) {
				el.gELLog("Empty localization language");
				return false;
			}

			// Get file with language
			var sFile = el.vortice.str_LocalizationPathFileName + sLanguage + el.vortice.str_LocalizationFileTailName;

			// Load file content
			cc.loader.loadTxt(sFile, function(err, data) {
				
				// If there is an error
				if (err) {
					el.gELLog("Fail to load file: " + sFile);
					return false;
				} else {
					
					// Once loaded file parse it
					keyMap = cc.plistParser.parse(data);
											
					// if empty map
					if ( Object.keys(keyMap).length == 0 ) {
						el.gELLog("No valid structure/data in localization file: " + sFile);
						return false;
					}
					else {
						cc.log("Successfully localization \"" + sLanguage + "\": " + sFile + " file loaded")
					}
				}
			});
			
			return true;
		};
			
		// this function localizates a string
		object.localizate = function(sString) {
			
			// if there is no keyMap then no localization has been made
			if ( keyMap == undefined ) {
				el.gELLog("No localization available. Use first \"loadLocalization\" method");
				return el.gNoLocalizationYet;
			}
		
			// if string is not empty
			if ( sString.length > 0 ) {
		
				// if there is a valid key
				if ( keyMap[sString] != undefined ) {
					return keyMap[sString];
				}
				// Else write into the log the error and return standard text
				else {
					el.gELLog("No translation for: " + sString);
				}
				return el.gNoTranslationFoundText;
			}
			// if empty string
			else {
				el.gELLog("Empty string - no translation");
			}
			return "";
		};

        return object;
    };
 	
    return {
        getInstance: function () {
            if (localization === undefined) {
                localization = createInstance();
            }
            return localization;
        }
    };
})();


// Global functions for convenience
el.gLoc 		= el.gLocalizator.getInstance().localizate;
el.gLoadLoc 	= el.gLocalizator.getInstance().loadLocalization;
