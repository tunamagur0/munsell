import frag from './shader.frag';
import vert from './shader.vert';
import GLUtil from './glUtil';
import { Mat4 } from 'minmatrix';

const canvas: HTMLCanvasElement = document.querySelector(
  '#canvas'
) as HTMLCanvasElement;
canvas.width = 1280;
canvas.height = 720;

let cameraZ = 25;
let rx = (45 / 180) * Math.PI;
let ry = (45 / 180) * Math.PI;
const pointerPos = { x: 0, y: 0 };
const colors = [
  [0, 1, 6, 10, 12, 13, 12, 10, 6, 0],
  [0, 2, 6, 14, 12, 10, 8, 6, 4, 0],
  [0, 6, 14, 12, 10, 8, 6, 4, 2, 0],
  [0, 4, 10, 12, 10, 8, 6, 4, 2, 0],
  [0, 2, 6, 8, 10, 10, 10, 8, 4, 0],
  [0, 4, 8, 10, 10, 10, 10, 8, 6, 1],
  [0, 4, 6, 8, 10, 10, 10, 8, 6, 1],
  [0, 4, 6, 10, 12, 14, 14, 12, 10, 1],
  [0, 4, 6, 8, 10, 12, 12, 12, 10, 1],
  [0, 4, 8, 12, 14, 14, 12, 12, 8, 1],
];

const calcEyePos = (): Float32Array => {
  return new Float32Array([
    cameraZ * Math.sin(rx) * Math.cos(ry),
    cameraZ * Math.sin(ry),
    cameraZ * Math.cos(rx) * Math.cos(ry),
  ]);
};
let eyePos = calcEyePos();

canvas.addEventListener('wheel', (e: WheelEvent) => {
  e.preventDefault();
  cameraZ += e.deltaY * 0.01;
  cameraZ = Math.max(2, cameraZ);
  eyePos = calcEyePos();
});

canvas.addEventListener('pointerdown', (e: PointerEvent) => {
  pointerPos.x = e.clientX;
  pointerPos.y = e.clientY;

  canvas.onpointermove = (e: PointerEvent) => {
    const dx = e.clientX - pointerPos.x;
    const dy = e.clientY - pointerPos.y;
    pointerPos.x = e.clientX;
    pointerPos.y = e.clientY;

    rx += (Math.PI / 180) * dx;
    ry += (Math.PI / 180) * dy;
    if (rx < -Math.PI) rx += Math.PI * 2;
    if (rx > Math.PI) rx -= Math.PI * 2;
    if (ry < -Math.PI / 2) ry = -Math.PI / 2;
    if (ry > Math.PI / 2) ry = Math.PI / 2;
    eyePos = calcEyePos();
  };

  window.onpointerup = () => {
    canvas.onpointermove = null;
    window.onpointerup = null;
  };
});

const glUtil = new GLUtil(canvas);
const gl = glUtil.gl;
const vs = glUtil.createShader('vertex', vert);
const fs = glUtil.createShader('fragment', frag);
const program = glUtil.createProgram(vs, fs);

const calcVertexPositon = (
  innerWidth: number,
  outerWidth: number
): number[] => {
  return [
    -1.0,
    -1.0,
    innerWidth,
    1.0,
    -1.0,
    outerWidth,
    1.0,
    1.0,
    outerWidth,
    -1.0,
    1.0,
    innerWidth,
    -1.0,
    -1.0,
    -innerWidth,
    1.0,
    -1.0,
    -outerWidth,
    1.0,
    1.0,
    -outerWidth,
    -1.0,
    1.0,
    -innerWidth,
  ];
};

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

const callback = () => {
  const ibo: WebGLBuffer = glUtil.createIbo(vertexIndex);
  glUtil.bindIbo(ibo);

  const vMatrix: Float32Array = glUtil.getViewMatrix(
    new Float32Array(eyePos),
    new Float32Array([0, 0, 0]),
    new Float32Array([0, 1, 0])
  );
  const pMatrix: Float32Array = glUtil.getProductionMatrix(90, 0.1, 100);
  const vpMatrix: Float32Array = glUtil.multiply(pMatrix, vMatrix);

  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
  for (const [index, color] of colors.entries()) {
    const angle = (index / color.length) * Math.PI * 2;
    const x = Math.cos(angle);
    const z = Math.sin(angle);
    const centers = color.map((val, i) =>
      new Array(val + 1)
        .fill(0)
        .map((_, j) => [x * (j + 1), 10 - i * 2, z * (j + 1)])
    );

    for (const value of centers) {
      for (const [i, center] of value.entries()) {
        // 同心円状に生成するほうがパフォーマンスがいい
        const vbo: WebGLBuffer = glUtil.createVbo(
          calcVertexPositon(i / 14, (i + 1) / 14)
        );
        glUtil.bindVbo(vbo);
        glUtil.setAttribute(program, 'position', 3);

        const mMatrix: Float32Array = glUtil.getIdentity();
        Mat4.translate(mMatrix, new Float32Array(center), mMatrix);
        Mat4.rotate(mMatrix, -angle, new Float32Array([0, 1, 0]), mMatrix);
        const mvpMatrix: Float32Array = glUtil.multiply(vpMatrix, mMatrix);
        glUtil.setUniform(program, mvpMatrix, 'mvpMatrix');

        gl.drawElements(
          gl.TRIANGLE_STRIP,
          vertexIndex.length,
          gl.UNSIGNED_SHORT,
          0
        );
      }
    }
  }
  gl.flush();
  requestAnimationFrame(callback);
};

requestAnimationFrame(callback);
