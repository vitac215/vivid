navbar = menu_nav.parent.childrenWithName("navbar")[0]

# Titles
notesTitle = navbar.childrenWithName("title")[0].childrenWithName("title_notes")[0]
voiceTitle = navbar.childrenWithName("title")[0].childrenWithName("title_voice")[0]
cameraTitle = navbar.childrenWithName("title")[0].childrenWithName("title_camera")[0]
peopleTitle = navbar.childrenWithName("title")[0].childrenWithName("title_people")[0]
mapsTitle = navbar.childrenWithName("title")[0].childrenWithName("title_maps")[0]

for title in navbar.childrenWithName("title")[0].children
	title.states.add
		active:
			visible: true


# Tabs
notesTab = menu_nav.childrenWithName("notes")[0]
voiceTab = menu_nav.childrenWithName("voice")[0]
cameraTab = menu_nav.childrenWithName("camera")[0]
peopleTab = menu_nav.childrenWithName("people")[0]
mapsTab = menu_nav.childrenWithName("maps")[0]

for tab in menu_nav.children
	tab.states.add
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
	view.states.add
		active:
			visible: true


# Defatult
notesTab.states.switchInstant("active")
notesTitle.states.switchInstant("active")
notesView.states.switchInstant("active")


# Tab Group
notes = [notesTab, notesTitle, notesView]
voice = [voiceTab, voiceTitle, voiceView]
camera = [cameraTab, cameraTitle, cameraView]
people = [peopleTab, peopleTitle, peopleView]
maps = [mapsTab, mapsTitle]
summary = [summaryView]


# Set state for tabs
setStateTab = (tabGroup, state) ->
	for item in tabGroup
		item.states.switch(state)


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
	
