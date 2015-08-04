function control() {

	ctx.translate(can.width / 2, can.height / 2);
	ctx.strokeStyle = '#FFF';
	ctx.fillStyle = '#333';
	view = { x : 0, y : 0, z : 1000, fl : 300 };
	objs = [];

	for(var i = 0; i < 100; i++) {
		objs.push( new Build((Math.random() - 0.5) * can.width * 2, (Math.random() - 0.5) * can.height * 2, Math.random() * 100 , 100, 100) );
	}

	draw();
};

function draw() {
	ctx.clearRect(- can.width / 2 , - can.height / 2, can.width, can.height);
	for(var i = 0; i < objs.length; i++) {
		objs[i].draw();
	}
}

document.addEventListener('mousemove', function(e) {
	view.x = e.clientX - (can.width / 2);
	view.y =  e.clientY - (can.height / 2);
	draw();
});

window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;

   if (key == 38) {
       view.z -= 100;
   }else if (key == 40) {
       view.z += 100;
   }

   draw();
}

var Build = function(x, y, z, w, h) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
	this.h = h;
};
	Build.prototype.draw = function() {
		var x = this.x + view.x;
		var y = this.y + view.y;

		ctx.save();
			var perspec = view.fl / (view.fl +  view.z);
			ctx.translate(x * perspec, y * perspec);
			ctx.scale(perspec, perspec);
			ctx.strokeRect(x, y, this.w, this.h);
			ctx.fillRect(x, y, this.w, this.h);
		ctx.restore();
		ctx.save();
			perspec = view.fl / (view.fl +  (view.z - this.z));
			ctx.translate(x * perspec, y * perspec);
			ctx.scale(perspec, perspec);
			ctx.strokeRect(x, y, this.w, this.h);
		ctx.restore();
	};