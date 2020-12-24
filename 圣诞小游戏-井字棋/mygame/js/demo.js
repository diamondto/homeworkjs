const mygame = {

    // 用于单元格填充遍历
    board: ['','','','','','','','',''],
    symbols: {
                options: ['玩家1','玩家2'],
                turn_index: 0,
                change(){
                    // 类似toggle效果，换主人公下棋
                    this.turn_index = ( this.turn_index === 0 ? 1:0 );
                }
            },
    container_element: null,
    gameover: false,
    // 三点成线则成功，二维数组枚举赢的情况
    winning_sequences: [
                        [0,1,2],
                        [3,4,5],
                        [6,7,8],
                        [0,3,6],
                        [1,4,7],
                        [2,5,8],
                        [0,4,8],
                        [2,4,6]
                    ],

    // 定义生命周期
    init(container) {
        // 实例化赋值
        this.container_element = container;
    },

    make_play(position) {
        // 边界处理
        if (this.gameover || this.board[position] !== '') return false;
        // 根据数组下标找到玩家数，切换当前玩家，有了数组变换，不再ifelse啦~

        const currentSymbol = this.symbols.options[this.symbols.turn_index];
        this.board[position] = currentSymbol;
        this.draw();
        // 关键是该方法画图

        const winning_sequences_index = this.check_winning_sequences(currentSymbol);
        if (this.is_game_over()){
            this.game_is_over();
        }
        if (winning_sequences_index >= 0) {
            this.game_is_over();
            this.stylize_winner_sequence(this.winning_sequences[winning_sequences_index]);
        } else {
            this.symbols.change();
            // 都不满足继续下棋，换下一个玩家
        }

        return true;
    },
// 赢了就加样式，注意要加1，动态加入LIst样式中，参考浏览器API
    stylize_winner_sequence(winner_sequence) {
        winner_sequence.forEach((position) => {
          this.container_element
            .querySelector(`div:nth-child(${position + 1})`)
            .classList.add('winner');
            
        });
      },

    check_winning_sequences(symbol) {

        for ( i in this.winning_sequences ) {
            // 遍历赢的8种情况
            // 二维数组依次检查，对第i种情况，每一项的三个小标是不是对应当前一维数组的值
            if (this.board[ this.winning_sequences[i][0] ] == symbol  &&
                this.board[ this.winning_sequences[i][1] ] == symbol &&
                this.board[ this.winning_sequences[i][2] ] == symbol) {
                console.log('winning sequences INDEX:' + i);
                return i;
                
                
               

            }
        };
        return -1;
    },

    game_is_over() {
        this.gameover = true;
        console.log('游戏结束');
    },

    is_game_over() {
        // 当页面全部被点击之后，游戏结束，说明双方都下完了！不包含""则结束。
        return !this.board.includes('');
    },

    start() {
        this.board.fill('');
        this.draw();
        this.gameover = false;       
    },

    restart() {
         // 两种情况，结束之后或者中途用户想重启~
        if (this.is_game_over() || this.gameover) {
            this.start();
            console.log('再来一局！')
        } else if (confirm('您要重来吗？')) {
            this.start();
            console.log('再来一局！')
        }
    },

    draw() {
        this.container_element.innerHTML = this.board.map((element, index) => `<div onclick="mygame.make_play('${index}')"> ${element} </div>`).reduce((content, current) => content + current);
    },
};
 // 返回一个新数组，给每一个div格子绑定点击事件，数组下标记录点击哪个单元格
         // element用于控制页面显示哪个玩家
         // reduce用于返回画图结果，得到全局页面。