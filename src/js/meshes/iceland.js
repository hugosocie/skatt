var _ = require( '../const.js' );

module.exports = function() {

    return function(){

        var x = 0,
            z = 0;

        for( var i = 0; i < _.iceland.length; i++ ) {

            if( _.iceland[ i ] > 0 ) {

                var h = ( ( _.noises.alt.simplex2(
                    x / 20, 
                    z / 20
                ) * 0.8 ) + 3 );

                h = h + ( Math.random() / 6 );

                var geometry = new THREE.BoxGeometry( 1, _.iceland[ i ] + 2, 1, 2, 1, 2 );
                var mesh = new THREE.Mesh( geometry );
                var color = '0x9b9951';

                if( _.iceland[ i ] >= 5 ) color = '0xffffff';
                if( _.iceland[ i ] === 4 ) color = '0x9f7640';
                if( _.iceland[ i ] === 3 ) color = '0xc6a266';
                if( _.iceland[ i ] === 2 ) color = '0xcbae7d';
                if( _.iceland[ i ] < 1 ) color = '0xc1c04f';

                mesh.position.x = x - _.chunk / 2;
                mesh.position.y = _.iceland[ i ] / 2 + h;
                mesh.position.z = z - _.chunk / 2;

                var noise = 0.2;
                for( var j = 0; j < geometry.vertices.length; j++ ){
                    var v = geometry.vertices[ j ];
                    v.y += -noise/2 + Math.random()*noise;
                }

                geometry.computeFaceNormals();
                geometry.computeVertexNormals();

                if( typeof _.meshes[ color ] === 'undefined' ) _.meshes[ color ] = [];
                _.meshes[ color ].push( mesh );

                if( _.iceland[ i ] === 1 && Math.random() > .6 ) {
                    this.tree(
                        mesh.position.x,
                        mesh.position.y,
                        mesh.position.z
                    );
                }
            }

            x++;

            if( x % 32 === 0 ) {
                x = 0;
                z++;
            }
        }

    }

}();