ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	//'impact.debug.debug',
	'game.entities.testman',
	'game.levels.level'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	gravity: 80,
	
	init: function() {
		// Initialize your game here; bind keys etc.
		this.initKeys();
		this.loadLevel(LevelLevel);
		ig.game.spawnEntity(EntityTestman, ig.system.width/2, ig.system.height/2);
		//ig.game.spawnEntity(EntityTest2, ig.system.width/2 +60, ig.system.height/2+ 60);
		//ig.game.spawnEntity(EntityTest, ig.system.width/2-60, ig.system.height/2-60);
		//this.spawnTimer = new ig.Timer(1);
		//this.spawnAHundred();
		ig.debugMode = false;
	},

	initKeys: function(){
		ig.input.bind( ig.KEY.A, 'left' );
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.D, 'right' );
        ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
		ig.input.bind( ig.KEY.S, 'down' );
		ig.input.bind( ig.KEY.UP_ARROW, 'up' );
		ig.input.bind( ig.KEY.W, 'up' );
		ig.input.bind( ig.KEY.MOUSE1, 'leftClick' );
		ig.input.bind( ig.KEY.SPACE, 'gas' );
		ig.input.bind( ig.KEY.Z, 'shoot' );
		ig.input.bind( ig.KEY.P, 'pause' );
		ig.input.bind( ig.KEY.M, 'mute' );
		ig.input.bind( ig.KEY.C, 'clear' );
		ig.input.bind( ig.KEY.F, 'firepower' );
		ig.input.bind( ig.KEY.G, 'resources' );
	},

	spawnAHundred: function(){
		for (var i = 0; i < 100; i++) {
			ig.game.spawnEntity(EntityTestman, ig.system.width * Math.random(), ig.system.height * Math.random());
		};
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		/*
		if(this.spawnTimer.delta()>0 ){
			this.spawnTimer.reset();
			ig.game.spawnEntity(EntityTest, ig.system.width, ig.system.height * Math.random());
			ig.game.spawnEntity(EntityTest, ig.system.width, ig.system.height * Math.random());
			ig.game.spawnEntity(EntityTest, ig.system.width, ig.system.height * Math.random());
			ig.game.spawnEntity(EntityTest, ig.system.width, ig.system.height * Math.random());
			ig.game.spawnEntity(EntityTest, ig.system.width, ig.system.height * Math.random());
			ig.game.spawnEntity(EntityTest, ig.system.width, ig.system.height * Math.random());
			ig.game.spawnEntity(EntityTest, ig.system.width, ig.system.height * Math.random());
			ig.game.spawnEntity(EntityTest, ig.system.width, ig.system.height * Math.random());
			ig.game.spawnEntity(EntityTest, ig.system.width, ig.system.height * Math.random());
			ig.game.spawnEntity(EntityTest, ig.system.width, ig.system.height * Math.random());
		}*/
		if(ig.input.pressed('gas')){
			ig.debugMode = !ig.debugMode;
		}
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		/*
		if(ig.debugTime){
			this.font.draw( ig.debugTime, x, y, ig.Font.ALIGN.CENTER );	
		}
		*/
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 1024, 768, 1 );

});
