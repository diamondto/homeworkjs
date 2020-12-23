
let list=
[
    {
       "name": "省1",
       "id": 1,      
       "pid": 0      
    },
    {
       "name": "市1",
       "id": 11,
       "pid": 1
    },
    {
       "name": "区1",
       "id": 12,
       "pid": 1
    },
    {
       "name": "省2",
       "id": 2,
       "pid": 0
    },
    {
       "name": "市2",
       "id": 21,
       "pid": 2
    },
    {
       "name": "区2",
       "id": 22,
       "pid": 2
    },
    {
       "name": "省3",
       "id": 3,
       "pid": 0
    },
    {
       "name":"市2",
       "id": 21,
       "pid": 2
    },
    {
       "name": "区2",
       "id": 22,
       "pid": 2
    },
    {
       "name": "省3",
       "id": 3,
       "pid": 0
    },
    {
       "name": "市3",
       "id": 31,
       "pid": 3
    }
 ]
;
function listToTree (list) {
    let tree= list.reduce((map, node) =>
     (map[node.id] = node, node.children = [], map), {})
     // 初始值传入一个空对象，对数组每一项遍历，map修改节点成我想要的，node是每一个节点
     // 当前node没有children属性，先添加children属性为空后面再查找赋值。
     console.log(tree);
    //  {
    //     '1': { name: '省1', id: 1, pid: 0, children: [] },
    //     '2': { name: '省2', id: 2, pid: 0, children: [] },
    //     '3': { name: '省3', id: 3, pid: 0, children: [] },
    //     '11': { name: '市1', id: 11, pid: 1, children: [] },
    //     '12': { name: '区1', id: 12, pid: 1, children: [] },
    //     '21': { name: '市2', id: 21, pid: 2, children: [] },
    //     '22': { name: '区2', id: 22, pid: 2, children: [] },
    //     '31': { name: '市3', id: 31, pid: 3, children: [] }
    //   }
    // 如果tree的pid不为0说明不是最顶层的爸爸节点，pid为0就补充孩子属性，反之不填充
    return list.filter(node => {
      tree[node.pid] && tree[node.pid].children.push(node)
      return !node.pid
    })
  }

  let res= listToTree (list);
  console.log(res);

