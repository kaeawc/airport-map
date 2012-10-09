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
	this.searchBar;
	this.data;
	this.markers = [];
	this.geolocate();
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
Map.prototype.add_marker = function(latitude,longitude,info) {
	if(this.markers.indexOf(info.id)) return this.show_marker(this.markers[info.id]);

	var marker;

	// make marker a Google Map Marker

	marker.display = '';
	this.markers[info.id] = marker;
	return this.show_marker(info.id);
}

/**
 *
 */
Map.prototype.get_data = function() {
	var mapData = this.data;
	var callback = function(data) { mapData = data; }
	var request = new Ajax(callback,{json:true});
	request.get_data('GET','/js/airports.json',null);
}

/**
 *
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
 *
 * @param id
 */
Map.prototype.show_marker = function(id) {
	this.marker[id].setMap(this.canvas);
	this.marker[id].removed = false;
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
Map.prototype.click_marker = function(marker) {

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
		zoom: 16,
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

	searchBar = new SearchBar('map-search-bar','Find an airport');

	var unfocus_search_bar = function() {
		var element = document.getElementById('map-search-bar');

		if(element == document.activeElement)
			element.blur();
	}
	//google.maps.event.addListener(newMarker, 'click', get_info);
	google.maps.event.addListener(this.canvas, 'click', unfocus_search_bar);
	google.maps.event.addListener(this.canvas, 'center_changed', unfocus_search_bar);
	searchBar.init();
}

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