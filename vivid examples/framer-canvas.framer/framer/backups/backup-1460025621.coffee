canvas = new Layer
	size: Screen.size
	backgroundColor: "white"
	
canvas.draggable.props =
	vertical: false
	horizontal: false

draw = (e) ->
	x = Events.touchEvent(e).clientX
	y = Events.touchEvent(e).clientY
	
	if drawing then new Layer
		x: x - 50
		y: y - 50
		borderRadius: "50%"
		opacity: .8
		scale: 1
		borderWidth: 1
		borderColor: "rgba(0, 0, 0, .2)"
		backgroundColor: Utils.randomColor()
	
drawing = false
	
canvas.onTouchStart (event) ->
	draw(event)
	drawing = true	

canvas.onTouchMove (event) -> draw(event)
canvas.onDragEnd -> drawing = false
