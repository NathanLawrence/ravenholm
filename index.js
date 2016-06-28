var _ = require('lodash');
var getUsage = require('command-line-usage');
var commandLineCommands = require('command-line-commands');
var run = require('./run');
var initMethods = require('./init');

// Command documentation
var documentation = require('./documentation');

// Basic Module Constants
// Since the Curent Version of Node for Lambda is 4.3, and users might
// be using that for their runtime locally, we'll avoid using const for now.
var goodCheck = '\u2714';
var badX = '\u2718';
var neutralQ = '\u2731';

// Command and argument setup.
var validCommands = [null, 'install', 'run', 'test', 'build', 'ship', 'deploy', 'help', 'init', 'new'];

// The actual first thing that executes. 
// Checks if this was called by itself or not.

if (require.main === module){
	main();
}

// Basic parsing logic and calling of other components lives here.

function main(){

	var commandLineResponse = commandLineCommands(validCommands);

	switch (commandLineResponse.command){
		case 'help':
			console.log(getUsage(documentation.intro.concat(documentation.extended)));
			break;
		case 'run':
			console.log(run.runFunction(process.cwd(), commandLineResponse.argv));
			break;
		case 'init':
			initMethods.generateGlobalConfig(process.cwd());
			break;
		default:
			console.log(getUsage(documentation.intro));
	}

}

