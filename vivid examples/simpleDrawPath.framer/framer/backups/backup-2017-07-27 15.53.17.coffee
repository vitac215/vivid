# Paper.js

Framer.Device.deviceType = "iphone-5s-silver-hand"

layerPath = new Layer width:640, height:1136, image:"images/map.png"
layerPath.center()

layerPath.html = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 640 1136" enable-background="new 0 0 640 1136" xml:space="preserve">
<path id="svgPath" fill="none" stroke="#ED1E79" stroke-width="18" stroke-miterlimit="10" d="M215.4,149c26,10.2,85.6,38.1,120.6,101.9c39.1,71.2,24.1,144.2,15.9,184.1c-4.1,20-8.3,31.6-65.1,155.6c-53.2,116.2-59.7,128.2-65.1,155.6c-7.4,37.4-11.1,95.3,14.3,172.7" stroke-dasharray="988.00 988.00" stroke-dashoffset="988.00"/>
</svg>'

pathLength = 0

Utils.delay 2, ->
	svgPath = document.getElementById('svgPath')
	pathLength = svgPath.getTotalLength()
	svgPath.style.strokeDasharray = pathLength + ' ' + pathLength;
	svgPath.style.strokeDashoffset = pathLength
	svgPath.getBoundingClientRect()
	svgPath.style.transition = svgPath.style.WebkitTransition = 'stroke-dashoffset 2s ease-in-out'
	svgPath.style.strokeDashoffset = '0'