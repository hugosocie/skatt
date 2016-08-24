var _ = require( './const.js' );
var OrbitControls = require( 'three-orbit-controls' )( THREE );

module.exports = function() {

    return function(){
        
        _.controls = new OrbitControls( _.camera, _.renderer.domElement );
        //_.controls.enableZoom = false;

    }

}();