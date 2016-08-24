var _ = require( '../const.js' );

module.exports = function() {

    return function( x, y, z ){

        var n = _.noises.alt.simplex2(
            ( x -.5 ) / 20, 
            ( z -.5 ) / 20
        );

        var h = n * 3;
        h = h * Math.exp( h / 3 );
        h = h < 1 ? 1 : h; 

        var a = ( n * 0.8 ) + 3;
        a = ( a + Math.exp( a / 4 ) ) - 6;
        a = a + Math.random() / 6;


        if( h < 1.1 ) return;


        var color = '0x9b9951';
        color = Math.random() > .70 ? '0xbebc67' : color; // add some light grass
        color = h > 2 || Math.random() > .99  ? '0xbbbbbb' : color; // add some rock
        color = h > 3 || Math.random() > .99  ? '0xdddddd' : color; // add some rock
        color = Math.random() > .90 ? '0xc69a6a' : color; // add some dirt
        color = h > 5 || Math.random() > .95 ? '0xffffff' : color; // add some light rock


        var geometry = new THREE.BoxGeometry( 1, h, 1, 2, 1, 2 );
        var mesh = new THREE.Mesh( geometry );

        mesh.position.x = x;
        mesh.position.y = ( ( h / 2 ) + a ) - 1.5;
        mesh.position.z = z;

        var noise = 0.2;
        for( var i = 0; i < geometry.vertices.length; i++ ){
            var v = geometry.vertices[ i ];
            v.y += -noise/2 + Math.random()*noise;
        }

        geometry.computeFaceNormals();
        geometry.computeVertexNormals();

        if( typeof _.meshes[ color ] === 'undefined' ) _.meshes[ color ] = [];
        _.meshes[ color ].push( mesh );

    }

}();