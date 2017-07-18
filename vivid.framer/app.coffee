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
		time: 0.1

notesTab.states.switchInstant("active")

# Tab config
tabConf = (notesConf, voiceConf, cameraConf, peopleConf, mapsConf) ->
	notesTab.states.switch(notesConf)
	voiceTab.states.switch(voiceConf)
	cameraTab.states.switch(cameraConf)
	peopleTab.states.switch(peopleConf)
	mapsTab.states.switch(mapsConf)


# Tab events
notesTab.onTap ->
	tabConf("active", "default", "default", "default", "default")
voiceTab.onTap ->
	tabConf("default", "active", "default", "default", "default")
cameraTab.onTap ->
	tabConf("default", "default", "active", "default", "default")	
peopleTab.onTap ->
	tabConf("default", "default", "default", "active", "default")	
mapsTab.onTap ->
	tabConf("default", "default", "default", "default", "active")	