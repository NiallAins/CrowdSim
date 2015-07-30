//Object contianing commonly used functions
util = {
	drawSprite : function(spr, speed) {
		if (Math.round(speed)) {
			spr.frame += dt;
			spr.frame %= (1 / spr.fps) * spr.l;
			var framePos = Math.floor(spr.frame / (1 / spr.fps));
		}
		else {
			framePos = 0;
		}
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