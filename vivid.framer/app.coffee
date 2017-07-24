# phone and desktop setting
# 		     People fSize      image
# phone           16         rotateFix
# deaktop         25         no rotate


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
		when "desktop"
			fontSize = 16
			rotateFix = (ele, degree) ->
				return
	
	###
	Module setting (firebase, input)
	###
	{Firebase} = require 'firebase'
	firebase = new Firebase
		projectID: "vivid-6124d"
		secret: "gj2baisq18Z679XxNlxBosxtR4KBR5NLwwpQIVoA"

	InputModule = require "input"



	###
	User setting
	###
	generateUUID = ->
		s4 = ->
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();

	username = "vita"
	uuid = generateUUID()
	caseID = "case1"



	###
	Save session
	###
	firebase.post(
		"/#{caseID}/#{uuid}/meta",
		{username: username, location: "300 S Craig St. - Zone 1", time: new Date()})



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
	Camera view
	###
	cameraBtn = cameraView.childrenWithName("camera_btn")[0]
	cameraPreview = cameraView.childrenWithName("camera_preview")[0]
	cameraBg = cameraView.childrenWithName("camera_bg")[0]
	cameraShapeBtn = cameraView.childrenWithName("shape")[0]
	cameraTextBtn = cameraView.childrenWithName("text")[0]
	cameraAnnotationSaveBtn = cameraView.childrenWithName("save_btn")[0]

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
	cameraShapeBtn.states =
		active:
			visible: false
		anotation:
			visible: true
	cameraTextBtn.states =
		active:
			visible: false
		anotation:
			visible: true
	cameraAnnotationSaveBtn.states =
		active:
			visible: false
		anotation:
			visible: true

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
					"/#{caseID}/#{uuid}/captured",
					{type: 'img', data: img, location: "300 S Craig St.", created_at: new Date()})
				# render to preview box
				cameraPreview.image = img
				rotateFix(cameraPreview, 90)

	# check preview
	cameraPreview.on Events.Click, ->
		if cameraPreview.image != undefined
			cameraBg.image = cameraPreview.image
			rotateFix(cameraBg, 90)
			# hide camera preview box and camera button
			cameraPreview.animate("inactive")
			cameraBtn.animate("inactive")
			# show annotation buttons
			cameraAnnotationSaveBtn.animate("anotation")
			cameraShapeBtn.animate("anotation")
			cameraTextBtn.animate("anotation")

	resetCamera = ->
		# hide all annotation buttons
		cameraPreview.animate("inactive")
		cameraPreview.image = null
		cameraBg.image = null
		rotateFix(cameraPreview, 0)
		rotateFix(cameraPreview, 0)

	cameraAnnotationSaveBtn.onTap ->
		# TODO transfer the annotated image to DB

		# back to the original state
		tabConf("default", "default", "active", "default", "default", "default")
		setStateTab(camera, "active")
		resetCamera()

	# TODO annotate image
	# cameraShapeBtn.onTap ->



	###
	People view
	###
	scanIDbtn = peopleView.childrenWithName("scan_btn")[0]
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
	appendToScroll([scanIDbtn, personImg, personSaveBtn], peopleScroll)


	# input
	inputform = {
		label: ["Name", "Address", "Phone", "Race", "Mark", "Notes"],
		name: ["name", "address", "phone", "race", "mark", "notes"],
		content: ["Michael M", "2345 Park Street, PA 15224", "412-000-01234", "White", "Birthmark below neck", "Check warrant"]}
	sampleIDImg = "images/id_sample.png"

	inputsArray = []
	formEleArray = []
	formData = {name: "", address: "", phone: "", race: "", mark: "", notes: ""}

	# append form to the scroll content
	appendForm = (popData) ->
		h = 40
		w = 335
		xPos = 20
		yPos = scanIDbtn.y + 50
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
				parent: peopleScroll.content
				name: itemName
				height: if itemName == 'notes' then 80 else h
				width: w
				x: xPos
				y: h*i + yOffSet
				backgroundColor: "#fff"

			label = new TextLayer
				parent: row
				padding: 10
				height: row.height
				width: row.width * labelWidthRatio
				text: itemLabel
				fontSize: fSize
				fontWeight: 500
				color: "#4A4A4A"

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

			formEleArray.push(row)
			inputsArray.push(input)

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
	scanIDbtn.html = """
	    <input type="file" id="scanBtn" accept="image/*"/ style="display: none">
	"""
	scanInput = document.getElementById("scanBtn")
	scanIDbtn.on Events.Click, ->
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
				"/#{caseID}/#{uuid}/captured",
				{type: 'people',
				data: {
					img: sampleIDImg,
					name: formData.name,
					address: formData.address,
					phone: formData.phone,
					race: formData.race,
					mark: formData.mark,
					notes: formData.notes,
					},
				location: "300 S Craig St.",
				created_at: new Date()})
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

	renderRes = (dataSet) ->
		# clear the page
		summaryScroll.content.children.forEach((layer) -> layer.destroy())

		# print "data from firebase: ", dataSet
		if dataSet?
			meta = _.toArray(dataSet.meta)[0]
			dataArray = _.toArray(dataSet.captured)
			# print "meta ", meta
			# print "dataArray ", dataArray

			# render the view
			xPos = 17
			yPos = navbar.height
			loc = new TextLayer
				parent: summaryScroll.content
				text: "#{if meta.location then meta.location else 'Location'}"
				fontSize: 15
				color: '#4A4A4A'
				x: xPos
				y: yPos + 16
			time = new TextLayer
				parent: summaryScroll.content
				text: "#{if meta.time then meta.time else 'Time'}"
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




	###
	Receive captured evidence from firebase
	###
	retrieveDB = ->
		firebase.get "/#{caseID}/#{uuid}", (res) ->
			renderRes(res)



	###
	Tab Group
	###
	notes = [notesTab, notesTitle, notesView]
	voice = [voiceTab, voiceTitle, voiceView]
	camera = [cameraTab, cameraTitle, cameraView, cameraBtn, cameraShapeBtn, cameraTextBtn, cameraAnnotationSaveBtn]
	people = [peopleTab, peopleTitle, peopleView, personDoneBtn, peopleScroll]
	maps = [mapsTab, mapsTitle]
	summary = [summaryView, summaryScroll]



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

	# Testing
	# peopleTab.animate("active", {instant: true})
	# peopleTitle.animate("active", {instant: true})
	# peopleView.animate("active", {instant: true})
	# peopleScroll.animate("active", {instant: true})


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