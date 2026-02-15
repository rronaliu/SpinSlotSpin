export function _getRandomBrightColor(): number {

    const hue = Math.random(); // 0 to 1
    const saturation = 0.9;
    const brightness = 0.9;

    const rgb = _hsvToRgb(hue, saturation, brightness);
    return (rgb[0] << 16) + (rgb[1] << 8) + rgb[2];
}

export function _hsvToRgb(h: number, s: number, v: number): [number, number, number] {

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    const mod = i % 6;

    const r = [v, q, p, p, t, v][mod];
    const g = [t, v, v, q, p, p][mod];
    const b = [p, p, t, v, v, q][mod];

    return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
}
