{AutoGrowInput} = require "AutoGrowInput"

pd = 48
	
bg = new BackgroundLayer backgroundColor: "#ededed"

card = new Layer
	width: 460
	height: 700
	x: Align.center
	y: pd
	backgroundColor: "white"
	borderRadius: 3
	shadowY: 1
	shadowBlur: 3
	shadowColor: "rgba(0,0,0,.15)"

logo = new Layer	
	parent: card	
	backgroundColor: "#4285f4"
	width: 48
	height: 48
	borderRadius: 3
	y: pd
	x: Align.center

text = new AutoGrowInput
	borderColor: "#dedede"
	borderRadius: 3
	borderWidth: 1
	parent: card
	width: card.width - 96
	x: Align.center
	y: logo.maxY + 48
	
	# Custom options
# 	reflowSiblings: true
	style: "box-sizing" : "border-box"
	resizeParent: true
	fontSize: 5
	padding: "16px 16px 36px 16px"
	parentBottomPadding: pd
	placeHolder: "Say something"
	
# To show the reflowing stuff...
somethingElse = new Layer
	backgroundColor: "#dedede"
	borderRadius: 3
	height: 48
	parent: card
	width: text.width
	x: Align.center
	y: text.maxY + 24