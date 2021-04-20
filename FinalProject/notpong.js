//-------------------------------\\
//--------Not PONG---------------\\
//-----Blaine Bailey-------------\\
//---------CS447-----------------\\
//-------------------------------\\

// scene object variables
var renderer, scene, camera, pointLight, spotLight;

// playing field
var fieldWidth = 400, fieldHeight = 200;

// paddle variables, applies to ALL paddles
var paddleWidth, paddleHeight, paddleDepth, paddleQuality;
var playerPaddleDirY = 0, cpuPaddleDirY = 0, paddleSpeed = 3;

// ball variables
var ball, playerPaddle, cpuPaddle;
var ballDirX = 1, ballDirY = 1, ballSpeed = 2;

// keep track of score
// The max score variable can be adjusted for increased gameplay time
var playerScore = 0, cpuScore = 0;
var maxScore = 6;

// [STRETCH]set opponent reflexes
// scale from 0 - 1
// can't use 0 because the paddle does not move
// .1 is also too low because the AI can't catch the opening serve
var difficulty = .2;

function setup()
{
	// update the board to reflect the max score for match win
	document.getElementById("winnerBoard").innerHTML = "First to " + maxScore + " wins!";
	
	//starts the game fresh
	// but serves dual purpose when resetting the game

	// you could give a handicap if you wnated but where is the fun?
	playerScore = 0;
	cpuScore = 0;
	
	// set up all the 3D objects in the scene	
	createScene();
	draw();
}

