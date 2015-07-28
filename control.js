function control() {
	//Global game variables
		//Contains all game objects
		objs = [];
		FRIC = 0;
		dt = 0;
		keyPress = [];

		var t = +new Date();
		var fps = 60;
		var drawFps = 0;

	objs.push(new Part(can.width / 2, can.height / 2, 20));

	for(var i = 0; i < (Math.random() * 700) + 100; i++) {
		objs.push(new Part(can.width * Math.random(), can.height * Math.random(), (Math.random() * 20) + 2))
		objs[objs.length - 1].v.x = (Math.random() * 10) - 5;
		objs[objs.length - 1].v.y = (Math.random() * 10) - 5;
	}

	function update() {
		if (keyPress[0] === 'left') {
			var f = new Vec();
			f.setMagAng( (FRIC * objs[0].m) + 200, Math.PI);
			objs[0].applyForce(f);
		}
		if (keyPress[0] === 'right') {
			var f = new Vec();
			f.setMagAng( (FRIC * objs[0].m) + 200, 0);
			objs[0].applyForce(f);
		}
		if (keyPress[0] === 'up') {
			var f = new Vec();
			f.setMagAng( (FRIC * objs[0].m) + 200, 3 * Math.PI / 2);
			objs[0].applyForce(f);
		}
		if (keyPress[0] === 'down') {
			var f = new Vec();
			f.setMagAng( (FRIC * objs[0].m) + 200, Math.PI / 2);
			objs[0].applyForce(f);
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
		for(var i = 1; i < objs.length; i++) {
			objs[i].draw();
		}
		ctx.strokeStyle = '#00F'
		objs[0].draw();

		// ...at next screen-draw
		requestAnimationFrame(loop);
	};

	document.addEventListener('mousedown', function(e) {
		var mouse = new Vec(e.clientX, e.clientY);

		for(var i = 0; i < objs.length; i++) {
			var mag = 100000 / mouse.dis(objs[i].p);
			var ang = mouse.angWith(objs[i].p);
			var force = new Vec();
			force.setMagAng(mag, ang);
			objs[i].applyForce(force);
		}
	});

	document.addEventListener('mousemove', function(e) {
		var mouse = new Vec(e.clientX, e.clientY);

		for(var i = 0; i < objs.length; i++) {
			var mag = 1000 / mouse.dis(objs[i].p);
			var ang = mouse.angWith(objs[i].p);
			var force = new Vec();
			force.setMagAng(mag, ang);
			objs[i].applyForce(force);
		}
	});

	window.onkeydown = function(e) {
   		var key = e.keyCode ? e.keyCode : e.which;

   		if (key == 37 && keyPress[0] != 'left') {
   			keyPress.splice(0, 0, 'left');
   		}
   		else if (key == 39 && keyPress[0] != 'right') {
       		keyPress.splice(0, 0, 'right');
   		}
   		else if (key == 38 && keyPress[0] != 'up') {
       		keyPress.splice(0, 0, 'up');
   		}
   		else if (key == 40 && keyPress[0] != 'down') {
       		keyPress.splice(0, 0, 'down');
   		}
	}

	window.onkeyup = function(e) {
   		var key = e.keyCode ? e.keyCode : e.which;

   		if (key == 37) {
       		keyPress.splice(keyPress.indexOf('left'), 1);
   		}
   		else if (key == 39) {
       		keyPress.splice(keyPress.indexOf('right'), 1);
   		}
   		else if (key == 38) {
       		keyPress.splice(keyPress.indexOf('up'), 1);
   		}
   		else if (key == 40) {
       		keyPress.splice(keyPress.indexOf('down'), 1);
   		}
   		console.log(keyPress);
	}

	loop();
};