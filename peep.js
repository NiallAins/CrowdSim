Peep.prototype = new Part();
function Peep(x, y, m) {
	this.p = new Vec(x, y);
	this.r = 10;
	this.color = '#0F0';

	//Default mass
	if (typeof(m) === 'undefined')
		this.m = 5;
	else
		this.m = m;
};
	Peep.prototype.update = function() {
		Part.prototype.update.call(this);

		//Respond if being controled by player
		if (ctrlPeep == this) {
			if (Input.keyLeft === true) {
				var f = new Vec();
				f.setMagAng( (FRIC * this.m) + 500, Math.PI);
				this.applyForce(f);
			}
			if (Input.keyRight === true) {
				var f = new Vec();
				f.setMagAng( (FRIC * this.m) + 500, 0);
				this.applyForce(f);
			}
			if (Input.keyUp === true) {
				var f = new Vec();
				f.setMagAng( (FRIC * this.m) + 500, 3 * Math.PI / 2);
				this.applyForce(f);
			}
			if (Input.keyDown === true) {
				var f = new Vec();
				f.setMagAng( (FRIC * this.m) + 500, Math.PI / 2);
				this.applyForce(f);
			}
		}
	};

	Peep.prototype.draw = function() {
		Part.prototype.draw.call(this);
	};