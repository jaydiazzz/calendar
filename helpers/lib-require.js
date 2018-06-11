const fs = require( 'fs' );

const libRequire = ( path, prependPathWithLib = true ) => {

	let newPath = path;
	if ( prependPathWithLib ) {
		newPath = `lib/${path}`;
	}

	let lib  = {};

	fs.readdirSync( newPath ).forEach( ( item ) => {
		const subDir = `${newPath}/${item}`;

		if ( fs.statSync( subDir ).isDirectory() ) {
			lib[item] = libRequire( subDir, false );
		}
		else {
			if ( Object.prototype.hasOwnProperty.call( lib, 'Service' ) ) {
				return;
			}

			const Service   = appRequire( `${newPath}/service` );
			const Validator = appRequire( `${newPath}/validator` );

			lib = { Service, Validator };
		}
	} );

	return lib;

};

global.libRequire = libRequire;
