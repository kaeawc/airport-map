/**
 *
 * @param callback
 * @constructor
 */
function Ajax(callback) {
	this.xhr;

	if (window.XMLHttpRequest) this.xhr=new XMLHttpRequest();
	else this.xhr=new ActiveXObject("Microsoft.XMLHTTP");
	this.xhr.onreadystatechange = function() {
		if(this.readyState != 4) return;
		if(this.status != 200) return;
		callback(this.responseText);
	}
}

/**
 *
 * @param method
 * @param url
 * @param data
 */
Ajax.prototype.get_data = function(method, url, data) {
	this.xhr.open(method,url,true);
	this.xhr.send(data);
}