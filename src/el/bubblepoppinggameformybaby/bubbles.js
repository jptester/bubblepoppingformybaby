// 
//
//  All about bubbles: Bubbles, Generator, etc
//  File: bubbles.js
//  Creator : JP
//  Date: 24/02/2016
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
el.bubble.BubblesDestroyed = 0;
el.bubble.BubblesSFXStep = 20;

//
//  Bubble generator class
//  Creator : JP
//  Date: 24/02/2016
//
el.bubble.BubbleGenerator = el.Class.extend({

	// Properties
	m_position: null, 
	m_direction: null, 
	m_frequencyPerSecond: null, 
	m_updateFrequency: null,
	m_maxBubbles: null, 
	m_gravity: null, 
	m_bubblesImagesArray: null,
	m_lastTimeCreation: null,
	m_lastTimeUpdate: null,
	m_parentNode: null,
	
	// private properties
	_bubbles: null,
	_currentIndex: null,
	
	_minGravity: null,

	// Constructor for level
	ctor: function (position, direction, frequencyPerSecond, updateFrequency, maxBubbles, maxGravity, bubblesArray, parentNode) {
		
		// set current properties
		this.m_position = position;
		this.m_direction = direction;
		this.m_frequencyPerSecond = 1.0 / frequencyPerSecond;
		this.m_updateFrequency = 1.0 / updateFrequency;
		this.m_maxBubbles = maxBubbles;
		this.m_gravity = maxGravity;
		this.m_bubblesArray = bubblesArray;
		this.m_lastTimeCreation = 0.0;
		this.m_lastTimeUpdate = 0.0;
		
		// Parent node
		this.m_parentNode = parentNode;

		// Private properties
		this._bubbles = [];
		this._currentIndex = Math.round(this.m_bubblesArray.length * Math.random()) % this.m_bubblesArray.length;
		this._minGravity = -5;
	},
	
	// Update generator
	updateGenerator: function () {
		
		// get delta time
		var deltaTime = cc.director.getDeltaTime();

		// updating block
		{
			this.updateBubbles(deltaTime);
		}

		// Creation block
		{
			this.creationBlock(deltaTime);
		}
	},
	
	// Creation function
	creationBlock: function(deltaTime) {
		// set up time
		this.m_lastTimeCreation += deltaTime;
		
		// if frequency indicates a new bubble must be created, create on error
		if ( this.m_lastTimeCreation >= this.m_frequencyPerSecond ) {
			
			// reset time
			this.m_lastTimeCreation = 0.0;
			
			// if max number of bubbles has not been reached, create a bubble
			if ( this._bubbles.length < this.m_maxBubbles ) {
				this.createBubble();
			}
		}
	},
	
	// updates every bubble
	updateBubbles: function(deltaTime) {

		// calculate time
		this.m_lastTimeUpdate += deltaTime;
		
		// if update is needed (enough time has passed)
		if ( this.m_lastTimeUpdate >= this.m_updateFrequency ) {
			
			// reset time
			this.m_lastTimeUpdate = 0;
			
			// update every bubble
			for (var bubble of this._bubbles) {
				// update bubble
				bubble.updateBubble();		
			}
			
			// look for any must kill bubble
			for ( var i = 0; i < this._bubbles.length; i++ ) {
				// check if bubble must die
				if (this._bubbles[i].m_killBubble) {
					
					// get bubble
					var bubble = this._bubbles[i];

					// remove sprite
					if ( bubble.getSprite().getParent() ) {
						bubble.getSprite().getParent().removeChild(bubble.getSprite());
					}
					
					// remove current bubble from main array
					this._bubbles.splice(i--,1);
				}

			}
		}
	},
		
	// Create a new bubble
	createBubble: function () {
		
		// if not valid parent node then exit with error
		if ( !this.m_parentNode ) {
			throw new Error("No valid parent for bubbles generator");
		}
		
		// get image bubble
		var imgForBubble = this.m_bubblesArray[this._currentIndex++];
		this._currentIndex %= this.m_bubblesArray.length;
		
		// get random value between x and y values for direction
		var xAcceleration = Math.round((this.m_direction.x - this.m_position.x) * Math.random());
		var yAcceleration = Math.round((this.m_direction.y - this.m_position.y) * Math.random());
	
		// give every bubble a different y velocity (it is always negative)
		var gravity = -(Math.round(Math.random() * this.m_gravity)) + this._minGravity;
		
		// add new bubble to parent node
		var newBubble = new el.bubble.Bubble(imgForBubble, xAcceleration, yAcceleration, gravity, this.m_position);
		this.m_parentNode.addChild(newBubble.getSprite());
		this._bubbles.push(newBubble);
		
		// Creation effects
		this.creationEffects();
	},
		
	// Special effects for bubble creation
	creationEffects: function() {
		// sound fx
		cc.audioEngine.playEffect(res.snd_creation_sfx); // snd_explodes_sfx
	},
	
});


