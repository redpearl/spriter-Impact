## SpriterImpact ##
This is a plugin that makes it possible to use Spriter animation data to defined animations with ImpactJS. It's based on Flyover Games LLC, Jason Andersen and Isaac Burns work on Spriter.js that's located on github here: https://github.com/flyover/spriter.js

### Requirements ###
1. ImpactJS. It was developed using 1.21, but I'm sure it will work with most versions.

### Demo ###
http://www.krisjet.com/spriterDemo

To run the demo locally: 
1. Put the Impact files into lib/impact
2. Add this function to your lib/impact/entity.js:

addSpriterAnim: function( name, url, duration, scale, size, animation) {
	var a = new ig.SpriterAnimation( url, duration, scale, size, animation);
	this.anims[name] = a;
	if( !this.currentAnim ) {
		this.currentAnim = a;
	}
	return a;
},

3. Include 'impact.spriter-animation' in your lib/impact/entity.js. It should end up looking like this:

.requires(
	'impact.animation',
	'impact.spriter-animation',
	'impact.impact'


### How to use it ###

Add the function and requried statement from the Demo segment to your enitity.js and do these steps:
1. Remember to put the spriter-animation.js file in the lib/impact folder.
2. Your index.html needs to include the spriter.js file before impact.js, like this:

<script type="text/javascript" src="spriter.js"></script>
<script type="text/javascript" src="lib/impact/impact.js"></script>
<script type="text/javascript" src="lib/game/main.js"></script>
<script type="text/javascript" src="jsonxml/xml2json.js"></script>

Also remember to include the xml2json.js file in your index.html.

Once you have set it up correctly, all you have to do to get a spriter animation to run is this:
this.addSpriterAnim( 'idle', 'testmann/testmann.scml', 1, 0.5, this.size, 'idle' );

The parameters are as follows:
name - The name you want to use refer to this animation within this.anims.
url  - The location of the scml relative to the root of the project.
duration - Duration of the animation. Still in progress. Right now, bigger number is faster, smaller is slower :P
scale - The scale of the animation. 1 is normal size, higher than 1 is bigger, smaller than 1 is smaller.
size - The size of the culling hitbox in pixels, for culling the animation. Will take this out later, the animation should ideally find this out itself.
animation - As each scml can contain several different animations, you can choose one of them with the animation parameter finding an animation by name, or by number.

Define it where you normally add animations in you entities (usually in the init function), and they can be played in exactly the same way as usually. In this case just do like this:
this.currentAnim = this.anims.idle;
and then you should have a Spriter animation up and running.

Remember to keep your spriter hierarchy structured in the same way as when you created it in spriter. The folder and subfolder structures are saved within your scml file, so keep them the same. In this case I have a "testman"-folder containing the scml-file, and sub-folders called "head", "arms", "legs" and "torso" within this folder containing the different bodyparts as .pngs.

### Known Issues / Future improvements ###
- Preloading of images doesn't work yet, the game starts without downloading images first. TODO.
- Automatically find culling hitbox for the animations.
- Fix "duration" parameter to something that works as intended.
- Draw images using Impacts image class. Now it's only used for loading and storing data.
- Incorporating spiter.js and xml2json.sj as impact modules, so you don't have to load them in your index.html.
- Animations that do not loop doesn't work yet.