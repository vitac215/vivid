# phone and desktop setting
# 		              phone          deaktop
# People fSize         16              25
# image              rotateFix        no rotate
# drawing offset        1              1.45
# canvas size offset    4               1


###
Init
###
init = (device) ->
	###
	Device config
	###
	switch device
		when "phone"
			fontSize = 25
			rotateFix = (ele, degree) ->
				ele.rotation = degree
			drawingOffset = 1
			canvasSizeOffset = 4
		when "desktop"
			fontSize = 16
			rotateFix = (ele, degree) ->
				return
			drawingOffset = 1.45
			canvasSizeOffset = 1


	###
	UTL function
	###
	# create a canvas layer for drawing
	createCanvas = (name, parent, size, placeAfter, lineWidth, strokeColor) -> 
		canvasView = new Layer
			name: name
			parent: parent
			size: size
			# opacity: 1  # for debugging purpose
			backgroundColor: "rgba(0, 0, 0, 0, 0)"
		
		canvasView.states = 
			default:
				visible: false
			active:
				visible: true
		
		canvasView.draggable.props =
			vertical: false
			horizontal: false
			
		# put canvas to the bottom of the main layer
		canvasView.placeBehind(placeAfter)
		
		# insert actual canvas element
		canvas = document.createElement("canvas");
		canvas.width = size.width * canvasSizeOffset
		canvas.height = size.height * canvasSizeOffset
		canvasView._element.appendChild(canvas);
		
		# get context
		ctx = canvas.getContext("2d");
		ctx.strokeStyle = strokeColor;
		ctx.lineWidth = lineWidth;
		
		canvasObj = 
			view: canvasView
			ele: canvas
			ctx: ctx
		return canvasObj

	startDrawing = (canvas) ->
		# Get a regular interval for drawing to the screen
		requestAnimFrame = ((cb) ->
			return (cb) ->
				window.setTimeout(cb, 1000/60))()
		
		view = canvas.view
		ele = canvas.ele
		ctx = canvas.ctx
		rect = ele.getBoundingClientRect()
		
		drawing = false
		mousePos = 
			x: rect.left
			y: rect.top
		lastPos = mousePos
		
# 		getTouchPos = (e) ->
# 			return posObj =
# # 				x: (Events.touchEvent(e).clientX - rect.left)*drawingOffset
# # 				y: (Events.touchEvent(e).clientY - rect.top)*drawingOffset
# 				x: (Events.touchEvent(e).clientX - rect.left)*drawingOffset
# 				y: (Events.touchEvent(e).clientY - rect.top)*drawingOffset
		
# 		# touch event listeners
# 		view.onTouchStart (event) -> 
# 			drawing = true
# 			lastPos = getTouchPos(event)
# 		view.onTouchEnd (event) ->
# 			drawing = false
# 		view.onTouchMove (event) -> 
# 			mousePos = getTouchPos(event)

		getMousePos = (e) ->
			return posObj =
				x: (e.clientX - rect.left)*drawingOffset
				y: (e.clientY - rect.top)*drawingOffset
				
		# touch event listeners
		view.onTouchStart (event) -> 
			touch = Events.touchEvent(event)
			mouseEvent = new MouseEvent("mousedown", {
				clientX: touch.clientX,
				clientY: touch.clientY
			});
			ele.dispatchEvent(mouseEvent);
		view.onTouchEnd (event) ->
			touch = Events.touchEvent(event)
			mouseEvent = new MouseEvent("mouseup", {
				clientX: touch.clientX,
				clientY: touch.clientY
			});
			ele.dispatchEvent(mouseEvent);
		view.onTouchMove (event) -> 
			touch = Events.touchEvent(event)
			mouseEvent = new MouseEvent("mousemove", {
				clientX: touch.clientX,
				clientY: touch.clientY
			});
			ele.dispatchEvent(mouseEvent);
				
		# mouse event listeners
		view.onMouseDown (event) -> 
			drawing = true
			lastPos = getMousePos(event)
		view.onMouseUp (event) ->
			drawing = false
		view.onMouseMove (event) -> 
			mousePos = getMousePos(event)
		
		renderCanvas = () ->
			if drawing
				ctx.moveTo(lastPos.x, lastPos.y)
				ctx.lineTo(mousePos.x, mousePos.y)
				ctx.stroke()
				lastPos = mousePos
		
		drawLoop = () -> 
			requestAnimFrame(drawLoop)
			renderCanvas()
		drawLoop()
		
	
