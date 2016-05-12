var res = {
	
	// Scenes
	sc_splashscreen : "res/sc_splashscreen.json",
	sc_gamePlay : "res/sc_gameplay.json",
	sc_optionsPopup : "res/sc_options.json",
	
	// Animations
	anim_bubble_pop : "res/anim_bubble_pop.json",
	
	// Sound
	snd_music : "res/sound/bg_music.mp3",
	snd_creation_sfx : "res/sound/bubble_creation.mp3",
	snd_explodes_sfx : "res/sound/bubble_explodes.mp3",
	snd_baby_laughs0_sfx : "res/sound/baby_laugh.mp3",
	snd_baby_laughs1_sfx : "res/sound/baby_laugh1.mp3",
	snd_baby_laughs2_sfx : "res/sound/baby_laugh2.mp3",
	snd_baby_laughs3_sfx : "res/sound/baby_laugh3.mp3",
	snd_baby_sound_sfx : "res/sound/baby_sound.mp3",
	
	// bubbles & visual elements
	img_blue_bubble : "res/visualcontent/levels/blue_bubble.png",
	img_green_bubble : "res/visualcontent/levels/green_bubble.png",
	img_red_bubble : "res/visualcontent/levels/red_bubble.png",
	img_yellow_bubble : "res/visualcontent/levels/yellow_bubble.png",

	img_inBubble_bear : "res/visualcontent/levels/inBubble_bear.png",
	img_inBubble_cat : "res/visualcontent/levels/inBubble_cat.png",
	img_inBubble_rabbit : "res/visualcontent/levels/inBubble_rabbit.png",
	img_inBubble_unicorn : "res/visualcontent/levels/inBubble_unicorn.png",
	
	// particles
	emmit_bubble_explotion_particle : "res/visualcontent/particles/popping_bubble_particle.plist",
	emmit_bubble_fireworks_particle : "res/visualcontent/particles/fireworks_particles.plist",
	emmit_bubble_starsrain_particle : "res/visualcontent/particles/stars_particles.plist",
	emmit_bubble_baloon_particle	: "res/visualcontent/particles/baloons_particle.plist",
	emmit_bubble_lvlup_particle	: "res/visualcontent/particles/level_up_counter_particles.plist",	
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
