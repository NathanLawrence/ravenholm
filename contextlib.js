// AWS Context Spoofer
var fs = require('graceful-fs');

module.exports.consoleLogContext = function(){
	this.succeed = function(obj){
		console.log(obj);
	}
}