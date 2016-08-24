var _ = require( './const.js' );

module.exports = function() {

    return function(){
        
        _.stats = new Stats();
        _.stats.setMode( 0 ); // 0: fps, 1: ms, 2: mb

        _.stats.domElement.style.position = 'absolute';
        _.stats.domElement.style.left     = '0px';
        _.stats.domElement.style.top      = '0px';

        document.body.appendChild( _.stats.domElement );

    }

}();