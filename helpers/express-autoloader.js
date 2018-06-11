const fs      = require( 'fs' );
const express = require( 'express' );

const router = express.Router();

const loadRoutes = ( path, app, middlewares ) => {

	router.use( middlewares );

	fs.readdirSync( path ).forEach( ( item ) => {
		const subDir = `${path}/${item}`;

		if ( fs.statSync( subDir ).isDirectory() ) {
			loadRoutes( subDir, app );
		}
		else {
			router.use( appRequire( subDir ) );
		}
	} );

	app.use( `/${path}`, router );
};

module.exports = loadRoutes;
