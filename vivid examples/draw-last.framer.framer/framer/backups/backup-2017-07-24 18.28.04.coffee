canvas = new Layer
	size: Screen.size
# 	backgroundColor: "#19191b"
	
canvas.draggable.props =
	vertical: false
	horizontal: false

draw = (e) ->
# 	print "draw"
# 	print drawing 
	
	x = Events.touchEvent(e).clientX
	y = Events.touchEvent(e).clientY
	
	if drawing then new Layer
		parent: canvas
		x: x - 50
		y: y - 50
		borderRadius: "50%"
		scale: 1
		borderWidth: 1
		borderColor: "rgba(0, 0, 0, .2)"
		backgroundColor: Utils.randomColor()


drawing = false
	
canvas.onTouchStart (event) ->
	print "on touch start"
	text.destroy()
	drawing = true	
	draw(event)

canvas.onTouchMove (event) -> 
	print "on touch move"
	draw(event)
	
canvas.onDragEnd -> 
	print "on drag end"
	drawing = false






text = new Layer
	backgroundColor: ""
	width: 300
	html: "Draw here"
	opacity: .5
	style:
		font: "100 1.5em 'Helvetica Neue'"
		textAlign: "center"
text.center()
text.states.add state: opacity: .2
text.states.animationOptions = curve: "linear"
Utils.interval 1, -> text.states.next()
