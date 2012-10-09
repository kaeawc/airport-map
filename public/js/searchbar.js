/**
 * Initializes a SearchBar that depends on an element id
 * @param elementId
 * @param initialText
 * @constructor
 */
function SearchBar(elementId,options) {
	this.element = document.getElementById(elementId);
	this.initialText = options.initialText;
	this.url = options.url;
	this.query = '';

}

SearchBar.prototype.init = function() {
	var that = this;
	this.element.onfocus = function() { that.focus(); };
	this.element.onblur = function() { that.blur(); };
	this.element.onkeyup = function() { that.search(); };

}
SearchBar.prototype.focus = function() {
	if(this.element.innerText == this.initialText) this.element.innerText = "";
}
SearchBar.prototype.blur = function() {
	if(this.element.innerText == "") this.element.innerText = this.initialText;
}

/**
 *
 */
SearchBar.prototype.get_data = function() {

}
/**
 * Fires when user is typing and is focused on the search bar.
 */
SearchBar.prototype.search = function() {
	var mapData = this.data;
	var callback = function(data) { mapData = data; }
	var request = new Ajax(callback,{json:true});
	request.get_data('GET','/js/airports.json',null);


}
/**
 * Populates the dropdown with a list of results
 */
SearchBar.prototype.populate = function() {

}
/**
 * Fires when a result is selected.
 */
SearchBar.prototype.select = function() {

}