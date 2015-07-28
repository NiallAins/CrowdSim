//GLOBAL
window.onload = function() {
	can = document.getElementById('canvas');
	can.width = window.innerWidth;
	can.height = window.innerHeight;

	ctx = can.getContext('2d');

	control();
};