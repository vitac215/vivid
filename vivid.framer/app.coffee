# Tabs
for tab in menu_nav.children
	tab.states.add
		active:
			opacity: 1
	
# 	name = tab.name
	
# 	tab.label = tab.childrenWithName("#{name}_label")[0]
# 	tab.label.states.add
# 		active:
# 			opacity: 1
# 	
# 	tab.icon = tab.childrenWithName("#{name}_icon")[0]
# 	tab.icon.states.add
# 		active:
# 			opacity: 1
			
notes = menu_nav.childrenWithName("notes")[0]
voice = menu_nav.childrenWithName("voice")[0]
camera = menu_nav.childrenWithName("camera")[0]
people = menu_nav.childrenWithName("people")[0]
maps = menu_nav.childrenWithName("maps")[0]

