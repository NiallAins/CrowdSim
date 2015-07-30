Peep.prototype = new Part();
function Peep(x, y, m, s) {
	this.p = new Vec(x, y);
	this.des = false;
	this.speed = s;
	this.color = '#0F0';

	//Default mass
	if (typeof(m) === 'undefined')
		this.m = 5;
	else
		this.m = m;

	this.r = m * 2;

	//Default speed
	if (typeof(s) === 'undefined')
		this.speed = 1000 / Math.sqrt(this.m);
	else
		this.speed = s;
};
	Peep.prototype.update = function() {
		Part.prototype.update.call(this);

		//Go to destination
		if (this.des != false) {
			if (this.p.dis(this.des) < this.v.getMag()) {
				this.p = this.des;
				this.des =  new Vec(can.width * Math.random() , can.height * Math.random());
			}
			else {
				des_f = new Vec();
				des_f.setMagAng(this.speed, this.p.angWith(this.des));
				this.applyForce(des_f);
			}
		}

		//Respond if being controled by player
		if (ctrlPeep == this) {
			if (Input.keyLeft === true) {
				var f = new Vec();
				f.setMagAng( (FRIC * this.m) + this.speed, Math.PI);
				this.applyForce(f);
			}
			if (Input.keyRight === true) {
				var f = new Vec();
				f.setMagAng( (FRIC * this.m) + this.speed, 0);
				this.applyForce(f);
			}
			if (Input.keyUp === true) {
				var f = new Vec();
				f.setMagAng( (FRIC * this.m) + this.speed, 3 * Math.PI / 2);
				this.applyForce(f);
			}
			if (Input.keyDown === true) {
				var f = new Vec();
				f.setMagAng( (FRIC * this.m) + this.speed, Math.PI / 2);
				this.applyForce(f);
			}
		}
	};

	Peep.prototype.draw = function() {
		Part.prototype.draw.call(this);
	};