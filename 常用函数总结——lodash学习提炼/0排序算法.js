// 给定一个数组全是数字,编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
/*
思路：
先统计有几个0，只循环一遍找到0的个数，不用map，因为map返回一个包含已经转换元素的新数组，
下标会改变，我只想找到0的个数，用foreach，注意foreach的方法返回undefined，所以边遍历边删除当前
找到的0 ，这样遍历一次之后，即拿到0个数，又把非0保留，并且顺序不改变，最后再补洞添加0既可以啦~
展开运算符太香了。

*/

// const moveZero = (arr) => {
//     let n = 0
//     arr.forEach((item, index) => {
//         if (item === 0){
//             arr.splice(index, 1)
//             n++;
//         }
//     })
//     arr.push(...(new Array(n)).fill(0))
//     return arr;
// }

// let arr =[1,1,4,5,0,8,9,5,0,0]
// console.log(moveZero(arr));
const moveZero = (arr) => {
    let n = 0
    arr.forEach((item, index) => {
        if (item === 0){
            n++;
        }
    })
    let res = arr.filter((v, i) => v > 0)
    res.push(...(new Array(n)).fill(0))
    
    return res;
}

let arr =[1,1,4,5,0,0,8,9,5,0,0,7]
let newArr = moveZero(arr)
console.log(newArr);


// 输出
// [
//     1, 1, 4, 5, 8,
//     9, 5, 0, 0, 0
//   ]
