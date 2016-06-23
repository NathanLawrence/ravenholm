var ansi = require('ansi-escape-sequences');
var ravenholmArt = require('./assets/ravenholm-art');

module.exports.intro = [
	{
		content: ansi.format(ravenholmArt, 'red'),
		raw: true
	},
	{
		header: 'Ravenholm',
		content: 'Node-minded testing and deployment for AWS Lambda.'
	},
	{
		header: 'Synopsis',
		content:[
			'$ raven [bold]{help}',
			'$ raven [bold]{init}',
			'$ raven [bold]{new} [[bold]{-f}] [underline]{function}',
			'$ raven [bold]{install} [underline]{npm-package} [[bold]{--save}, [bold]{--save-dev}, [bold]{-f} [underline]{function}]',
			'$ raven [bold]{run} [[bold]{[-f]} [underline]{function}]',
			'$ raven [bold]{test} [[bold]{[-f]} [underline]{function}]',
			'$ raven [bold]{build} [bold]{[-f]} [underline]{function} [[bold]{-d} [underline]{destination}]',
			'$ raven [bold]{ship} [bold]{[-f]} [underline]{function} [[bold]{--profile} [underline]{aws-config-profile}]',
			'$ raven [bold]{deploy} [bold]{[-f]} [underline]{function} [[bold]{-d} [underline]{destination}] [[bold]{--profile} [underline]{aws-config-profile}]'
		]
	}];

module.exports.extended =[
	{
		header: 'How It Works',
		content: [
		'Ravenholm runs all your Lambda functions from a testing environment in the main project folder, using information from the [bold]{raven-project.json} file stored there as a starting point.',
		'Each individual folder also has a [bold]{raven.json} file where dependencies for individual functions are stored. When [bold]{raven install} is run, these are installed in individual project folders so they can be zipped without ever having to worry.'
		]
	},
	{
		header: 'Command List',
		content: [
			{ name: 'init', summary: 'Set up new Ravenholm project with raven-project.json and package.json files.'},
			{ name: 'new', summary: 'Create a new Lambda function directory with raven.json file.'},
			{ name: 'install', summary: '[bold]{npm install}, but with dependency manangement for individual functions. [bold]{install --save} will install in test environmnent and save for all functions by default. [bold]{install --save-dev} will save only in the test environment package.json.'},
			{ name: 'run', summary: 'Run a Lambda function in the testing environment and print the response.'},
			{ name: 'test', summary: 'Run any tests found in the raven-tests.json file.'},
			{ name: 'build', summary: 'Create a shippable zip file of a Lambda function.'},
			{ name: 'ship', summary: "Wrapper for the AWS CLI's Lambda shipping function."},
			{ name: 'deploy', summary: 'Build and ship.'},
			{ name: 'help', summary: 'Display this.'}
		]
	},
	{
		header: 'Options on More than One Command',
		optionList: [
			{
				name: 'function',
				description: 'The Lambda function to work on. -f or --function is usually optional (install being a major exception). Multiple functions can be separated by commas (but no spaces). In most cases, the keyword ALL (in all caps) can be replaced by a function name to run all functions.',
				type: String,
				alias: 'f'
			},
			{
				name: 'profile',
				description: 'The AWS profile to ship using. Defined in [bold]{~/.aws/credentials}, most easily by using the AWS CLI.',
				type: String
			},
			{
				name: 'log',
				description: 'The name of a log file to pipe all console.log() statements from the Lambda to.',
				typeLabel: '[underline]{file}',
				alias: 'l'
			},
			{
				name: 'destination',
				description: 'The destination for the AWS-ready zip file generated by build and deploy commands.',
				typeLabel: '[underline]{file}',
				alias: 'd'
			},
			{
				name: 'help',
				description: 'Display this help file.',
				type: Boolean,
				alias: 'h'
			}
		]
	},
	{
		header: 'Command-Specific Options',
		description: 'Description',
		optionList: [
			{
				name: 'save',
				description: '[bold]{Install only.} Save as a general dependency in each function directory specficed by the -f parameter. If none are specified, save in all, including new.',
				alias: 's',
				type: Boolean
			},
			{
				name: 'save-dev',
				description: '[bold]{Install only.} Save as a dev-dependency in the package.json and raven-project.json files, but nowhere else.',
				alias: 'sd',
				type: Boolean
			},
			{
				name: 'event',
				description: '[bold]{Run only.} Specify a JSON file for the event parameter in a Lambda function run.',
				alias: 'e',
				typeLabel: '[underline]{file}'
			}
		]
	}
];