var fs = require('graceful-fs');
var _ = require('lodash');
var configReader = require('./config-reader');
var readline = require('readline');

var defaultGlobalConfig = {
	'handler-name': 'handler',
	'default-event': {'foobar':'Hello, World!'},
	'build-ignore': ['test', 'raven.json']
};

module.exports.generateGlobalConfig = function(rootDir){
	var globalConfig = defaultGlobalConfig;
	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	// Bring over the info it can from package.json so people don't have to enter crap twice.
	globalConfig.name = configReader.npmConfigReader(rootDir, 'name');
	globalConfig.description = configReader.npmConfigReader(rootDir, 'description');
	globalConfig.repository = configReader.npmConfigReader(rootDir, 'repository');
	globalConfig.author = configReader.npmConfigReader(rootDir, 'author');
	globalConfig.bugs = configReader.npmConfigReader(rootDir, 'bugs');
	globalConfig.license = configReader.npmConfigReader(rootDir, 'license');
	globalConfig.homepage = configReader.npmConfigReader(rootDir, 'homepage');



	// Write out the file. Yes, this is blocking. No, I'm not concerned.
	// Any future operations will depend on this file being written out, so if it isn't blocking, it should be.
	fs.writeFileSync(`${rootDir}/raven-project.json`, JSON.stringify(globalConfig, null, 2));
};