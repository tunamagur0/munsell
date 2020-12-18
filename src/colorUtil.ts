export function hsv2rgb(
  _h: number,
  _s: number,
  _v: number
): [number, number, number] {
  const v = _v / 100;
  const s = _s / 100;
  const ret: [number, number, number] = [v * (1 - s), v * (1 - s), v * (1 - s)];
  const hPrime: number = _h / 60;
  const i: number = Math.floor(hPrime);
  const x: number = v * s * (1 - Math.abs((hPrime % 2) - 1));

  switch (i) {
    case 0:
      ret[0] += v * s;
      ret[1] += x;
      break;
    case 1:
      ret[0] += x;
      ret[1] += v * s;
      break;
    case 2:
      ret[1] += v * s;
      ret[2] += x;
      break;
    case 3:
      ret[1] += x;
      ret[2] += v * s;
      break;
    case 4:
      ret[0] += x;
      ret[2] += v * s;
      break;
    case 5:
      ret[0] += v * s;
      ret[2] += x;
      break;
    default:
      break;
  }
  ret[0] = Math.round(ret[0] * 255);
  ret[1] = Math.round(ret[1] * 255);
  ret[2] = Math.round(ret[2] * 255);
  return ret;
}
