const d = new Date();

function daysOf( month, year ) {
	return new Date( year, month, 0 ).getDate();
}
// get this months value
let monthNow = d.getMonth();

// get this years value
const yearNow = d.getFullYear();

for ( let monthCount = 0; monthCount += 1; monthCount < 11 ) {
	let yearCount = 2000;
	if ( monthCount === 11 ) {
		monthCount = 0;
		yearCount += 1;
	}
	else if ( yearCount === 2010 ) {
		monthCount = 12;
		break;
	}
	console.log( daysOf( monthCount, yearCount ) );
}

// monthNow is originally the next month so we minus one to make it the current month
monthNow -= 1;

console.log( daysOf( monthNow, yearNow ) );
const app = new Vue( {
	el   : '#calendar',
	data : {
		daysIn : daysOf( monthNow, yearNow )
	}
} );
