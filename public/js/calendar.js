const app = new Vue( { // eslint-disable-line
	el : '#calendar-container',
	created() {

		firebase.auth().onAuthStateChanged( ( user ) => { 

			if ( !user ) {
				// user not logged in 
				return;
			}

			const { uid } = user;

			this.uid = uid;

			FbRef.child( 'tasks' )
			.child( uid )
			.on( 'value', ( snapshot ) => {
				const tasks    = snapshot.val();
				const taskKeys = Object.keys( tasks );

				const tasksByDay = {};

				taskKeys.forEach( ( taskKey ) => {
					const task = tasks[taskKey];
					const { month, day, year } = task;

					const key = `${month}/${day}/${year}`;

					if ( !HasProperty( tasksByDay, key ) ) {
						// if we haven't created a spot
						// in our object for this day
						tasksByDay[key] = [];
					}

					tasksByDay[key].push( task );
				} );

				this.calendarState = 'loaded';
				this.tasks         = tasksByDay;
			} );

		} );
	},
	mounted() {

	},

	data : {
		day         : 'Day',
		month       : 'Month',
		year        : 'Year',
		title       : 'Title',
		description : 'Description (optional)',

		activeMonth : new Date().getMonth(),
		activeYear  : new Date().getFullYear(),
		seen        : false,
		alsoSeen    : false,

		tasks : {},

		activeTasks : [],
		activeDate  : {},

		calendarState : '',

		uid : null

	},

	computed : {

		months() {
			const months = [
				{
					name : 'January',
					days : 31
				},
				{
					name : 'February',
					days : 28
				},
				{
					name : 'March',
					days : 31
				},
				{
					name : 'April',
					days : 30
				},
				{
					name : 'May',
					days : 31
				},
				{
					name : 'June',
					days : 30
				},
				{
					name : 'July',
					days : 31
				},
				{
					name : 'August',
					days : 31
				},
				{
					name : 'September',
					days : 30
				},
				{
					name : 'October',
					days : 31
				},
				{
					name : 'November',
					days : 30
				},
				{
					name : 'December',
					days : 31
				}
			];

			const isLeapYear = ( this.activeYear % 4 === 0 );
			if ( isLeapYear ) {
				// february has 29 days
				months[1].days = 29;
			}

			return months;
		},

		thisMonth() {
			const month       = [];
			const activeMonth = this.months[this.activeMonth];

			for ( let i = 0; i < activeMonth.days; i += 1 ) {
				const key = `${this.activeMonth}/${i}/${this.activeYear}`;

				const day = {
					day : i + 1,
					key,
				};

				month.push( day );
			}

			return month;
		},

		lastMonth() {
			const thisMonth  = this.months[this.activeMonth];
			const monthName  = thisMonth.name;
			const dateString = `${monthName} 1, ${this.activeYear}`;

			const date = new Date( dateString );
			const day  = date.getDay(); // 0-6 for sun-sat

			const month          = [];
			const lastMonthIndex = ( this.activeMonth === 0 ? 11 : this.activeMonth - 1 );
			const lastMonth      = this.months[lastMonthIndex];

			// if ( lastMonthIndex === 11 ) {
			// 	this.activeMonth = 11;
			// 	this.lastMonthIndex = 10;
			// 	this.activeYear -= 1;
			// }

			console.log( lastMonthIndex );
			for ( let i = 0; i < day; i += 1 ) {
				month.unshift( lastMonth.days - i );
			}

			return month;
		},

		nextMonth() {

			const thisMonth      = this.months[this.activeMonth];
			const { name, days } = thisMonth;
			const year           = this.activeMonth > 11 ? this.activeYear + 1 : this.activeYear;
			const dateString     = `${name} ${days}, ${year}`;

			const date = new Date( dateString );
			const day  = 6 - date.getDay(); // 0-6 for sun-sat

			const month = [];

			for ( let i = 0; i < day; i += 1 ) {
				month.push( i + 1 );
			}


			return month;
		}
	},

	methods : {
		toggleEvent( tasks ) {

			this.activeTasks = tasks;
			this.seen = true;

			const task = tasks[0];

			if ( task ) {

				this.activeDate = {
					day   : task.day,
					month : task.month,
					year  : task.year
				};

			}

		},

		toggleAdd() {
			this.alsoSeen = !this.alsoSeen;
		},

		addMonth() {
			if ( this.activeMonth === 11 ) {
				this.activeMonth = -1;
				this.activeYear += 1;
			}

			this.activeMonth += 1;
		},

		removeMonth() {
			if ( this.activeMonth === 0 ) {
				this.activeMonth = 12;
				this.activeYear -= 1;
			}
			this.activeMonth -= 1;
		},

		submit() {
			let day     	  = this.day;
			const month       = this.month;
			const year        = this.year;
			const title 	  = this.title;

			let description = this.description;

			if ( description === 'Description (optional)' ) {
				description = ' ';
			}

			const fbUser = firebase.auth().currentUser.uid;

			FbRef.child( `tasks/${fbUser}` ).push( {
				title       : title,
				description : description,
				day		    : day - 1,
				month	    : month - 1,
				year	    : year,
			} );
		}
	}

} );

new Date().getDay() === 5 ? console.log( 'happy friday' ) : console.log( 'boo' );
