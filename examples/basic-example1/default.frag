#version 300 es

precision mediump float;

in vec2 vTexCoord;

uniform sampler2D uSampler;
//uniform float test;

out vec4 fragColor;

void main() {
  fragColor = texture(uSampler, vTexCoord);
  //fragColor = vec4(test, 1.0, 0.0, 1.0);
}