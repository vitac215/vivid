# phone and desktop setting
# 		              phone          deaktop
# People fSize         16              25
# image              rotateFix        no rotate
# drawing offset        1              1.6
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
			drawingOffset = 1.6
			canvasSizeOffset = 1


	###
	UTL function
	###
	# create a canvas layer for drawing
	createCanvas = (parent, size, placeAfter) -> 
		canvasView = new Layer
			visible: true  # change to false
			parent: parent
			size: size
			# backgroundColor: "rgba(0, 0, 0, 0, 0)"
		
		canvasView.states = 
			default:
				visible: false
			active:
				visible: true
		
		canvasView.draggable.props =
			vertical: false
			horizontal: false
			
		# put canvas to the bottom of the camera_annotation_tool layer
		canvasView.placeBehind(placeAfter)
		
		# insert actual canvas element
		canvas = document.createElement("canvas");
		canvas.width = size.width * canvasSizeOffset
		canvas.height = size.height * canvasSizeOffset
		canvasView._element.appendChild(canvas);
		# get context
		ctx = canvas.getContext("2d");
		ctx.strokeStyle = "red";
		ctx.lineWidth = 5;
		
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
		
		getTouchPos = (e) ->
			return posObj =
				x: (Events.touchEvent(e).clientX - rect.left)*drawingOffset
				y: (Events.touchEvent(e).clientY - rect.top)*drawingOffset
		
		# touch event listeners
		view.onTouchStart (event) -> 
			drawing = true
			lastPos = getTouchPos(event)
		view.onTouchEnd (event) ->
			drawing = false
		view.onTouchMove (event) -> 
			mousePos = getTouchPos(event)

