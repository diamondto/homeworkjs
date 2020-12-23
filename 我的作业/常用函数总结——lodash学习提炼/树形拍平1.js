// 树形拍平s深度优先遍历递归写法

let treeData = [
    {"name":"省1","id":1,"pid":0,"children":[{"name":"市1","id":11,"pid":1},{"name":"区1","id":12,"pid":1}]},
    {"name":"省2","id":2,"pid":0,"children":[{"name":"市2","id":21,"pid":2},{"name":"区2","id":22,"pid":2}]},
    {"name":"省3","id":3,"pid":0,"children":[{"name":"市3","id":31,"pid":3}]}];
     
     
    //childrenName 定义children字段名称
    function flatTree(treeData, childrenName) {
        let result = [];
        if(!childrenName) childrenName= "children";
        // 适配后端情况，换字段，默认是children，可支持入参传入其他key值
        // for in总是得到对象的key或数组,字符串的下标,
        // 而for of和forEach一样,是直接得到值
        for(let key in treeData) {
            let obj = treeData[key];// 拿到每一个对象操作
            let clone = JSON.parse(JSON.stringify(obj)); // 一行代码深拷贝，也可自造
            delete clone[childrenName]; // 拍平操作，删除对象的孩子
            result.push(clone);// 放入结果中拿到当前层的信息
            if(obj[childrenName] && obj[childrenName].length) { // 只要children=[]的情况，用长度判断
                // if ([])为true
                // 递归调用时，传入的是拨开一层的第二层嵌套对象key对应的value
                let tmp = flatTree(obj[childrenName], childrenName);
                result = result.concat(tmp);
            }
        }
        return result;
    }
     
    console.log(JSON.stringify(flatTree(treeData, "children"), null, 3));

    
// JSON.stringify(value[, replacer[, space]]) 用法   文本缩进 3个空格
// 结果：
// [
//     {
//        "name": "省1",
//        "id": 1,      
//        "pid": 0      
//     },
//     {
//        "name": "市1",
//        "id": 11,
//        "pid": 1
//     },
//     {
//        "name": "区1",
//        "id": 12,
//        "pid": 1
//     },
//     {
//        "name": "省2",
//        "id": 2,
//        "pid": 0
//     },
//     {
//        "name": "市2",
//        "id": 21,
//        "pid": 2
//     },
//     {
//        "name": "区2",
//        "id": 22,
//        "pid": 2
//     },
//     {
//        "name": "省3",
//        "id": 3,
//        "pid": 0
//     },
//        "name": "市2",
//        "id": 21,
//        "pid": 2
//     },
//     {
//        "name": "区2",
//        "id": 22,
//        "pid": 2
//     },
//     {
//        "name": "省3",
//        "id": 3,
//        "pid": 0
//     },
//     {
//        "name": "市3",
//        "id": 31,
//        "pid": 3
//     }
//  ]
 
// // 


// clone = treeData.slice();clone = clone.concat(treeData);
    // 此两法都不行 ，浅拷贝问题，输出如下
    // [
    //   { name: '省1', id: 1, pid: 0, children: [ [Object], [Object] ] },
    //   { name: '省2', id: 2, pid: 0, children: [ [Object], [Object] ] },
    //   { name: '省3', id: 3, pid: 0, children: [ [Object] ] }
    // ]
// function deepClone(obj){
//     let newObj = obj.push ? []:{}; 
//     //如果obj有push方法则 定义newObj为数组，否则为对象。
//     for(let attr in obj){
//         if(typeof obj[attr] === 'object'){
//             newObj[attr] = deepClone(obj[attr]);
//         }else{
//            newObj[attr] = obj[attr];
//         }
//     }
//     return newObj;
//   }
  