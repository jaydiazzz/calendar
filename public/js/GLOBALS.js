/* eslint no-unused-vars: 0 */
const HasProperty = ( a, b ) => Object.prototype.hasOwnProperty.call( a, b ); // eslint-disable-line

const FirebaseKey = () => firebase.database().ref().push().key;

/*
 * converts object to array
 * obj - object - object to be turned into array
 *
 * returns array
 */
const ObjToArray = ( object ) => {

	if ( object === null || object === undefined ) {
		return [];
	}

	const keys  = Object.keys( object );
	const array = keys.reduce( ( arr, key ) => {

		const obj = object[key];

		if ( !HasProperty( obj, 'key' ) ) {
			obj.key = key;
		}

		arr.push( obj );

		return arr;

	}, [] );

	return array;

};

/* converts array to object
 * array - array of objects - array to convert into an object
 * 				(preferrably each of this array's objects have a property called 'key')
 *
 * returns object
 */
const ArrayToObj = ( array ) => {

	const object = {};

	for ( const i in array ) { // eslint-disable-line

		const arrayItem = array[i];

		if ( typeof ( arrayItem ) !== 'object' ) {
			console.log( array );
			return console.error( 'This array has an element that is not an object at index: ' + i + '. This function is only for arrays of objects. Please view the array above.' ); // eslint-disable-line
		}

		const key = arrayItem.key;

		if ( key === undefined ) {
			console.log( array );
			return console.error( 'An object in this array has no "key" property. Index: ' + i ); // eslint-disable-line
		}

		delete arrayItem.key;

		object[key] = arrayItem;

	}

	return object;

};

const GetUser = () => new Promise( ( resolve ) => {

	const killListener = firebase
		.auth()
		.onAuthStateChanged( ( user ) => {

			resolve( user );

			killListener();

		} );

} );

const GetCurrentUserToken = () => new Promise( ( resolve, reject ) => {

	GetUser()
		.then( user => user.getToken( true ) )
		.then( resolve )
		.catch( reject );

} );

const GetResponseJSON = ( responseText ) => {

	try {

		const json = JSON.parse( responseText );

		return json;

	}

	catch ( e ) {
		return responseText;

	}

};

const Request = ( method, route, body = {} ) => new Promise( ( resolve, reject ) => {

	if ( route.charAt( 0 ) === '/' ) {
		console.warn( 'the paramater \'route\' shouldn\'t be prepended with a slash. ' );

		route = route.slice( 1, route.length ); // eslint-disable-line
	}

	const req = new XMLHttpRequest(); // eslint-disable-line

	req.addEventListener( 'error', reject );
	req.addEventListener( 'abort', reject );
	req.addEventListener( 'load', ( response ) => {

		const res = GetResponseJSON( response.target.responseText );

		if ( response.target.status !== 200 ) {
			console.error( res );

			return reject( res );
		}

		return resolve( res );

	} );

	GetCurrentUserToken()
		.then( ( token ) => {

			req.open( method, `${window.location.protocol}//${window.location.host}/${route}` );

			req.setRequestHeader( 'Content-Type', 'application/json' );
			req.setRequestHeader( 'Auth-Token', token );
			req.setRequestHeader( 'Respond-With-Data', 'true' );

			req.send( JSON.stringify( body ) );

		} );


} );

const Put = ( route, body ) => Request( 'PUT', route, body );

const Post = ( route, body ) => Request( 'POST', route, body );

const Delete = route => Request( 'DELETE', route );

// use to break out of then chains. if @param isIntentional is true,
// use ErrorsOnly to wrap around your callback so that it won't trigger
// your catch block
const Rejection = isIntentional => new Promise( ( r, R ) => R( isIntentional ) );

/*
 * Prevents your catch blocks from firing when you use Rejection( true )
 * @param callback - function - the callback you would use to handle legitimate errors
 *
 * example usage:
 *
 * .catch( ErrorsOnly( ( error ) => {
 *
 *     // do something with the error
 *
 * } ) );
 */
const ErrorsOnly = ( callback ) => {

	const runCallbackIfParamIsAnError = ( error ) => {

		if ( error !== true ) {
			callback( error );
		}

	};

	return runCallbackIfParamIsAnError;

};
