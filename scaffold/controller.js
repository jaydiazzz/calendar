const express  = require( 'express' );

const lib = libRequire( 'TEMPLATE' ); // Contains Service and Validators


const router = express.Router();

router.post( '/TEMPLATE', lib.Validator.createCAPITALIZEDTEMPLATE, ( { body, params }, res, next ) => {

} );

router.put( '/TEMPLATE', lib.Validator.updateCAPITALIZEDTEMPLATE, ( { body, params }, res, next ) => {

} );

router.delete( '/TEMPLATE', lib.Validator.deleteCAPITALIZEDTEMPLATE, ( { body, params }, res, next ) => {

} );

module.exports = router;
