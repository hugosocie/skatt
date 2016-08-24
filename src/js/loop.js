var _ = require( './const.js' );

var offset = 0;

module.exports = function() {

    return function(){

        _.stats.begin();    

        offset = offset + 0.05;

        for( var i = 0; i < _.mesh.water.geometry.vertices.length; i++ ){

            var v = _.mesh.water.geometry.vertices[ i ];

            if( v.side === 'down' ) continue;

            var h = ( ( _.noises.alt.simplex2(
                ( v.x + offset ) / 20, 
                ( v.z + offset ) / 20
            ) * 0.8 ) + 3 );

            //h = ( h + Math.exp( h / 4 ) ) - 6;
            //h = h + Math.random() / 6;

            v.y = h + v.diff;

        }

        _.mesh.water.geometry.verticesNeedUpdate = true;

        _.renderer.render( _.scene, _.camera );

        requestAnimationFrame( this.loop );
        _.stats.end();

    }

}();