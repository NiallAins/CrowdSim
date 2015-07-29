function Part(x, y, r, m, e) {
	//Positional vectors
	this.p = new Vec(x, y);
	this.v = new Vec(0, 0);
	this.a = new Vec(0, 0);

	this.rand = Math.random();

	//Affecting forces
	this.f = new Vec(0, 0);

	//Default radius
	if (typeof(r) === 'undefined')
		this.r = 10;
	else
		this.r = r;

	//Default mass
	if (typeof(m) === 'undefined')
		this.m = r / 2;
	else
		this.m = m;

	//Default elasticity
	if (typeof(e) === 'undefined')
		this.e = 0.8;
	else
		this.e = e;
};
	Part.prototype.update = function() {
		//Add Friction
		var fric = this.v.clone();
		fric.setAng( (fric.getAng() + Math.PI) % (2 * Math.PI) );
		fric = fric.scale(FRIC * this.m)
		this.f = this.f.add(fric);

		//Euler Integration -> F = MA
		this.f = this.f.add(this.a);
		this.f = this.f.scale(dt);

		this.a = this.f.scale((1 / this.m));
		this.v = this.v.add(this.a);
		this.p = this.p.add(this.v);

		this.collDec();

		//Reset f for next step
		this.f = new Vec(0, 0);
	};

	Part.prototype.collDec = function() {
		//Screen Boundary Collision
		if (this.p.y > can.height) {
			this.v.y *= -1;
			this.p.y = can.height;
		}

		if (this.p.y < 0) {
			this.v.y *= -1;
			this.p.y = 0;
		}

		if (this.p.x > can.width) {
			this.v.x *= -1;
			this.p.x = can.width;
		}

		if (this.p.x < 0) {
			this.v.x *= -1;
			this.p.x = 0;
		}

		//Particle collision
		for (var i = 0; i < objs.length; i++) {
			//check collsion with other objs
			if ( (objs[i] != this) && ((this.p.dis(objs[i].p) - (this.r + objs[i].r) < 0)) ) {
				// get the mtd
				var delta = this.p.sub(objs[i].p);
				var d = delta.getMag();
				// minimum translation distance to push balls apart after intersecting
				var mtd = delta.scale(((this.r + objs[i].r) - d) / d); 

				// inverse mass
				var im1 = 1 / this.m; 
				var im2 = 1 / objs[i].m;

				// push-pull them apart based off their mass
				this.p = this.p.add(mtd.scale(im1 / (im1 + im2)));
				objs[i].p = objs[i].p.sub(mtd.scale(im2 / (im1 + im2)));

				// impact speed
				var iv = this.v.sub(objs[i].v);
				mtd = mtd.getNorm();
				var vn = iv.dot(mtd);

				// sphere intersecting but moving away from each other already
				if (vn <= 0) {
					// collision impulse
					var imp = ((-1 * vn) * (1 + this.e)) / (im1 + im2);
					var impulse = mtd.scale(imp);

					// change in momentum
					this.v = this.v.add(impulse.scale(im1));
					objs[i].v = objs[i].v.sub(impulse.scale(im2));
				}
			}
		}
	};

	Part.prototype.draw = function() {
		ctx.beginPath();
		ctx.strokeStyle = this.color;
		ctx.arc(this.p.x, this.p.y, this.r , 0, 2 * Math.PI);
		ctx.stroke();
	};

	Part.prototype.applyForce = function(F) {
		this.f = this.f.add(F);
	};