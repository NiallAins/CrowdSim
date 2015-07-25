//GLOBAL
var can,
	ctx,
	mousepress = false,
	dt;

window.onload = function() {
	can = document.getElementById('canvas');
	can.width = window.innerWidth;
	can.height = window.innerHeight;

	ctx = can.getContext('2d');

	start();
};