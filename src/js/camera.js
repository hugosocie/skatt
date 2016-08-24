var _ = require( './const.js' );

module.exports = function() {

    return function(){

        var aspect = window.innerWidth / window.innerHeight;
        var d = 20;
        _.camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 0, 1000 );
        //_.camera = new THREE.PerspectiveCamera( 45, aspect, 1, 1000 );

        _.camera.position.set( 20, 20, 20 );
        _.camera.lookAt( _.scene.position );

    }

}();