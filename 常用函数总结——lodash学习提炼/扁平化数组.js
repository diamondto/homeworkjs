// 将数组扁平化并去除其中重复数据，最终得到一个升序且不重复的数组 
Array.prototype.flat= function() {
    return [].concat(...this.map(item => (Array.isArray(item) ? item.flat() : [item])));
}

Array.prototype.unique = function() {
    return [...new Set(this)]
}

const sort = (a, b) => a - b;



let arr= [1, 2, 3, 4, 5, 6, 19,19 ,8, 9, 10, 11, 12, 13, 14 ]
console.log(arr.flat().unique().sort(sort));

// 输出
// [
//     1,  2,  3,  4,  5,  6,
//     8,  9, 10, 11, 12, 13,
//    14, 19
//  ]

