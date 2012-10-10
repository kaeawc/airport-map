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
	this.results = [];
	this.select_delegate = options.select_delegate;
	this.resultsElement = document.getElementById(options.resultsElement);
	this.element.innerText = this.initialText;
	this.data = {};
	var that = this;
	this.element.onfocus = function() { that.focus(); };
	this.element.onblur = function() { that.blur(); };
	this.element.onkeyup = function() { that.search(); };
}

SearchBar.prototype.focus = function() {
	if(this.element.innerText == this.initialText) this.element.innerText = "";
}
SearchBar.prototype.blur = function() {
	if(this.element.innerText.trim() == '') this.element.innerText = this.initialText;
}

/**
 *
 */
SearchBar.prototype.get_data = function() {

}
/**
 *
 */
SearchBar.prototype.set_data = function(data) {
	this.data = data;
}
/**
 * Fires when user is typing and is focused on the search bar.
 */

SearchBar.prototype.clean_results = function() {
	if (!this.resultsElement.hasChildNodes()) return;

	while (this.resultsElement.childNodes.length >= 1)
		this.resultsElement.removeChild(this.resultsElement.firstChild);

	this.results = [];
}

SearchBar.prototype.add_result = function(result) {
	if(this.results[result.iata]) return;
	var element = document.createElement('div');
	element.class = 'search-bar-result'
	element.id = 'result-'+result.id;
	element.innerText = result.name;
	element.onclick = this.select_delegate;
	this.resultsElement.appendChild(element);
	this.results[result.iata] = result;
	this.results[result.iata].html = element;
}

/**
 * Fires when user types into the search bar
 * @return {*}
 */
SearchBar.prototype.search = function() {
	var query = this.element.innerText.trim().toLowerCase();
	if(!query || query.length === 0 || query === this.initialText) return this.clean_results();
	if(this.lastQuery === query) return;
	this.clean_results();
	this.lastQuery = query;

	for(var i in this.data) {
		var addThis = false;
		if(this.data[i].name.toLowerCase().indexOf(query) === 0) addThis = true;
		if(this.data[i].iata.toLowerCase().indexOf(query) === 0) addThis = true;
		if(this.data[i].icao.toLowerCase().indexOf(query) === 0) addThis = true;
		if(addThis) this.add_result(this.data[i]);
	}
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