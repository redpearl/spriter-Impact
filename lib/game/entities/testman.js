ig.module(
	'game.entities.testman'
)
.requires(
	'impact.entity'

)
.defines(function(){

EntityTestman = ig.Entity.extend({
    
		size: {x: 64, y:64},
		maxVel: {x: 400, y: 1000},
		zIndex: 100,
		gravityFactor: 10,
		speed: 110,
	
		type: ig.Entity.TYPE.NONE, // Player friendly group
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.NEVER,
		
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			// Add the animations
			this.addSpriterAnim( 'idle', 'testmann/testmann.scml', 1, 0.5, this.size, 'idle' );
			this.addSpriterAnim( 'walk', 'testmann/testmann.scml', 0.5, 0.5, this.size, 'walk' );
			this.addSpriterAnim( 'jump', 'testmann/testmann.scml', 1, 0.5, this.size, 'jump' );
			this.addSpriterAnim( 'fall', 'testmann/testmann.scml', 1, 0.5, this.size, 'fall' );
			//this.addAnim( 'selected', 1, [this.firstAnimationFrame+1] );
			this.currentAnim = this.anims.idle;
		},
		
    
		update: function() {
			if(ig.input.state('right') && this.standing){
				this.vel.x = this.speed;
				this.currentAnim =  this.anims.walk;
				this.flip = false;
			} else if (ig.input.state('left') && this.standing){
				this.vel.x = -this.speed;
				this.currentAnim =  this.anims.walk;
				this.flip = true;
			} else if (this.vel.y > 0){
				this.currentAnim = this.anims.fall;
			} else if (this.vel.y < 0){
				this.currentAnim = this.anims.jump;
			} else {
				this.currentAnim = this.anims.idle;
				this.vel.x = 0;
			}
			if(ig.input.pressed('up') && this.standing){
				this.vel.y = -this.speed*4;
				//this.accel.y = 0;
			}
			this.currentAnim.flip.x = this.flip;
			// move!
			this.parent();
			
		}
	});
});