# 	startDrawing = (canvas) ->
# 		# Get the position of the canvas
# 		ele = document.getElementsByName("camera_view")[1]
# 		rect = ele.getBoundingClientRect()
# 		canvasLeftOffset = rect.left
# 		canvasTopOffset = rect.top
# 		
# 		# drawing function
# 		draw = (e) ->
# 			drawS = 5
# 			drawx = (Events.touchEvent(e).clientX - canvasLeftOffset)
# 			drawy = (Events.touchEvent(e).clientY - canvasTopOffset)
# 			
# 			if drawing 
# 				layer = new Layer
# 					parent: canvas
# 					name: "drawing"
# 					height: drawS
# 					width: drawS
# 					x: drawx*drawingOffset
# 					y: drawy*drawingOffset
# 					scale: 1
# 					borderRadius: "50%"
# 					backgroundColor: "red"
# 	
# 		drawing = false
# 		
# 		canvas.onTouchMove (event) -> 
# 			draw(event)
# 		
# 		canvas.onTouchStart (event) ->
# 			drawing = true
# 			draw(event)
# 	
# 		canvas.onTouchEnd -> 
# 			drawing = false
	


	###
	Animation function
	###
	shakeAnimate = (ele, duration) ->
		animA = ele.animate
			properties: {x: ele.x + 4}
			time: 0.1
			curve: "linear"
		animB = ele.animate
			properties: {x: ele.x - 4}
			time: 0.1
			curve: "linear"
	
		animA.on Events.AnimationEnd, -> animB.start()
		animB.on Events.AnimationEnd, -> animA.start()
	
		Utils.delay duration, ->
			animA.stop()
			animB.stop()




	###
	Module setting
	###
	# firebase
	{Firebase} = require 'firebase'
	firebase = new Firebase
		projectID: "vivid-6124d"
		secret: "gj2baisq18Z679XxNlxBosxtR4KBR5NLwwpQIVoA"

	InputModule = require "input"
	{AutoGrowInput} = require "AutoGrowInput"
	html2canvas = require "html2canvas"


	###
	User setting
	###
	generateUUID = ->
		s4 = ->
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();

	USERNAME = "vita"
	UUID = generateUUID()
	caseID = "case1"
	LOCATION = "300 S Craig St. - Zone 1"
	TIME = new Date()



	###
	Save session
	###
	firebase.post(
		"/#{caseID}/users/#{UUID}",
		{uuid: UUID,
		username: USERNAME})
