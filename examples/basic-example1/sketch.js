let img;
let ban;
let shad;
let testS;
let gl;

function preload() {
  shad = loadShader("default.vert", "default.frag");
  testS = loadShader("default.vert", "default.frag");
}

function setup() {
  createCanvas(400, 400, WEBGL);
  gl = drawingContext;
  console.log("Flag0");
  const test = new Uint8Array([
    255, 0, 0, 255,
    255, 255, 0, 255,
    0, 255, 0, 255,
    0, 0, 255, 255,
  ]); 
  img = new Texture.T2D(0, gl.RGBA, 2, 2, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, test, gl);
  img.paramI(gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  img.paramI(gl.TEXTURE_MIN_FILTER, gl.NEAREST);

  console.log("Flag1");
}

function draw() {
  background(220);
  
  shader(shad);
  img.bind();
  
  img.setUniform(shad._glProgram, "uSampler");
  
  if (shad.samplers[0].texture != undefined) {
    shad.samplers[0].texture.bindTexture = () => null;
    shad.samplers[0].texture.update = () => null;
    shad.samplers[0].location = drawingContext.getUniformLocation(shad._glProgram, "uSampler");
  }
  
  rect(0, 0, 100, 100);
  resetShader();
}