let treeData = [
  {"name":"省1","id":1,"pid":0,"children":[{"name":"市1","id":11,"pid":1},{"name":"区1","id":12,"pid":1}]},
  {"name":"省2","id":2,"pid":0,"children":[{"name":"市2","id":21,"pid":2},{"name":"区2","id":22,"pid":2}]},
  {"name":"省3","id":3,"pid":0,"children":[{"name":"市3","id":31,"pid":3}]}];

//  使用广度优先遍历算法~
// 传入一个数组，每一项是树形描述的对象
// 模拟一个队列，每一层入队出队，将每一项的信息全部遍历完，如果有孩子放入当前层的队列
// 每一层队列就是一次节点的信息检索

function wideTraversal(treeData){

  let stack = treeData;
  console.log(stack);
  
  data = [];
  
  while(stack.length != 0){
  
  let shift = stack.shift();
  
  data.push({
  
  name: shift.name,
  id: shift.id,
  pid: shift.pid,
  
  })
  if (shift.children && !shift.children.length) {
    let children = shift.children;
  
    for(let i = 0; i < children.length; i++){
  
      stack.push(children[i])
  
    }
  };
  
  }
  return data;
}
  console.log(wideTraversal(treeData))
  
  

// function treeToList (treeData) {
//   let node, result = treeData.map(node => (node.level = 1, node))
//   for (let i = 0; i < result.length; i++) {
//     if (!result[i].children) continue
//     let list = result[i].children.map(node => (node.level = result[i].level + 1, node))
//     result.splice(i+1, 0, ...list)
//   }
//   return result
// }

// function treeToList(treeData) {
    
//     let out = [];
    
    
  
//     while(treeData.length) {
//         let first = treeData.shift();
//         // let clone = JSON.parse(JSON.stringify(first))// 拿到每个节点的描述信息
//       if (first.children && !first.children.length) {// 不是叶子节点，或者说当前的节点有孩子，那么就要将孩子放入队列，
//         // 每次队列加入和清空都要将当前节点全部遍历完成
//         treeData= treeData.unshift(first.children)
          
//          delete first['children']; // 使用对象的delete方法，即可转成list，删除前先放入队列
//       }
      
//       out.push(first);
//     }
//     return out;
//   }
   
//   treeToList(treeData) 
//   console.log(treeData);
  
  

