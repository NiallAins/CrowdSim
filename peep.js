Peep.prototype = new Part();
function Peep(x, y) {
	this.p = new Vec(x, y);
	this.des = false;
	this.speed = 200;
	this.m = 5;
	this.r = 25;
	this.maxS = 0;

	//Load sprite
	this.spriteSheet = new Image();
	this.spriteSheet.src = 'images/sprs/guyRun.png';
	this.spr = {
		img : this.spriteSheet,
		w : 64,
		h : 64, 
		l : 24,
		fps : 24,
		frame : 0
	};
};
	Peep.prototype.update = function() {
		//Call particle update for collsion detection and force applcaition & responce
		Part.prototype.update.call(this);

		//Go to destination
		if (this.des != false) {
			if (this.p.dis(this.des) < this.v.getMag()) {
				this.p = this.des;
				this.des =  false;
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
				f.setMagAng(this.speed, 3 * Math.PI / 2);
				this.applyForce(f);
			}
			if (Input.keyDown === true) {
				var f = new Vec();
				f.setMagAng(this.speed, Math.PI / 2);
				this.applyForce(f);
			}
		}
		if (this.v.getMag() > this.maxS) {
			this.maxS = this.v.getMag();
			console.log(this.maxS);
		}
	};

	Peep.prototype.draw = function() {
		ctx.save();
		ctx.translate(this.p.x, this.p.y);
		if (this.v.getMag()) {
			ctx.rotate(this.v.getAng());
		}
		/*if (ctrlPeep === this) {
			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.strokeStyle = '#00F';
			ctx.arc(-10, -2, 25, 0, 2 * Math.PI);
			ctx.stroke();
		}*/
		if (Math.round(this.v.getMag())) {
			util.drawSprite(this.spr, 2);
		}
		else {
			util.drawSprite(this.spr, 0);
		}

		ctx.restore();
	};