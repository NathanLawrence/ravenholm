var _ = require('lodash');
var commandLineArgs = require('command-line-args');
var fs = require('graceful-fs');

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


var actualFunctionRun = function(functionPath, consoleLogger){

};

module.exports.runFunction = function (dirName, argv){
	var logPath;
	var functionNames =[];
	var argumentSet = commandLineArgs(optionDefinitions, argv);


	if (argumentSet.function){
		functionNames = argumentSet.function.split(',');
	}
	else if (!argv[0].includes('-')){
		functionNames = argv[0].split(',');
	}


	if (argumentSet.event){
		fs.stat(dirName.concat('/').concat(argumentSet.event), function(err, stats){
			if(!err){

			}
			else return "ERROR - File not found or access not available.";
		});
	}

	if (argumentSet.log){
		newLog = function(){
			fs.appendFile(dirName.concat('/').concat(argumentSet.log), 'data to append', function (err){
					return "ERROR - File not found or access not available."; 
			}
		};
		return;
	}
	return "Bad outcome.";

};
