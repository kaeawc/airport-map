function Map() {
	this.element = document.getElementById('map');
	this.canvas;
	this.markers = [];
}

//Creates a new market on the map
Map.prototype.add_marker = function(latitude,longitude,info) {
	if(this.markers.indexOf(info.id)) return this.show_marker(this.markers[info.id]);

	var marker;

	// make marker a Google Map Marker

	marker.display = '';
	this.markers[info.id] = marker;
	return this.show_marker(info.id);
}

Map.prototype.get_data = function() {

}

Map.prototype.show_marker = function(id) {
	this.marker[id].setMap(this.canvas);
	this.marker[id].removed = false;
}
//Moves a marker on the map
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
//Removes a marker from the map
Map.prototype.remove_marker = function(id) {
	this.markers[id].setMap(null);
	this.markers[id].removed = true;
}
//Fires when a marker is clicked on
Map.prototype.click_marker = function(marker) {

}
//Fires when map zooms out
Map.prototype.zoom_out = function() {
	//determine new geographic filter

	//determine how many results to display

	//add/remove markers as necessary
}
//Fires when map zooms in
Map.prototype.zoom_in = function() {
	//determine new geographic filter
}
//Actually renders the map
Map.prototype.render = function() {

}