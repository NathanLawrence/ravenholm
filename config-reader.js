var fs = require('graceful-fs');
var _ = require('lodash');

module.exports.readConfig = function(rootDir, functionName, paramCheck){
	var fnConfigFile = `${rootDir}/${functionName}/raven.json`;
	var globalConfigFile = `${rootDir}/raven-global.json`;
	var fnConfig;

	try{
		fnConfigData = fs.readFileSync(fnConfigFile, 'utf8');
		fnConfig = JSON.parse(fnConfigData);
	}
	catch(err){
		return err;
	}

	if (fnConfig.hasOwnProperty(paramCheck)){
		return fnConfig[paramCheck];
	}
	else {
		return module.exports.readGlobalConfig(rootDir, paramCheck);
	}
};

module.exports.readGlobalConfig = function(rootDir, paramCheck){
	var globalConfigFile = `${rootDir}/raven-global.json`;
	var globalConfig;
	try{
		globalConfigData = fs.readFileSync(globalConfigFile, 'utf8');
		globalConfig = JSON.parse(globalConfigData);
	}
	catch(err){
		return null;
	}

	if(globalConfig.hasOwnProperty(paramCheck)){
		return globalConfig[paramCheck];
	}
	else {
		return null;
	}
};

module.exports.npmConfigReader = function(rootDir, paramCheck){
	var npmConfigFile = `${rootDir}/package.json`;
	var npmConfig;
	
	try{
		npmConfigData = fs.readFileSync(npmConfigFile, 'utf8');
		npmConfig = JSON.parse(npmConfigData);
	}
	catch(err){
		return null;
	}

	if (npmConfig.hasOwnProperty(paramCheck)){
		return npmConfig[paramCheck];
	}
	return null;
};