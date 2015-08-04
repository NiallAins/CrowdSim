//Object contianing commonly used functions
util = {
	drawSprite : function(spr, speed) {
		spr.frame += dt;
		spr.frame %= (1 / (spr.fps * speed)) * spr.l;
		var framePos = Math.floor(spr.frame / (1 / (spr.fps * speed)));
		ctx.drawImage(	spr.img,
						framePos * spr.w,
						0,
						spr.w,
						spr.h,
						0 - spr.w / 2,
						0 - spr.h / 2,
						spr.w,
						spr.h
					);
	}
};