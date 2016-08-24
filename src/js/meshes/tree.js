var _ = require( '../const.js' );

module.exports = function() {

    return function( x, y, z ){

        // var n = _.noises.alt.simplex2(
        //     ( x -.5 ) / 20, 
        //     ( z -.5 ) / 20
        // );

        // var h = n * 3;
        // h = h * Math.exp( h / 3 );
        // h = h < 1 ? 1 : h; 

        // var a = ( n * 0.8 ) + 3;
        // a = ( a + Math.exp( a / 4 ) ) - 6;
        // a = a + Math.random() / 6;


        if( Math.random() > .8 ) return;

        var colors = [
            '0xa3a14b', '0xa3a14b', '0xa3a14b', '0xa3a14b', // green
            '0x767431', '0x767431', '0x767431',             // dark green
            //'0xb966c6',                                     // pink
            '0xd68935'                                      // orange
        ];

        var color = colors[ Math.round( Math.random() * ( colors.length - 1 ) ) ];

        var s = .4 + Math.random() * .4;
        var geometry = new THREE.DodecahedronGeometry( s, 1 );
        var leaves = new THREE.Mesh( geometry );

        leaves.position.x = x;
        leaves.position.y = y + 3 - s/2;
        leaves.position.z = z;

        leaves.receiveShadow = true;
        leaves.castShadow    = true;

        var noise = 0.2;
        for( var i = 0; i < geometry.vertices.length; i++ ){
            var v = geometry.vertices[ i ];
            v.x += -noise/2 + Math.random()*noise;
            v.y += -noise/2 + Math.random()*noise;
            v.z += -noise/2 + Math.random()*noise;
        }

        geometry.computeFaceNormals();
        geometry.computeVertexNormals();

        if( typeof _.meshes[ color ] === 'undefined' ) _.meshes[ color ] = [];
        _.meshes[ color ].push( leaves );


        var color = '0xa3692a';
        var geometry = new THREE.CylinderGeometry( .05, .2, 1.5, 32 );
        var tronc = new THREE.Mesh( geometry );

        tronc.position.x = x;
        tronc.position.y = y + 1.5;
        tronc.position.z = z;

        var noise = 0.1;
        for( var i = 0; i < geometry.vertices.length; i++ ){
            var v = geometry.vertices[ i ];
            v.x += -noise/2 + Math.random()*noise;
            v.y += -noise/2 + Math.random()*noise;
            v.z += -noise/2 + Math.random()*noise;
        }

        if( typeof _.meshes[ color ] === 'undefined' ) _.meshes[ color ] = [];
        _.meshes[ color ].push( tronc );

    }

}();