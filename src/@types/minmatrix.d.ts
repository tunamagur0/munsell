declare module 'minmatrix' {
  type TMat4 = Float32Array;
  type TVec3 = Float32Array;
  type TVec2 = Float32Array;
  type TQtn = Float32Array;
  export class Mat4 {
    /**
     * 4x4 の正方行列を生成する
     * @return {Float32Array} 行列格納用の配列
     */
    static create(): Float32Array;
    /**
     * 単位行列を返す（引数が与えられた場合はそれを初期化する）
     * @param {TMat4} [source] - 単位化する行列
     * @return {TMat4} 単位化した行列
     */
    static identity(source?: TMat4): TMat4;
    /**
     * 行列の値をコピーして返す（第二引数が与えられた場合その行列がコピー先となる）
     * @param {TMat4} target - コピー元の行列
     * @param {TMat4} [source] - コピー先の行列
     * @return {TMat4} コピー先の行列
     */
    static copy(target: TMat4, source?: TMat4): TMat4;
    /**
     * 行列を乗算して返す（第三引数が与えられた場合その行列に結果を代入する）
     * @param {TMat4} mat0 - 乗算される行列
     * @param {TMat4} mat1 - 乗算する行列
     * @param {TMat4} [source] - 乗算結果を格納する行列
     * @return {TMat4} 乗算結果の行列
     */
    static multiply(mat0: TMat4, mat1: TMat4, source?: TMat4): TMat4;
    /**
     * 行列に拡大縮小を適用する（第三引数が与えられた場合その行列に結果を代入する）
     * @param {TMat4} mat - 適用を受ける行列
     * @param {TVec3} vec - XYZ の各軸に対して拡縮を適用する値のベクトル
     * @param {TMat4} [source] - 結果を格納する行列
     * @return {TMat4} 結果の行列
     */
    static scale(mat: TMat4, vec: TVec3, source?: TMat4): TMat4;
    /**
     * 行列に平行移動を適用する（第三引数が与えられた場合その行列に結果を代入する）
     * @param {TMat4} mat - 適用を受ける行列
     * @param {TVec3} vec - XYZ の各軸に対して平行移動を適用する値の行列
     * @param {TMat4} [source] - 結果を格納する行列
     * @return {TMat4} 結果の行列
     */
    static translate(mat: TMat4, vec: TVec3, source?: TMat4): TMat4;
    /**
     * 行列に回転を適用する（第四引数が与えられた場合その行列に結果を代入する）
     * @param {TMat4} mat - 適用を受ける行列
     * @param {number} angle - 回転量を表す値（ラジアン）
     * @param {TVec3} axis - 回転の軸
     * @param {TMat4} [source] - 結果を格納する行列
     * @return {TMat4} 結果の行列
     */
    static rotate(
      mat: TMat4,
      angle: number,
      axis: TVec3,
      source?: TMat4
    ): TMat4;
    /**
     * ビュー座標変換行列を生成する（第四引数が与えられた場合その行列に結果を代入する）
     * @param {TVec3} eye - 視点位置
     * @param {TVec3} center - 注視点
     * @param {TVec3} up - 上方向を示すベクトル
     * @param {TMat4} [source] - 結果を格納する行列
     * @return {TMat4} 結果の行列
     */
    static lookAt(eye: TVec3, center: TVec3, up: TVec3, source?: TMat4): TMat4;
    /**
     * 透視投影変換行列を生成する（第五引数が与えられた場合その行列に結果を代入する）
     * @param {number} fovy - 視野角（度数法）
     * @param {number} aspect - アスペクト比（幅 / 高さ）
     * @param {number} near - ニアクリップ面までの距離
     * @param {number} far - ファークリップ面までの距離
     * @param {TMat4} [source] - 結果を格納する行列
     * @return {TMat4} 結果の行列
     */
    static perspective(
      fovy: number,
      aspect: number,
      near: number,
      far: number,
      source?: TMat4
    ): TMat4;
    /**
     * 正射影投影変換行列を生成する（第七引数が与えられた場合その行列に結果を代入する）
     * @param {number} left - 左端
     * @param {number} right - 右端
     * @param {number} top - 上端
     * @param {number} bottom - 下端
     * @param {number} near - ニアクリップ面までの距離
     * @param {number} far - ファークリップ面までの距離
     * @param {TMat4} [source] - 結果を格納する行列
     * @return {TMat4} 結果の行列
     */
    static ortho(
      left: number,
      right: number,
      top: number,
      bottom: number,
      near: number,
      far: number,
      source?: TMat4
    ): TMat4;
    /**
     * 転置行列を生成する（第二引数が与えられた場合その行列に結果を代入する）
     * @param {TMat4} mat - 適用する行列
     * @param {TMat4} [source] - 結果を格納する行列
     * @return {TMat4} 結果の行列
     */
    static transpose(mat: TMat4, source?: TMat4): TMat4;
    /**
     * 逆行列を生成する（第二引数が与えられた場合その行列に結果を代入する）
     * @param {TMat4} mat - 適用する行列
     * @param {TMat4} [source] - 結果を格納する行列
     * @return {TMat4} 結果の行列
     */
    static inverse(mat: TMat4, source?: TMat4): TMat4;
    /**
     * 行列にベクトルを乗算する（ベクトルに行列を適用する）
     * @param {TMat4} mat - 適用する行列
     * @param {Array.<number>} vec - 乗算するベクトル（４つの要素を持つ配列）
     * @return {Float32Array} 結果のベクトル
     */
    static toVecIV(
      mat: TMat4,
      vec: [number, number, number, number]
    ): Float32Array;
    /**
     * カメラのプロパティに相当する情報を受け取り行列を生成する
     * @param {TVec3} position - カメラの座標
     * @param {TVec3} centerPoint - カメラの注視点
     * @param {TVec3} upDirection - カメラの上方向
     * @param {number} fovy - 視野角
     * @param {number} aspect - アスペクト比
     * @param {number} near - ニアクリップ面
     * @param {number} far - ファークリップ面
     * @param {TMat4} vmat - ビュー座標変換行列の結果を格納する行列
     * @param {TMat4} pmat - 透視投影座標変換行列の結果を格納する行列
     * @param {TMat4} vpmat - ビュー x 透視投影変換行列の結果を格納する行列
     */
    static vpFromCameraProperty(
      position: TVec3,
      centerPoint: TVec3,
      upDirection: TVec3,
      fovy: number,
      aspect: number,
      near: number,
      far: number,
      vmat: TMat4,
      pmat: TMat4,
      vpmat: TMat4
    ): TMat4;
    /**
     * MVP 行列に相当する行列を受け取りベクトルを変換して返す
     * @param {TMat4} mat - MVP 行列
     * @param {Array.<number>} vec - MVP 行列と乗算する３つの要素を持つベクトル
     * @param {number} width - ビューポートの幅
     * @param {number} height - ビューポートの高さ
     * @return {Array.<number>} 結果のベクトル（２つの要素を持つベクトル）
     */
    static screenPositionFromMvp(
      mat: TMat4,
      vec: [number, number, number],
      width: number,
      height: number
    ): [number, number];
    /**
     * 平行移動ベクトル、回転クォータニオン、拡大縮小ベクトルから行列を生成する
     * @param {TVec3} translation - 平行移動ベクトル
     * @param {TQtn} qtn - 回転を表すクォータニオン
     * @param {TVec3} scale - 拡大縮小ベクトル
     * @param {TMat4} [source] - 結果を格納する行列
     * @return {TMat4} 結果の行列
     */
    static compose(
      translation: TVec3,
      qtn: TQtn,
      scale: TVec3,
      source?: TMat4
    ): TMat4;
  }
  export class Vec3 {
    /**
     * ３つの要素を持つベクトルを生成する
     * @return {Float32Array} ベクトル格納用の配列
     */
    static create(): Float32Array;
    /**
     * ベクトルの値をコピーして返す（第二引数が与えられた場合そのベクトルがコピー先となる）
     * @param {TVec3} target - コピー元のベクトル
     * @param {TVec3} [source] - コピー先のベクトル
     * @return {TVec3} コピー先のベクトル
     */
    static copy(target: TVec3, source?: TVec3): TVec3;
    /**
     * ベクトルの長さ（大きさ）を返す
     * @param {TVec3} v - ３つの要素を持つベクトル
     * @return {number} ベクトルの長さ（大きさ）
     */
    static length(v: TVec3): number;
    /**
     * ２つの座標（始点・終点）を結ぶベクトルを返す
     * @param {TVec3} v0 - ３つの要素を持つ始点座標
     * @param {TVec3} v1 - ３つの要素を持つ終点座標
     * @return {TVec3} 視点と終点を結ぶベクトル
     */
    static distance(v0: TVec3, v1: TVec3): TVec3;
    /**
     * ベクトルを正規化した結果を返す
     * @param {TVec3} v - ３つの要素を持つベクトル
     * @return {TVec3} 正規化したベクトル
     */
    static normalize(v: TVec3): TVec3;
    /**
     * ２つのベクトルの内積の結果を返す
     * @param {TVec3} v0 - ３つの要素を持つベクトル
     * @param {TVec3} v1 - ３つの要素を持つベクトル
     * @return {number} 内積の結果
     */
    static dot(v0: TVec3, v1: TVec3): number;
    /**
     * ２つのベクトルの外積の結果を返す
     * @param {TVec3} v0 - ３つの要素を持つベクトル
     * @param {TVec3} v1 - ３つの要素を持つベクトル
     * @return {TVec3} 外積の結果
     */
    static cross(v0: TVec3, v1: TVec3): TVec3;
    /**
     * ３つの座標から面法線を求めて返す
     * @param {TVec3} v0 - ３つの要素を持つ座標
     * @param {TVec3} v1 - ３つの要素を持つ座標
     * @param {TVec3} v2 - ３つの要素を持つ座標
     * @return {TVec3} 面法線ベクトル
     */
    static faceNormal(v0: TVec3, v1: TVec3, v2: TVec3): TVec3;
  }
  export class Vec2 {
    /**
     * ２つの要素を持つベクトルを生成する
     * @return {Float32Array} ベクトル格納用の配列
     */
    static create(): Float32Array;
    /**
     * ベクトルの値をコピーして返す（第二引数が与えられた場合そのベクトルがコピー先となる）
     * @param {TVec2} target - コピー元のベクトル
     * @param {TVec2} [source] - コピー先のベクトル
     * @return {TVec2} コピー先のベクトル
     */
    static copy(target: TVec2, source?: TVec2): TVec2;
    /**
     * ベクトルの長さ（大きさ）を返す
     * @param {TVec2} v - ２つの要素を持つベクトル
     * @return {number} ベクトルの長さ（大きさ）
     */
    static length(v: TVec2): number;
    /**
     * ２つの座標（始点・終点）を結ぶベクトルを返す
     * @param {TVec2} v0 - ２つの要素を持つ始点座標
     * @param {TVec2} v1 - ２つの要素を持つ終点座標
     * @return {TVec2} 視点と終点を結ぶベクトル
     */
    static distance(v0: TVec2, v1: TVec2): TVec2;
    /**
     * ベクトルを正規化した結果を返す
     * @param {TVec2} v - ２つの要素を持つベクトル
     * @return {TVec2} 正規化したベクトル
     */
    static normalize(v: TVec2): TVec2;
    /**
     * ２つのベクトルの内積の結果を返す
     * @param {TVec2} v0 - ２つの要素を持つベクトル
     * @param {TVec2} v1 - ２つの要素を持つベクトル
     * @return {number} 内積の結果
     */
    static dot(v0: TVec2, v1: TVec2): number;
    /**
     * ２つのベクトルの外積の結果を返す
     * @param {TVec2} v0 - ２つの要素を持つベクトル
     * @param {TVec2} v1 - ２つの要素を持つベクトル
     * @return {number} 外積の結果
     */
    static cross(v0: TVec2, v1: TVec2): number;
  }
  export class Qtn {
    /**
     * ４つの要素からなるクォータニオンのデータ構造を生成する（虚部 x, y, z, 実部 w の順序で定義）
     * @return {Float32Array} クォータニオンデータ格納用の配列
     */
    static create(): Float32Array;
    /**
     * クォータニオンを初期化する（引数が与えられた場合そのクォータニオンに結果を代入する）
     * @param {TQtn} [source] - 初期化するクォータニオン
     * @return {TQtn} 結果のクォータニオン
     */
    static identity(source?: TQtn): TQtn;
    /**
     * クォータニオンの値をコピーして返す（第二引数が与えられた場合そのクォータニオンがコピー先となる）
     * @param {TQtn} target - コピー元のクォータニオン
     * @param {TQtn} [source] - コピー先のクォータニオン
     * @return {TQtn} コピー先のクォータニオン
     */
    static copy(target: TQtn, source?: TQtn): TQtn;
    /**
     * 共役四元数を生成して返す（第二引数が与えられた場合そのクォータニオンに結果を代入する）
     * @param {TQtn} qtn - 元となるクォータニオン
     * @param {TQtn} [source] - 結果を格納するクォータニオン
     * @return {TQtn} 結果のクォータニオン
     */
    static inverse(qtn: TQtn, source?: TQtn): TQtn;
    /**
     * 虚部を正規化して返す
     * @param {TQtn} source - 元となるクォータニオン
     * @return {TQtn} 結果のクォータニオン
     */
    static normalize(source?: TQtn): TQtn;
    /**
     * クォータニオンを乗算した結果を返す（第三引数が与えられた場合そのクォータニオンに結果を代入する）
     * @param {TQtn} qtn0 - 乗算されるクォータニオン
     * @param {TQtn} qtn1 - 乗算するクォータニオン
     * @param {TQtn} [source] - 結果を格納するクォータニオン
     * @return {TQtn} 結果のクォータニオン
     */
    static multiply(qtn0: TQtn, qtn1: TQtn, source?: TQtn);
    /**
     * クォータニオンに回転を適用し返す（第三引数が与えられた場合そのクォータニオンに結果を代入する）
     * @param {number} angle - 回転する量（ラジアン）
     * @param {TVec3} axis - ３つの要素を持つ軸ベクトル
     * @param {TQtn} [source] - 結果を格納するクォータニオン
     * @return {TQtn} 結果のクォータニオン
     */
    static rotate(angle: number, axis: TVec3, source?: TQtn): TQtn;
    /**
     * ベクトルにクォータニオンを適用し返す（第三引数が与えられた場合そのベクトルに結果を代入する）
     * @param {TVec3} vec - ３つの要素を持つベクトル
     * @param {TQtn} qtn - クォータニオン
     * @param {TVec3} [source] - ３つの要素を持つベクトル
     * @return {TVec3} 結果のベクトル
     */
    static toVecIII(vec: TVec3, qtn: TQtn, source?: TVec3): TVec3;
    /**
     * 4x4 行列にクォータニオンを適用し返す（第二引数が与えられた場合その行列に結果を代入する）
     * @param {TQtn} qtn - クォータニオン
     * @param {TMat4} [source] - 4x4 行列
     * @return {TMat4} 結果の行列
     */
    static toMatIV(qtn: TQtn, source?: TMat4): TMat4;
    /**
     * ２つのクォータニオンの球面線形補間を行った結果を返す（第四引数が与えられた場合そのクォータニオンに結果を代入する）
     * @param {TQtn} qtn0 - クォータニオン
     * @param {TQtn} qtn1 - クォータニオン
     * @param {number} time - 補間係数（0.0 から 1.0 で指定）
     * @param {TQtn} [source] - 結果を格納するクォータニオン
     * @return {TQtn} 結果のクォータニオン
     */
    static slerp(qtn0: TQtn, qtn1: TQtn, time: number, source?: TQtn): TQtn;
  }

  /**
   * Geometry
   * @class Geometry
   */
  export class Geometry {
    /**
     * 板ポリゴンの頂点情報を生成する
     * @param {number} width - 板ポリゴンの一辺の幅
     * @param {number} height - 板ポリゴンの一辺の高さ
     * @param {Array.<number>} color - RGBA を 0.0 から 1.0 の範囲で指定した配列
     * @return {object}
     * @property {Array.<number>} position - 頂点座標
     * @property {Array.<number>} normal - 頂点法線
     * @property {Array.<number>} color - 頂点カラー
     * @property {Array.<number>} texCoord - テクスチャ座標
     * @property {Array.<number>} index - 頂点インデックス（gl.TRIANGLES）
     * @example
     * let planeData = Geometry.plane(2.0, 2.0, [1.0, 1.0, 1.0, 1.0]);
     */
    static plane(
      width: number,
      height: number,
      color: [number, number, number, number]
    ): {
      position: number[];
      normal: number[];
      color: number[];
      texCoord: number[];
      index: number[];
    };

    /**
     * 円（XY 平面展開）の頂点情報を生成する
     * @param {number} split - 円の円周の分割数
     * @param {number} rad - 円の半径
     * @param {Array.<number>} color - RGBA を 0.0 から 1.0 の範囲で指定した配列
     * @return {object}
     * @property {Array.<number>} position - 頂点座標
     * @property {Array.<number>} normal - 頂点法線
     * @property {Array.<number>} color - 頂点カラー
     * @property {Array.<number>} texCoord - テクスチャ座標
     * @property {Array.<number>} index - 頂点インデックス（gl.TRIANGLES）
     * @example
     * let circleData = Geometry.circle(64, 1.0, [1.0, 1.0, 1.0, 1.0]);
     */
    static circle(
      split: number,
      rad: number,
      color: [number, number, number, number]
    ): {
      position: number[];
      normal: number[];
      color: number[];
      texCoord: number[];
      index: number[];
    };
    /**
     * キューブの頂点情報を生成する
     * @param {number} side - 正立方体の一辺の長さ
     * @param {Array.<number>} color - RGBA を 0.0 から 1.0 の範囲で指定した配列
     * @return {object}
     * @property {Array.<number>} position - 頂点座標
     * @property {Array.<number>} normal - 頂点法線 ※キューブの中心から各頂点に向かって伸びるベクトルなので注意
     * @property {Array.<number>} color - 頂点カラー
     * @property {Array.<number>} texCoord - テクスチャ座標
     * @property {Array.<number>} index - 頂点インデックス（gl.TRIANGLES）
     * @example
     * let cubeData = Geometry.cube(2.0, [1.0, 1.0, 1.0, 1.0]);
     */
    static cube(
      side: number,
      color: [number, number, number, number]
    ): {
      position: number[];
      normal: number[];
      color: number[];
      texCoord: number[];
      index: number[];
    };
    /**
     * 三角錐の頂点情報を生成する
     * @param {number} split - 底面円の円周の分割数
     * @param {number} rad - 底面円の半径
     * @param {number} height - 三角錐の高さ
     * @param {Array.<number>} color - RGBA を 0.0 から 1.0 の範囲で指定した配列
     * @return {object}
     * @property {Array.<number>} position - 頂点座標
     * @property {Array.<number>} normal - 頂点法線
     * @property {Array.<number>} color - 頂点カラー
     * @property {Array.<number>} texCoord - テクスチャ座標
     * @property {Array.<number>} index - 頂点インデックス（gl.TRIANGLES）
     * @example
     * let coneData = Geometry.cone(64, 1.0, 2.0, [1.0, 1.0, 1.0, 1.0]);
     */
    static cone(
      split: number,
      rad: number,
      height: number,
      color: [number, number, number, number]
    ): {
      position: number[];
      normal: number[];
      color: number[];
      texCoord: number[];
      index: number[];
    };
    /**
     * 円柱の頂点情報を生成する
     * @param {number} split - 円柱の円周の分割数
     * @param {number} topRad - 円柱の天面の半径
     * @param {number} bottomRad - 円柱の底面の半径
     * @param {number} height - 円柱の高さ
     * @param {Array.<number>} color - RGBA を 0.0 から 1.0 の範囲で指定した配列
     * @return {object}
     * @property {Array.<number>} position - 頂点座標
     * @property {Array.<number>} normal - 頂点法線
     * @property {Array.<number>} color - 頂点カラー
     * @property {Array.<number>} texCoord - テクスチャ座標
     * @property {Array.<number>} index - 頂点インデックス（gl.TRIANGLES）
     * @example
     * let cylinderData = Geometry.cylinder(64, 0.5, 1.0, 2.0, [1.0, 1.0, 1.0, 1.0]);
     */
    static cylinder(
      split: number,
      topRad: number,
      bottomRad: number,
      height: number,
      color: [number, number, number, number]
    ): {
      position: number[];
      normal: number[];
      color: number[];
      texCoord: number[];
      index: number[];
    };
    /**
     * 球体の頂点情報を生成する
     * @param {number} row - 球の縦方向（緯度方向）の分割数
     * @param {number} column - 球の横方向（経度方向）の分割数
     * @param {number} rad - 球の半径
     * @param {Array.<number>} color - RGBA を 0.0 から 1.0 の範囲で指定した配列
     * @return {object}
     * @property {Array.<number>} position - 頂点座標
     * @property {Array.<number>} normal - 頂点法線
     * @property {Array.<number>} color - 頂点カラー
     * @property {Array.<number>} texCoord - テクスチャ座標
     * @property {Array.<number>} index - 頂点インデックス（gl.TRIANGLES）
     * @example
     * let sphereData = Geometry.sphere(64, 64, 1.0, [1.0, 1.0, 1.0, 1.0]);
     */
    static sphere(
      row: number,
      column: number,
      rad: number,
      color: [number, number, number, number]
    ): {
      position: number[];
      normal: number[];
      color: number[];
      texCoord: number[];
      index: number[];
    };
    /**
     * トーラスの頂点情報を生成する
     * @param {number} row - 輪の分割数
     * @param {number} column - パイプ断面の分割数
     * @param {number} irad - パイプ断面の半径
     * @param {number} orad - パイプ全体の半径
     * @param {Array.<number>} color - RGBA を 0.0 から 1.0 の範囲で指定した配列
     * @return {object}
     * @property {Array.<number>} position - 頂点座標
     * @property {Array.<number>} normal - 頂点法線
     * @property {Array.<number>} color - 頂点カラー
     * @property {Array.<number>} texCoord - テクスチャ座標
     * @property {Array.<number>} index - 頂点インデックス（gl.TRIANGLES）
     * @example
     * let torusData = Geometry.torus(64, 64, 0.25, 0.75, [1.0, 1.0, 1.0, 1.0]);
     */
    static torus(
      row: number,
      column: number,
      irad: number,
      orad: number,
      color: [number, number, number, number]
    ): {
      position: number[];
      normal: number[];
      color: number[];
      texCoord: number[];
      index: number[];
    };
    /**
     * 正二十面体の頂点情報を生成する
     * @param {number} rad - サイズ（黄金比に対する比率）
     * @param {Array.<number>} color - RGBA を 0.0 から 1.0 の範囲で指定した配列
     * @return {object}
     * @property {Array.<number>} position - 頂点座標
     * @property {Array.<number>} normal - 頂点法線
     * @property {Array.<number>} color - 頂点カラー
     * @property {Array.<number>} texCoord - テクスチャ座標
     * @property {Array.<number>} index - 頂点インデックス（gl.TRIANGLES）
     * @example
     * let icosaData = Geometry.icosahedron(1.0, [1.0, 1.0, 1.0, 1.0]);
     */
    static icosahedron(
      rad: number,
      color: [number, number, number, number]
    ): {
      position: number[];
      normal: number[];
      color: number[];
      texCoord: number[];
      index: number[];
    };
  }
}
