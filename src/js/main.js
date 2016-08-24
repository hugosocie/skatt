// Global variables
// ==========================================================================


var _ = require( './const.js' );

var stats;


// Main Vue App
// ==========================================================================

new Vue({

    el: '#app',

    data : {},

    ready : function(){
        this.stats();
        this.init();
        this.loop();
    },

    methods : {

        init : function(){

            var search = document.location.search.split( '?' );

             _.seed =
                search.length > 1 && typeof search !== 'undefined' ?
                    ( isNaN( parseInt( search[ 1 ] ) ) ?
                        parseInt( search[ 1 ], 36 ) :
                        search[ 1 ] ) :
                    ( Math.random() + '' ).split( '.' )[ 1 ];

            _.noises.alt = new Noise( _.seed );

            console.info( 'Seed : ' +  _.seed );

            _.scene    = new THREE.Scene();
            _.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

            _.renderer.setSize( window.innerWidth, window.innerHeight );
            _.renderer.shadowMap.enabled = true;
            _.renderer.shadowMapSoft = true;

            document.body.appendChild( _.renderer.domElement );

            this.back();
            this.iceland();
            this.ground();
            this.water();
            //this.visited();

            /*
            for( var x = -_.chunk/2; x < _.chunk/2; x++ ) {
                for( var z = -_.chunk/2; z < _.chunk/2; z++ ) {
                    this.block( x, 0, z );
                    this.tree( x, 0, z );
                }
            }
            */

            this.print();

            this.camera();
            this.light();
            this.controls();

            this.loop();

            window.addEventListener( 'resize', this.resize, false );
        },

        stats : require( './stats.js' ),

        camera : require( './camera.js' ),

        light : require( './light.js' ),

        controls : require( './controls.js' ),



        back : require( './meshes/back.js' ),

        ground : require( './meshes/ground.js' ),

        iceland : require( './meshes/iceland.js' ),

        water : require( './meshes/water.js' ),

        block : require( './meshes/block.js' ),

        tree : require( './meshes/tree.js' ),

        visited : require( './meshes/visited.js' ),


        material : function( color, smooth ){
            return new THREE.MeshPhongMaterial({
                wireframe : false,
                color: typeof color != 'undefined' ? color : 0xdb5840,
                shininess: 0,
                shading: smooth === true ? THREE.SmoothShading : THREE.FlatShading
            });
        },

        merge : function( meshes ){
            var combined = new THREE.Geometry();

            for( var i = 0; i < meshes.length; i++ ) {
                meshes[ i ].updateMatrix();
                combined.merge( meshes[ i ].geometry, meshes[ i ].matrix );
            }

            return combined;
        },

        print : function(){
            for( key in _.meshes ) {
                var geometry = this.merge( _.meshes[ key ] );
                var material = this.material( parseInt( key ) );

                var mesh = new THREE.Mesh( geometry, material );

                mesh.receiveShadow = true;
                mesh.castShadow = true;

                _.scene.add( mesh );
            }
        },

        loop : require( './loop.js' ),

        resize : require( './resize.js' )

    },

    components : {}

});