# 	firebase.post(
# 		"/#{caseID}/meta",
# 		{location: LOCATION, 
# 		time: TIME})


	###
	Layers def
	###
	navbar = menu_nav.parent.childrenWithName("navbar")[0]

	# Titles
	notesTitle = navbar.childrenWithName("title")[0].childrenWithName("title_notes")[0]
	voiceTitle = navbar.childrenWithName("title")[0].childrenWithName("title_voice")[0]
	cameraTitle = navbar.childrenWithName("title")[0].childrenWithName("title_camera")[0]
	peopleTitle = navbar.childrenWithName("title")[0].childrenWithName("title_people")[0]
	mapsTitle = navbar.childrenWithName("title")[0].childrenWithName("title_maps")[0]
	summaryTitle = navbar.childrenWithName("title")[0].childrenWithName("title_summary")[0]

	for title in navbar.childrenWithName("title")[0].children
		title.states =
			active:
				visible: true
			default:
				visible: false


	# Tabs
	notesTab = menu_nav.childrenWithName("notes")[0]
	voiceTab = menu_nav.childrenWithName("voice")[0]
	cameraTab = menu_nav.childrenWithName("camera")[0]
	peopleTab = menu_nav.childrenWithName("people")[0]
	mapsTab = menu_nav.childrenWithName("maps")[0]

	for tab in menu_nav.children
		tab.states =
			active:
				opacity: 1
		tab.states.animationOptions =
			curve: "linear"
			time: 0.2
		# find the non-color layers
		nonColor = tab.childrenWithName("inactive")
		for layer in nonColor
			layer.states = 
				active:
					opacity: 0
				default:
					opacity: 1
			layer.states.animationOptions =
				curve: "linear"
				time: 0.2
		color = tab.childrenWithName("active")
		for layer in color
			layer.states = 
				active:
					opacity: 1
				default:
					opacity: 0
			layer.states.animationOptions =
				curve: "linear"
				time: 0.2


	# Views def
	notesView = menu_nav.parent.childrenWithName("notes_view")[0]
	voiceView = menu_nav.parent.childrenWithName("voice_view")[0]
	cameraView = menu_nav.parent.childrenWithName("camera_view")[0]
	peopleView = menu_nav.parent.childrenWithName("people_view")[0]
	mapsView = menu_nav.parent.childrenWithName("maps_view")[0]
	summaryView = menu_nav.parent.childrenWithName("summary_view")[0]



	###
	Global variable
	###
	viewSize = 
		width: Screen.width
		height: Screen.height - navbar.height - menu_nav.height




	###
	Camera view
	###
	
	# camera layers
	cameraBtn = cameraView.childrenWithName("camera_btn")[0]
	cameraPreview = cameraView.childrenWithName("camera_preview")[0]
	cameraAnnoTool = cameraView.childrenWithName("camera_annotation_tool")[0]
	cameraBg = cameraView.childrenWithName("camera_bg")[0]
	cameraShapeBtn = cameraAnnoTool.childrenWithName("shape")[0]
	cameraTextBtn = cameraAnnoTool.childrenWithName("text")[0]
	cameraAnnotationSaveBtn = cameraAnnoTool.childrenWithName("save_btn")[0]

	cameraBtn.states =
		active:
			visible: true
		inactive:
			visible: false
	cameraPreview.states =
		active:
			visible: true
		inactive:
			visible: false
	cameraAnnoTool.states =
		active:
			visible: false
		annotation:
			visible: true
	cameraShapeBtn.states = 
		active:
			opacity: 0.5
		annotation:
			opacity: 1
	cameraTextBtn.states = 
		active:
			opacity: 0.5
		annotation:
			opacity: 1

	cameraBtn.html = """
	    <input type="file" id="cameraBtn" accept="image/*"/ style="display: none">
	"""
	cameraInput = document.getElementById("cameraBtn")
	cameraBtn.on Events.Click, ->
		cameraInput.click()


	# take photos
	cameraInput.onchange = ->
		imageReader()
		cameraPreview.visible = true

	imageReader = ->
		file = cameraInput.files[0]
		if file?
			reader = new FileReader()
			reader.readAsDataURL file
			# when image is ready
			reader.onload = ->
				img = reader.result
				
				# transfer to firebase
				firebase.post(
					"/#{caseID}/captured",
					{type: 'img', 
					data: {
						img: img,
					} 
					location: "300 S Craig St.",
					created_at: new Date(),
					author: UUID})
				# render to preview box
				cameraPreview.image = img
				rotateFix(cameraPreview, 90)


	# canvas = null
	canvasCamera = createCanvas("canvasCamera", cameraAnnoTool, cameraBg.size, cameraTextBtn, 2, "red")
	# check preview
	cameraPreview.on Events.Click, ->
		# create a canvas layer for drawing
		canvasCamera = createCanvas("canvasCamera", cameraAnnoTool, cameraBg.size, cameraTextBtn, 2, "red")
		img = cameraPreview.image
		#cameraBg.image = img
		if img != undefined
			# load image to canvas
			#canvasCamera.view.image = img
			imgObj = new Image()
			imgObj.src = img
			canvasCamera.ctx.drawImage(imgObj, 0, 0)
			rotateFix(canvasCamera.view, 90)
			# hide camera preview box and camera button
			cameraPreview.animate("inactive")
			cameraBtn.animate("inactive")
			# show annotation buttons
			cameraAnnoTool.animate("annotation")

	resetCamera = ->
		# hide all annotation buttons
		cameraPreview.animate("inactive")
		cameraPreview.image = null
		canvasCamera.view.image = null
		rotateFix(cameraPreview, 0)
		rotateFix(canvasCamera.view, 0)
	
	
	# Annotate an image (shape button)
	cameraShapeBtn.onTap -> 
		if cameraShapeBtn.opacity == 0.5
			cameraShapeBtn.animate("annotation")
			startDrawing(canvasCamera)
	
	
	# Save annotated image
	cameraAnnotationSaveBtn.onTap ->
		# transfer the annotated image to DB
		img = canvasCamera.ele.toDataURL()
		firebase.post(
					"/#{caseID}/captured",
					{type: 'img', 
					data: {
						img: img,
						},
					location: "300 S Craig St.",
					created_at: new Date(),
					author: UUID})
		
		# back to the original state
		canvasCamera.view.destroy()
		tabConf("default", "default", "active", "default", "default", "default")
		setStateTab(camera, "active")
		resetCamera()




	###
	Notes view
	###
	notesHeader = notesView.childrenWithName("header")[0]
	notesToolBtns = notesView.childrenWithName("tool_btns")[0]
	notesShapeBtn = notesToolBtns.childrenWithName("shape")[0]
	notesSaveBtn = notesToolBtns.childrenWithName("save_btn")[0]

	notesShapeBtn.states = 
		active:
			opacity: 0.5
		annotation:
			opacity: 1
	
	# create notes
	notesInputSize =
		title: {height: 30, width: notesView.width}
		time: {height: 20, width: notesView.width}
		text: {width: notesView.width, height: notesView.height - 30 - 20 - notesToolBtns.height - 40}
	
	createNotesLayer = () ->
		notesInputContainer = new Layer
			name: "notesInputContainer"
			parent: notesView
			backgroundColor: null
			#width: notesView.width  200
			#height: 430  200
			width: 200
			height: 200
		
		notesInputTitle = new InputModule.Input
			name: "notesInputTitle"
			parent: notesInputContainer
			setup: false
			height: notesInputSize.title.height
			width: notesInputSize.title.width
			padding: 0
			fontSize: 30
			text: "Hit and Run"
			placeholder: "New Title"
			#autofocus: true
		notesInputTitle.style = 
			fontWeight: "600"
			color: "#32C0CE"
		
		notesInputTime = new TextLayer
			name: "notesInputTime"
			parent: notesInputContainer
			width: notesInputSize.time.width
			y: notesInputTitle.y + notesInputTitle.height + 12
			fontSize: fontSize
			color: "#35343D"
			text: "July 31, 2017 at 11:43am"
			
			
		notesInputText = new AutoGrowInput
			name: "notesInput"
			parent: notesInputContainer
			height: notesInputSize.text.height
			width: notesInputSize.text.width
			x: 0
			y: notesInputTime.y + notesInputTime.height + 10
			borderColor: "#dedede"
			borderRadius: 3
			borderWidth: 1
			resizeParent: false
			fontSize: fontSize
			lineHeight: fontSize + 10
			padding: "16px 16px 16px 16px"
			placeHolder: "Type your notes"
			value: "I was dispatched to the corner of Murray Av. and Darlington to investigate a hit and run. Victim says he was about to turn the light and was hit by a red car. The man inside veered towards Forbes and took off. Victim possibly recognized the perpetrators license plate. By memory he thought it to be:"
		notesInputText.style =
			"box-sizing" : "border-box"
				
		# notes scroll layer
		notesScroll = new ScrollComponent
		notesScroll.props =
			parent: notesInputContainer
			name: "notesScroll"
			width: notesInputText.width
			height: viewSize.height
			scrollHorizontal: false
			scrollVertical: false
	# 		contentInset:
	# 			top: navbar.height
	# 			bottom: menu_nav.height
		notesScroll.states =
			active:
				visible: true
			inactive:
				visible: false
		
		notesInputText.parent = notesScroll.content
		notesScroll.placeBehind(notesInputTitle)
		
		notesInputContainer.placeBehind(notesToolBtns)
		
		notesInput =
			container: notesInputContainer
			title: notesInputTitle
			time: notesInputTime
			text: notesInputText
		
		return notesInput
	
	notesInput = createNotesLayer()
	
	# listen on title change
	notesInputTitleText = "Hit and Run"
	notesInput.title.on "keyup", ->
		notesInputTitleText = @value
	
	# notes annotation
	canvasNotes = null
	notesShapeBtn.onTap -> 
		if notesShapeBtn.opacity == 0.5
			notesShapeBtn.animate("annotation")
			# create canvas
			canvasNotes = createCanvas("canvasNotes", notesView, notesView.size, notesToolBtns, 2, "black")
			startDrawing(canvasNotes)
		if notesShapeBtn.opacity == 1
			notesShapeBtn.animate("active")
			canvasNotes.view.destroy()
	
	# save notes
	notesSaveBtn.onTap ->
		notesText = document.querySelectorAll("textarea")[0].value
		
		# get annotation from canvas
		annoImg = null
		if canvasNotes?
			annoImg = canvasNotes.ele.toDataURL()
		
		sendNotesToDB = (title, text, img, annoImg) ->
			firebase.post(
					"/#{caseID}/captured",
					{type: 'notes',
					data: {
						title: notesInputTitleText
						text: notesText,
						img: img,
						annoImg: annoImg,
						time: "July 31, 2017 at 11:43am"
						},
					location: "300 S Craig St.",
					created_at: new Date(),
					author: UUID})
		
		# convert html to image
		notesDOM = document.getElementsByName("notesInputContainer")[0]
		
		html2canvas(notesDOM, {
			onrendered: ((canvas) ->
				# get screenshot
				notesScreenshot = canvas.toDataURL()
				# send to DB
				sendNotesToDB(notesInputTitleText, notesText, notesScreenshot, annoImg)
				# clear the the title and textarea
				document.querySelectorAll("textarea")[0].value = ""
				document.querySelectorAll("input")[0].value = "New Title"
				# back to the original state
				if canvasNotes?
					canvasNotes.view.destroy())
		})



	###
	People view
	###
	personImg = peopleView.childrenWithName("person_img")[0]
	personImgPlaceholder = personImg.children[0]
	personSaveBtn = peopleView.childrenWithName("save_btn")[0]

	personDoneBtn = peopleView.childrenWithName("done")[0]
	personDoneBtn.states =
		done:
			opacity: 1
			y: 228
		active:
			opacity: 0
			y: -60
	personDoneBtn.states.animationOptions =
			curve: Spring(tension: 250, friction: 25)
			time: 0.3


	# scroll
	peopleScroll = new ScrollComponent
	peopleScroll.props =
		parent: peopleView
		size: Screen.size
		contentInset:
			bottom: menu_nav.height
		scrollHorizontal: false
		visible: false
	peopleScroll.states =
		active:
			visible: true
		inactive:
			visible: false

	appendToScroll = (toAppendArray, scrollPage) ->
		toAppendArray.forEach((layer) -> layer.parent = scrollPage.content)
	appendToScroll([personImg, personSaveBtn], peopleScroll)


	# input
	inputform = {
		label: ["Name", "DOB", "Address", "Height", "Notes"],
		name: ["name", "dob", "address", "height", "notes"],
		content: ["Michael M", "04/13/1976", "2345 Park Street, PA", "5'03''", "Mentally disabled"]}
	sampleIDImg = "images/id_sample.png"
	defaultIDImg = "images/person_default.png"

	inputsArray = []
	formEleArray = []
	formData = {name: "", dob: "", address: "", height: "", notes: ""}

	# append form to the scroll content
	appendForm = (popData) ->
		
		
		createFormLayers = (scroll) ->
			h = 40
			w = 335
			xPos = 20
			yPos = personImg.y + personImg.height + 20
			rowMargin = 5
			labelWidthRatio = 0.35
			fSize = fontSize
			
			arrayLen = inputform.label.length
			for i in [0...arrayLen]
				itemLabel = inputform.label[i]
				itemName = inputform.name[i]
				itemText = inputform.content[i]
				yOffSet = (if i == 0 then yPos else yPos + rowMargin*i)
	
				row = new Layer
					parent: scroll.content
					name: itemName
					height: if itemName == 'notes' then 150 else h
					width: w
					x: xPos
					y: h*i + yOffSet
					backgroundColor: "#fff"
					borderRadius: 3
					shadowY: 1
					shadowBlur: 3
					shadowColor: "rgba(0,0,0,.15)"
	
				label = new TextLayer
					parent: row
					padding: 10
					height: row.height
					width: row.width * labelWidthRatio
					text: itemLabel
					fontSize: fSize
					color: "#4A4A4A"
				label.style = 
					fontWeight: "600"
				
				if itemName != 'notes'
					input = new InputModule.Input
						parent: row
						name: itemName
						setup: false
						height: row.height * 0.5
						width: row.width * (1-labelWidthRatio) * 0.9
						x: row.width * 0.35
						fontSize: fSize
						placeholder: if itemName == 'name' then 'Required' else ''
						text: if popData then itemText else ''
				else 				
					input = new AutoGrowInput
						parent: row
						height: row.height * 0.8
						width: row.width * (1-labelWidthRatio) * 0.9
						x: row.width * 0.35
						fontSize: fSize
