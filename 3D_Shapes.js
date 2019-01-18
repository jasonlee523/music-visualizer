function cylinderVertex(u, v) {
  let theta = 2 * Math.PI * u;
  let c = Math.cos(theta);
  let s = Math.sin(theta);
  if(v == 0)
    return [0, 0, -1, 0, 0, -1, u, v];
  else if(v == 0.2)
    return [c, s, -1, 0, 0, -1, u, v];
  else if(v == 0.4)
    return [c, s, -1, c, s, 0, u, v];
  else if(v == 0.6)
    return [c, s, 1, c, s, 0, u, v];
  else if(v == 0.8)
    return [c, s, 1, 0, 0, 1, u, v];
  else if(v == 1)
    return [0, 0, 1, 0, 0, 1, u, v];
}

function check(v) {
  let o = {};
  if(v == .2) {
    o.pos = -1;
    o.nor = -1;
  }
  else if(v == .4) {
    o.pos = -1;
    o.nor = 0;
  }
  else if(v == .6) {
    o.pos = 1;
    o.nor = 0;
  }
  else if(v == .8) {
    o.pos = 1;
    o.nor = 1;
  }
  return o;
}

function cubeVertex(u, v) {
  let z = check(v);
  if(v == 0)
    return [0,0,-1,0,0,-1,u, v];
  if(v == 1)
    return [0,0,1,0,0,1,u,v]
  if(u == 0)
    return [1, 1, z.pos, 1, 0, z.nor, u, v];
  else if(u == 0.125)
    return [1, 1, z.pos, 0, 1, z.nor, u, v];
  else if(u == 0.25)
    return [-1, 1, z.pos, 0, 1, z.nor, u, v];
  else if(u == 0.375)
    return [-1, 1, z.pos, -1, 0, z.nor, u, v];
  else if(u == 0.5)
    return [-1, -1, z.pos, -1, 0, z.nor, u, v];
  else if(u == 0.625)
    return [-1, -1, z.pos, 0, -1, z.nor, u, v];
  else if(u == 0.75)
    return [1, -1, z.pos, 0, -1, z.nor, u, v];
  else if(u == 0.875)
    return [1, -1, z.pos, 1, 0, z.nor, u, v];
  else if(u == 1)
    return [1, 1, z.pos, 1, 0, z.nor, u, v];
}

// RETURNS ONE VERTEX OF A UNIT SPHERE, GIVEN PARAMETRIC u,v

function sphereVertex(u, v) {
  let theta = 2 * Math.PI * u;
  let phi   = Math.PI * (v - .5);
  let x = Math.cos(phi) * Math.cos(theta);
  let y = Math.cos(phi) * Math.sin(theta);
  let z = Math.sin(phi);
  return [x, y, z,  x, y, z,  u, v];
}

// CREATE A PARAMETRIC SHAPE AS A SINGLE TRIANGLE STRIP

function createParametricShape(func, nu, nv) {
  let vertices = [];
  for (let j = 0 ; j < nv ; j++) {
    let v0 =  j    / nv;
    let v1 = (j+1) / nv;
    for (let i = 0 ; i <= nu ; i++) {
      let u = i / nu;
      if (j % 2)
      u = 1 - u;
      vertices = vertices.concat(func(u, v0));
      vertices = vertices.concat(func(u, v1));
    }
  }
  return vertices;
}

var sphereTriangleStrip = createParametricShape(sphereVertex, 30, 10);
var cylinderTriangleStrip = createParametricShape(cylinderVertex, 30, 5);
var cubeTriangleStrip = createParametricShape(cubeVertex, 8, 5)
