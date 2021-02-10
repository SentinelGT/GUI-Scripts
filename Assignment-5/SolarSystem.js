var SolarSystem = {
  // keeping all the axes fixed for the sake of simplicity
  Sun : {
    radius : 3,  
    distance : 0,
    year : 0,
    axis : [0.0, 1.0, 0.0],
    color : [ 1.0, 1.0, 0.0, 1.0 ]
  },
  Mercury : {
    radius : 0.0553,
    distance : 1.5,
    year : 0.241,
    axis : [0.0, 1.0, 0.0],
    color : [ 1.0, 0.0, 0.0, 1.0 ]
  },
  Venus : {
    radius : 0.45,
    distance : 3.5,
    year : 0.615,
    axis : [0.0, 1.0, 0.0],
    color : [ 1.0, 0.0, 1.0, 1.0 ]
  },
  Earth : {
    radius : 0.6,
    distance : 7,
    year : 1,
    day : 1,
    axis : [0.0, 1.0, 0.0],
    color : [ 0.0, 0.0, 1.0, 1.0 ]
  },
  Moon : {
    radius : 0.2724,
    distance : 1.5,
    year : 0.4,
    axis : [0.0, 1.0, 0.0],
    color : [ 0.5, 0.5, 0.5, 1.0 ]
  },
  Mars : {
    radius : 0.532,
    distance : 8.5,
    year : 1.88,
    axis : [0.0, 1.0, 0.0],
    color : [ 1.0, 0.0, 0.0, 1.0 ]
  },
  Jupiter : {
    radius : 1,
    distance : 11,
    year : 11.9,
    axis : [0.0, 1.0, 0.0],
    color : [ 1.0, 153/255, 0.0, 1.0 ]
  },
  Saturn : {
    radius : .9,
    distance : 13,
    year : 29.4,
    axis : [0.0, 1.0, 0.0],
    color : [ 1.0, 1.0, 0.0, 1.0 ]
  },
  Uranus : {
    radius : .65,
    distance : 15,
    year : 83.7,
    axis : [0.0, 1.0, 0.0],
    color : [ 0.0, 0.1, 1.0, 1.0 ]
  },
  Neptune : {
    radius : .6,
    distance : 17,
    year : 163.7,
    axis : [0.0, 1.0, 0.0],
    color : [ 0.0, 0.0, 1.0, 1.0 ]
  },
  Pluto : {
    radius : .054,
    distance : 21,
    year : 247.9,
    axis : [0.0, 1.0, 0.0],
    color : [ 150/255, 75/255, 0.0, 1.0 ]
  }
};