# Dropdown by Andrew Nalband
# nalband.com, cutandfold.co

document.body.style.cursor = "auto"

listOfItems = ["Charlie Bucket", "Veruca Salt", "Violet Beauregarde", "Mike Teavee", "Arthur Slugworth", "Augustus Gloop", "Granpa Joe"]
height = 40
width = 200
margin = 0
offset = 20

# Create layer
dropdown = new Layer
	x: 100
	y: 100
	width: width
	height: height
	borderRadius: 8
	backgroundColor: "#F45D4C"
	clip: false
	html: "Invited Guests
	"
	
dropdown.style =
		fontSize: "20px"
		paddingLeft: "13px"
		paddingTop: "6px"

dropdown.center()

for i in [0..listOfItems.length-1]
	listItem = new Layer
		height: height
		width: width
		borderRadius: 8
		y: margin + height
		x: offset
		html: listOfItems[i]
		backgroundColor: "#F45D4C"
		superLayer: dropdown
		opacity: 0
		visible: false
	
	listItem.on Events.MouseOver, ->
		this.backgroundColor = "#e55747"	
	
	listItem.on Events.MouseOut, ->
		this.backgroundColor = "#F45D4C"	
	
	listItem.style =
		fontSize: "20px"
		paddingLeft: "13px"
		paddingTop: "6px"

dropdown.on Events.MouseOver, ->
	for layer, index in dropdown.subLayers
		layer.visible = true
		layer.animate
			properties:
				opacity: 1
				y: margin + height + height * index + margin * index
			curve: "spring(80, 19, 19)"



dropdown.on Events.MouseOut, ->
	for layer in dropdown.subLayers
		animationA = new Animation({
    		layer: layer,
    		properties: { opacity: 0, y: margin + height }
    		time: 0.1
		})
		animationA.start()
		animationA.on Events.AnimationEnd, ->
			for myLayer in dropdown.subLayers
				myLayer.visible = false

for layer in dropdown.subLayers
	layer.on Events.MouseOver, ->
		for theLayer in dropdown.subLayers
			theLayer.animateStop
			theLayer.opacity = 1
	
	
	