// initial issues with this but figured it out over time
function createScene()
{
	// set the scene size
	var WIDTH = 640,
	  HEIGHT = 360;

	// required or it won't load in properly
	var VIEW_ANGLE = 50,
	  ASPECT = WIDTH / HEIGHT,
	  NEAR = 0.1,
	  FAR = 10000;

	var c = document.getElementById("gameCanvas");

	// create a WebGL renderer, camera
	// and a scene
	renderer = new THREE.WebGLRenderer();
	camera =
	  new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR);

	scene = new THREE.Scene();

	// add the camera to the scene
	scene.add(camera);
	
	// set a default position for the camera
	// if this is not there then issues will arise in the camera while playing
	camera.position.z = 320;
	
	// start the renderer
	renderer.setSize(WIDTH, HEIGHT);

	// attach the render-supplied DOM element
	c.appendChild(renderer.domElement);

	// set up the playing surface plane 
	var planeWidth = fieldWidth, planeHeight = fieldHeight, planeQuality = 10;
		
	// Create the materials for the paddles, field, table, and the ground

	var playerPaddleMaterial = new THREE.MeshLambertMaterial({color: 0x0000FF});
	var cpuPaddleMaterial = new THREE.MeshLambertMaterial({color: 0xFF0000});
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0x4BD121});
	var tableMaterial = new THREE.MeshLambertMaterial({color: 0x111111});
	var pillarMaterial = new THREE.MeshLambertMaterial({color: 0x333332});
	var groundMaterial = new THREE.MeshLambertMaterial({color: 0xadada8});		
		
	// create the playing surface plane
	var plane = new THREE.Mesh(

	  new THREE.PlaneGeometry(
		planeWidth * 0.95,	// 95% of table width, since we want to show where the ball goes out-of-bounds
		planeHeight,
		planeQuality,
		planeQuality),

	  planeMaterial);
	  
	scene.add(plane);
	plane.receiveShadow = true;	
	
	var table = new THREE.Mesh(

		//kind of making it look like a pool table innit?
	  new THREE.CubeGeometry(
		planeWidth * 1.05,
		planeHeight * 1.03,
		100,				// an arbitrary depth, the camera can't see much of it anyway
		planeQuality,
		planeQuality,
		1),

	  tableMaterial);
	table.position.z = -51;	// sank the table in the floor a bit, except by 1 unit to see playing field
	scene.add(table);
	table.receiveShadow = true;	
		
	// lowering the resolution fo the ball increases performance
	// gotta think about the people with midtier machines
	var radius = 5, segments = 15, rings = 15;
		
	// create the sphere's material
	var sphereMaterial =
	  new THREE.MeshLambertMaterial({color: 0xff2500});
		
	// Create a ball with sphere geometry
	ball = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), sphereMaterial);

	// add the sphere to the scene
	scene.add(ball);
	
	ball.position.x = 0;
	ball.position.y = 0;

	// set ball above the playable surface
	ball.position.z = radius;
	ball.receiveShadow = true;
    ball.castShadow = true;
	
	// // set up the paddle vars
	paddleWidth = 10;
	paddleHeight = 30;
	paddleDepth = 10;
	paddleQuality = 1;
		
	playerPaddle = new THREE.Mesh(new THREE.CubeGeometry(
		paddleWidth,
		paddleHeight,
		paddleDepth,
		paddleQuality,
		paddleQuality,
		paddleQuality),

	  playerPaddleMaterial);

	// adding player paddle
	scene.add(playerPaddle);
	playerPaddle.receiveShadow = true;
    playerPaddle.castShadow = true;
	
	cpuPaddle = new THREE.Mesh(

	  new THREE.CubeGeometry(
		paddleWidth,
		paddleHeight,
		paddleDepth,
		paddleQuality,
		paddleQuality,
		paddleQuality),

	  cpuPaddleMaterial);
	  
	// adding CPU paddle
	scene.add(cpuPaddle);
	cpuPaddle.receiveShadow = true;
    cpuPaddle.castShadow = true;	
	
	// set paddles on each side of the table
	playerPaddle.position.x = -fieldWidth/2 + paddleWidth;
	cpuPaddle.position.x = fieldWidth/2 - paddleWidth;
	
	// lift paddles over playing surface
	playerPaddle.position.z = paddleDepth;
	cpuPaddle.position.z = paddleDepth;
		
	// creating the pillars just to show off the shadows from the light that is on the ball
	// this oop is for the left side
	for (var i = 0; i < 5; i++)
	{
		var backdrop = new THREE.Mesh(
		
		  new THREE.CubeGeometry( 
		  30, 
		  30, 
		  300, 
		  1, 
		  1,
		  1 ),

		  pillarMaterial);
		  
		backdrop.position.x = -50 + i * 100;
		backdrop.position.y = 230;
		backdrop.position.z = -30;		
		backdrop.castShadow = true;
		backdrop.receiveShadow = true;		  
		scene.add(backdrop);	
	}


	// creating the pillars just to show off the shadows from the light that is on the ball
	// this oop is for the right side
	for (var i = 0; i < 5; i++)
	{
		var backdrop = new THREE.Mesh(

		  new THREE.CubeGeometry( 
		  30, 
		  30, 
		  300, 
		  1, 
		  1,
		  1 ),

		  pillarMaterial);
		  
		backdrop.position.x = -50 + i * 100;
		backdrop.position.y = -230;
		backdrop.position.z = -30;
		backdrop.castShadow = true;
		backdrop.receiveShadow = true;		
		scene.add(backdrop);	
	}
	
	// still adding teh floor
	// got to have the shadows hit somewhere
	var ground = new THREE.Mesh(

	  new THREE.CubeGeometry( 
	  1000, 
	  1000, 
	  3, 
	  1, 
	  1,
	  1 ),

	  groundMaterial);
    // this position is arbitrary and is merely to show the effect of the shadows
	ground.position.z = -132;
	ground.receiveShadow = true;	
	scene.add(ground);		
		
	// create a point light
	pointLight =
	  new THREE.PointLight(0xF8D898);

	// set its position
	pointLight.position.x = -1000;
	pointLight.position.y = 0;
	pointLight.position.z = 1000;
	pointLight.intensity = 2.9;
	pointLight.distance = 10000;
	// don't forget to put it in the scene
	scene.add(pointLight);
		
	// add a spot light
	// this is important for casting shadows
    spotLight = new THREE.SpotLight(0xF8D898);
    spotLight.position.set(0, 0, 460);
    spotLight.intensity = 1.5;
    spotLight.castShadow = true;
    scene.add(spotLight);
	
	renderer.shadowMapEnabled = true;		
}

