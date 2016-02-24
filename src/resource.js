var res = {
	
	// Scenes
    sc_splashscreen : "res/sc_splashscreen.json",
	sc_gamePlay : "res/sc_gameplay.json",
	
	// bubbles
	blue_bubble : "res/visualcontent/levels/blue_bubble.png",
	green_bubble : "res/visualcontent/levels/green_bubble.png",
	red_bubble : "res/visualcontent/levels/red_bubble.png",
	yellow_bubble : "res/visualcontent/levels/yellow_bubble.png",
	
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
