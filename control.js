function control() {
	//Global game variables
		//Contains all game objects
		objs = [];
		FRIC = 2;
		dt = 0;

		var t = +new Date();
		var fps = 60;
		var drawFps = 0;

	var num = 700;
	var gUnit = Math.round(Math.sqrt(num/2));
	for(var r = 0; r < 2 * gUnit; r++) {
		for(var c = 0; c < gUnit; c++) {
			var px = (r + 0.5) * (can.width / (2 * gUnit));
		    var py = (c + 0.5) * (can.height / gUnit);
		    var pr = Math.ceil((Math.random() * 20));

			objs.push(new Part(px, py, 3, 5));
		}
	}
	objs.push(new Part(can.width / 2, can.height / 2, 50))

	function update() {
		for(var i = 0; i < objs.length; i++) {
			objs[i].update();
		}
	};

	function loop() {
		//Check time since last refresh in ms;
		var new_t = +new Date();
		dt = (new_t - t) / 1000;
		t = new_t;

		update();

		//Redraw
		ctx.clearRect(0, 0, can.width, can.height);

		//Clac FPS every 500ms
		drawFps += dt;
		if (drawFps > 0.5) {
			fps = Math.round(1 / dt);
			drawFps %= 0.5;
		}

		//Draw Stats
		ctx.fillStyle = '#FF6';
		ctx.font = "20px Verdana";
		ctx.fillText("FPS: " + fps, 20, can.height - 40);
		ctx.fillText("Particles: " + objs.length, 20, can.height - 20);	

    	ctx.strokeStyle = '#0F0';
		for(var i = 0; i < objs.length; i++) {
			objs[i].draw();
		}

		// ...at next screen-draw
		requestAnimationFrame(loop);
	};

	document.addEventListener('mousedown', function(e) {
		var mouse = new Vec(e.clientX, e.clientY);

		for(var i = 0; i < objs.length; i++) {
			var mag = 500000 / mouse.dis(objs[i].p);
			var ang = mouse.angWith(objs[i].p);
			var force = new Vec();
			force.setMagAng(mag, ang);
			objs[i].applyForce(force);
		}
	});

	document.addEventListener('mousemove', function(e) {
		var mouse = new Vec(e.clientX, e.clientY);

		for(var i = 0; i < objs.length; i++) {
			var mag = 5000 / mouse.dis(objs[i].p);
			var ang = mouse.angWith(objs[i].p);
			var force = new Vec();
			force.setMagAng(mag, ang);
			objs[i].applyForce(force);
		}
	});

	loop();
};