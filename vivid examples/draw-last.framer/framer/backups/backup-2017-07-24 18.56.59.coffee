canvas = new Layer
	size: Screen.size
	backgroundColor: "#19191b"
	
canvas.draggable.props =
	vertical: false
	horizontal: false

draw = (e) ->
# 	print "draw"
# 	print drawing 
	
	x = Events.touchEvent(e).clientX
	y = Events.touchEvent(e).clientY
	drawS = 15
	
	
	if drawing 
		layer = new Layer
			parent: canvas
			name: "drawing"
			height: drawS
			width: drawS
			x: drawx + drawS*2
			y: drawy - drawS*2
			scale: 1
			borderRadius: "50%"
			backgroundColor: "red"


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
