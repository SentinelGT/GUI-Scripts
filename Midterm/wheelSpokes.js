// Heavily modified solar system array
// no need to reinvent what we already have
// These position will create a very "bubbly" tire

// all spheres excluding the one that lies in the center are uniform

var tireSystems = {

  Center : {
    radius : 4,  
    distance : 0,
    year : 0,
    color : [ 0.2, 1.0, 0.5, 1.0 ]
  },
  spokeAOne : {
    radius : 2,
    distance : 11,
    year : 2,
	axis : [0.0, 0.0, 1.0],
    color : [ 0.2, 0.2, 0.2, 1.0 ]
  },
  spokeATwo : {
    radius : 2,
    distance : 8,
    year : 2,
	axis : [0.0, 0.0, 1.0],
    color : [ 0.5, 0.5, 0.5, 1.0 ]
  },
  spokeAThree : {
    radius : 2,
    distance : 4.5,
    year : 2,
	axis : [0.0, 0.0, 1.0],
    color : [ 0.5, 0.5, 0.5, 1.0 ]
  },
  spokeBOne : {
    radius : 2,
    distance : 11,
    year : 2,
	axis : [0.0, 0.0, 1.0],
    color : [ 0.2, 0.2, 0.2, 1.0 ]
  },
  spokeBTwo : {
    radius : 2,
    distance : 8,
    year : 2,
	axis : [0.0, 0.0, 1.0],
    color : [ 0.5, 0.5, 0.5, 1.0 ]
  },
  spokeBThree : {
    radius : 2,
    distance : 4.5,
    year : 2,
	axis : [0.0, 0.0, 1.0],
    color : [ 0.5, 0.5, 0.5, 1.0 ]
  },
  spokeCOne : {
    radius : 2,
    distance : 8,
    year : 2,
	axis : [0.0, 0.0, 1.0],
    color : [ 0.5, 0.5, 0.5, 1.0 ]
  },
  spokeCTwo : {
    radius : 2,
    distance : 4.5,
    year : 2,
	axis : [0.0, 0.0, 1.0],
    color : [ 0.5, 0.5, 0.5, 1.0 ]
  },
    spokeCThree : {
    radius : 2,
    distance : 11,
    year : 2,
	axis : [0.0, 0.0, 1.0],
    color : [ 0.2, 0.2, 0.2, 1.0 ]
  },
  spokeDOne : {
	radius : 2,
    distance : 8,
    year : 2,
	axis : [0.0, 0.0, 1.0],
    color : [ 0.5, 0.5, 0.5, 1.0 ]
  },
  spokeDTwo : {
	radius : 2,
    distance : 4,
    year : 2,
	axis : [0.0, 0.0, 1.0],
    color : [ 0.5, 0.5, 0.5, 1.0 ]
  },
   spokeDThree : {
   radius : 2,
   distance : 11,
   year : 2,
   axis : [0.0, 0.0, 1.0],
   color : [ 0.2, 0.2, 0.2, 1.0 ]
  },
   tireOne : {
   radius : 2,
   distance : 4,
   year : 2,
   axis : [0.0, 0.0, 1.0],
   color : [ 0.2, 0.2, 0.2, 1.0 ]
  },
   tireTwo : {
   radius : 2,
   distance : 4,
   year : 2,
   axis : [0.0, 0.0, 1.0],
   color : [ 0.2, 0.2, 0.2, 1.0 ]
  },
   tireThree : {
   radius : 2,
   distance : 4,
   year : 2,
   axis : [0.0, 0.0, 1.0],
   color : [ 0.2, 0.2, 0.2, 1.0 ]
  },
   tireFour : {
   radius : 2,
   distance : 4,
   year : 2,
   axis : [0.0, 0.0, 1.0],
   color : [ 0.2, 0.2, 0.2, 1.0 ]
  },
   tireFive : {
   radius : 2,
   distance : 4,
   year : 2,
   axis : [0.0, 0.0, 1.0],
   color : [ 0.2, 0.2, 0.2, 1.0 ]
  },
    tireSix : {
   radius : 2,
   distance : 4,
   year : 2,
   axis : [0.0, 0.0, 1.0],
   color : [ 0.2, 0.2, 0.2, 1.0 ]
  },
    tireSeven : {
   radius : 2,
   distance : 4,
   year : 2,
   axis : [0.0, 0.0, 1.0],
   color : [ 0.2, 0.2, 0.2, 1.0 ]
  },
    tireEight : {
   radius : 2,
   distance : 4,
   year : 2,
   axis : [0.0, 0.0, 1.0],
   color : [ 0.2, 0.2, 0.2, 1.0 ]
  },
    tireNine : {
   radius : 2,
   distance : 4,
   year : 2,
   axis : [0.0, 0.0, 1.0],
   color : [ 0.2, 0.2, 0.2, 1.0 ]
  },
    tireTen : {
   radius : 2,
   distance : 4,
   year : 2,
   axis : [0.0, 0.0, 1.0],
   color : [ 0.2, 0.2, 0.2, 1.0 ]
  },
   tireEleven : {
   radius : 2,
   distance : 4,
   year : 2,
   axis : [0.0, 0.0, 1.0],
   color : [ 0.2, 0.2, 0.2, 1.0 ]
  },
   tireTwelve : {
   radius : 2,
   distance : 4,
   year : 2,
   axis : [0.0, 0.0, 1.0],
   color : [ 0.2, 0.2, 0.2, 1.0 ]
  },
   tireThirteen : {
   radius : 2,
   distance : 4,
   year : 2,
   axis : [0.0, 0.0, 1.0],
   color : [ 0.2, 0.2, 0.2, 1.0 ]
  },
   tireFourteen : {
   radius : 2,
   distance : 4,
   year : 2,
   axis : [0.0, 0.0, 1.0],
   color : [ 0.2, 0.2, 0.2, 1.0 ]
  },
   tireFifteen : {
   radius : 2,
   distance : 4,
   year : 2,
   axis : [0.0, 0.0, 1.0],
   color : [ 0.2, 0.2, 0.2, 1.0 ]
  },
   tireSixteen : {
   radius : 2,
   distance : 4,
   year : 2,
   axis : [0.0, 0.0, 1.0],
   color : [ 0.2, 0.2, 0.2, 1.0 ]
  },
   tireSeventeen : {
   radius : 2,
   distance : 4,
   year : 2,
   axis : [0.0, 0.0, 1.0],
   color : [ 0.2, 0.2, 0.2, 1.0 ]
  },
   tireEighteen : {
   radius : 2,
   distance : 4,
   year : 2,
   axis : [0.0, 0.0, 1.0],
   color : [ 0.2, 0.2, 0.2, 1.0 ]
  },
   tireNineteen : {
   radius : 2,
   distance : 4,
   year : 2,
   axis : [0.0, 0.0, 1.0],
   color : [ 0.2, 0.2, 0.2, 1.0 ]
  },
   tireTwenty : {
   radius : 2,
   distance : 4,
   year : 2,
   axis : [0.0, 0.0, 1.0],
   color : [ 0.2, 0.2, 0.2, 1.0 ]
  },  
  
};