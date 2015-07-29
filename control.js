function control() {
	//Global game variables
	objs = [];
	FRIC = 5;
	dt = 0;

	//For calculating time between redraws
	var t = +new Date();
	var fps = 60;
	var drawFps = 0;

	//Starting conditions
	for(var i = 0; i < 20; i++) {
		for(var j = 0; j < 20; j ++) {
			objs.push(new Peep(10 + (i * 30), 10 + (j * 30)));	
		}
	}
	ctrlPeep = objs[190];
	ctrlPeep.color = '#00F';

	function loop() {
		//Check time since last refresh in ms;
		var new_t = +new Date();
		dt = (new_t - t) / 1000;
		t = new_t;

		//Select new peep to control
		if (Input.mousePress) {
			for(var i = 0; i < objs.length; i++) {
				if (Input.mousePos.dis(objs[i].p) < objs[i].r) {
					ctrlPeep.color = '#0F0';
					ctrlPeep = objs[i];
					objs[i].color = '#00F';
					i = objs.length;
				}
			}
		}

		//Redraw
		ctx.clearRect(0, 0, can.width, can.height);	

		//Update game objects
		for(var i = 0; i < objs.length; i++) {
			objs[i].update();
		}

		//Draw game objects
    	for(var i = 1; i < objs.length; i++) {
			objs[i].draw();
		}

		/*//Clac FPS every 500ms
		drawFps += dt;
		if (drawFps > 0.5) {
			fps = Math.round(1 / dt);
			drawFps %= 0.5;
		}
		ctx.fillText("FPS: " + fps, 20, can.height - 40);*/

		// ...at next screen-draw
		requestAnimationFrame(loop);
	};

	loop();
};