# 						borderColor: "#dedede"
# 						borderRadius: 3
# 						borderWidth: 1
						resizeParent: false
						lineHeight: fSize + 10
						placeholder: ""
						padding: "5px 16px 16px 16px"
					input.style =
						"box-sizing" : "border-box"
		
				formEleArray.push(row)
				inputsArray.push(input)
	
		createFormLayers(peopleScroll)
		
		# add states for the required field
		requiredRow = formEleArray[0]
		requiredRow.scale = 1

		# adjust y of the save button
		notesBox = peopleScroll.content.childrenWithName("notes")[0]
		personSaveBtn.y = notesBox.y + notesBox.height + 20

		# add input event listener
		inputsArray.forEach((input) ->
			input.on "keyup", ->
				formData["#{input.name}"] = @value)

	appendForm(false)


	# ID scan
	personImg.html = """
	    <input type="file" id="scanBtn" accept="image/*"/ style="display: none">
	"""
	scanInput = document.getElementById("scanBtn")
	personImg.on Events.Click, ->
		scanInput.click()

	# scan/take photo of ID
	scanInput.onchange = ->
		idReader()

	idReader = ->
		file = scanInput.files[0]
		if file?
			reader = new FileReader()
			reader.readAsDataURL file
			# when image is ready
			reader.onload = ->
				img = reader.result

			addPersonImg()

			# append fake data to input fields
			clearForm()
			appendForm(true)
			# save fake data
			arrayLen = inputform.label.length
			for i in [0...arrayLen]
				formData["#{inputform.name[i]}"] = "#{inputform.content[i]}"


	addPersonImg = ->
		personImgPlaceholder.visible = false
		personImg.image = sampleIDImg
	removePersonImg = ->
		personImgPlaceholder.visible = true
		personImg.image = null

	# reset form
	clearForm = ->
		# clear form data map
		for key of formData
			formData["#{key}"] = ""
		# clear input fields
		formEleArray.forEach((row) -> row.destroy())


	# Save person info
	personSaveBtn.onTap ->
		# print formData
		# transfer to firebase
		if formData.name != ""
			firebase.post(
				"/#{caseID}/captured",
				{type: 'people',
				data: {
					img: if personImg.image then personImg.image else defaultIDImg,
					name: formData.name,
					dob: formData.dob,
					address: formData.address,
					height: formData.height,
					notes: formData.notes,
					},
				location: "300 S Craig St.",
				created_at: new Date(),
				author: UUID})
			# "done" animation
			peopleScroll.animate('inactive')
			personDoneBtn.bringToFront()
			personDoneBtn.animate('done')
			# reset form
			clearForm()
			appendForm(false)
		else
			requiredInput = peopleScroll.content.childrenWithName("name")[0]
			shakeAnimate(requiredInput, 0.5)


	# press done
	personDoneBtn.onTap ->
		setStateTab(people, "active")
		removePersonImg()




	###
	Maps view
	###
	mapsSaveView = mapsView.childrenWithName("maps_save_view")[0]
	mapsSaveBtn = mapsSaveView.childrenWithName("save_btn")[0]
	mapsNotes = mapsSaveView.childrenWithName("maps_notes")[0]
	mapsNotesTitle = mapsNotes.childrenWithName("title")[0]
	mapsNextView = mapsView.childrenWithName("maps_next_view")[0]
	mapsAnchor = mapsNextView.childrenWithName("anchor")[0]
	mapsShapeBtn = mapsNextView.childrenWithName("map_annotation_tool")[0].childrenWithName("shape")[0]
	mapsTextBtn = mapsNextView.childrenWithName("map_annotation_tool")[0].childrenWithName("text")[0]
	mapsNextBtn = mapsNextView.childrenWithName("map_annotation_tool")[0].childrenWithName("next_btn")[0]
	
	mapsContent = null
	mapsInput = null
	mapsInputValue = "Suspect ran this way"
	mapsPaths = null
	mapImg = "images/map_data.png"
	
	mapsAnchor.opacity = 0
	mapsNextView.states =
		active:
			visible: true
		default:
			visible: false
	mapsSaveView.states =
		active:
			visible: false
		default:
			visible: false
		save:
			visible: true
	mapsShapeBtn.states = 
		active:
			opacity: 0.5
		annotation:
			opacity: 1
	mapsTextBtn.states = 
		active:
			backgroundColor: "#D8D8D8"
		ready:
			backgroundColor: "#32C0CE"
			opacity: 0.5
		annotation:
			backgroundColor: "#32C0CE"
			opacity: 1
	
	
	createPath = () ->
		layerPath1 = new Layer
			name: "layerpath1"
			parent: mapsView
			width: 55
			height: 77
			x: mapsAnchor.x
			y: mapsAnchor.y - 73
			backgroundColor: "rgba(0, 0, 0, 0, 0)"
		layerPath1.placeBehind(mapsAnchor)
		
		layerPath1.html = '<svg width="55px" height="77px" viewBox="0 0 55 77" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	<path fill="none" stroke="#EA6C63" stroke-width="3" d="M0,75 C49.9539034,75 52.743467,75.9092399 53,73 C53.2483913,70.1830922 51.7931202,64.1099079 48.15625,30.71875 C47.4292183,24.043662 47.6049996,13.9733495 48.6835937,0.5078125" id="mapsLayerPath1" stroke-dasharray="988.00 988.00" stroke-dashoffset="988.00"></path>
	</svg>'
		
		
		layerPath2 = new Layer
			name: "layerpath2"
			parent: mapsView
			width: 32
			height: 23
			x: mapsAnchor.x + 30
			y: layerPath1.y - 8
			backgroundColor: "rgba(0, 0, 0, 0, 0)"
		layerPath2.placeBehind(mapsAnchor)
		
		layerPath2.html = '<svg width="32px" height="17px" viewBox="0 0 32 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		<g id="Artboard" transform="translate(-259.000000, -308.000000)" stroke="#EA6C63" stroke-width="3">
		<path fill="none" d="M261,324 C273.537752,305.271902 282.871086,304.938568 289,323" id="mapsLayerPath2" stroke-dasharray="988.00 988.00" stroke-dashoffset="988.00"></path></g>
	</svg>'
		
		pathObj =
			path1: layerPath1
			path2: layerPath2
		return pathObj
		
	# draw path
	drawLayerPath = (svgPath, delayTime) ->
		pathLength = 0
		Utils.delay delayTime, ->
			pathLength = svgPath.getTotalLength()
			svgPath.style.strokeDasharray = pathLength + ' ' + pathLength;
			svgPath.style.strokeDashoffset = pathLength
			svgPath.getBoundingClientRect()
			svgPath.style.transition = svgPath.style.WebkitTransition = 'stroke-dashoffset 2s ease-in-out'
			svgPath.style.strokeDashoffset = '0'
	
	# annotate and text map
	tabMapsTextBtn = () ->
		#print "tab text"
		# check if the button is ready to be clicked
		if mapsTextBtn.states.current.name == "ready"
			mapsTextBtn.animate("annotation")
			# create text input box
			mapsInput = new InputModule.Input
				parent: mapsView
				name: "mapsInput"
				setup: false
