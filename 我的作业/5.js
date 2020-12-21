const delay = function delay(interval) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(interval);
        }, interval);
    });
};
let tasks = [() => {
    return delay(1000);
}, () => {
    return delay(1003);
}, () => {
    return delay(1005);
}, () => {
    return delay(1002);
}, () => {
    return delay(1004);
}, () => {
    return delay(1006);
}];

/*
 * JS实现Ajax并发请求控制的两大解决方案
 */
// tasks：数组，数组包含很多方法，每一个方法执行就是发送一个请求「基于Promise管理」
// 传入任务队列和限制的线程池大小，实现并发控制。当任务超过5就排队处理，不再发送请求，减小服务器压力。
function createRequest(tasks, pool) {
    pool = pool || 5;// 不传默认是5
    
    let results = [],// 接受返回情况的数组，注意下标顺序问题
        together = new Array(pool).fill(null),
        index = 0;
    together = together.map(() => {
        return new Promise((resolve, reject) => {
            const run = function run() {
                if (index >= tasks.length) {
                    resolve();
                    return;
                    // 任务总数小于并发限制，立即执行，程序终止
                };
                // 任务总数大于POOL，说明要排队处理。
                let old_index = index,
                // 一定要保证数组顺序，用旧下标记录任务的下标，对号入座拿到返回的结果
                    task = tasks[index++];
                // 取出当前任务，执行之后放入到result数组中，一一对应
                task().then(result => {
                    results[old_index] = result;
                    run();// 递归调用下一个任务
                }).catch(reason => {
                    reject(reason);
                });
            };
            run();
            // 遍历数组每一项进行执行，在run()内部实现并发逻辑
        });
    });
    return Promise.all(together).then(() => results);
    // 将together数组传入Promise.all()
} 


/* createRequest(tasks, 2).then(results => {
    // 都成功，整体才是成功，按顺序存储结果
    console.log('成功-->', results);
}).catch(reason => {
    // 只要有也给失败，整体就是失败
    console.log('失败-->', reason);
}); */

function createRequest(tasks, pool, callback) {
    if (typeof pool === "function") {
        callback = pool;
        pool = 5;
    }
    if (typeof pool !== "number") pool = 5;
    if (typeof callback !== "function") callback = function () {};
    //------
    class TaskQueue {
        // 模拟实现Promise.all
        running = 0;// 记录正在执行的任务，不能超过预设值。
        queue = []; // 放入回调函数的队列
        results = []; // 缓存拿到的结果
        pushTask(task) {
            let self = this;
            self.queue.push(task);
            self.next();
        }
        next() {
            let self = this;
            while (self.running < pool && self.queue.length) {
                // 一直循环队列，当当前任务数小于并发限制，注意还要判断队列长度不为空
                self.running++;// 标志位先加一
                let task = self.queue.shift();// 取出对头的第一个任务，按顺序执行
                task().then(result => { // 执行异步回调
                    self.results.push(result); // 成功失败都放入结果缓存，与第一种方法的区别在此。
                }).finally(() => {// 不论成功失败一定会执行，要让标志位减1，确保当前任务清空一个
                    self.running--;
                    self.next();// 向下递归执行第二个任务，
                });
            }
            if (self.running === 0) callback(self.results);
           
            // 当队列长度为0时说明此时执行完毕，跳出while循环
             // 当前任务清空，将缓存结果批量回调。
        }
    }
    let TQ = new TaskQueue;
    tasks.forEach(task => TQ.pushTask(task));
}
createRequest(tasks, 2, results => {
    console.log(results);
});