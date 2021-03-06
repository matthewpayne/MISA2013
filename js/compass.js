﻿
// next two lines for JS-Lint
//"use strict";
var $, navigator, alert, document;

// create our namespace
var RocknCoder = RocknCoder || {};

// event handlers for the compass stuff,
// one for updating the header text
// the other for rotating the compass
RocknCoder.Compass = (function () {
	var lastHeading = -1,
		// cache the jQuery selectors
		$headText = $("#header"),
		$compass = $("#compass"),
		// displays the degree
		updateHeadingText = function (event, heading) {
			event.preventDefault();
			$headText.html(heading + "&deg;");
			return false;
		},
		// adjusts the rotation of the compass
		updateCompass = function (event, heading) {
			event.preventDefault();
			// to make the compass dial point the right way
			var rotation = 360 - heading,
				rotateDeg = 'rotate(' + rotation + 'deg)';
			// TODO: fix - this code only works on webkit browsers, not wp7
			$compass.css('-webkit-transform', rotateDeg);
			return false;
		};
	// bind both of the event handlers to the "newHeading" event
	$("body").bind("newHeading", updateCompass).bind("newHeading", updateHeadingText);
}());

// hook the compass watch
// normally I would un-hook an event, but this is a quick tutorial
document.addEventListener('deviceready', function () {
	RocknCoder.Compass.watchId = navigator.compass.watchHeading(function (heading) {
		// only magnetic heading works universally on iOS and Android
		// round off the heading then trigger newHeading event for any listeners
		var newHeading = Math.round(heading.magneticHeading);
		$("body").trigger("newHeading", [newHeading]);
	}, function (error) {
		// if we get an error, show its code
		alert("Compass error: " + error.code);
	}, {frequency : 100});
});


// Create a callback to handle each sensor
//function compassCallback(sensor, data) {
 //   $("body").trigger("newHeading", Math.round(data.value));
	
//}

// Start listening to the compass sensor with a delay feedback of 1000 microseconds 
//blackberry.sensors.setOptions("devicecompass", { delay: 1000 });
   
// Start the event listener for the sensors callback
//blackberry.event.addEventListener("devicecompass", compassCallback);
   
// Set the sensor to work in the background and use batching mode
//blackberry.sensors.setOptions("devicecompass", { background: true, batching: true });


