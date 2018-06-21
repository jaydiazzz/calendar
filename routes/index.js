const express    = require( 'express' );
const fs         = require( 'fs' );
const bodyParser = require( 'body-parser' );

const router = express.Router();

router.get( '/', ( req, res, next ) => {
	res.render( 'index', {
		title : 'home'
	} );
} );

fs.readdirSync( './views' ).forEach( ( item ) => {
  // e.g. index.pug => [ 'index', 'pug' ];
	const pieces = item.split( '.' );

  // if the file extension is not pug (or
  // more likely there is no ext because it
  // is a folder), don't try to autoload
	if ( pieces[1] !== 'pug' ) {
		return;
	}

  // e.g. 'index'
	const fileName = pieces[0];
	router.get( `/${fileName}`, ( req, res ) => {
		res.render( fileName );
	} );
} );

// export this Router. If you fail to
// do this, every time you require the
// module, the require statement will
// return 'undefined'.
module.exports = router;
