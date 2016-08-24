var _ = require( './const.js' );

module.exports = function() {

    return function(){
        
        var H = window.innerHeight;
        var W = window.innerWidth;

        _.renderer.setSize( W, H );
        _.camera.aspect = W / H;
        _.camera.updateProjectionMatrix();

    }

}();