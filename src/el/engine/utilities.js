// 
//
//  Generic Utilities
//  File: utilities.js
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
// Global definitions
//
el.gELmsg = "EL_MSG: ";
el.gELLog = function(sString) {
	cc.log( el.gELmsg + sString);
}

//
// This function searches for the first child inside a node's tree of children and returns it
// IMPORTANT: This functions will dig deep into the node's structure first
//
el.gFindFirstChildInInnerTreeByName = function ( node, sName ) {
	
	// if there is a name and it is not empty
	if ( sName === undefined || sName === "" ) {
		el.gELLog("No name to look for in gFindFirstChildInInnerTreeByName function");
	}

	// lets see if this node has children
	if ( node != undefined && node instanceof cc.Node ) {
		var locChildren = node.getChildren();
		for(var i = 0, len = locChildren.length; i < len; i++){
			if(locChildren[i].getName() == sName) {
				return locChildren[i];
			}
			else if ( locChildren[i].getChildrenCount() > 0 ) {
				return el.gFindFirstChildInInnerTreeByName(locChildren[i], sName);
			}
		}
	}
	
	return null;
}


//
// This function searches for a button and returns it
// IMPORTANT: This functions will dig deep into the node's structure first
//
el.gGetButtonInInnerTreeByName = function ( node, sName) {
	// Config every button, so firts we get each button
	var currentButton = el.gFindFirstChildInInnerTreeByName (node, sName );
	if ( currentButton != undefined ) {
		// Check for button
		if ( currentButton instanceof ccui.Button ) {
			return currentButton;
		}
		else {
			el.gELLog ("Not a valid button: " + sName );
		}
	}
	else { 
		el.gELLog("No " + sName + " button found in scene");
	}
}

//
// This function classifies an event depending on platform
//
el.gActivationEvent = function ( sender, type ) {
	
	// if event means activation return true
	return type === ccui.Widget.TOUCH_ENDED;

	/*
	// Activation
	var bActivation = false;
	
	switch (type) {
		case ccui.Widget.TOUCH_BEGAN:
			//this._topDisplayLabel.setString("Touch Down");
			break;

		case ccui.Widget.TOUCH_MOVED:
			//this._topDisplayLabel.setString("Touch Move");
			break;

		case ccui.Widget.TOUCH_ENDED:
			//this._topDisplayLabel.setString("Touch Up");
			bActivation = true;
			break;

		case ccui.Widget.TOUCH_CANCELED:
			//this._topDisplayLabel.setString("Touch Cancelled");
			break;

		default:
			break;
	}
	return bActivation;
	*/
}


//
// This function prints an object
//
el.gPrintObject = function ( object ) {
	var output = 'Object ->\n' ;
	for (var property in object) {
	  output += property + ': ' + object[property]+'; \n';
	}
	el.gELLog(output);
}

//
// This function prints all of an object properties types
//
el.gPrintObjectPropertiesTypes = function ( object ) {
	var output = 'Object ->\n' ;
	for (var property in object) {
	  output += property + ': ' + typeof object[property] + '; \n';
	}
	el.gELLog(output);
}

//
// This function will read CCS content and put it into a node
// if there is an animation, it will play it
//
el.gGetCCSContent = function(ccsContent, containerNode, lastFrameCallFunc) {

	// optional parameter
	lastFrameCallFunc = lastFrameCallFunc || null;

	// Get node
	var json = ccs.load(ccsContent);
	containerNode.addChild(json.node);
	
	// Actions
	var action;

	// If there is an animation
	var action = json.action;
	if (action) {
		
		// action must be instance of cc.Action
		if ( action instanceof ccs.ActionTimeline ) {
			
			// run any valid action
			containerNode.runAction(action);
			
			// if there is a valid last frame call function add it
			if ( lastFrameCallFunc ) {
				action.setLastFrameCallFunc(lastFrameCallFunc);
			}

			
			// Play animation
			action.gotoFrameAndPlay(0, action.getDuration(), true); //play animation
		}
	}				

}

//
//
//  Base64 encode / decode
//  http://www.webtoolkit.info/
//
//
el.gBase64 = {
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/-",

	// public method for encoding
	encode : function (input) {
		
		if ( !input )
			return "";
		
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = el.gBase64._utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
			el.gBase64._keyStr.charAt(enc1) + el.gBase64._keyStr.charAt(enc2) +
			el.gBase64._keyStr.charAt(enc3) + el.gBase64._keyStr.charAt(enc4);

		}

		return output;
	},

	// public method for decoding
	decode : function (input) {
		
		if ( !input )
			return "";
		
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = el.gBase64._keyStr.indexOf(input.charAt(i++));
			enc2 = el.gBase64._keyStr.indexOf(input.charAt(i++));
			enc3 = el.gBase64._keyStr.indexOf(input.charAt(i++));
			enc4 = el.gBase64._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = el.gBase64._utf8_decode(output);

		return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		
		// Commented by JP, not really needed
		// string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while ( i < utftext.length ) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}
		return string;
	}
}