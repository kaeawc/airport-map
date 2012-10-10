/**
 *
 * @class
 */
function Map() {
	this.element = document.getElementById('map');
	this.canvas;
	this.latitude;
	this.longitude;
	this.location;

	this.searchStart;
	this.searchEnd;
	this.data;

	this.markers = [];
	this.geolocate();
	this.icons = {
		airport:new google.maps.MarkerImage('/img/icons/airport_terminal_sm.png')
	}
}
/**
 *
 * @param url
 */
Map.prototype.init = function(url) {
	var that = this;
	var callback = function(data) { that.data = JSON.parse(data);

		if(!that.data) return;

		for(var i in that.data) {
			var latitude = that.data[i].lat;
			var longitude = that.data[i].lon;
			var info = {
				name:that.data[i].name,
				id:i,
				icao:that.data[i].icao,
				url:that.data[i].url,
				iata:that.data[i].iata
			}

			that.add_marker(latitude,longitude,info,that.icons.airport);
			that.show_marker(info.id);
		}

		that.searchStart.set_data(that.data);
		that.searchEnd.set_data(that.data);
	}
	var request = new Ajax(callback);
	request.get_data('GET',url,null);
}

/**
 *
 */
Map.prototype.geolocate = function() {
	this.location = new google.maps.LatLng(40.712673,-74.006202);
}
/**
 * Creates a new market on the map
 * @param latitude
 * @param longitude
 * @param info
 */
Map.prototype.add_marker = function(latitude,longitude,info,icon) {

	var location = new google.maps.LatLng(latitude,longitude);

	var marker = new google.maps.Marker({
		position: location,
		map: this.canvas,
		icon: icon,
		title: info.name,
		id: info.id
	});

	marker.setZIndex(1);
	marker.removed = false;

	google.maps.event.addListener(marker, 'click', this.click_marker);
	google.maps.event.addListener(marker, 'mouseover', this.hover_marker);
	google.maps.event.addListener(marker, 'mouseout', this.leave_marker);

	if(!this.markers.indexOf(marker))
		this.markers.push(marker);

	return this.markers.indexOf(marker);
}
/**
 *
 */
Map.prototype.hover_marker = function() {

}
/**
 *
 * @param waypoints
 * @param options
 */
Map.prototype.draw_path = function(waypoints,options) {
	if(!waypoints) throw {
		name:'NullArgumentException',
		message:'"waypoints" cannot be null when drawing a path'
	}

	for(var i in waypoints) {
		if(typeof waypoints[i] !== 'LatLng') throw {
			name:'InvalidArgumentException',
			message:'"waypoints" can only contain LatLng objects'
		}
	}

	if(!options) options = {};
	if(!options.color) options.color = '#FF0000';
	if(!options.opacity) options.opacity = 1.0;
	if(!options.weight) options.weight = 2;

	var path = new google.maps.Polyline({
		path: waypoints,
		strokeColor: options.color,
		strokeOpacity: options.opacity,
		strokeWeight: options.weight
	});

	path.setMap(this.canvas);
}
/**
 *
 */
Map.prototype.leave_marker = function() {

}
/**
 * Custom styling for Google Maps
 * @type {Object}
 */
Map.prototype.style = [
	{
		"featureType": "landscape.man_made",
		"stylers": [
			{ "visibility": "off" }
		]
	},{
		"featureType": "water",
		"elementType": "geometry.fill",
		"stylers": [
			{ "visibility": "on" },
			{ "saturation": 1 },
			{ "lightness": -63 },
			{ "hue": "#0055ff" }
		]
	},{
		"featureType": "landscape.natural",
		"stylers": [
			{ "saturation": -5 },
			{ "hue": "#33ff00" },
			{ "lightness": -70 }
		]
	},{
		"featureType": "administrative.country",
		"elementType": "geometry.stroke",
		"stylers": [
			{ "weight": 0.5 }
		]
	},{
		"featureType": "administrative",
		"elementType": "geometry.fill",
		"stylers": [
			{ "visibility": "off" }
		]
	},{
		"featureType": "road",
		"elementType": "geometry.fill",
		"stylers": [
			{ "color": "#333333" }
		]
	},{
		"featureType": "road",
		"elementType": "geometry.stroke",
		"stylers": [
			{ "color": "#666666" }
		]
	},{
		"featureType": "poi",
		"stylers": [
			{ "hue": "#00ff22" },
			{ "lightness": -71 },
			{ "gamma": 0.82 }
		]
	},{
		"featureType": "administrative",
		"stylers": [
			{ "visibility": "off" }
		]
	},{
		"elementType": "labels.text.stroke",
		"stylers": [
			{ "color": "#333333" }
		]
	},{
		"elementType": "labels.text.fill",
		"stylers": [
			{ "color": "#ffffff" }
		]
	},{
	}
];
/**
 * Allows a marker to be displayed
 * @param id
 */
