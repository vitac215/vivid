# firebase
{Firebase} = require 'firebase'
firebase = new Firebase
	projectID: "vivid-6124d"
	secret: "gj2baisq18Z679XxNlxBosxtR4KBR5NLwwpQIVoA"

# User setting
generateUUID = ->
	s4 = ->
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();

username = "vita"
uuid = generateUUID()
caseID = "case1"


# Save session
firebase.post(
	"/#{caseID}/#{uuid}/meta", 
	{username: username, location: "300 S Craig St. - Zone 1", time: new Date()})

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


# Summary
summaryBtn = navbar.childrenWithName("summary_icon")[0]


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




# Camera View
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
		visible: true
	inactive:
		visible: false
cameraTextBtn.states = 
	active:
		visible: true
	inactive:
		visible: false
cameraAnnotationSaveBtn.states = 
	active:
		visible: true
	inactive:
		visible: false
	
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

# # check preview
# cameraPreview.on Events.Click, ->
# 	if cameraPreview.image != undefined
# 		cameraBg.image = cameraPreview.image
# 		# hide camera preview box and camera button
# 		cameraPreview.animate("inactive")
# 		cameraBtn.animate("inactive")
# 		# show annotation buttons
# 		cameraAnnotationSaveBtn.animate("active")
# 		cameraShapeBtn.animate("active")
# 		cameraTextBtn.animate("active")




# Summary view
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
# 	print "data from firebase: ", dataSet
	if dataSet?
		meta = _.toArray(dataSet.meta)[0]
		dataArray = _.toArray(dataSet.captured)
		print "meta ", meta
		print "dataArray ", dataArray
		
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
						print "data ", data.data
						xOffSet = (if i == 0 then xPos else xPos + boxMargin*i)
						yOffSet = (if j == 0 then yPos else yPos + boxMargin*j)
						dataBox = new Layer
							parent: summaryScroll.content
							image: data.data
							width: size
							height: size
							x: size*i + xOffSet
							y: size*j + yOffSet



# receive captured evidence from firebase
retrieveDB = ->
	firebase.get "/#{caseID}/#{uuid}", (res) ->
		renderRes(res)
# firebase.onChange("/#{caseID}/#{uuid}/captured", response)






# Defatult
# notesTab.animate("active", {instant: true})
# notesTitle.animate("active", {instant: true})
# notesView.animate("active", {instant: true})

notesTab.animate("active", {instant: true})
summaryView.animate("active", {instant: true})


# Tab Group
notes = [notesTab, notesTitle, notesView]
voice = [voiceTab, voiceTitle, voiceView]
camera = [cameraTab, cameraTitle, cameraView]
people = [peopleTab, peopleTitle, peopleView]
maps = [mapsTab, mapsTitle]
summary = [summaryView, summaryScroll]


# Set state for tabs
setStateTab = (tabGroup, state) ->
	for item in tabGroup
		item.animate(state)



# Tab config
tabConf = (notesConf, voiceConf, cameraConf, peopleConf, mapsConf, summaryConf) ->
	setStateTab(notes, notesConf)
	setStateTab(voice, voiceConf)
	setStateTab(camera, cameraConf)
	setStateTab(people, peopleConf)
	setStateTab(maps, mapsConf)
	setStateTab(summary, summaryConf)



# Tab events
notesTab.onTap ->
	tabConf("active", "default", "default", "default", "default", "default")
voiceTab.onTap ->
	tabConf("default", "active", "default", "default", "default", "default")
cameraTab.onTap ->
	tabConf("default", "default", "active", "default", "default", "default")	
peopleTab.onTap ->
	tabConf("default", "default", "default", "active", "default", "default")	
mapsTab.onTap ->
	tabConf("default", "default", "default", "default", "active", "default")
summaryBtn.onTap ->
	tabConf("default", "default", "default", "default", "default", "active")
	retrieveDB()
	
