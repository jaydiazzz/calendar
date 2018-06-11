const fs = require( 'fs' );

// index starts on 2 because process.argv contains the whole command-line invocation:
// process.argv = ['node', 'yourscript.js', <your string here>]
const flag         = process.argv[2];
const scaffoldName = process.argv[3].toLowerCase();

// ensure flag is either -v or -c
if( flag !== '-v' && flag !== '-c' ){
	console.log( 'you did not include any flags')
	console.log( 'include "-c" to scaffold a controller, or "-v" to scaffold a view ')
	return;
}

// generate view
const scaffoldView = async () => {

	const templates = {
		pug : {
			name : 'view.pug',
			path : `${__dirname}/views/${scaffoldName}.pug`,
		},
		scss : {
			name : 'stylesheet.scss',
			path : `${__dirname}/public/sass/${scaffoldName}.scss`,
		},
		js : {
			name : 'viewModel.js',
			path : `${__dirname}/public/js/${scaffoldName}.js`,
		}

	};

	Object.keys( templates ).forEach( ( key ) => {

		const file = templates[key];

		const template = fs.readFileSync(`scaffold/${file.name}`, 'utf8' );

		const templateResult = template.replace( /TEMPLATE/g, scaffoldName );

		fs.writeFileSync( file.path, templateResult );

	} );

};

// generate controllers
const scaffoldController = async () => {


	const capitalizedName = scaffoldName.charAt(0).toUpperCase() + scaffoldName.slice(1);

	const directories = [
		`${__dirname}/controllers`,
		`${__dirname}/lib`,
		`${__dirname}/lib/${scaffoldName}`,
		`${__dirname}/test`,
		`${__dirname}/test/${scaffoldName}`
	];

	directories.forEach( ( directory ) => {

		if ( !fs.existsSync( directory ) ) {
			fs.mkdirSync( directory );
		}

	} );

	const templates = {
		validator: {
			name : 'validator.js',
			path : `${__dirname}/lib/${scaffoldName}/validator.js`
		},
		service : {
			name : 'service.js',
			path : `${__dirname}/lib/${scaffoldName}/service.js`
		},
		controller : {
			name : 'controller.js',
			path : `${__dirname}/controllers/${scaffoldName}.js`
		},
		test : {
			name : 'service_test.js',
			path : `${__dirname}/test/${scaffoldName}/service_test.js`
		}
	}

	Object.keys( templates ).forEach( ( key ) => {

		const file = templates[key];

		const template = fs.readFileSync(`scaffold/${file.name}`, 'utf8' );

		const templateResult = template.replace( /CAPITALIZEDTEMPLATE/g, capitalizedName  )
			.replace( /TEMPLATE/g, scaffoldName )


		fs.writeFileSync( file.path, templateResult );

	} );

}

if( flag === "-v" ){

	scaffoldView();
}

if( flag === '-c' ){

	scaffoldController();
}

return console.log(`scaffold successful for ${scaffoldName}`)
