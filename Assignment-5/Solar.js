/////////////////////////////////////////////////////////////////////////////
//  Blaine B.
//  Modified version of Solar.js
//
/////////////////////////////////////////////////////////////////////////////

var canvas;
var gl;

//---------------------------------------------------------------------------
//
//  Declare our array of planets (each of which is a sphere)
//
// The list of planets to render.  Uncomment any planets that you are 
// including in the scene. For each planet in this list, make sure to 
// set its distance from the Sun, as well its size, color, and orbit
// around the Sun. 

var Planets = {
  Sun : undefined,
  Mercury : undefined,
  Venus : undefined,
  Earth : undefined,
  Moon : undefined,
  Mars : undefined,
  Jupiter : undefined,
  Saturn : undefined,
  Uranus : undefined,
  Neptune : undefined,
  Pluto : undefined
};

// Viewing transformation parameters
var V;  // matrix storing the viewing transformation

// Projection transformation parameters
var P;  // matrix storing the projection transformation
var near = 10;      // near clipping plane's distance
var far = 120;      // far clipping plane's distance

// Animation variables
var time = 0.0;      // time, our global time constant, which is 
                     // incremented every frame
var timeDelta = 0.5; // the amount that time is updated each fraime

//---------------------------------------------------------------------------
//
//  init() - scene initialization function
//

function init() {
  canvas = document.getElementById("webgl-canvas");

  // Configure our WebGL environment
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) { alert("WebGL initialization failed"); }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // Initialize the planets in the Planets list, including specifying
  // necesasry shaders, shader uniform variables, and other initialization
  // parameters.  This loops adds additinoal properties to each object
  // in the Planets object;

  for (var name in Planets ) {

    // Create a new sphere object for our planet, and assign it into the
    // appropriate place in the Planets dictionary.  And to simplify the code
    // assign that same value to the local variable "p", for later use.

    var planet = Planets[name] = new Sphere();

    // For each planet, we'll add a new property (which itself is a 
    // dictionary) that contains the uniforms that we will use in
    // the associated shader programs for drawing the planets.  These
    // uniform's values will be set each frame in render().

    planet.uniforms = { 
      color : gl.getUniformLocation(planet.program, "color"),
      MV : gl.getUniformLocation(planet.program, "MV"),
      P : gl.getUniformLocation(planet.program, "P"),
    };
  }

  resize();

  window.requestAnimationFrame(render);  
}


// Create a few temporary variables to make it simpler to work with
// the various properties we'll use to render the planets.  The Planets
// dictionary (created in init()) can be indexed by each planet's name.
// We'll use the temporary variables "planet" to reference the geometric
// information (e.g., sphere model) we created in the Planets array.
// Likewise, we'll use "data" to reference the database of information
// about the planets in SolarSystem.  Look at how these are
// used; it'll simplify the work you need to do.

function render() {
  time += timeDelta;
  
  var ms = new MatrixStack();
  
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  V = translate(0.0, 0.0, -0.5*(near + far));
  ms.load(V);
  
  var sun = Planets["Sun"];
  var data = SolarSystem["Sun"];
  
  sun.PointMode = false;
  
  ms.push();
  ms.scale(data.radius);
  gl.useProgram(sun.program);
  gl.uniformMatrix4fv(sun.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(sun.uniforms.P, false, flatten(P));
  gl.uniform4fv(sun.uniforms.color, flatten(data.color));
  sun.render();
  
  // Now let's create some planets!
  DrawMyPlanet(ms, "Earth", ["Moon"]);
  DrawMyPlanet(ms, "Mercury");
  DrawMyPlanet(ms,"Venus");
  DrawMyPlanet(ms, "Mars");
  DrawMyPlanet(ms, "Jupiter");
  DrawMyPlanet(ms, "Saturn");
  DrawMyPlanet(ms, "Uranus");
  DrawMyPlanet(ms, "Neptune");
  DrawMyPlanet(ms, "Pluto");
  
  ms.pop();
  
  window.requestAnimationFrame(render);
}

function DrawMyPlanet(ms, name, moons)
{
  //still keeping the same layout as before
  var planet = Planets[name];
  var data = SolarSystem[name];
  planet.PointMode = false;
  
  // Up the scope.
  ms.push();
  
  // The actual movement, scaling, and translation of the matrix
  ms.rotate((1.0 / data.year) * time, [0.0, 1.0, 1.0]);
  ms.translate(data.distance, 0, 0);
  ms.scale(data.radius);
  
  // Rendering the matrix
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  

  // checks for any moons tha might be in place, could be applied to ther planets
  if(moons) {
    for(var i = 0; i < moons.length; i++)
      {
        RenderMoon(ms, moons[i]);
      }
  }
  // Drop the scope.
  ms.pop();
}

function RenderMoon(ms, name)
{
  // debug line
  // to view the points
  // console.log(name);

  var moon = Planets[name];
  var data = SolarSystem[name];
  moon.PointMode = false;
  
  // Up the scope.
  ms.push();
  
  // //rotate --> translate --> scale 
  // //order of matrix math
  ms.rotate((1.0 / data.year) * time, [0.0, 1.0, 1.0]);
  ms.translate(data.distance, 0, 0);
  ms.scale(data.radius);
  
  // Rendering stuff
  gl.useProgram(moon.program);
  gl.uniformMatrix4fv(moon.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(moon.uniforms.P, false, flatten(P));
  gl.uniform4fv(moon.uniforms.color, flatten(data.color));
  moon.render();
  
  // Drop the scope.
  ms.pop();
}




//---------------------------------------------------------------------------
//
//  resize() - handle resize events
//

function resize() {
  var w = canvas.clientWidth;
  var h = canvas.clientHeight;

  gl.viewport(0, 0, w, h);

  var fovy = 100.0; // degrees
  var aspect = w / h;

  P = perspective(fovy, aspect, near, far);
}

//---------------------------------------------------------------------------
//
//  Window callbacks for processing various events
//

window.onload = init;
window.onresize = resize;