function my_Cube( vertexShaderId, fragmentShaderId)
{
    // initialize with a shader name ID

    var myVertShader = vertexShaderId || "myCube-vertex-shader";
    var myFragShader = fragmentShaderId || "myCube-fragment-shader";

    //the 'program' to start initshader
    this.program = initShaders(gl, myVertShader, myFragShader);

    //check for something(?)
    if (this.program < 0) 
    {
        alert("Error: Cube shader pipe failed to compile properly. \n\n" +
            " \tvertex shader ID: \t" + myVertShader + "\n" +
            "\tfragment shader ID: \t" + myFragShader + "\n" );
        return;
    }

    this.positions = {
        values : new Float32Array([
            //add MY own list of vertex positions
            -0.5, -0.5, -0.5, //0, A

            -0.5, .5, -0.5, //1, B

            -0.5, .5, .5, //2, C

            -0.5, -0.5, .5, //3, D

            .5, -0.5, -0.5, //4, E

            .5, .5, -0.5, //5, F

            .5, .5, .5, //6, G
            
            .5, -0.5, .5 //7, H

        ]),
        numComponents : 3
    };

    this.indicies = {
        values : new Uint16Array([
            //add my own set of triangle indicies to be created for each face of the cube
            0, 7, 3, 0, 4, 7, //side AEHD

            4, 6, 7, 4, 5, 6, //side EFGH

            5, 2, 6, 5, 1, 2, //side FBCG

            1, 3, 2, 1, 0, 3, //side BADC

            3, 7, 6, 2, 3, 6, //side CDHG

            4, 1, 5, 4, 0, 1 //side EABF

        ])
    };
    this.indicies.count = this.indicies.values.length;

    // START TEXTURE COORDINATE PLACEMENT
    
    //creating coordinates for the texture map to actually show up
    var positionLocation = gl.getAttribLocation(program, "vPosition");
    var texcoordLocation = gl.getAttribLocation(program, "aTexcoord");

    //create the buffer for texcoordinate(s)
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(texcoordLocation);

    gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);

    setTexcoords(gl);

    //fill buffer with coordinates of the CUBE that we are using
    function setTexcoords(gl) {
        gl.bufferData(
            gl.ARRAY_BUFFER, new Float32Array([
                0, 0,
                0, 1,
                1, 0,
                0, 1,
                1, 1,
                1, 0
            ]),
        gl.STATIC_DRAW);
    }

    //create a texture for our cube
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    //fill texture with blue pixel?
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 255, 255]));

    //async load image
    var image = new Image();
    image.src - "../Assignment-6/MS_paint_akagi.JPG";
    image.addEventListener('load', function() {
        //with image loaded copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
    })






    // END TEXTURE COORDINATE PLACEMENT


    //buffer creation for the vertex points
    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW);

    //buffer creation for the indivies for the CUBE
    this.indicies.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicies.buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indicies.values, gl.STATIC_DRAW);

    this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition");
    gl.enableVertexAttribArray(this.positions.attributeLoc);

    //not sure what this line is for(?)
    MVLoc = gl.getUniformLocation(this.program, "MV");

    this.MV = undefined;

    //render function to draw the cube shape
    this.render = function ()
    {
        //referring to the initshaders provided by WebGL library
        gl.useProgram(this.program);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.buffer);
        gl.vertexAttribPointer(this.positions.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicies.buffer);

        gl.uniformMatrix4fv(MVLoc, gl.FALSE, flatten(this.MV));

        //draw cubes base(?)
        gl.drawElements(gl.TRIANGLES, this.indicies.count, gl.UNSIGNED_SHORT, 0);
    }
}; //end function myCube