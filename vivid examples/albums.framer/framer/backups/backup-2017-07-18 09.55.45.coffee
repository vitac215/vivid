# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: "Albums Animation"
	author: "Benjamin den Boer"
	twitter: "benjaminnathan"
	description: "A simple staggered fade-in effect, made with Auto-Code Animation."


# Import file "albums"
sketch = Framer.Importer.load("imported/albums@1x")

# Set-up
for album, i in sketch.albums.children
	album.opacity = 0
	album.scale = 0.5

	album.animate
		opacity: 1.00
		scale: 1.00
		options:
			delay: 0.125 * i
			curve: "spring(300, 25, 0)"
	do (album, i) ->
		Utils.delay 2, ->
			album.animate
				opacity: 0
				scale: 0
				options:
					delay: 0.125 * i
					curve: "spring(300, 25, 0)"