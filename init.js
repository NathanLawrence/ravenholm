var fs = require('graceful-fs');
var _ = require('lodash');
var configReader = require('./config-reader');
var readline = require('readline-sync');

var defaultGlobalConfig = {
	'name': 'RavenholmProject',
	'description': 'A new Ravenholm project',
	'author': null,
	'handler-name': 'handler',
	'default-event': {'foobar':'Hello, World!'},
	'build-ignore': ['test', 'raven.json'],
	'aws-profile-name': 'default'
};

var functionNameValidator = function(value){
	if (/\s/g.test(value)){
		throw new Error('Function cannot contain whitespace.');
	}

	return value.replace(/\([^\)]*\)/g, '');
};

function promptForConfigurationItem(description, configObject, itemName){
	var item = '';

	if (typeof configObject[itemName] !== 'undefined'){
		item = configObject[itemName];
		input = readline.question(`${description} (${item}): `);
		if (input !== ''){
			configObject[itemName] = input;
		}
	}
	else {
		input = readline.question(`${description}: `);
		configObject[itemName] = input;
	}
}

module.exports.generateGlobalConfig = function(rootDir){
	var globalConfig = defaultGlobalConfig;


	// Bring over the info it can from package.json so people don't have to enter crap twice.
	globalConfig.name = configReader.npmConfigReader(rootDir, 'name');
	globalConfig.description = configReader.npmConfigReader(rootDir, 'description');
	globalConfig.repository = configReader.npmConfigReader(rootDir, 'repository');
	globalConfig.author = configReader.npmConfigReader(rootDir, 'author');
	globalConfig.bugs = configReader.npmConfigReader(rootDir, 'bugs');
	globalConfig.license = configReader.npmConfigReader(rootDir, 'license');
	globalConfig.homepage = configReader.npmConfigReader(rootDir, 'homepage');

	// Prompt for Individual Configurations
	promptForConfigurationItem('Name', globalConfig, 'name');
	promptForConfigurationItem('Default Handler Function', globalConfig, 'handler-name');
	promptForConfigurationItem('AWS Profile Name', globalConfig, 'aws-profile-name');


	// Write out the file. Yes, this is blocking. No, I'm not concerned.
	// Any future operations will depend on this file being written out, so if it isn't blocking, it should be.
	fs.writeFileSync(`${rootDir}/raven-project.json`, JSON.stringify(globalConfig, null, 2));
};