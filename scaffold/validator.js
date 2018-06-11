const Joi           = require( 'joi' );
const { celebrate } = require( 'celebrate' );

const createCAPITALIZEDTEMPLATE = celebrate( {
	body : Joi.object().keys( {

	} ).unknown( false ),
} );

const updateCAPITALIZEDTEMPLATE = celebrate( {
	body : Joi.object().keys( {

	} ).unknown( false ),
	params : Joi.object().keys( {

	} ).unknown( false ),
} );

const deleteCAPITALIZEDTEMPLATE = celebrate( {
	params : Joi.object().keys( {

	} ).unknown( false ),
} );

module.exports = {
	createCAPITALIZEDTEMPLATE,
	updateCAPITALIZEDTEMPLATE,
	deleteCAPITALIZEDTEMPLATE
};