# 				height: fontSize + 10
				width: 150
				x: if mapsPaths then mapsPaths.path1.x - mapsPaths.path1.width
				y: if mapsPaths then mapsPaths.path1.y - 50
				fontSize: fontSize
				text: "Suspect ran this way"
				placeholder: "Enter your notes"
				backgroundColor: "#fff"
				autofocus: true
			mapsInput.on "keyup", ->
				mapsInputValue = @value
	
	
	# annotate and shape map
	mapsShapeBtn.onTap -> 
		if mapsShapeBtn.opacity == 0.5
			mapsShapeBtn.animate("annotation")
			mapsPaths = createPath()
			# draw path animation
			svgPath1 = document.getElementById('mapsLayerPath1')
			svgPath2 = document.getElementById('mapsLayerPath2')
			drawLayerPath(svgPath1, 1)
			drawLayerPath(svgPath2, 3)
			# activate mapsTextBtn
			Utils.delay 5, ->
				mapsTextBtn.animate("ready")
				mapsTextBtn.onTap ->
					tabMapsTextBtn()
		
	# press next
	mapsNextBtn.onTap ->
		if mapsShapeBtn.states.current.name == "annotation"
			text = mapsInputValue
			# hide next screen
			mapsNextView.animate("default")
			# remove path
			resetMapsView()
			# show save screen
			mapsSaveView.animate("save")
			# clear text and add text to the notesbox
			mapsContent = new TextLayer
				name: "mapsContent"
				parent: mapsNotes
				text: text
				fontSize: fontSize
				color: '#4A4A4A'
				width: mapsNotes.width - 40
				height: mapsNotes.height 
				x: 20
				y: mapsNotesTitle.y + mapsNotesTitle.height + 10
					
		else 
			shakeAnimate(mapsShapeBtn, 0.5)
	
	# press save
	mapsSaveBtn.onTap ->
		# send to DB
		img = mapImg
		firebase.post(
			"/#{caseID}/captured",
			{type: 'maps', 
			data: {
				img: img,
				notes: mapsInputValue
			} 
			location: "300 S Craig St.",
			created_at: new Date(),
			author: UUID})
		# back to original state
		setStateTab(maps, "active")
		resetMapsView()
	
	destroyPaths = () ->
			layerPath1 = mapsView.childrenWithName("layerpath1")[0]
			layerPath2 = mapsView.childrenWithName("layerpath2")[0]
			if layerPath1?
				layerPath1.destroy()
			if layerPath2?
				layerPath2.destroy()
	
	# reset maps screen
	resetMapsView = () ->
		# destroy paths
		destroyPaths()
		# destroy inputbox
		if mapsInput?
			mapsInput.destroy()
		if mapsContent?
			mapsContent.destroy()
	



	###
	Summary view
	###
	summaryBtn = navbar.childrenWithName("summary_icon")[0]
	summaryScroll = new ScrollComponent
	summaryScroll.props =
		parent: summaryView
		size: Screen.size
		scrollHorizontal: false
		visible: false
		contentInset:
			bottom: menu_nav.height + 20
	summaryScroll.states =
		active:
			visible: true
	
	createPreviewScroll = () ->
		previewScroll = new ScrollComponent
		previewScroll.props =
			name: "previewScroll"
			parent: summaryView
			# width: Screen.width
			# height: Screen.height - navbar.height - menu_nav.height
			size: viewSize
			x: 0
			y: navbar.height
			scrollHorizontal: false
			backgroundColor: "#F8F8F9"
		previewScroll.states =
			active:
				visible: true
			inactive:
				visible: false
		previewScroll.animate('inactive')
		return previewScroll
	
	removePreviewScroll = () ->
		previewScrolls = summaryView.childrenWithName("previewScroll")
		for layer in previewScrolls
			layer.destroy()


	renderRes = (dataSet) ->
		if dataSet?
			dataArray = _.toArray(dataSet).reverse()
			# print "dataArray ", dataArray
			
			# create the preview scroll
			previewScroll = createPreviewScroll()

			# render the view
			xPos = 17
			yPos = navbar.height
			loc = new TextLayer
				parent: summaryScroll.content
				text: LOCATION
				fontSize: 15
				color: '#4A4A4A'
				x: xPos
				y: yPos + 16
			time = new TextLayer
				parent: summaryScroll.content
				text: TIME
				fontSize: 10
				color: '#4A4A4A'
				x: xPos
				y: loc.y + loc.height + 5

			# render box
			if dataArray? and dataArray.length > 0
				dataCount = dataArray.length

				row = Math.ceil(dataCount / 3)
				boxCount = 3
				size = 104
				boxMargin = 15
				xPos = 17
				yPos = time.y + time.height + 8

				for j in [0...row]
					for i in [0...3]
						data = dataArray[j*3 + i]
						if data?
	# 						print "data ", data.data
							xOffSet = (if i == 0 then xPos else xPos + boxMargin*i)
							yOffSet = (if j == 0 then yPos else yPos + boxMargin*j)

							type = data.type

							dataBox = new Layer
								parent: summaryScroll.content
								width: size
								height: size
								x: size*i + xOffSet
								y: size*j + yOffSet
								backgroundColor: "#fff"
								image: data.data.img
								borderRadius: 3
								shadowY: 1
								shadowBlur: 3
								shadowColor: "rgba(0,0,0,.15)"
							
							if type == 'img'
								rotateFix(dataBox, 90)
							
							dataBoxListenPreview = (dataBox, data) ->
								# create the preview layer
								createPreviewLayer = (dataBox, type, previewScroll) ->
									previewLayer = new Layer
										parent: previewScroll.content
										size: Screen.size
										backgroundColor: "#F8F8F9"
										
									switch type
										when 'img'
											previewLayer.image = dataBox.image
										
										when 'people'
											img = new Layer
												parent: previewLayer
												image: data.data.img
												size: 110
											img.center()
											img.y = 10
											
											h = 40
											w = 335
											xPos = 20
											yPos = img.y + img.height + 40
											rowMargin = 5
											labelWidthRatio = 0.35
											fSize = fontSize
											
											# print data.data
											arrayLen = inputform.label.length
											for i in [0...arrayLen]
												itemLabel = inputform.label[i]
												itemName = inputform.name[i]
												yOffSet = (if i == 0 then yPos else yPos + rowMargin*i)
												
												row = new Layer
													parent: previewScroll.content
													name: itemName
													height: if itemName == 'notes' then 150 else h
													width: w
													x: xPos
													y: h*i + yOffSet
													backgroundColor: "#fff"
													borderRadius: 3
													shadowY: 1
													shadowBlur: 3
													shadowColor: "rgba(0,0,0,.15)"
											
												label = new TextLayer
													parent: row
													padding: 10
													height: row.height
													width: row.width * labelWidthRatio
													text: itemLabel
													fontSize: fSize
													color: "#4A4A4A"
												label.style = 
													fontWeight: "600"
												
												info = new TextLayer
													parent: row
													padding: 10
													height: row.height
													width: row.width * (1-labelWidthRatio) * 0.9
													x: 100
													text: data.data[itemName]
													fontSize: fSize
													fontWeight: 500
													color: "#444444"
										
										when "notes"
											title = new TextLayer
												parent: previewLayer
												height: 30
												width: notesView.width
												x: 42
												y: 26
												padding: 0
												fontSize: 30
												text: data.data.title
											title.style =
												fontWeight: "600"
												color: "#32C0CE"
											
											time = new TextLayer
												parent: previewLayer
												width: notesView.width
												x: title.x
												y: title.y + title.height + 12
												fontSize: fontSize
												color: "#35343D"
												text: data.data.time
											
											text = new TextLayer
												parent: previewLayer
												fontSize: fontSize
												lineHeight: 1.8
												width: notesView.width
												height: notesView.height - title.height - time.height - 20
												x: title.x
												y: time.y + time.height + 10
												backgroundColor: "#fff"
												text: data.data.text
											text.style =
												padding: "16px"
											
											if data.data.annoImg?
												posOffset = {x: 20, y: 90}
												annoImg = new Layer
													parent: previewLayer
													x: title.x + posOffset.x
													y: title.y + posOffset.y
													height: notesInputSize.title.height + notesInputSize.time.height + notesInputSize.text.height
													width: notesInputSize.text.width
													image: data.data.annoImg
													
													
													
												
												
											
									previewScroll.animate('active')
												
								
								# click on a data box to preview
								dataBox.onTap -> 
									createPreviewLayer(this, data.type, previewScroll)
							
							dataBoxListenPreview(dataBox, data)
							
										
							
								
							
		# if no data, reload
		else 
			nodata = new TextLayer
				parent: summaryScroll.content
				text: "No Data"
				fontSize: 15
				color: '#4A4A4A'
				x: 20
				y:navbar.height + 20



	###
	Receive captured evidence from firebase
	###
	retrieveDB = ->
		firebase.get("/#{caseID}/captured", ((res) ->
			renderRes(res)), {orderBy: "created_at"})


	###
	View group setup
	###
	viewGroup = [notesView, voiceView, cameraView, peopleView, mapsView, summaryView]

	for view in viewGroup
		view.states =
			active:
				visible: true
			default:
				visible: false


	###
	Tab Group
	###
	notes = [notesTab, notesTitle, notesShapeBtn, notesView]
	voice = [voiceTab, voiceTitle, voiceView]
	camera = [cameraTab, cameraTitle, cameraView, cameraBtn, cameraAnnoTool, cameraShapeBtn, cameraTextBtn]
	people = [peopleTab, peopleTitle, peopleView, personDoneBtn, peopleScroll]
	maps = [mapsTab, mapsView, mapsTitle, mapsShapeBtn, mapsTextBtn, mapsNextView, mapsSaveView]
	summary = [summaryView, summaryTitle, summaryScroll]



	###
	Tab config
	###
	# Set state for tabs
	setStateTab = (tabGroup, state) ->
		for i in [0...tabGroup.length]
			item = tabGroup[i]
			# for the tab item
			if i == 0
				for layer in item.children
					layer.animate(state)
			item.animate(state)

	###
	Defatult
	###	