//
//  Bubbles class
//  Creator : JP
//  Date: 24/02/2016
//
el.bubble.Bubble = el.Class.extend({

	// Properties
	m_node: null,
	m_xAcceleration: null,
	m_yAcceleration: null,
	m_gravity: null,
	m_height: null,
	m_killBubble: null,
	
	// Constructor for level
	ctor: function (image, xAcceleration, yAcceleration, gravity, initPoint) {
		
		// img bubble
		var bubbleSprite = new cc.Sprite(image);
		if ( !bubbleSprite ) {
			throw new Error("No valid sprite for bubble");
		}
		
		// image for bright
		var brightSprite = new cc.Sprite(res.img_bright);
		if ( !brightSprite ) {
			throw new Error("No valid bright sprite for bubble");
		}		
		
		// main node
		this.m_node = new cc.Node();
		
		// add bubble and bright to node
		this.m_node.addChild(bubbleSprite);
		this.m_node.addChild(brightSprite);
		
		// add effects to bubble sprite
		var rotation = new cc.rotateBy(3 + Math.round(Math.random() * 5), 360);
		rotation.repeatForever();
		
		// Set effect
		bubbleSprite.runAction(rotation);
		
		// Set initial position
		this.m_node.setPosition(initPoint);
		
		// Calculate height
		this.m_height = this.m_node.getBoundingBoxToWorld().height;
		
		// set acceleration properties
		this.m_xAcceleration = xAcceleration;
		this.m_yAcceleration = yAcceleration;
		this.m_gravity = gravity;
		
		// Bubble is alive
		this.m_killBubble = false;
		
		// Keep track of this bubble (pointer to container)
		this.m_node.m_parentBubble = this;
		
		// Set color as "name"
		this.m_node.setName(this.codeColorName(image));
		
		// Add touch event listener
		var touchEvent = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function(touch, event) {
		
				// get target
				if ( !event.getCurrentTarget() ) {
					return false;
				}
				
				// get target
				var target = event.getCurrentTarget();

				// if no parent bubble or context
				if ( !target.m_parentBubble ) {
					return false;
				}
				
				//Get the position of the current point relative to the button
				var hitPoint = touch.getLocation();
				var s = target.getBoundingBoxToWorld();
				var rect = cc.rect(target.getPositionX() - s.width / 2, target.getPositionY() - s.height / 2, s.width, s.height);

				//Check the click area
				if (cc.rectContainsPoint(rect, hitPoint)) {       
					
					// bubble destroyed
					el.bubble.BubblesDestroyed++;

					// popping bubble effects
					target.m_parentBubble.poppingBubbleEffects(target);
					
					// Kill bubble
					target.m_parentBubble.killBubble();					

				}
				return false;			
			}
		});
		
		// Add the event to the event manager
		cc.eventManager.addListener(touchEvent, this.m_node);
	},
	
	// Construct color
	codeColorName: function(name) {
		
		// get just name
		var splitedURL = name.split("/");
		
		// if no name return empty
		if ( splitedURL.length <= 0 ) {
			el.gELLog("Error. No URL name for texture: " + name);
			return "";
		}
		
		// set name
		name = splitedURL[splitedURL.length - 1];
		
		// get color
		var color = name.split("_", 1);
		
		// color name
		var colorName = "";
		
		// get name and encode it
		switch(color[0].trim()){ // r, g, b, a
			case "red":
				colorName = "255,0,0,255";
				break;
			case "green":
				colorName = "0,255,0,255";
				break;
			case "blue":
				colorName = "0,0,255,255";
				break;
			case "yellow":
				colorName = "255,255,0,255";
				break;
			default:
				el.gELLog("Error. No valid color for texture: " + name);
				break;
		}
		
		return colorName;
	},
	
	decodeColorName:function(colorName) {
		
		// values
		var r, g, b, a;
		
		// color name array
		colorArray = colorName.split(",");
		
		// get every value
		r = Number(colorArray[0]);
		g = Number(colorArray[1]);
		b = Number(colorArray[2]);
		a = Number(colorArray[3]);
		
		// return new color
		var col = cc.color(r,g,b,a);
		return col;
	},
	
	// update bubble
	updateBubble: function() {
		
		// calculate new position given current acceleration
		var currentPosition = this.m_node.getPosition();
		
		// Correct new position based on acceleration
		currentPosition.x += this.m_xAcceleration;
		currentPosition.y += this.m_yAcceleration;
		
		// Affect accelerations
		this.m_xAcceleration = this.m_xAcceleration / 2;
		this.m_yAcceleration = this.m_yAcceleration / 2 + this.m_gravity;
		
		// Change to new position
		this.m_node.setPosition(currentPosition);
		
		// if this bubble is out of the box, kill italics
		if ( currentPosition.y + this.m_height / 2 <= 0 ) {
			this.killBubble();
		}
	},
	
	// kill a bubble - make it go
	killBubble: function() {
		
		// set this bubble to die
		this.m_killBubble = true;
	},
	
	// special effects for bubble popping
	poppingBubbleEffects: function( sprite ) {
		
		// sound fx
		cc.audioEngine.playEffect(res.snd_explodes_sfx); // snd_explodes_sfx
		
		// special effect
		if ( el.bubble.BubblesDestroyed % el.bubble.BubblesSFXStep == 0 ) {
			cc.audioEngine.playEffect(res.snd_baby_laughs_sfx); // snd_explodes_sfx			
		}
		
		// get color of the bubble (or object)
		var color = this.decodeColorName(sprite.getName());
		
		// particles
		var particleEmmiter = new cc.ParticleSystem(res.emmit_bubble_explotion_particle);
		particleEmmiter.setPosition(sprite.getPosition());
		particleEmmiter.setAutoRemoveOnFinish(true);
		particleEmmiter.setStartColor(color);
		color.a = 0;
		particleEmmiter.setEndColor(color);
		sprite.getParent().addChild(particleEmmiter);
		
	},
		
	// get Sprite
	getSprite: function() {
		return this.m_node;
	}
});