function Part(x, y, r, m) {
	//Positional vectors
	this.p = new Vec(x, y);
	this.v = new Vec(0, 0);
	this.a = new Vec(0, 0);

	/*var letters = '0123456789ABCDEF'.split('');
    this.color = '#';
    for (var i = 0; i < 6; i++ ) {
        this.color += letters[Math.floor(Math.random() * 16)];
    }*/

    //this.color = '#66F';

	//Affecting forces
	this.f = new Vec(0, 0);

	//Default radius
	if (typeof(r) === 'undefined')
		this.r = 10;
	else
		this.r = r;

	//Default mass
	if (typeof(m) === 'undefined')
		this.m = 10;
	else
		this.m = m;
};
	Part.prototype.update = function() {
		if (this.p.y > can.height) {
			this.v.y *= -0.8;
			this.p.y = can.height;
		}

		if (this.p.y < 0) {
			this.v.y *= -0.8;
			this.p.y = 0;
		}

		if (this.p.x > can.width) {
			this.v.x *= -0.8;
			this.p.x = can.width;
		}

		if (this.p.x < 0) {
			this.v.x *= -0.8;
			this.p.x = 0;
		}

		//Euler Integration > F = M
		this.f = this.f.add(this.a);
		this.f = this.f.scale(dt);

		this.a = this.f.scale((1 / this.m));
		this.v = this.v.add(this.a);
		this.p = this.p.add(this.v);

		//Reset f for next step
		this.f = new Vec(0, 0);
	};

	Part.prototype.draw = function() {
		ctx.beginPath();
		//ctx.fillStyle = this.color;
		ctx.fillRect(this.p.x, this.p.y, this.r, this.r)
		ctx.stroke();
	};

	Part.prototype.applyForce = function(F) {
		this.f = this.f.add(F);
	}