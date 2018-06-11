const { Router } = require( 'express' );

const router = Router();

/* ---------------- GET ---------------- */
router.get( '/', ( req, res ) => {

	res.render( 'index' );

} );

module.exports = router;