# 	setStateTab(notes, "active")
	# testing
	setStateTab(maps, "active")


	###
	Tab config
	###
	tabConf = (notesConf, voiceConf, cameraConf, peopleConf, mapsConf, summaryConf) ->
		setStateTab(notes, notesConf)
		setStateTab(voice, voiceConf)
		setStateTab(camera, cameraConf)
		setStateTab(people, peopleConf)
		setStateTab(maps, mapsConf)
		setStateTab(summary, summaryConf)




	###
	Tab events
	###
	notesTab.onTap ->
		tabConf("active", "default", "default", "default", "default", "default")
		if canvasNotes?
			canvasNotes.view.destroy()
	voiceTab.onTap ->
		tabConf("default", "active", "default", "default", "default", "default")
	cameraTab.onTap ->
		tabConf("default", "default", "active", "default", "default", "default")
		resetCamera()
	peopleTab.onTap ->
		tabConf("default", "default", "default", "active", "default", "default")
	mapsTab.onTap ->
		tabConf("default", "default", "default", "default", "active", "default")
		resetMapsView()
	summaryBtn.onTap ->
		tabConf("default", "default", "default", "default", "default", "active")
		retrieveDB()
		# remove all preview scroll
		removePreviewScroll()
		# clear the summary page
		summaryScroll.content.children.forEach((layer) -> layer.destroy())
		


init("desktop")