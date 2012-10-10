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
	if(this.results.length === 0) return;

	for(var i in this.results)
		this.resultsElement.removeChild(this.results[i].html);

	this.results = [];
}


SearchBar.prototype.add_result = function(result) {
	console.log(result);
	if(this.results[result.id]) return;
	var resultElement = document.createElement('div');
	resultElement.class = 'search-bar-result'
	resultElement.id = 'result-'+result.id;
	resultElement.innerText = result.name;
	this.resultsElement.appendChild(resultElement);
	this.results[result.id] = result;
	this.results[result.id].html = resultElement;

	console.log(this.results);
}
SearchBar.prototype.search = function() {
	var query = this.element.innerText.trim();

	if(!query || query.length === 0 || query === this.initialText) return this.clean_results();

	if(this.lastQuery === query) return;
	this.clean_results();

	this.lastQuery = query;

	if(this.data[query]) this.add_result(this.data[query]);

	for(var i in this.data) {
		if(this.data[i].name.indexOf(query) === 0) this.add_result(this.data[i]);
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