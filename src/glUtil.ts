type ShaderType = 'vertex' | 'fragment';
import { Mat4 } from 'minMatrix';

export default class GLUtil {
  private canvas: HTMLCanvasElement;
  private _gl: WebGL2RenderingContext;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this._gl = canvas.getContext('webgl') as WebGL2RenderingContext;
    this._gl.enable(this._gl.DEPTH_TEST);
    this._gl.depthFunc(this._gl.LEQUAL);
    this._gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this._gl.clearDepth(1.0);
    this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
  }

  public createProgram(vs: WebGLShader, fs: WebGLShader): WebGLProgram {
    const program: WebGLProgram = this._gl.createProgram() as WebGLProgram;
    this._gl.attachShader(program, vs);
    this._gl.attachShader(program, fs);
    this._gl.linkProgram(program);

    if (!this._gl.getProgramParameter(program, this._gl.LINK_STATUS))
      throw new Error(this._gl.getProgramInfoLog(program) as string);

    this._gl.useProgram(program);
    return program;
  }

  public createShader(shaderType: ShaderType, shaderText: string): WebGLShader {
    const glType =
      shaderType === 'vertex'
        ? this._gl.VERTEX_SHADER
        : this._gl.FRAGMENT_SHADER;
    const shader: WebGLShader = this._gl.createShader(glType) as WebGLShader;
    this._gl.shaderSource(shader, shaderText);
    this._gl.compileShader(shader);
    if (!this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS)) {
      throw new Error(this._gl.getShaderInfoLog(shader) as string);
    }
    return shader;
  }

  public createVbo(data: number[]): WebGLBuffer {
    const vbo: WebGLBuffer = this._gl.createBuffer() as WebGLBuffer;
    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, vbo);
    this._gl.bufferData(
      this._gl.ARRAY_BUFFER,
      new Float32Array(data),
      this._gl.STATIC_DRAW
    );
    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null);
    return vbo;
  }

  public createIbo(data: number[]): WebGLBuffer {
    const ibo = this._gl.createBuffer() as WebGLBuffer;
    this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, ibo);
    this._gl.bufferData(
      this._gl.ELEMENT_ARRAY_BUFFER,
      new Int16Array(data),
      this._gl.STATIC_DRAW
    );
    this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, null);
    return ibo;
  }

  public getMvpMatrix(
    eye: [number, number, number],
    center: [number, number, number],
    up: [number, number, number],
    fovy: number,
    near: number,
    far: number
  ): Float32Array {
    const mMatrix = Mat4.identity(Mat4.create());
    const vMatrix = Mat4.identity(Mat4.create());
    const pMatrix = Mat4.identity(Mat4.create());
    const mvpMatrix = Mat4.identity(Mat4.create());
    Mat4.lookAt(eye, center, up, vMatrix);
    Mat4.perspective(
      fovy,
      this.canvas.width / this.canvas.height,
      near,
      far,
      pMatrix
    );
    Mat4.multiply(pMatrix, vMatrix, mvpMatrix);
    Mat4.multiply(mvpMatrix, mMatrix, mvpMatrix);
    return mvpMatrix;
  }

  public bindVbo(vbo: WebGLBuffer): void {
    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, vbo);
  }

  public bindIbo(ibo: WebGLBuffer): void {
    this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, ibo);
  }

  public setAttribute(
    program: WebGLProgram,
    variable: string,
    stride: number
  ): void {
    const attLocation: GLint = this._gl.getAttribLocation(program, variable);
    this._gl.enableVertexAttribArray(attLocation);
    this._gl.vertexAttribPointer(
      attLocation,
      stride,
      this._gl.FLOAT,
      false,
      0,
      0
    );
  }

  public setUniform(
    program: WebGLProgram,
    data: Float32Array,
    variable: string,
    transpose = false
  ): void {
    const uniLocation: WebGLUniformLocation = this._gl.getUniformLocation(
      program,
      variable
    ) as WebGLUniformLocation;
    this._gl.uniformMatrix4fv(uniLocation, transpose, data);
  }

  get gl(): WebGLRenderingContext {
    return this._gl;
  }
}