# 		getMousePos = (e) ->
# 			return posObj =
# 				x: (e.clientX - rect.left)*drawingOffset
# 				y: (e.clientY - rect.top)*drawingOffset
# 				
# 		# touch event listeners
# 		view.onTouchStart (event) -> 
# 			touch = Events.touchEvent(event)
# 			mouseEvent = new MouseEvent("mousedown", {
# 				clientX: touch.clientX,
# 				clientY: touch.clientY
# 			});
# 			ele.dispatchEvent(mouseEvent);
# 		view.onTouchEnd (event) ->
# 			touch = Events.touchEvent(event)
# 			mouseEvent = new MouseEvent("mouseup", {
# 				clientX: touch.clientX,
# 				clientY: touch.clientY
# 			});
# 			ele.dispatchEvent(mouseEvent);
# 		view.onTouchMove (event) -> 
# 			touch = Events.touchEvent(event)
# 			mouseEvent = new MouseEvent("mousemove", {
# 				clientX: touch.clientX,
# 				clientY: touch.clientY
# 			});
# 			ele.dispatchEvent(mouseEvent);
# 				
# 		# mouse event listeners
# 		view.onMouseDown (event) -> 
# 			drawing = true
# 			lastPos = getMousePos(event)
# 		view.onMouseUp (event) ->
# 			drawing = false
# 		view.onMouseMove (event) -> 
# 			mousePos = getMousePos(event)
		
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
			properties: {x: formEleArray[0].x + 4}
			time: 0.1
			curve: "linear"
		animB = ele.animate
			properties: {x: formEleArray[0].x - 4}
			time: 0.1
			curve: "linear"
	
		animA.on Events.AnimationEnd, -> animB.start()
		animB.on Events.AnimationEnd, -> animA.start()
	
		Utils.delay duration, ->
			animA.stop()
			animB.stop()




	###
	Module setting (firebase, input)
	###
	{Firebase} = require 'firebase'
	firebase = new Firebase
		projectID: "vivid-6124d"
		secret: "gj2baisq18Z679XxNlxBosxtR4KBR5NLwwpQIVoA"

	InputModule = require "input"
	{AutoGrowInput} = require "AutoGrowInput"



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


	# Views
	notesView = menu_nav.parent.childrenWithName("notes_view")[0]
	voiceView = menu_nav.parent.childrenWithName("voice_view")[0]
	cameraView = menu_nav.parent.childrenWithName("camera_view")[0]
	peopleView = menu_nav.parent.childrenWithName("people_view")[0]
	mapsView = menu_nav.parent.childrenWithName("maps_view")[0]
	summaryView = menu_nav.parent.childrenWithName("summary_view")[0]

	# viewGroup = [notesView, voiceView, cameraView, peopleView, mapsView, summaryView]
	viewGroup = [notesView, voiceView, cameraView, peopleView, summaryView]

	for view in viewGroup
		view.states =
			active:
				visible: true


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
					data: img, 
					location: "300 S Craig St.",
					created_at: new Date(),
					author: UUID})
				# render to preview box
				cameraPreview.image = img
				rotateFix(cameraPreview, 90)


	# canvas = null
	canvas = createCanvas(cameraAnnoTool, cameraBg.size, cameraTextBtn)
	# check preview
	cameraPreview.on Events.Click, ->
		# create a canvas layer for drawing
		canvas = createCanvas(cameraAnnoTool, cameraBg.size, cameraTextBtn)
		img = cameraPreview.image
		if img != undefined
			# load image to canvas
			#canvas.view.image = img
			imgObj = new Image()
			imgObj.src = img
			canvas.ctx.drawImage(imgObj, 0, 0)
			rotateFix(canvas.view, 90)
			# hide camera preview box and camera button
			cameraPreview.animate("inactive")
			cameraBtn.animate("inactive")
			# show annotation buttons
			cameraAnnoTool.animate("annotation")

	resetCamera = ->
		# hide all annotation buttons
		cameraPreview.animate("inactive")
		cameraPreview.image = null
		canvas.view.image = null
		rotateFix(cameraPreview, 0)
		rotateFix(canvas.view, 0)
	
	
	# Annotate an image (shape button)
	cameraShapeBtn.onTap -> 
		cameraShapeBtn.animate("annotation")
		startDrawing(canvas)
	
	
	# Save annotated image
	cameraAnnotationSaveBtn.onTap ->
		# transfer the annotated image to DB
		img = canvas.ele.toDataURL()
		firebase.post(
					"/#{caseID}/captured",
					{type: 'img', 
					data: img, 
					location: "300 S Craig St.",
					created_at: new Date(),
					author: UUID})
		# back to the original state
		canvas.view.destroy()
		tabConf("default", "default", "active", "default", "default", "default")
		setStateTab(camera, "active")
		resetCamera()




	###
	Notes view
	###
	notesToolBtns = notesView.childrenWithName("tool_btns")[0]
	notesHeader = notesView.childrenWithName("header")[0]

	# notes textarea input
	notesLayer = new AutoGrowInput
		parent: notesView
		height: notesView.height - notesHeader.height - notesToolBtns.height - 30
		width: notesView.width
		x: 0
		y: notesHeader.y + notesHeader.height + 20
		borderColor: "#dedede"
		borderRadius: 3
		borderWidth: 1
		resizeParent: false
		fontSize: fontSize
		lineHeight: fontSize + 10
		padding: "16px 16px 16px 16px"
		placeHolder: "Type your notes"
		value: "I was dispatched to the corner of Murray Av. and Darlington to investigate a hit and run. Victim says he was about to turn the light and was hit by a red car. The man inside veered towards Forbes and took off. Victim possibly recognized the perpetrators license plate. By memory he thought it to be:"
	notesLayer.style =
		"box-sizing" : "border-box"
			
	# notes scroll layer
	notesScroll = new ScrollComponent
	notesScroll.props =
		parent: notesView
		width: notesLayer.width
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
	
	#notesHeader.parent = notesScroll.content
	notesLayer.parent = notesScroll.content
	notesScroll.placeBehind(notesToolBtns)





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
					height: if itemName == 'notes' then 80 else h
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
					input = new InputModule.Input
						parent: row
						name: itemName
						setup: false
						height: row.height * 0.8
						width: row.width * (1-labelWidthRatio) * 0.9
						x: row.width * 0.35
						fontSize: fSize
						text: if popData then itemText else ''
					input.style =
						"word-wrap": "break-word"
						"word-break": "break-word"
	
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
	Summary view
	###
	summaryBtn = navbar.childrenWithName("summary_icon")[0]
	summaryScroll = new ScrollComponent
	summaryScroll.props =
		parent: summaryView
		size: Screen.size
		scrollHorizontal: false
		visible: false
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
		# clear the page
		summaryScroll.content.children.forEach((layer) -> layer.destroy())
		# remove all preview scroll
		removePreviewScroll()
		
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

							switch type
								when 'img'
									dataBox.image = data.data
									rotateFix(dataBox, 90)
								when 'people' then dataBox.image = data.data.img
							
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
													height: if itemName == 'notes' then 80 else h
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
	Tab Group
	###
	notes = [notesTab, notesTitle, notesView]
	voice = [voiceTab, voiceTitle, voiceView]
	camera = [cameraTab, cameraTitle, cameraView, cameraBtn, cameraAnnoTool, cameraShapeBtn, cameraTextBtn]
	people = [peopleTab, peopleTitle, peopleView, personDoneBtn, peopleScroll]
	maps = [mapsTab, mapsTitle]
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
	setStateTab(notes, "active")



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
	voiceTab.onTap ->
		tabConf("default", "active", "default", "default", "default", "default")
	cameraTab.onTap ->
		tabConf("default", "default", "active", "default", "default", "default")
		resetCamera()
	peopleTab.onTap ->
		tabConf("default", "default", "default", "active", "default", "default")
	mapsTab.onTap ->
		tabConf("default", "default", "default", "default", "active", "default")
	summaryBtn.onTap ->
		tabConf("default", "default", "default", "default", "default", "active")
		retrieveDB()
	

init("desktop")