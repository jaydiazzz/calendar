require( 'dotenv' ).config();

require( 'apprequire' )( `${__dirname}/..` );
require( 'co-mocha' );

const chai           = require( 'chai' );
const chaiSubset     = require( 'chai-subset' );

const chaiAsPromised = require( 'chai-as-promised' );
chai.use( chaiAsPromised );

chai.use( chaiSubset );

global.expect = chai.expect;

before( function( done ) { // eslint-disable-line
	this.timeout( 10000 );
	const testApp = appRequire( 'app' ); // eslint-disable-line
	done();
} );
