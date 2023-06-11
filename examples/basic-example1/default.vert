#version 300 es

in vec3 aPosition;
in vec2 aTexCoord;

out vec2 vTexCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
  vec4 positionVec4 = vec4(aPosition, 1.0);
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
  vTexCoord = aTexCoord;
}