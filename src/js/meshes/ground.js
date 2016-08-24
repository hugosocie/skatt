var _ = require( '../const.js' );

module.exports = function() {

    return function(){

        var size = _.chunk + 0.05,
            vertices = _.chunk * 2;

        var color = '0xbebc67';

        var geometry = new THREE.BoxGeometry(
            size, 2, size,
            vertices, 1, vertices
        );

        var mesh = new THREE.Mesh( geometry );

        mesh.position.x = -.5;
        mesh.position.y = -2;
        mesh.position.z = -.5;

        for( var i = 0; i < geometry.vertices.length; i++ ){
            var v = geometry.vertices[ i ];

            var h = ( ( _.noises.alt.simplex2(
                v.x / 20, 
                v.z / 20
            ) * 0.8 ) + 3 );

            v.diff = Math.random() / 6;
            h = h + v.diff;

            v.y += h;
        }

        if( typeof _.meshes[ color ] === 'undefined' ) _.meshes[ color ] = [];
        _.meshes[ color ].push( mesh );

    }

}();