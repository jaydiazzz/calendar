// Vue Model

const app = new Vue( { //eslint-disable-line
	el : '.instructions',

	mounted() {
		firebase.auth().onAuthStateChanged( ( user ) => {
			if ( user ) {

				this.userId = user.uid;
				this.name   = user.name;
				this.email  = user.email;

				console.log( user.name );
				console.log( user.email );
				console.log( this.userId );

				FbRef.child( 'tasks' )
				.child( this.userId )
				.push( {
					day         : new Date().getDate(),
					description : 'Look through the calendar and enjoy!',
					month       : new Date().getMonth(),
					title       : 'My First Task',
					year        : new Date().getFullYear(),
				} );
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

		showInstructions : "hidden",
	},

	methods : {

		login() {
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
		},

		signOut() {
			firebase
                .auth()
                .signOut()
				.then( () => {
					console.log( 'signed out user' );
				} )
                .catch( ( error ) => {
                    console.log( error );
                } );
		},

		signUp() {
			if ( this.userId != null ) {
				confirm( 'You\'re already signed in, please sign out first.' );
				return;
			}

			firebase
                .auth()
				.createUserWithEmailAndPassword( this.email, this.password );

			this.showInstructions = "opened";
			this.signPage 		  = false;
			this.loginPage 		  = false;
		},

		signIn() {
			firebase
			.auth()
			.signInWithEmailAndPassword( this.email, this.password )
			.catch( ( error ) => {
				const errorCode    = error.code;
				const errorMessage = error.message;
			} );
			if ( this.userId != null ) {
				location.href = 'calendar';
				return;
			}
		},

		redirect() {
			window.location.href = 'calendar';
		},

		firstSlide() {
			swiper.activeIndex = 0;
			swiper.slideTo(0);
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