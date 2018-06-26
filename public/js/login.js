// Vue Model

const app = new Vue( { //eslint-disable-line
	el : '.instructions',

	mounted() {

		// Update our data if user signs in / out

		firebase.auth().onAuthStateChanged( ( user ) => {

			if ( user ) {

				this.userId   = user.uid;
				this.name     = user.name;
				this.email    = user.email;
				this.user     = user.user;

				console.log( this.user );
				console.log( this.email );
				console.log( this.userId );

			}

			else {

				console.log( 'nope' );
				this.userId   = null;
				this.name     = null;
				this.email    = null;
				this.password = null;
				this.user     = null;

			}
		} );
	},

	data : {
		userId   : null,
		name     : null,
		email    : null,
		user     : null,
		password : null,

		loginPage : false,
		signPage  : false,

		showInstructions : 'hidden',
	},

	methods : {

		login() {

			// Check to see if user is signed in already

			// NOTE: Their email is displayed at the top left
			// corner of the page

			if ( this.userId != null ) {
				confirm( 'You\'re already signed in, please sign out first.' );
				return;
			}

			const provider = new firebase.auth.GoogleAuthProvider();

			firebase
                .auth()
                .signInWithPopup( provider )
				.then( function ( result ) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
					const token = result.credential.accessToken;
                    // The signed-in user info.
					const user = result.user;
					this.name = user.email;
				} );

			if ( this.userId != null ) {

				// Once user is signed in, redirect
				// them to the calendar page

				location.href = 'index';
				return;
			}
		},

		signOut() {

			// Sign out the user

			firebase
                .auth()
                .signOut()
				.then( () => {
					console.log( 'signed out user' );
				} )
				.catch( ( error ) => {
					// For development purposes, delete is optional

                    console.log( error );
				} );
		},

		signUp() {

			// Make sure the user is not already signed in

			if ( this.userId != null ) {
				confirm( 'You\'re already signed in, please sign out first.' );
				return;
			}

			firebase
                .auth()
				.createUserWithEmailAndPassword( this.email, this.password )
				.then( () => {
					// Display instructions for new user

					this.showInstructions = 'opened';
					this.signPage 		  = false;
					this.loginPage 		  = false;

				} )
				.catch( ( error ) => {
					// Handle errors here.

					const errorCode = error.code;
					const errorMessage = error.message;
					alert( `There has been an error: ${errorMessage}` );
					return;

				} );
		},

		signIn() {

			// Sign In ( non-firebase ) users with their email and password

			firebase
				.auth()
				.signInWithEmailAndPassword( this.email, this.password )
				.catch( ( error ) => {
					const errorCode    = error.code;
					const errorMessage = error.message;
				} );

			// Once they are signed in redirect them to the
			// calendar page

			if ( this.userId != null ) {
				location.href = 'index';
				return;
			}

		},

		redirect() {

			// Only newly registered users can access this function

			// When the user clicks the button, we make a task to 
			// give them the feeling of personalization

			FbRef.child( 'tasks' )
				.child( this.userId )
				.push( {
					day         : new Date().getDate() - 1,
					description : 'Look through the calendar and enjoy!',
					month       : new Date().getMonth(),
					title       : 'My First Task',
					year        : new Date().getFullYear(),
				} );

			// Once the task is made we redirect them to the calendar
			// so they can preview their task(s)
			window.location.href = 'index';
		},

		firstSlide() {

			// In case user wants to go back on the instructions and doesn't understand

			swiper.activeIndex = 0;
			swiper.slideTo( 0 );
		},
	}
} );

// Swiper Js
const swiper = new Swiper( '.swiper-container', { //eslint-disable-line
	navigation : {
		nextEl : '.swiper-button-next',
		prevEl : '.swiper-button-prev',
	},
	pagination : {
		el : '.swiper-pagination',
	},
} );
