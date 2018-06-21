const app = new Vue( { //eslint-disable-line
	el : 'form',

	mounted() {
		firebase.auth().onAuthStateChanged( ( user ) => {
			if ( user ) {
                console.log( user.displayName );
                console.log( user.email );
            }
			else {
                console.log( 'nope' );
            }
		} );
	},

	data : {
		userId   : '',
		name     : '',
		email    : '',
		user     : {},
		password : ''
	},

	methods : {
		login() {
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
                } )
                .catch( ( error ) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    const credential = error.credential;
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
			if ( firebase.auth().currentUser != null ) {
                this.signOut();
            }
            firebase
                .auth()
                .createUserWithEmailAndPassword( this.email, this.password )
                .catch( () => {
                    const errorCode    = error.code;
                    const errorMessage = error.message;
                } );
		},
		signIn() {
            if ( firebase.auth().currentUser != null ) {
                this.signOut();
            }
            firebase
                .auth()
                .signInWithEmailAndPassword( this.email, this.password )
                .catch( ( error ) => {
                    const errorCode    = error.code;
                    const errorMessage = error.message;
                } );
		}
	}
} );

