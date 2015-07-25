function start() {
	//Global game variables
		//Contains all game objects
		var objs = [];

		var t = +new Date();
		var fps = 60;
		var drawFps = 0;

		var FRIC = 10;
		var color = '#F66';

	var num = 4000;
	var gUnit = Math.round(Math.sqrt(num/2));
	for(var r = 0; r < 2 * gUnit; r++) {
		for(var c = 0; c < gUnit; c++) {
			var px = (r + 0.5) * (can.width / (2 * gUnit));
		    var py = (c + 0.5) * (can.height / gUnit);

			objs.push(new Part(px, py));
		}
	}

	function getColor() {
		var color = '#';
		var letters = '0123456789ABCDEF'.split('');
    	for (var i = 0; i < 6; i++ ) {
        	color += letters[Math.floor(Math.random() * 16)];
    	}
    	return color;
	}

	function update() {
		for(var i = 0; i < objs.length; i++) {
			fric = objs[i].v.clone();
			var ang = fric.getAng();
			ang += Math.PI;
			ang %= 2 * Math.PI;
			fric.setAng(ang);
			fric = fric.scale(FRIC);

			objs[i].applyForce(fric);
		}

		for(var i = 0; i < objs.length; i++) {
			objs[i].update();
		}
	};

	function loop() {
		//Check time since last refresh in ms;
		var new_t = +new Date();
		dt = (new_t - t) / 1000;
		t = new_t;

		//Clac FPS every 500ms
		drawFps += dt;
		if (drawFps > 0.5) {
			fps = Math.round(1 / dt);
			drawFps %= 0.5;
		}

		update();

		//Redraw
		ctx.clearRect(0, 0, can.width, can.height);

		//Draw Stats
		ctx.fillStyle = '#FF6';
		ctx.font = "20px Verdana";
		ctx.fillText("FPS: " + fps, 20, can.height - 40);
		ctx.fillText("Particles: " + objs.length, 20, can.height - 20);

    	ctx.fillStyle = color;
		for(var i = 0; i < objs.length; i++) {
			objs[i].draw();
		}

		// ...at next screen-draw
		requestAnimationFrame(loop);
	};

	document.addEventListener('mousedown', function(e) {
		var mouse = new Vec(e.clientX, e.clientY);

		for(var i = 0; i < objs.length; i++) {
			var mag = 1000000 / mouse.dis(objs[i].p);
			var ang = mouse.angWith(objs[i].p);
			var force = new Vec();
			force.createWith(mag, ang);
			objs[i].applyForce(force);
		}

		color = getColor();
	});

	document.addEventListener('mousemove', function(e) {
		var mouse = new Vec(e.clientX, e.clientY);

		for(var i = 0; i < objs.length; i++) {
			var mag = 5000 / mouse.dis(objs[i].p);
			var ang = mouse.angWith(objs[i].p);
			var force = new Vec();
			force.createWith(mag, ang);
			objs[i].applyForce(force);
		}
	});

	document.addEventListener('mouseup'  , function(e) { mousepress = false; });

	loop();
};