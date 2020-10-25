import frag from './shader.frag';
import vert from './shader.vert';
import GLUtil from './glUtil';

const canvas: HTMLCanvasElement = document.querySelector(
  '#canvas'
) as HTMLCanvasElement;
canvas.width = 640;
canvas.height = 480;

const glUtil = new GLUtil(canvas);
const gl = glUtil.gl;
const vs = glUtil.createShader('vertex', vert);
const fs = glUtil.createShader('fragment', frag);
const program = glUtil.createProgram(vs, fs);

const vertexPosition: number[] = [
  -1.0,
  -1.0,
  1.0,
  1.0,
  -1.0,
  1.0,
  1.0,
  1.0,
  1.0,
  -1.0,
  1.0,
  1.0,
  -1.0,
  -1.0,
  -1.0,
  1.0,
  -1.0,
  -1.0,
  1.0,
  1.0,
  -1.0,
  -1.0,
  1.0,
  -1.0,
];

const vertexIndex: number[] = [
  0,
  1,
  2,
  2,
  3,
  0,
  3,
  2,
  6,
  6,
  7,
  3,
  7,
  6,
  5,
  5,
  4,
  7,
  4,
  5,
  1,
  1,
  0,
  4,
  4,
  0,
  3,
  3,
  7,
  4,
  1,
  5,
  6,
  6,
  2,
  1,
];

const vbo: WebGLBuffer = glUtil.createVbo(vertexPosition);
glUtil.bindVbo(vbo);
glUtil.setAttribute(program, 'position', 3);

const colorBufferData = [
  1.0,
  0.0,
  0.0,
  1.0,
  0.0,
  1.0,
  0.0,
  1.0,
  0.0,
  0.0,
  1.0,
  1.0,
  1.0,
  0.0,
  0.0,
  1.0,
  0.0,
  1.0,
  0.0,
  1.0,
  0.0,
  0.0,
  1.0,
  1.0,
  1.0,
  0.0,
  0.0,
  1.0,
  0.0,
  1.0,
  0.0,
  1.0,
  0.0,
  0.0,
  1.0,
  1.0,
];
const colorBuffer: WebGLBuffer = glUtil.createVbo(colorBufferData);
glUtil.bindVbo(colorBuffer);
glUtil.setAttribute(program, 'vertexColor', 4);

const vMatrix: Float32Array = glUtil.getViewMatrix(
  new Float32Array([4, 3, -3]),
  new Float32Array([0, 0, 0]),
  new Float32Array([0, 1, 0])
);
const pMatrix: Float32Array = glUtil.getProductionMatrix(90, 0.1, 100);
const vpMatrix: Float32Array = glUtil.multiply(pMatrix, vMatrix);

const mMatrix: Float32Array = glUtil.getIdentity();
const mvpMatrix: Float32Array = glUtil.multiply(vpMatrix, mMatrix);
glUtil.setUniform(program, mvpMatrix, 'mvpMatrix');

const ibo: WebGLBuffer = glUtil.createIbo(vertexIndex);
glUtil.bindIbo(ibo);
gl.drawElements(gl.TRIANGLE_STRIP, vertexIndex.length, gl.UNSIGNED_SHORT, 0);
gl.flush();
