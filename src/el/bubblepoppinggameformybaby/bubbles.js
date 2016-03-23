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
el.bubble = el.bubble || {};
el.bubble.BubblesDestroyed = 0;
el.bubble.BubblesSFXStep = 8;
el.bubble.BubblesPoppedMultipleHit = 2;
el.bubble.FirstBubblesBonusReached = 13;
el.bubble.SecondBubblesBonusReached = 21;
el.bubble.ShowAddBubblesPoppedCounter = 99;
el.bubble.BabyLaughs = [
	res.snd_baby_laughs0_sfx,
	res.snd_baby_laughs1_sfx,
	res.snd_baby_laughs2_sfx,
	res.snd_baby_laughs3_sfx
];
el.bubble.CurrentBabyLaugh = Math.round(el.bubble.BabyLaughs.length * Math.random()) % el.bubble.BabyLaughs.length;
el.bubble.m_animalName = "animalInside";

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
	m_counter: null,
	m_bubblesPopped: null,
	m_insideAnimalArray : [
		res.img_inBubble_bear,
		res.img_inBubble_cat,
		res.img_inBubble_rabbit,
		res.img_inBubble_unicorn
	],
	m_currentInsideAnimal : 0,

	
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
		this.m_bubblesPopped = 0;
		
		// Parent node
		this.m_parentNode = parentNode;
		var scene = this.m_parentNode ? this.m_parentNode.getParent() : null;
		if ( scene && scene instanceof cc.Scene ) {
			this.m_counter = scene.m_counter;
			if ( !this.m_counter ) {
				el.gELLog("No counter UI element found in scene");
			}
		}
		
		// Current animal
		this.m_currentInsideAnimal = Math.round(this.m_insideAnimalArray.length * Math.random()) % this.m_insideAnimalArray.length;

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
		
		// reset number of bubbles popped
		this.m_bubblesPopped = 0;
	
		// if update is needed (enough time has passed)
		if ( this.m_lastTimeUpdate >= this.m_updateFrequency ) {
			
			// reset time
			this.m_lastTimeUpdate = 0;
			
			// update every bubble
			for (var bubbleID in this._bubbles) {
				// update bubble
				this._bubbles[bubbleID].updateBubble();		
			}
			
			// Amount of bubbles popped
			var iBubblesPopped = 0;

			// Get bubbles counter
			var counter = this.m_counter.getCounterValue();
			
			// look for any must kill bubble
			for ( var i = 0; i < this._bubbles.length; i++ ) {
				
				// check if bubble must die
				if (this._bubbles[i].m_killBubble) {
					
					// get bubble
					var bubble = this._bubbles[i];

					// remove sprite
					if ( bubble.getSprite().getParent() ) {
						
						
						// If bubble has not been popped
						if ( bubble.m_hasBeenPopped ) {
							
							// Get the animal inside
							animalInside = bubble.getSprite().getChildByName(el.bubble.m_animalName);
							
							// Remove child
							if ( animalInside ) {
								
								// Get current position
								var currPos = bubble.getSprite().getPosition();
								
								// Remove bubble sprite
								bubble.getSprite().removeChild(animalInside, false);
								
								// Create a new node
								var node = new cc.Node();
								
								// Add animal to scene
								this.m_parentNode.addChild(node);
								
								// Add animal to node
								node.addChild(animalInside);
								
								// Set position
								node.setPosition(currPos);
								
								// Set animation
								if ( el.bubble.animBubblePop ) {
									
									// get new action
									var action = el.bubble.animBubblePop.clone();
									
									// set auto destruction function
									action.setLastFrameCallFunc(
										function(){
											// get target of animation
											var target = this.getTarget();
											if ( target && target.getParent() ) {
												
												// release child
												var sprite = target.getChildByName(el.bubble.m_animalName);
												if ( sprite ) {
													sprite.release();
												}
												
												// if there is a valid target, remove it
												target.getParent().removeChild(target);												
											}
										});

									// run any valid action
									node.runAction(action);
									
									// Get timelines
									var timeLines = action.getTimelines();
									for (var timeLine in timeLines ) {
										timeLines[timeLine].setNode(animalInside);
									}
									
									// Play animation
									action.gotoFrameAndPlay(0, action.getDuration(), false); //play animation									
								}
							}
						}

						// Remove bubble
						bubble.getSprite().getParent().removeChild(bubble.getSprite());						
					}
					
					// Sum bubbles popped
					if ( bubble.m_hasBeenPopped ) {
						iBubblesPopped++;
						
						// Special bonus for reaching certain limits
						if ( this.m_parentNode ) {
							if ( (counter + iBubblesPopped) % el.bubble.FirstBubblesBonusReached == 0 ) {							
								// Play fireworks particles
								var particleEmmiter1 = new cc.ParticleSystem(res.emmit_bubble_starsrain_particle);
								particleEmmiter1.setPosition(cc.p(400,240));
								particleEmmiter1.setAutoRemoveOnFinish(true);
								this.m_parentNode.addChild(particleEmmiter1);
							}
							
							// if second limit has been reached
							if ( (counter + iBubblesPopped) % el.bubble.SecondBubblesBonusReached == 0 ) {							
								// Play fireworks particles
								var particleEmmiter2 = new cc.ParticleSystem(res.emmit_bubble_fireworks_particle);
								particleEmmiter2.setPosition(cc.p(400,240));
								particleEmmiter2.setAutoRemoveOnFinish(true);
								this.m_parentNode.addChild(particleEmmiter2);
							}
						}
						
						// If android and inMobi plug in
						if ( cc.sys.OS_ANDROID == cc.sys.os && 
							 el.bubble.bool_ImplementAds && 
							 (counter + iBubblesPopped + 33) % el.bubble.ShowAddBubblesPoppedCounter == 0 ) {
							// Limit has been reached - load interestial
							el.Game.getInstance().playInMobiAd();
						}
					}
					
					// remove current bubble from main array
					this._bubbles.splice(i--,1);
				}
			}

			// Bubbles counter
			{
				// Add bubbles popped counter
				var counter = this.m_counter.getCounterValue();
				
				// limit counter control
				if ( counter >= 9999 ) {
					counter = 0;
				}
				
				// Add bubbles popped to counter
				counter += iBubblesPopped;
				
				// update counter
				this.m_counter.setCounterValue(counter);
			}

			// keep track of amount of bubbles popped
			this.m_bubblesPopped = iBubblesPopped;
		}
	},
	
	//
	// Returns last bubbles popped
	//
	getBubblesPopped: function() {
		return this.m_bubblesPopped;
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
		
		// Get next image for animals inside
		animalInside = this.m_insideAnimalArray[this.m_currentInsideAnimal];
		
		// Move current animal index
		this.m_currentInsideAnimal = ( this.m_currentInsideAnimal + 1 ) % this.m_insideAnimalArray.length;
		
		// add new bubble to parent node
		var newBubble = new el.bubble.Bubble(imgForBubble, animalInside, xAcceleration, yAcceleration, gravity, this.m_position);
		this.m_parentNode.addChild(newBubble.getSprite());
		this._bubbles.push(newBubble);
		
		// Creation effects
		this.creationEffects();
	},
		
	// Special effects for bubble creation
	creationEffects: function() {
		// sound fx
		// cc.audioEngine.playEffect(res.snd_creation_sfx);
		el.Audio.getInstance().playEffect(res.snd_creation_sfx);
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
	m_scene: null,
	m_xAcceleration: null,
	m_yAcceleration: null,
	m_gravity: null,
	m_height: null,
	m_killBubble: null,
	m_hasBeenPopped : null,

	
	// Constructor for level
	ctor: function (image, insideAnimal, xAcceleration, yAcceleration, gravity, initPoint) {
		
		// img bubble
		var bubbleSprite = new cc.Sprite(image);
		if ( !bubbleSprite ) {
			throw new Error("No valid sprite for bubble");
		}
		
		// image for bright
		//var brightSprite = new cc.Sprite(res.img_bright);
		//if ( !brightSprite ) {
		//	throw new Error("No valid bright sprite for bubble");
		//}		
		
		// image for "inside bubble animal"
		var animalSprite = new cc.Sprite(insideAnimal);
		animalSprite.setName(el.bubble.m_animalName);
		if ( !animalSprite ) {
			throw new Error("No valid bright sprite for bubble");
		}
		else{
			animalSprite.retain();
		}

		// main node
		this.m_node = new cc.Node();
		
		// add bubble and bright to node
		this.m_node.addChild(animalSprite);
		this.m_node.addChild(bubbleSprite);
		
		// add effects to bubble sprite
		//var rotation = new cc.RotateBy(3 + Math.round(Math.random() * 5), 360);
		//var rotation = new cc.RotateTo(5, 90, 90);
		//rotation.repeatForever();
		
		// Set effect
		//bubbleSprite.runAction(rotation);
		
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
		
		// This bubble has not been popped (yet)
		this.m_hasBeenPopped = false;
		
		
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
					
					// This bubble has been popped
					target.m_parentBubble.m_hasBeenPopped = true;

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
				colorName = "255,64,64,255";
				break;
			case "green":
				colorName = "0,255,0,255";
				break;
			case "blue":
				colorName = "16,16,255,255";
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
		el.Audio.getInstance().playEffect(res.snd_explodes_sfx);
		//cc.audioEngine.playEffect(res.snd_explodes_sfx); // snd_explodes_sfx
		
		// special effect
		if ( el.bubble.BubblesDestroyed % el.bubble.BubblesSFXStep == 0 ) {
			
			// Play baby sound effect
			el.Audio.getInstance().playEffect(el.bubble.BabyLaughs[el.bubble.CurrentBabyLaugh]);
			
			// Move pointer of sound effect to the next baby sound
			el.bubble.CurrentBabyLaugh = (el.bubble.CurrentBabyLaugh + 1 ) % el.bubble.BabyLaughs.length;
			
			// cc.audioEngine.playEffect(res.snd_baby_laughs_sfx);
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