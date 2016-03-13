var res = {
	
	// Scenes
    	sc_splashscreen : "res/sc_splashscreen.json",
	sc_gamePlay : "res/sc_gameplay.json",
	
	// Sound
	snd_music : "res/sound/bg_music.mp3",
	snd_creation_sfx : "res/sound/bubble_creation.mp3",
	snd_explodes_sfx : "res/sound/bubble_explodes.mp3",
	snd_baby_laughs_sfx : "res/sound/baby_laugh.mp3",
	
	// bubbles & visual elements
	img_blue_bubble : "res/visualcontent/levels/blue_bubble.png",
	img_green_bubble : "res/visualcontent/levels/green_bubble.png",
	img_red_bubble : "res/visualcontent/levels/red_bubble.png",
	img_yellow_bubble : "res/visualcontent/levels/yellow_bubble.png",
	img_bright : "res/visualcontent/levels/bright.png",
	
	// particles
	emmit_bubble_explotion_particle : "res/visualcontent/particles/popping_bubble_particle.plist",
	
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
