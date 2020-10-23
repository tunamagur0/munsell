
attribute vec3 position;
uniform mat4 mvpMatrix;
attribute vec4 vertexColor;
varying lowp vec4 fragmentColor;

void main(void) {
  gl_Position = mvpMatrix * vec4(position, 1.0);
  fragmentColor = vertexColor;
}