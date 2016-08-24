/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// Global variables
	// ==========================================================================


	var _ = __webpack_require__( 1 );

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

	        stats : __webpack_require__( 2 ),

	        camera : __webpack_require__( 3 ),

	        light : __webpack_require__( 4 ),

	        controls : __webpack_require__( 5 ),



	        back : __webpack_require__( 7 ),

	        ground : __webpack_require__( 8 ),

	        iceland : __webpack_require__( 9 ),

	        water : __webpack_require__( 10 ),

	        block : __webpack_require__( 11 ),

	        tree : __webpack_require__( 12 ),

	        visited : __webpack_require__( 13 ),


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

	        loop : __webpack_require__( 14 ),

	        resize : __webpack_require__( 15 )

	    },

	    components : {}

	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = function() {

	    return {

	        scene    : null,
	        camera   : null,
	        renderer : null,
	        controls : null,
	        stats    : null,

	        lights : [],
	        meshes : [],

	        mesh : {
	            water : null
	        },

	        chunk : 32,
	        seed  : 0,

	        noises : {
	            alt : null
	        },

	        iceland : [
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0,.5,.5, 0, 1, 1, 1, 1, 2, 2, 2, 3, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0,.5, 1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0,.5, 1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 3, 3, 3, 3, 4, 4, 5, 5, 4, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5, 4, 3, 1, 0, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5, 5, 3, 1, 0, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 3, 3, 3, 4, 4, 5, 5, 4, 5, 3, 1, 0, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 3, 3, 3, 3, 4, 4, 6, 5, 5, 3, 1, 1, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 3, 3, 3, 3, 4, 4, 4, 4, 3, 4, 3, 2, 1, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 3, 3, 3, 5, 3, 4, 4, 3, 4, 3, 2, 1, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 3, 3, 3, 5, 3, 4, 4, 3, 4, 5, 5, 1, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 4, 4, 4, 3, 3, 4, 2, 4, 4, 1, 1, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 3, 2, 2, 3, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 1, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 2, 2, 2, 1, 2, 2, 3, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,.5, 1, 1, 2, 2, 1, 2, 2, 2, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,.5, 1, 1, 2, 2, 1, 1, 1, 2, 1, 1,.5, 0, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1,.5, 0, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1,.2, 0, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 3, 2, 1, 0, 0, 1, 2, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 2, 2, 1, 0, 0,.5, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 0, 0,.5, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	        ],

	        visited : [
	            [ 22, 23 ],
	            [ 18, 18 ]
	        ]

	    }

	}();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__( 1 );

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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__( 1 );

	module.exports = function() {

	    return function(){

	        var aspect = window.innerWidth / window.innerHeight;
	        var d = 20;
	        _.camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 0, 1000 );
	        //_.camera = new THREE.PerspectiveCamera( 45, aspect, 1, 1000 );

	        _.camera.position.set( 20, 20, 20 );
	        _.camera.lookAt( _.scene.position );

	    }

	}();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__( 1 );

	module.exports = function() {

	    return function(){

	        // Ambiant light
	        _.lights[ 0 ] = new THREE.AmbientLight( 0xfdfcc7, 0.5 );
	        _.scene.add( _.lights[ 0 ] );

	        // Main shadow light
	        _.lights[ 1 ] = new THREE.PointLight( 0xfdfcc7, 0.4, 1000 );
	        _.lights[ 1 ].position.set( -32, 48, 32 );
	        _.lights[ 1 ].castShadow = true;
	        _.scene.add( _.lights[ 1 ] );

	        // Smooth shadow light
	        _.lights[ 2 ] = new THREE.PointLight( 0xfdfcc7, 0.1, 1000 );
	        _.lights[ 2 ].position.set( 0, 45, 0 );
	        _.lights[ 2 ].castShadow = true;
	        _.scene.add( _.lights[ 2 ] );

	    }

	}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__( 1 );
	var OrbitControls = __webpack_require__( 6 )( THREE );

	module.exports = function() {

	    return function(){
	        
	        _.controls = new OrbitControls( _.camera, _.renderer.domElement );
	        //_.controls.enableZoom = false;

	    }

	}();

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function(THREE) {
		var MOUSE = THREE.MOUSE
		if (!MOUSE)
			MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2 };

		/**
		 * @author qiao / https://github.com/qiao
		 * @author mrdoob / http://mrdoob.com
		 * @author alteredq / http://alteredqualia.com/
		 * @author WestLangley / http://github.com/WestLangley
		 * @author erich666 / http://erichaines.com
		 */
		/*global THREE, console */

		function OrbitConstraint ( object ) {

			this.object = object;

			// "target" sets the location of focus, where the object orbits around
			// and where it pans with respect to.
			this.target = new THREE.Vector3();

			// Limits to how far you can dolly in and out ( PerspectiveCamera only )
			this.minDistance = 0;
			this.maxDistance = Infinity;

			// Limits to how far you can zoom in and out ( OrthographicCamera only )
			this.minZoom = 0;
			this.maxZoom = Infinity;

			// How far you can orbit vertically, upper and lower limits.
			// Range is 0 to Math.PI radians.
			this.minPolarAngle = 0; // radians
			this.maxPolarAngle = Math.PI; // radians

			// How far you can orbit horizontally, upper and lower limits.
			// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
			this.minAzimuthAngle = - Infinity; // radians
			this.maxAzimuthAngle = Infinity; // radians

			// Set to true to enable damping (inertia)
			// If damping is enabled, you must call controls.update() in your animation loop
			this.enableDamping = false;
			this.dampingFactor = 0.25;

			////////////
			// internals

			var scope = this;

			var EPS = 0.000001;

			// Current position in spherical coordinate system.
			var theta;
			var phi;

			// Pending changes
			var phiDelta = 0;
			var thetaDelta = 0;
			var scale = 1;
			var panOffset = new THREE.Vector3();
			var zoomChanged = false;

			// API

			this.getPolarAngle = function () {

				return phi;

			};

			this.getAzimuthalAngle = function () {

				return theta;

			};

			this.rotateLeft = function ( angle ) {

				thetaDelta -= angle;

			};

			this.rotateUp = function ( angle ) {

				phiDelta -= angle;

			};

			// pass in distance in world space to move left
			this.panLeft = function() {

				var v = new THREE.Vector3();

				return function panLeft ( distance ) {

					var te = this.object.matrix.elements;

					// get X column of matrix
					v.set( te[ 0 ], te[ 1 ], te[ 2 ] );
					v.multiplyScalar( - distance );

					panOffset.add( v );

				};

			}();

			// pass in distance in world space to move up
			this.panUp = function() {

				var v = new THREE.Vector3();

				return function panUp ( distance ) {

					var te = this.object.matrix.elements;

					// get Y column of matrix
					v.set( te[ 4 ], te[ 5 ], te[ 6 ] );
					v.multiplyScalar( distance );

					panOffset.add( v );

				};

			}();

			// pass in x,y of change desired in pixel space,
			// right and down are positive
			this.pan = function ( deltaX, deltaY, screenWidth, screenHeight ) {

				if ( scope.object instanceof THREE.PerspectiveCamera ) {

					// perspective
					var position = scope.object.position;
					var offset = position.clone().sub( scope.target );
					var targetDistance = offset.length();

					// half of the fov is center to top of screen
					targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );

					// we actually don't use screenWidth, since perspective camera is fixed to screen height
					scope.panLeft( 2 * deltaX * targetDistance / screenHeight );
					scope.panUp( 2 * deltaY * targetDistance / screenHeight );

				} else if ( scope.object instanceof THREE.OrthographicCamera ) {

					// orthographic
					scope.panLeft( deltaX * ( scope.object.right - scope.object.left ) / screenWidth );
					scope.panUp( deltaY * ( scope.object.top - scope.object.bottom ) / screenHeight );

				} else {

					// camera neither orthographic or perspective
					console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );

				}

			};

			this.dollyIn = function ( dollyScale ) {

				if ( scope.object instanceof THREE.PerspectiveCamera ) {

					scale /= dollyScale;

				} else if ( scope.object instanceof THREE.OrthographicCamera ) {

					scope.object.zoom = Math.max( this.minZoom, Math.min( this.maxZoom, this.object.zoom * dollyScale ) );
					scope.object.updateProjectionMatrix();
					zoomChanged = true;

				} else {

					console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );

				}

			};

			this.dollyOut = function ( dollyScale ) {

				if ( scope.object instanceof THREE.PerspectiveCamera ) {

					scale *= dollyScale;

				} else if ( scope.object instanceof THREE.OrthographicCamera ) {

					scope.object.zoom = Math.max( this.minZoom, Math.min( this.maxZoom, this.object.zoom / dollyScale ) );
					scope.object.updateProjectionMatrix();
					zoomChanged = true;

				} else {

					console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );

				}

			};

			this.update = function() {

				var offset = new THREE.Vector3();

				// so camera.up is the orbit axis
				var quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
				var quatInverse = quat.clone().inverse();

				var lastPosition = new THREE.Vector3();
				var lastQuaternion = new THREE.Quaternion();

				return function () {

					var position = this.object.position;

					offset.copy( position ).sub( this.target );

					// rotate offset to "y-axis-is-up" space
					offset.applyQuaternion( quat );

					// angle from z-axis around y-axis

					theta = Math.atan2( offset.x, offset.z );

					// angle from y-axis

					phi = Math.atan2( Math.sqrt( offset.x * offset.x + offset.z * offset.z ), offset.y );

					theta += thetaDelta;
					phi += phiDelta;

					// restrict theta to be between desired limits
					theta = Math.max( this.minAzimuthAngle, Math.min( this.maxAzimuthAngle, theta ) );

					// restrict phi to be between desired limits
					phi = Math.max( this.minPolarAngle, Math.min( this.maxPolarAngle, phi ) );

					// restrict phi to be betwee EPS and PI-EPS
					phi = Math.max( EPS, Math.min( Math.PI - EPS, phi ) );

					var radius = offset.length() * scale;

					// restrict radius to be between desired limits
					radius = Math.max( this.minDistance, Math.min( this.maxDistance, radius ) );

					// move target to panned location
					this.target.add( panOffset );

					offset.x = radius * Math.sin( phi ) * Math.sin( theta );
					offset.y = radius * Math.cos( phi );
					offset.z = radius * Math.sin( phi ) * Math.cos( theta );

					// rotate offset back to "camera-up-vector-is-up" space
					offset.applyQuaternion( quatInverse );

					position.copy( this.target ).add( offset );

					this.object.lookAt( this.target );

					if ( this.enableDamping === true ) {

						thetaDelta *= ( 1 - this.dampingFactor );
						phiDelta *= ( 1 - this.dampingFactor );

					} else {

						thetaDelta = 0;
						phiDelta = 0;

					}

					scale = 1;
					panOffset.set( 0, 0, 0 );

					// update condition is:
					// min(camera displacement, camera rotation in radians)^2 > EPS
					// using small-angle approximation cos(x/2) = 1 - x^2 / 8

					if ( zoomChanged ||
						 lastPosition.distanceToSquared( this.object.position ) > EPS ||
						8 * ( 1 - lastQuaternion.dot( this.object.quaternion ) ) > EPS ) {

						lastPosition.copy( this.object.position );
						lastQuaternion.copy( this.object.quaternion );
						zoomChanged = false;

						return true;

					}

					return false;

				};

			}();

		};


		// This set of controls performs orbiting, dollying (zooming), and panning. It maintains
		// the "up" direction as +Y, unlike the TrackballControls. Touch on tablet and phones is
		// supported.
		//
		//    Orbit - left mouse / touch: one finger move
		//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
		//    Pan - right mouse, or arrow keys / touch: three finter swipe

		function OrbitControls ( object, domElement ) {

			var constraint = new OrbitConstraint( object );

			this.domElement = ( domElement !== undefined ) ? domElement : document;

			// API

			Object.defineProperty( this, 'constraint', {

				get: function() {

					return constraint;

				}

			} );

			this.getPolarAngle = function () {

				return constraint.getPolarAngle();

			};

			this.getAzimuthalAngle = function () {

				return constraint.getAzimuthalAngle();

			};

			// Set to false to disable this control
			this.enabled = true;

			// center is old, deprecated; use "target" instead
			this.center = this.target;

			// This option actually enables dollying in and out; left as "zoom" for
			// backwards compatibility.
			// Set to false to disable zooming
			this.enableZoom = true;
			this.zoomSpeed = 1.0;

			// Set to false to disable rotating
			this.enableRotate = true;
			this.rotateSpeed = 1.0;

			// Set to false to disable panning
			this.enablePan = true;
			this.keyPanSpeed = 7.0;	// pixels moved per arrow key push

			// Set to true to automatically rotate around the target
			// If auto-rotate is enabled, you must call controls.update() in your animation loop
			this.autoRotate = false;
			this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

			// Set to false to disable use of the keys
			this.enableKeys = true;

			// The four arrow keys
			this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

			// Mouse buttons
			this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };

			////////////
			// internals

			var scope = this;

			var rotateStart = new THREE.Vector2();
			var rotateEnd = new THREE.Vector2();
			var rotateDelta = new THREE.Vector2();

			var panStart = new THREE.Vector2();
			var panEnd = new THREE.Vector2();
			var panDelta = new THREE.Vector2();

			var dollyStart = new THREE.Vector2();
			var dollyEnd = new THREE.Vector2();
			var dollyDelta = new THREE.Vector2();

			var STATE = { NONE : - 1, ROTATE : 0, DOLLY : 1, PAN : 2, TOUCH_ROTATE : 3, TOUCH_DOLLY : 4, TOUCH_PAN : 5 };

			var state = STATE.NONE;

			// for reset

			this.target0 = this.target.clone();
			this.position0 = this.object.position.clone();
			this.zoom0 = this.object.zoom;

			// events

			var changeEvent = { type: 'change' };
			var startEvent = { type: 'start' };
			var endEvent = { type: 'end' };

			// pass in x,y of change desired in pixel space,
			// right and down are positive
			function pan( deltaX, deltaY ) {

				var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

				constraint.pan( deltaX, deltaY, element.clientWidth, element.clientHeight );

			}

			this.update = function () {

				if ( this.autoRotate && state === STATE.NONE ) {

					constraint.rotateLeft( getAutoRotationAngle() );

				}

				if ( constraint.update() === true ) {

					this.dispatchEvent( changeEvent );

				}

			};

			this.reset = function () {

				state = STATE.NONE;

				this.target.copy( this.target0 );
				this.object.position.copy( this.position0 );
				this.object.zoom = this.zoom0;

				this.object.updateProjectionMatrix();
				this.dispatchEvent( changeEvent );

				this.update();

			};

			function getAutoRotationAngle() {

				return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

			}

			function getZoomScale() {

				return Math.pow( 0.95, scope.zoomSpeed );

			}

			function onMouseDown( event ) {

				if ( scope.enabled === false ) return;

				event.preventDefault();

				if ( event.button === scope.mouseButtons.ORBIT ) {

					if ( scope.enableRotate === false ) return;

					state = STATE.ROTATE;

					rotateStart.set( event.clientX, event.clientY );

				} else if ( event.button === scope.mouseButtons.ZOOM ) {

					if ( scope.enableZoom === false ) return;

					state = STATE.DOLLY;

					dollyStart.set( event.clientX, event.clientY );

				} else if ( event.button === scope.mouseButtons.PAN ) {

					if ( scope.enablePan === false ) return;

					state = STATE.PAN;

					panStart.set( event.clientX, event.clientY );

				}

				if ( state !== STATE.NONE ) {

					document.addEventListener( 'mousemove', onMouseMove, false );
					document.addEventListener( 'mouseup', onMouseUp, false );
					scope.dispatchEvent( startEvent );

				}

			}

			function onMouseMove( event ) {

				if ( scope.enabled === false ) return;

				event.preventDefault();

				var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

				if ( state === STATE.ROTATE ) {

					if ( scope.enableRotate === false ) return;

					rotateEnd.set( event.clientX, event.clientY );
					rotateDelta.subVectors( rotateEnd, rotateStart );

					// rotating across whole screen goes 360 degrees around
					constraint.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

					// rotating up and down along whole screen attempts to go 360, but limited to 180
					constraint.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

					rotateStart.copy( rotateEnd );

				} else if ( state === STATE.DOLLY ) {

					if ( scope.enableZoom === false ) return;

					dollyEnd.set( event.clientX, event.clientY );
					dollyDelta.subVectors( dollyEnd, dollyStart );

					if ( dollyDelta.y > 0 ) {

						constraint.dollyIn( getZoomScale() );

					} else if ( dollyDelta.y < 0 ) {

						constraint.dollyOut( getZoomScale() );

					}

					dollyStart.copy( dollyEnd );

				} else if ( state === STATE.PAN ) {

					if ( scope.enablePan === false ) return;

					panEnd.set( event.clientX, event.clientY );
					panDelta.subVectors( panEnd, panStart );

					pan( panDelta.x, panDelta.y );

					panStart.copy( panEnd );

				}

				if ( state !== STATE.NONE ) scope.update();

			}

			function onMouseUp( /* event */ ) {

				if ( scope.enabled === false ) return;

				document.removeEventListener( 'mousemove', onMouseMove, false );
				document.removeEventListener( 'mouseup', onMouseUp, false );
				scope.dispatchEvent( endEvent );
				state = STATE.NONE;

			}

			function onMouseWheel( event ) {

				if ( scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE ) return;

				event.preventDefault();
				event.stopPropagation();

				var delta = 0;

				if ( event.wheelDelta !== undefined ) {

					// WebKit / Opera / Explorer 9

					delta = event.wheelDelta;

				} else if ( event.detail !== undefined ) {

					// Firefox

					delta = - event.detail;

				}

				if ( delta > 0 ) {

					constraint.dollyOut( getZoomScale() );

				} else if ( delta < 0 ) {

					constraint.dollyIn( getZoomScale() );

				}

				scope.update();
				scope.dispatchEvent( startEvent );
				scope.dispatchEvent( endEvent );

			}

			function onKeyDown( event ) {

				if ( scope.enabled === false || scope.enableKeys === false || scope.enablePan === false ) return;

				switch ( event.keyCode ) {

					case scope.keys.UP:
						pan( 0, scope.keyPanSpeed );
						scope.update();
						break;

					case scope.keys.BOTTOM:
						pan( 0, - scope.keyPanSpeed );
						scope.update();
						break;

					case scope.keys.LEFT:
						pan( scope.keyPanSpeed, 0 );
						scope.update();
						break;

					case scope.keys.RIGHT:
						pan( - scope.keyPanSpeed, 0 );
						scope.update();
						break;

				}

			}

			function touchstart( event ) {

				if ( scope.enabled === false ) return;

				switch ( event.touches.length ) {

					case 1:	// one-fingered touch: rotate

						if ( scope.enableRotate === false ) return;

						state = STATE.TOUCH_ROTATE;

						rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
						break;

					case 2:	// two-fingered touch: dolly

						if ( scope.enableZoom === false ) return;

						state = STATE.TOUCH_DOLLY;

						var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
						var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
						var distance = Math.sqrt( dx * dx + dy * dy );
						dollyStart.set( 0, distance );
						break;

					case 3: // three-fingered touch: pan

						if ( scope.enablePan === false ) return;

						state = STATE.TOUCH_PAN;

						panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
						break;

					default:

						state = STATE.NONE;

				}

				if ( state !== STATE.NONE ) scope.dispatchEvent( startEvent );

			}

			function touchmove( event ) {

				if ( scope.enabled === false ) return;

				event.preventDefault();
				event.stopPropagation();

				var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

				switch ( event.touches.length ) {

					case 1: // one-fingered touch: rotate

						if ( scope.enableRotate === false ) return;
						if ( state !== STATE.TOUCH_ROTATE ) return;

						rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
						rotateDelta.subVectors( rotateEnd, rotateStart );

						// rotating across whole screen goes 360 degrees around
						constraint.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );
						// rotating up and down along whole screen attempts to go 360, but limited to 180
						constraint.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

						rotateStart.copy( rotateEnd );

						scope.update();
						break;

					case 2: // two-fingered touch: dolly

						if ( scope.enableZoom === false ) return;
						if ( state !== STATE.TOUCH_DOLLY ) return;

						var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
						var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
						var distance = Math.sqrt( dx * dx + dy * dy );

						dollyEnd.set( 0, distance );
						dollyDelta.subVectors( dollyEnd, dollyStart );

						if ( dollyDelta.y > 0 ) {

							constraint.dollyOut( getZoomScale() );

						} else if ( dollyDelta.y < 0 ) {

							constraint.dollyIn( getZoomScale() );

						}

						dollyStart.copy( dollyEnd );

						scope.update();
						break;

					case 3: // three-fingered touch: pan

						if ( scope.enablePan === false ) return;
						if ( state !== STATE.TOUCH_PAN ) return;

						panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
						panDelta.subVectors( panEnd, panStart );

						pan( panDelta.x, panDelta.y );

						panStart.copy( panEnd );

						scope.update();
						break;

					default:

						state = STATE.NONE;

				}

			}

			function touchend( /* event */ ) {

				if ( scope.enabled === false ) return;

				scope.dispatchEvent( endEvent );
				state = STATE.NONE;

			}

			function contextmenu( event ) {

				event.preventDefault();

			}

			this.dispose = function() {

				this.domElement.removeEventListener( 'contextmenu', contextmenu, false );
				this.domElement.removeEventListener( 'mousedown', onMouseDown, false );
				this.domElement.removeEventListener( 'mousewheel', onMouseWheel, false );
				this.domElement.removeEventListener( 'MozMousePixelScroll', onMouseWheel, false ); // firefox

				this.domElement.removeEventListener( 'touchstart', touchstart, false );
				this.domElement.removeEventListener( 'touchend', touchend, false );
				this.domElement.removeEventListener( 'touchmove', touchmove, false );

				document.removeEventListener( 'mousemove', onMouseMove, false );
				document.removeEventListener( 'mouseup', onMouseUp, false );

				window.removeEventListener( 'keydown', onKeyDown, false );

			}

			this.domElement.addEventListener( 'contextmenu', contextmenu, false );

			this.domElement.addEventListener( 'mousedown', onMouseDown, false );
			this.domElement.addEventListener( 'mousewheel', onMouseWheel, false );
			this.domElement.addEventListener( 'MozMousePixelScroll', onMouseWheel, false ); // firefox

			this.domElement.addEventListener( 'touchstart', touchstart, false );
			this.domElement.addEventListener( 'touchend', touchend, false );
			this.domElement.addEventListener( 'touchmove', touchmove, false );

			window.addEventListener( 'keydown', onKeyDown, false );

			// force an update at start
			this.update();

		};

		OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );
		OrbitControls.prototype.constructor = OrbitControls;

		Object.defineProperties( OrbitControls.prototype, {

			object: {

				get: function () {

					return this.constraint.object;

				}

			},

			target: {

				get: function () {

					return this.constraint.target;

				},

				set: function ( value ) {

					console.warn( 'THREE.OrbitControls: target is now immutable. Use target.set() instead.' );
					this.constraint.target.copy( value );

				}

			},

			minDistance : {

				get: function () {

					return this.constraint.minDistance;

				},

				set: function ( value ) {

					this.constraint.minDistance = value;

				}

			},

			maxDistance : {

				get: function () {

					return this.constraint.maxDistance;

				},

				set: function ( value ) {

					this.constraint.maxDistance = value;

				}

			},

			minZoom : {

				get: function () {

					return this.constraint.minZoom;

				},

				set: function ( value ) {

					this.constraint.minZoom = value;

				}

			},

			maxZoom : {

				get: function () {

					return this.constraint.maxZoom;

				},

				set: function ( value ) {

					this.constraint.maxZoom = value;

				}

			},

			minPolarAngle : {

				get: function () {

					return this.constraint.minPolarAngle;

				},

				set: function ( value ) {

					this.constraint.minPolarAngle = value;

				}

			},

			maxPolarAngle : {

				get: function () {

					return this.constraint.maxPolarAngle;

				},

				set: function ( value ) {

					this.constraint.maxPolarAngle = value;

				}

			},

			minAzimuthAngle : {

				get: function () {

					return this.constraint.minAzimuthAngle;

				},

				set: function ( value ) {

					this.constraint.minAzimuthAngle = value;

				}

			},

			maxAzimuthAngle : {

				get: function () {

					return this.constraint.maxAzimuthAngle;

				},

				set: function ( value ) {

					this.constraint.maxAzimuthAngle = value;

				}

			},

			enableDamping : {

				get: function () {

					return this.constraint.enableDamping;

				},

				set: function ( value ) {

					this.constraint.enableDamping = value;

				}

			},

			dampingFactor : {

				get: function () {

					return this.constraint.dampingFactor;

				},

				set: function ( value ) {

					this.constraint.dampingFactor = value;

				}

			},

			// backward compatibility

			noZoom: {

				get: function () {

					console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
					return ! this.enableZoom;

				},

				set: function ( value ) {

					console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
					this.enableZoom = ! value;

				}

			},

			noRotate: {

				get: function () {

					console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
					return ! this.enableRotate;

				},

				set: function ( value ) {

					console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
					this.enableRotate = ! value;

				}

			},

			noPan: {

				get: function () {

					console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
					return ! this.enablePan;

				},

				set: function ( value ) {

					console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
					this.enablePan = ! value;

				}

			},

			noKeys: {

				get: function () {

					console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
					return ! this.enableKeys;

				},

				set: function ( value ) {

					console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
					this.enableKeys = ! value;

				}

			},

			staticMoving : {

				get: function () {

					console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
					return ! this.constraint.enableDamping;

				},

				set: function ( value ) {

					console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
					this.constraint.enableDamping = ! value;

				}

			},

			dynamicDampingFactor : {

				get: function () {

					console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
					return this.constraint.dampingFactor;

				},

				set: function ( value ) {

					console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
					this.constraint.dampingFactor = value;

				}

			}

		} );

		return OrbitControls;
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__( 1 );

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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__( 1 );

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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__( 1 );

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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__( 1 );

	module.exports = function() {

	    return function(){

	        var size = _.chunk - 0.05,
	            vertices = _.chunk * 2;

	        var material = this.material( 0x499ddc );

	        material.transparent = true;
	        material.opacity = 0.7;

	        var geometry = new THREE.BoxGeometry(
	            size, 4, size,
	            vertices, 1, vertices
	        );

	        geometry.dynamic = true;

	        for( var i = 0; i < geometry.vertices.length; i++ ){

	            var v = geometry.vertices[ i ];

	            v.side = v.y > 0 ? 'up' : 'down';

	            var h = ( ( _.noises.alt.simplex2(
	                v.x / 20, 
	                v.z / 20
	            ) * 0.8 ) + 3 );

	            v.diff = Math.random() / 6;
	            h = h + v.diff;

	            v.y += h;

	        }

	        _.mesh.water = new THREE.Mesh( geometry, material );

	        _.mesh.water.position.x = -.5;
	        _.mesh.water.position.y = 0.7;
	        _.mesh.water.position.z = -.5;

	        _.scene.add( _.mesh.water );

	    }

	}();

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__( 1 );

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

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__( 1 );

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

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__( 1 );

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

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__( 1 );

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

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__( 1 );

	module.exports = function() {

	    return function(){
	        
	        var H = window.innerHeight;
	        var W = window.innerWidth;

	        _.renderer.setSize( W, H );
	        _.camera.aspect = W / H;
	        _.camera.updateProjectionMatrix();

	    }

	}();

/***/ }
/******/ ]);