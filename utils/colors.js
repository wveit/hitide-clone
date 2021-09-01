export const colors = [
    '#A9A9A9',
    '#BA55D3',
    '#CD5C5C',
    '#0000FF',
    '#FF0000',
    '#7FFF00',
    '#F0E68C',
    '#66CDAA',
    '#B0C4DE',
    '#FFA07A',
    '#00FF7F',
    '#BC8F8F',
    '#C71585',
    '#87CEFA',
    '#D8BFD8',
];

export function getColor(index) {
    return colors[index % colors.length];
}

console.log(getColor(5));
console.log(getColor(99));
