export function kilobyte(byte: number) {
    return Math.ceil(byte / 1024);
}

export function addCommas(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}