Map.prototype.show_marker = function(id) {
	if(this.markers && this.markers.indexOf(id) && typeof this.markers[id] == "Marker") {
		this.markers[id].setMap(this.canvas);
		this.markers[id].removed = false;
		return;
	}
}
/**
 * Moves a marker on the map
 * @param marker
 * @param newLatitude
 * @param newLongitude
 */
Map.prototype.move_marker = function(marker,newLatitude,newLongitude) {
	while(marker.latitude != newLatitude && marker.longitude != newLongitude) {
		if(marker.latitude > newLatitude) {
			marker.latitude = marker.latitude - 1;
		}
		else if(marker.latitude < newLatitude) {
			marker.latitude = marker.latitude + 1;
		}

		if(marker.longitude > newLongitude) {
			marker.longitude = marker.longitude - 1;
		}
		else if(marker.longitude < newLongitude) {
			marker.longitude = marker.longitude + 1;
		}
	}
}
/**
 * Removes a marker from the map
 * @param id
 */
Map.prototype.remove_marker = function(id) {
	this.markers[id].setMap(null);
	this.markers[id].removed = true;
}
/**
 * Fires when a marker is clicked on
 * @param marker
 */
Map.prototype.click_marker = function() {
	this.map.infowindow.content =
		'<div class="info-window-title">' +this.title + '</div>'+
		'<div class="info-window-code">' +this.id + '</div>';
	this.map.infowindow.open(this.map,this);
}
/**
 * Fires when map zooms out
 */
Map.prototype.zoom_out = function() {
	//determine new geographic filter

	//determine how many results to display

	//add/remove markers as necessary
}
/**
 * Fires when map zooms in
 */
Map.prototype.zoom_in = function() {
	//determine new geographic filter
}
/**
 * Renders the map
 */
Map.prototype.render = function() {
	this.canvas = new google.maps.Map(this.element, {
		center: this.location,
		zoom: 3,
		mapTypeId: 'Map',
		panControl: false,
		zoomControl: false,
		streetViewControl: false,
		mapTypeControlOptions: {
			mapTypeIds: ['Map',google.maps.MapTypeId.SATELLITE]
		}
	});
	var customMapType = new google.maps.StyledMapType(this.style,
		{name: 'Map'});
	this.canvas.mapTypes.set('Map', customMapType);
	this.resize();

	this.searchStart = new SearchBar('airport-start',{
		initialText:'Where are you?',
		resultsElement:'start-results',
		url:'/js/airports.json'
	});
	this.searchEnd = new SearchBar('airport-end',{
		initialText:'Where do you want to go?',
		resultsElement:'end-results',
		url:'/js/airports.json'
	});

	var unfocus_search_bar = function() {
		var start = document.getElementById('airport-start');
		var end = document.getElementById('airport-end');

		if(start == document.activeElement)
			start.blur();
		if(end == document.activeElement)
			end.blur();
	}
	//google.maps.event.addListener(newMarker, 'click', get_info);
	google.maps.event.addListener(this.canvas, 'click', unfocus_search_bar);
	google.maps.event.addListener(this.canvas, 'center_changed', unfocus_search_bar);
	this.canvas.infowindow = new google.maps.InfoWindow();
}
/**
 * Fires when the window changes size, expands to fill allowed height
 */
Map.prototype.resize = function() {
	this.element.style.height = window.innerHeight + 'px';
}
/**
 * Re-centers the map
 * @param latitude
 * @param longitude
 */
Map.prototype.move_to = function(latitude,longitude) {
	this.latitude = latitude;
	this.longitude = longitude;
}