ig.module(
	'impact.spriter-animation'
)
.requires(
	'impact.timer',
	'impact.image'
)
.defines(function(){ "use strict";

ig.SpriterAnimation = ig.Class.extend({
	timer: null,
	
	flip: {x: true, y: true},
	pivot: {x: 0, y: 0},
	
	frame: 0,
	loopCount: 0,
	alpha: 1,
	angle: 0,
	data: 0,
	pose: 0,
	duration: 1,
	scale: 1,
	size: 0,
	animation: 0,
	// animation can take an id or name
	init: function( url, duration, scale, size, animation ) {
		this.data = new spriter.data();
		var that = this;
		this.data.loadFromURL(url);
		this.pivot.x =  size.x/2;
		this.pivot.y = size.y;
		this.size = size;
		that.pose = new spriter.pose(that.data);
		//this.pivot = {x: sheet.width/2, y: sheet.height/2 };
		this.timer = new ig.Timer();
		this.duration = duration;
		this.scale = scale;
		if(animation){
			this.animation = animation;
		}
		this.pose.setAnim(this.animation);
	},
	
	rewind: function() {
		this.timer.set();
		this.loopCount = 0;
		return this;
	},
	
	gotoFrame: function( f ) {
		this.timer.set( this.duration * -f );
		this.update();
	},
	
	
	gotoRandomFrame: function() {
		this.gotoFrame( Math.floor(Math.random() * this.duration) )
	},
	
	update : function ()
	{
		var tick = this.timer.tick();
		var adjustment = 500;
		var anim_time = tick * adjustment * ig.Timer.timeScale * (1/this.duration);
		
		if(this.pose !== 0){
			this.pose.update(anim_time);	
		}
	},
	/*
	Missing flip.x and 'proper' culling atm
	*/
	draw : function ( targetX, targetY)
	{
		// On screen?
		if(
		   targetX > ig.system.width || targetY > ig.system.height
		   || targetX + this.size.x < 0 || targetY + this.size.y < 0 // Need to cull based on size as well
		) {
			return;
		}

		var ctx_2d = ig.system.context;

		if (ctx_2d)
		{
			ctx_2d.save();

			// 0,0 at center, x right, y up
			ig.system.context.translate(
				ig.system.getDrawPos(targetX + this.pivot.x),
				ig.system.getDrawPos(targetY + this.pivot.y)
			);
			var scaleX = this.flip.x ? -1 : 1;
			var scaleY = this.flip.y ? -1 : 1;
			
			if( this.flip.x || this.flip.y ) {
				ctx_2d.scale( scaleX, scaleY );
			}

			// apply camera
			ctx_2d.scale( this.scale, this.scale);
			if(this.angle !== 0){
				ctx_2d.rotate(this.angle);
			}
			if(!ig.debugMode){
				this.draw_pose_2d(this.pose);
			} else {
				this.debug_draw_pose_2d(this.pose);
			}

			ctx_2d.restore();
		}
	},

	draw_pose_2d: function(pose)
	{
		var ctx_2d = ig.system.context;

		pose.strike();

		if (pose.m_data && pose.m_data.folder_array)
		{
			var folder_array = pose.m_data.folder_array;
			var object_array = pose.m_tweened_object_array;
			for (var object_idx = 0, object_len = object_array.length; object_idx < object_len; ++object_idx)
			{
				var object = object_array[object_idx];
				var folder = folder_array[object.folder];
				var file = folder.file_array[object.file];

				ctx_2d.save();

					// apply object transform
					ctx_2d.translate(object.x, object.y);
					ctx_2d.rotate(object.angle * Math.PI / 180);
					ctx_2d.scale(object.scale_x, object.scale_y);

					// image extents
					var ex = 0.5 * file.width;
					var ey = 0.5 * file.height;
					//ctx_2d.scale(ex, ey);
					

					// local pivot in unit (-1 to +1) coordinates
					var lpx = (object.pivot_x * 2) - 1;
					var lpy = (object.pivot_y * 2) - 1;
					//ctx_2d.translate(-lpx, -lpy);
					ctx_2d.translate(-lpx*ex, -lpy*ey);

					if (file.image && !file.image.hidden)
					{
						ctx_2d.scale(1, -1); // -y for canvas space

						ctx_2d.globalAlpha = object.a * this.alpha;

						//ctx_2d.drawImage(file.image, -1, -1, 2, 2);
						ctx_2d.drawImage(file.image.data, -ex, -ey, 2*ex, 2*ey);
						ig.Image.drawCount++;
					}
					else
					{
						ctx_2d.fillStyle = 'rgba(127,127,127,0.5)';
						//ctx_2d.fillRect(-1, -1, 2, 2);
						ctx_2d.fillRect(-ex, -ey, 2*ex, 2*ey);
					}

				ctx_2d.restore();
			}
		}
	},

	debug_draw_pose_2d : function (pose)
	{
		var ctx_2d = ig.system.context;

		pose.strike();

		if (pose.m_data && pose.m_data.folder_array)
		{
			// draw objects
			var folder_array = pose.m_data.folder_array;
			var object_array = pose.m_tweened_object_array;
			for (var object_idx = 0, object_len = object_array.length; object_idx < object_len; ++object_idx)
			{
				var object = object_array[object_idx];
				var folder = folder_array[object.folder];
				var file = folder.file_array[object.file];

				ctx_2d.save();

					// apply object transform
					ctx_2d.translate(object.x, object.y);
					ctx_2d.rotate(object.angle * Math.PI / 180);
					ctx_2d.scale(object.scale_x, object.scale_y);

					// image extents
					var ex = 0.5 * file.width;
					var ey = 0.5 * file.height;
					//ctx_2d.scale(ex, ey);

					// local pivot in unit (-1 to +1) coordinates
					var lpx = (object.pivot_x * 2) - 1;
					var lpy = (object.pivot_y * 2) - 1;
					//ctx_2d.translate(-lpx, -lpy);
					ctx_2d.translate(-lpx*ex, -lpy*ey);

					ctx_2d.scale(1, -1); // -y for canvas space

					ctx_2d.fillStyle = 'rgba(127,127,127,0.5)';
					//ctx_2d.fillRect(-1, -1, 2, 2);
					ctx_2d.fillRect(-ex, -ey, 2*ex, 2*ey);

					ctx_2d.beginPath();
					ctx_2d.moveTo(0, 0);
					ctx_2d.lineTo(32, 0);
					ctx_2d.lineWidth = 2;
					ctx_2d.lineCap = 'round';
					ctx_2d.strokeStyle = 'rgba(127,0,0,0.5)';
					ctx_2d.stroke();

					ctx_2d.beginPath();
					ctx_2d.moveTo(0, 0);
					ctx_2d.lineTo(0, -32);
					ctx_2d.lineWidth = 2;
					ctx_2d.lineCap = 'round';
					ctx_2d.strokeStyle = 'rgba(0,127,0,0.5)';
					ctx_2d.stroke();

				ctx_2d.restore();
			}

			// draw bone hierarchy
			var bone_array = pose.m_tweened_bone_array;
			for (var bone_idx = 0, bone_len = bone_array.length; bone_idx < bone_len; ++bone_idx)
			{
				var bone = bone_array[bone_idx];

				var parent_index = bone.parent;
				if (parent_index >= 0)
				{
					var parent_bone = bone_array[parent_index];

					ctx_2d.save();

						ctx_2d.beginPath();
						ctx_2d.moveTo(bone.x, bone.y);
						ctx_2d.lineTo(parent_bone.x, parent_bone.y);
						ctx_2d.lineWidth = 2;
						ctx_2d.lineCap = 'round';
						ctx_2d.strokeStyle = 'grey';
						ctx_2d.stroke();

					ctx_2d.restore();
				}
			}

			// draw bones
			var bone_array = pose.m_tweened_bone_array;
			for (var bone_idx = 0, bone_len = bone_array.length; bone_idx < bone_len; ++bone_idx)
			{
				var bone = bone_array[bone_idx];

				ctx_2d.save();

					// apply bone transform
					ctx_2d.translate(bone.x, bone.y);
					ctx_2d.rotate(bone.angle * Math.PI / 180);

					ctx_2d.beginPath();
					ctx_2d.moveTo(0, 0);
					ctx_2d.lineTo(bone.scale_x * 32, 0);
					ctx_2d.lineWidth = 2;
					ctx_2d.lineCap = 'round';
					ctx_2d.strokeStyle = 'red';
					ctx_2d.stroke();

					ctx_2d.beginPath();
					ctx_2d.moveTo(0, 0);
					ctx_2d.lineTo(0, bone.scale_y * 32);
					ctx_2d.lineWidth = 2;
					ctx_2d.lineCap = 'round';
					ctx_2d.strokeStyle = 'green';
					ctx_2d.stroke();

				ctx_2d.restore();
			}
		}
	}
	
});

});