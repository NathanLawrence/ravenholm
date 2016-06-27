var _ = require('lodash');
var commandLineArgs = require('command-line-args');
var fs = require('graceful-fs');
var configReader = require('config-reader');

// Command Line Option Definitions
var optionDefinitions = [
	{
		name:'function',
		alias: 'f',
		type: String
	},
	{
		name:'log',
		alias: 'l',
		type: String
	},
	{
		name:'event',
		alias: 'e',
		type: String
	}
	];

var defaultEvent = {};

module.exports.runFunctionOnly = function(functionPath, lambdaInvoke, event){

	var lbdModule = require(functionPath);
	return lbdModule[lambdaInvoke](event, null);

}

module.exports.runFunction = function (dirName, argv){
	var functionName;
	var argumentSet = commandLineArgs(optionDefinitions, argv);
	var event = defaultEvent;

	// Get the function name.
	if (argumentSet.function){
		functionName = argumentSet.function;
	}
	else if (!argv[0].includes('-')){
		functionName = argv[0];
	}


	if (argumentSet.event){
		fs.stat(dirName.concat('/').concat(argumentSet.event), function(err, stats){
			if(!err){
				event = require(dirName.concat('/').concat(argumentSet.event));
			}
			else return "ERROR - File not found or access not available.";
		});
	}

	functionPath = dirName.concat('/').concat(functionName);

	return functionPath;

};