function draw()
{	
	renderer.render(scene, camera);
	// recursive drawing
	requestAnimationFrame(draw);
	
	ballPhysics();
	paddlePhysics();
	cameraPhysics();
	playerPaddleMovement();
	CPUPaddleMovement();
}

function ballPhysics()
{
	// if ball goes off the 'CLOSER' side (Player's side)
	if (ball.position.x <= -fieldWidth/2)
	{	
		// CPU scores
		cpuScore++;
		// update scoreboard
		// this is a call to the HTML document
		document.getElementById("scores").innerHTML = playerScore + "-" + cpuScore;
		// reset ball to center
		resetBall(2);
		ScoreCheck();	
	}
	
	// if ball goes off the 'FAR' side (CPU's side)
	if (ball.position.x >= fieldWidth/2)
	{	
		// Player scores
		playerScore++;

		// ln 307 & 308
		document.getElementById("scores").innerHTML = playerScore + "-" + cpuScore;
		// reset ball to center
		resetBall(1);
		ScoreCheck();	
	}
	
	// changes the direction of the ball should it be going off the 'sides'
	if (ball.position.y <= -fieldHeight/2)
	{
		ballDirY = -ballDirY;
	}	

	if (ball.position.y >= fieldHeight/2)
	{
		ballDirY = -ballDirY;
	}
	
	// update ball position over time
	ball.position.x += ballDirX * ballSpeed;
	ball.position.y += ballDirY * ballSpeed;
	
	// limit ball's y-speed to 2x the x-speed
	// forces ball to stay at a relativly easy speed to hit
	// keeps game somewhat playable for people
	if (ballDirY > ballSpeed * 2)
	{
		ballDirY = ballSpeed * 2;
	}
	else if (ballDirY < -ballSpeed * 2)
	{
		ballDirY = -ballSpeed * 2;
	}
}

// Handles CPU paddle movement and logic
function CPUPaddleMovement()
{
	// Lerp towards the ball on the y plane
	cpuPaddleDirY = (ball.position.y - cpuPaddle.position.y) * difficulty;
	
	// clamp speed if over the maximum
	if (Math.abs(cpuPaddleDirY) <= paddleSpeed)
	{	
		cpuPaddle.position.y += cpuPaddleDirY;
	}

	// force the CPU paddle to slow down while lerping
	else
	{
		// if paddle is lerping in +ve direction
		if (cpuPaddleDirY > paddleSpeed)
		{
			cpuPaddle.position.y += paddleSpeed;
		}
		// if paddle is lerping in -ve direction
		else if (cpuPaddleDirY < -paddleSpeed)
		{
			cpuPaddle.position.y -= paddleSpeed;
		}
	}
	
	// force the paddle to return to origianl size after rescaling from anims
	cpuPaddle.scale.y += (1 - cpuPaddle.scale.y) * 0.2;	
}


// Handles player's paddle movement
function playerPaddleMovement()
{
	// left
	if (Key.isDown(Key.A))		
	{
		// if we aren't at the side we move
		if (playerPaddle.position.y < fieldHeight * 0.45)
		{
			playerPaddleDirY = paddleSpeed * 0.5;
		}
		
		// if we can't move, stretch the paddle
		else
		{
			playerPaddleDirY = 0;
			playerPaddle.scale.z += (10 - playerPaddle.scale.z) * 0.2;
		}
	}	
	// right
	else if (Key.isDown(Key.D))
	{
		// see ln 393
		if (playerPaddle.position.y > -fieldHeight * 0.45)
		{
			playerPaddleDirY = -paddleSpeed * 0.5;
		}
		
		// stretch the paddle just like before
		else
		{
			playerPaddleDirY = 0;
			playerPaddle.scale.z += (10 - playerPaddle.scale.z) * 0.2;
		}
	}
	// else don't move paddle
	else
	{
		// stop the paddle
		playerPaddleDirY = 0;
	}
	
	playerPaddle.scale.y += (1 - playerPaddle.scale.y) * 0.2;	
	playerPaddle.scale.z += (1 - playerPaddle.scale.z) * 0.2;	
	playerPaddle.position.y += playerPaddleDirY;
}

