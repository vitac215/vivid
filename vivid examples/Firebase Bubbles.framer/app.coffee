

# Please deactivate Auto Refresh and reload manually using CMD+R!


# Modules

# Include modules
{Pointer}  = require "Pointer" # by Jordan Dobson
{Firebase} = require "firebase"


# The required information is located at https://firebase.google.com → Console → YourProject → ...
demoDB = new Firebase
	projectID: "framer-demo" # ... Database → first part of URL
	secret: "K2ZJjo4RXG5nlHEWgjgwBzNkeVJCz9YZAQF8dk9g" # ... Project Settings → Service Accounts → Database Secrets → Show (mouse-over)


# IMPORTANT: This is what the database looks like while holding
# some bubble datasets: http://i.imgur.com/7e40dX5.png

# Variables
latestBubble = null
timestamp = null
bubblesLoaded = false

# Animation variables
delay = 20
spring = "spring"

# Layers

popSFX = new VideoLayer
	video: "blop.mp3" # by Mark DiAngelo
	visible: false

bg = new BackgroundLayer

pop = new Layer
	height: 75
	x: Align.center, maxY: Screen.height - 20
	borderRadius: 75
	html: "POP"
	backgroundColor: "rgb(255,0,0)"
	shadowSpread: 10
	shadowColor: "rgba(255,255,255,1)"
	style:
		fontFamily: "Roboto Mono"
		fontSize: "32px"
		fontWeight: "800"
		textAlign : "center"
		lineHeight: "75px"

# Calculate and display idle time

Utils.interval 1, ->

	forceTwoDigits = (input) ->
		str = input.toString()
		if str.length is 1 then return "0#{input}" else return input

	if timestamp? # was loaded from the database
		idle    = seconds = Math.floor((Date.now() - timestamp) / 1000) 
		minutes = Math.floor(seconds / 60)
		hours   = Math.floor(minutes / 60)
		days    = Math.floor(hours   / 24)
		weeks   = Math.floor(days    / 7)

		if seconds <  60 then                 label = "s"
		if seconds >= 60 then idle = minutes; label = "m"
		if minutes >= 60 then idle = hours;   label = "h"
		if hours   >= 24 then idle = days;    label = "d"
		if days    >= 7  then idle = weeks;   label = "w"

		if latestBubble? # to make sure at least one bubble exists

			latestBubble.props =
				style:
					fontFamily: "Roboto Mono"
					fontSize: "#{latestBubble.size/4}px"
					fontWeight: "400"
					textAlign : "center"
					lineHeight: "#{latestBubble.height}px"

			# Display idle time on latestBubble
			latestBubble.html = "<b>#{forceTwoDigits(idle)}</b>#{label}"

# Interactions

bg.onTouchStart (event, layer) ->

	# `Pointer´-module is used to get true, device-independent offset 
	normalizedOffset = Pointer.offset(event, layer)

	demoDB.post("/bubbles", { # Add a new `child´-node with the following values:
								"x": normalizedOffset.x,
								"y": normalizedOffset.y,
								"size": Math.round(Utils.randomNumber(75,175)),
								"color": "#{Utils.randomColor().darken(10)}"
								})

	# Update timestamp
	# demoDB.put("/timestamp",Date.now()) # client-side timestamp
	demoDB.put("/timestamp", {".sv": "timestamp"}) # server-side timestamp


# Delete all bubbles
pop.onTouchStart -> demoDB.delete("/bubbles")

# Monitor / sync database changes

# Get timestamp of latest interaction
demoDB.onChange "/timestamp", (tstamp) -> timestamp = tstamp


demoDB.onChange "/bubbles", (bubbles) ->


	# Scenario 1: Prototype loads

	if bubblesLoaded is false

		if bubbles?

			bubblesArray = _.toArray(bubbles) # convert received JSON to array
			print bubbles
			
			# Create a layer for every bubble
			for bubble,i in bubblesArray

				bubble = new Layer
					name: "bubble"
					midX: bubble.x, midY: bubble.y
					size: bubble.size
					backgroundColor: bubble.color
					borderRadius: "100%"
					scale: 0

				# Animate in
				bubble.animate
					properties:
						scale: 1
					curve: spring
					delay: i / delay
	
			# Display idle time on
			latestBubble = bubble
			bubblesLoaded = true

			pop.bringToFront() # Button should always stay on top

			return


	# Scenario 2: `/bubbles´-node is empty or has been deleted
	
	if bubbles is null

		# Play sound only if there's at least one bubble we can pop 
		popSFX.player.play() if latestBubble?

		for layer,i in Framer.CurrentContext.layers

			# Pop and destroy all layers named `bubble´
			if layer.name is "bubble"

				layer.animate
					properties:
						scale: 2
						opacity: 0
					curve: spring

				layer.onAnimationEnd -> @.destroy()

		return


	# Scenario 3: A bubble has been added to the database

	# Remove idle time on latestBubble
	latestBubble.html = ""

	# Create a layer based on the new child we received from onChange
	latestBubble = new Layer
		name: "bubble"
		midX: bubbles.x, midY: bubbles.y
		backgroundColor: bubbles.color
		size: bubbles.size
		borderRadius: "100%"
		scale: 0
		style:
			fontFamily: "Roboto Mono"
			fontSize: "#{bubbles.size/4}px"
			fontWeight: "400"
			textAlign : "center"
			lineHeight: "#{bubbles.size}px"

	# Animate in
	latestBubble.animate
		properties:
			scale: 1
		curve: spring

	pop.bringToFront()


