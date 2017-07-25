myCanvasView = new Layer
	x:300
	y:100
	width:200, height:200

# Add a nice background color so we see it
myCanvasView.style.backgroundColor = "rgba(255,0,0,.5)"


# This is the tricky bit, we create a canvas element (so we have a reference to it) and insert it into the view

myCanvas = document.createElement("canvas");
myCanvasView._element.appendChild(myCanvas);

# Now we get a context to draw in
myCanvasContext = myCanvas.getContext("2d");

myCanvasContext.fillStyle= "green";
myCanvasContext.fillRect(0, 0, 100, 100);