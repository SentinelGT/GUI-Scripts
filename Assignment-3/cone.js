var gl = null;
var myCone = null;

function init() {
    var canvas = document.getElementById( "webgl-canvas" );

    // WebGLUtils should be called above all else or it won't know what to draw on/with
    gl = WebGLUtils.setupWebGL( canvas );

    myCone = new Cone(gl, 8);

    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }


    render();
}

function render() {

    myCone.render();
}

window.onload = init;
