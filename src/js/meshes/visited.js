var _ = require( '../const.js' );

module.exports = function() {

    return function(){

        for( var i = 0; i < _.visited.length; i++ ){

            var geometry = new THREE.BoxGeometry( 1, 10, 1, 2, 1, 2 );

            var material = this.material( 0x771aac );
            var mesh = new THREE.Mesh( geometry, material );

            material.transparent = true;
            material.opacity = 0.6;

            mesh.position.x = _.visited[ i ][ 0 ] - _.chunk / 2;
            mesh.position.y = 6;
            mesh.position.z = _.visited[ i ][ 1 ] - _.chunk / 2;

            mesh.receiveShadow = true;
            mesh.castShadow = true;

            // var noise = 0.2;
            // for( var j = 0; j < geometry.vertices.length; j++ ){
            //     var v = geometry.vertices[ j ];
            //     v.y += -noise/2 + Math.random()*noise;
            // }

            //geometry.computeFaceNormals();
            //geometry.computeVertexNormals();

            _.scene.add( mesh );
        }

    }

}();