// Handles camera and lighting logic
function cameraPhysics()
{
	// shadows are easily visible if we  move the camera
	spotLight.position.x = ball.position.x * 2;
	spotLight.position.y = ball.position.y * 2;
	
	// Gives player perspective on camera
	camera.position.x = playerPaddle.position.x - 100;
	camera.position.y += (playerPaddle.position.y - camera.position.y) * 0.05;
	camera.position.z = playerPaddle.position.z + 100 + 0.04 * (-ball.position.x + playerPaddle.position.x);
	
	// rotate to face towards the opponent
	camera.rotation.x = -0.01 * (ball.position.y) * Math.PI/180;
	camera.rotation.y = -60 * Math.PI/180;
	camera.rotation.z = -90 * Math.PI/180;
}

// Handles paddle collision logic
function paddlePhysics()
{
	// PLAYER PADDLE LOGIC
	
	if (ball.position.x <= playerPaddle.position.x + paddleWidth
	&&  ball.position.x >= playerPaddle.position.x)
	{
		// if ball is aligned in y dir
		if (ball.position.y <= playerPaddle.position.y + paddleHeight/2
		&&  ball.position.y >= playerPaddle.position.y - paddleHeight/2)
		{
			// and if ball is travelling towards player (-ve direction)
			if (ballDirX < 0)
			{
				// [STRETCH GOAL]
				// stretch the paddle to indicate a hit

				playerPaddle.scale.y = 2.5;


				// switch direction of ball travel to create bounce
				ballDirX = -ballDirX;

				// this is where the magic happens
				// if the ball is hit at an angle it creates a sharp hit
				ballDirY -= playerPaddleDirY * 0.7;
			}
		}
	}
	
	// OPPONENT PADDLE LOGIC	
	
	if (ball.position.x <= cpuPaddle.position.x + paddleWidth
	&&  ball.position.x >= cpuPaddle.position.x)
	{
		// aligned with y dir
		if (ball.position.y <= cpuPaddle.position.y + paddleHeight/2
		&&  ball.position.y >= cpuPaddle.position.y - paddleHeight/2)
		{
			// and if ball is travelling towards opponent (+ve direction)
			if (ballDirX > 0)
			{
				//[STRETCH GOAL]
				// stretch the paddle to indicate a hit

				cpuPaddle.scale.y = 2.5;	

				// switch direction of ball travel to create bounce
				ballDirX = -ballDirX;

				// see ln 472 & 473
				ballDirY -= cpuPaddleDirY * 0.7;
			}
		}
	}
}

function resetBall(loser)
{
	// reset toward center of player
	ball.position.x = 0;
	ball.position.y = 0;
	
	// CPU scores, CPU gets the ball
	if (loser == 1)
	{
		ballDirX = -1;
	}
	// vise versa for the player
	else
	{
		ballDirX = 1;
	}
	
	// set the ball to move +ve in y plane (towards left from the camera)
	ballDirY = 1;
}

// checking the scoreboard
function ScoreCheck()
{
	// if player has 6 points
	// but this can be adjusted of course
	if (playerScore >= maxScore)
	{
		// stop the ball
		ballSpeed = 0;
		// write to the banner
		document.getElementById("scores").innerHTML = "Player wins!";		
		document.getElementById("winnerBoard").innerHTML = "Refresh to play again";
	}

	// ln 529 & 530
	else if (cpuScore >= maxScore)
	{
		// stop the ball
		ballSpeed = 0;
		// write to the banner
		document.getElementById("scores").innerHTML = "CPU wins!";
		document.getElementById("winnerBoard").innerHTML = "Refresh to play again";
	}
}