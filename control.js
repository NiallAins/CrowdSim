function control() {
	//Global game variables
	objs = [];
	FRIC = 5;
	dt = 0;

	//For calculating time between redraws
	var t = +new Date();
	var fps = 60;
	var drawFps = 0;

	//Set background
	var bg = new Image();
	bg.src = 'images/bgs/test.png';

	//Starting conditions
	for(var i = 0; i < 30; i++) {
		objs.push(new Peep(can.width * Math.random(), can.height * Math.random(), 300));
		objs[i].v = new Vec();
		objs[i].v.setMagAng(0.1, Math.random() * Math.PI * 2);
	}
	ctrlPeep = objs[0];

	function loop() {
		//Check time since last refresh in ms;
		var new_t = +new Date();
		dt = (new_t - t) / 1000;
		t = new_t;

		//Select new peep to control
		if (Input.mousePress) {
			var i = 0;
			for(; i < objs.length; i++) {
				if (Input.mousePos.dis(objs[i].p) < objs[i].r) {
					ctrlPeep = objs[i];
					i = objs.length + 1;
				}
			}
			if (i == objs.length) {
				ctrlPeep.des = Input.mousePos.clone();
			}
		}

		//Redraw
		//ctx.clearRect(0, 0, can.width, can.height);
		ctx.drawImage(bg, 0, 0, can.width, can.height);

		//Update game objects
		for(var i = 0; i < objs.length; i++) {
			objs[i].update();
		}

		//Draw game objects
    	for(var i = 0; i < objs.length; i++) {
			objs[i].draw();
		}

		// ...at next screen-draw
		requestAnimationFrame(loop);
	};

	loop();
};
