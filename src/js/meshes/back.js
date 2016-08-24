var _ = require( '../const.js' );

module.exports = function() {

    return function(){

        var size = _.chunk * 2;

        //var geometry = new THREE.PlaneGeometry( size, size, 1, 1 );
        var geometry = new THREE.SphereGeometry( size, 32, 32 );
        var material = this.material( 0x2a2c38, true );
        var mesh = new THREE.Mesh( geometry, material );

        //mesh.receiveShadow = true;
        mesh.material.side = THREE.DoubleSide;

        //mesh.position.y = -_.chunk/4;
        mesh.rotation.x = 90 * Math.PI / 180
        mesh.rotation.z = 45 * Math.PI / 180

        _.scene.add( mesh );

    }

}();