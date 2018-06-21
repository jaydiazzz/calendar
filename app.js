/* Environment Configuration */

// This will not override system-set variables.
require( 'apprequire' )( __dirname );
require( 'dotenv' ).config();

/* Dependencies */

const express    = require( 'express' );
const path       = require( 'path' );
const bodyParser = require( 'body-parser' );

/* Server Configuration */

const app = express();

app.set( 'views', path.join( __dirname, 'views' ) ); // __dirname is the directory a file resides in
app.set( 'view engine', 'pug' );

// set any variables that must
// be passed to pug files here
app.use( ( req, { locals }, next ) => {

	locals.env = process.env.NODE_ENV; // eslint-disable-line

	next();

} );

// serve resources in /public with /static
app.use( '/static', express.static( path.join( __dirname, 'public' ) ) );

// parse all of our requests into JSON
app.use( bodyParser.json() );

// has to do with library extension. Must be false
app.use( bodyParser.urlencoded( {
	extended : false,
} ) );

/* Routing */

const index = require( './routes/index' );

app.use( '/', index );

/* Error Responses */

app.use( ( req, res ) => {

	res.render( 'error', {
		message : 'We were unable to find this page',
		status  : 404,
		error   : {},
		title   : '404',
	} );

} );

/* Final Server Initialization */

const port = process.env.PORT;

app.listen( port, () => {

	console.log( `App running on port: ${port}` );

} );
