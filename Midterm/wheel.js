/////////////////////////////////////////////////////////////////////////////
//
//  No need to reinvent the 'tire'
//
/////////////////////////////////////////////////////////////////////////////

var canvas;
var gl;


//drawing the tire

var tireParts = {
  Center : undefined,
  spokeAOne : undefined,
  spokeATwo : undefined,
  spokeAThree : undefined,
  spokeBOne : undefined,
  spokeBTwo : undefined,
  spokeBThree : undefined,
  spokeCOne : undefined,
  spokeCTwo : undefined,
  spokeCThree : undefined,
  spokeDOne : undefined,
  spokeDTwo : undefined,
  spokeDThree : undefined,
  tireOne : undefined,
  tireTwo : undefined,
  tireThree : undefined,
  tireFour : undefined,
  tireFive : undefined,
  tireSix : undefined,
  tireSeven : undefined,
  tireEight : undefined,
  tireNine : undefined,
  tireTen : undefined,
  tireEleven : undefined,
  tireTwelve : undefined,
  tireThirteen : undefined,
  tireFourteen : undefined,
  tireFifteen : undefined,
  tireSixteen : undefined,
  tireSeventeen : undefined,
  tireEighteen : undefined,
  tireNineteen : undefined,
  tireTwenty : undefined,  
  
};


// we know what this does already
var V; 
var P;  
var near = 10;      
var far = 120;      

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

  //color scale to simulate colors, or time of day



  gl.clearColor(0.0, 0.0, 0.0, 0.0);
  
  gl.enable(gl.DEPTH_TEST);
  

  for (var name in tireParts ) {

    // if you need to know how this part works please look at the solar system
    // did not use the previous function from solars system as it wasn't very scalable
    // moon position and more planets might have caused problems.
    var tirePart = tireParts[name] = new Sphere();


    tirePart.uniforms = { 
      color : gl.getUniformLocation(tirePart.program, "color"),
      MV : gl.getUniformLocation(tirePart.program, "MV"),
      P : gl.getUniformLocation(tirePart.program, "P"),
    };
  }

  resize();

  window.requestAnimationFrame(render);  
}

//---------------------------------------------------------------------------
//
//  render() - render the scene
//  This 'tire' will have a bunch of other smaller spheres to render itself

function render() {
  time += timeDelta;

  var ms = new MatrixStack();



  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


  V = translate(0.0, 0.0, -0.5*(near + far));
  ms.load(V);  

  //using matrix stack to draw and render tire parts and spokes

  var name, tirePart, data;
   
  name = "Center";
  tirePart = tireParts[name];
  data = tireSystems[name];
  
  

  tirePart.PointMode = false; 
  


  ms.push();
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
  
  name = "spokeAOne";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance , 0, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
  
  name = "spokeATwo";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance , 0, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
  
  Ename = "spokeAThree";
  EtirePart = tireParts[Ename];
  Edata = tireSystems[Ename];

  EtirePart.PointMode = false;

  ms.push();
  ms.rotate(Edata.year * time, Edata.axis);
  ms.translate(Edata.distance , 0, 0);
  ms.scale(Edata.radius);
  gl.useProgram(EtirePart.program);
  gl.uniformMatrix4fv(EtirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(EtirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(EtirePart.uniforms.color, flatten(Edata.color));
  EtirePart.render();
  ms.pop();
  
  
  name = "spokeBOne";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(-data.distance , 0, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
  
  name = "spokeBTwo";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

 ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(-data.distance , 0, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
 
  name = "spokeBThree";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(-data.distance , 0, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  

  
  
  name = "spokeCOne";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;
  
  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 7.5, 4.5,  0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();

  name = "spokeCTwo";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;
  
  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 4, 8,  0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
    
  name = "spokeCThree";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 10.5, 11,  0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
  name = "spokeDOne";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;
  
  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 7.5, -4.5,  0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
  name = "spokeDTwo";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;
  
  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 3.5, -8,  0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();

  name = "spokeDThree";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 10.5, -11, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
  name = "tireOne";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 8, -11, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
  name = "tireTwo";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 11.5, -10, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
  name = "tireThree";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 13, -9, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
  name = "tireThree";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 14, -6.5, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
  name = "tireFour";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 15, -4, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
  name = "tireFive";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 15, -4, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
  name = "tireSix";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance + 0.5, 11, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
  name = "tireSeven";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance + 3.5, 9, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
  name = "tireEight";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance + 5.5, 7.5, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
  name = "tireNine";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance + 7, 5.5, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
  name = "tireTen";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance + 8, 3, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
    name = "tireEleven";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance + 7, -4, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
  name = "tireTwelve";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance + 6, -6, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
  name = "tireThirteen";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance + 4.5, -7.5, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
  name = "tireFourteen";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance + 2, -10, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
  name = "tireFifteen";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance , -11, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
    name = "tireSixteen";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 16, 3, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
  name = "tireSeventeen";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 14, 6, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
  name = "tireEighteen";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 12, 7.5, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
  name = "tireNineteen";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 10, 9, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  
  name = "tireTwenty";
  tirePart = tireParts[name];
  data = tireSystems[name];

  tirePart.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 7, 11, 0);
  ms.scale(data.radius);
  gl.useProgram(tirePart.program);
  gl.uniformMatrix4fv(tirePart.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(tirePart.uniforms.P, false, flatten(P));
  gl.uniform4fv(tirePart.uniforms.color, flatten(data.color));
  tirePart.render();
  ms.pop();
  window.requestAnimationFrame(render);
}

//---------------------------------------------------------------------------
//
//  resize() - handle resize events
//

function resize() {
  var w = canvas.clientWidth;
  var h = canvas.clientHeight;

  gl.viewport(0, 0, w, h);

  var fovy = 50.0; // for more of a top down view
  var aspect = w / h;

  P = perspective(fovy, aspect, near, far);
}

//---------------------------------------------------------------------------
//
//  Window callbacks for processing various events
//

window.onload = init;
window.onresize = resize;