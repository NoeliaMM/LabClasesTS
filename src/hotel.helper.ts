export function redondear(num: number, decimales: number = 2): number {
    const factor = Math.pow(10, decimales);
    return Math.round(num * factor) / factor;
}