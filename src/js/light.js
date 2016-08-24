var _ = require( './const.js' );

module.exports = function() {

    return function(){

        // Ambiant light
        _.lights[ 0 ] = new THREE.AmbientLight( 0xfdfcc7, 0.5 );
        _.scene.add( _.lights[ 0 ] );

        // Main shadow light
        _.lights[ 1 ] = new THREE.PointLight( 0xfdfcc7, 0.4, 1000 );
        _.lights[ 1 ].position.set( -32, 48, 32 );
        _.lights[ 1 ].castShadow = true;
        _.scene.add( _.lights[ 1 ] );

        // Smooth shadow light
        _.lights[ 2 ] = new THREE.PointLight( 0xfdfcc7, 0.1, 1000 );
        _.lights[ 2 ].position.set( 0, 45, 0 );
        _.lights[ 2 ].castShadow = true;
        _.scene.add( _.lights[ 2 ] );

    }

}();