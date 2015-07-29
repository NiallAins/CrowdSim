var Input = {

	keyLeft : false,
	keyRight : false,
	keyUp : false,
	keyDown : false,

	mousePos : new Vec(),
	mouseDown : false
};

window.onkeydown = function(e) {
   	var key = e.keyCode ? e.keyCode : e.which;

   	if (key == 37) {
   		Input.keyLeft = true;
   	}
   	else if (key == 39) {
    	Input.keyRight = true;
   	}
   	else if (key == 38) {
    	Input.keyUp = true
   	}
   	else if (key == 40) {
    	Input.keyDown = true;
   	}
};

window.onkeyup = function(e) {
	var key = e.keyCode ? e.keyCode : e.which;

	if (key == 37) {
   		Input.keyLeft = false
	}
	else if (key == 39) {
   		Input.keyRight = false;
	}
	else if (key == 38) {
   		Input.keyUp = false;
	}
	else if (key == 40) {
   		Input.keyDown = false;
	}
};

document.addEventListener('mousemove', function(e) {
	Input.mousePos.x = e.clientX;
	Input.mousePos.y = e.clientY;
});

document.addEventListener('mousedown', function(e) {
	Input.mousePress = true;
});

document.addEventListener('mouseup', function(e) {
	Input.mousePress = false;
});