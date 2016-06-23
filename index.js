var _ = require('lodash');
var getUsage = require('command-line-usage');


// Basic Module Constants
// Since the Curent Version of Node for Lambda is 4.3, and users might
// be using that for their runtime locally, we'll avoid using const for now.
var goodCheck = '\u2714';
var badX = '\u2718';
var neutralQ = '\u2731';

// Command documentation
var documentation = require('./documentation');


// The actual first thing that executes. 
// Checks if this was called by itself or not.

if (require.main === module){
	main();
}

// Basic parsing logic and calling of other components lives here.

function main(){
	var args = process.argv.slice(2);
	
	if (args.length < 1){
		console.log(getUsage(documentation.intro));
	}

	if (_.includes(args,'help')){
		console.log(getUsage(documentation.intro.concat(documentation.extended)));
	}
}

