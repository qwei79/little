        var canvas;
        var context;
        var isWhite = true;//设置是否该轮到白棋
        var isWell = false;//设置该局棋盘是否赢了，如果赢了就不能再走了
        var img_b = new Image();
        img_b.src = "images/b.png";//白棋图片
        var img_w = new Image();
        img_w.src = "images/w.png";//黑棋图片
        var qibu = new Array,dangqian = 0;
        var posi = document.getElementById("posi");

 
        var chessData = new Array(15);//这个为棋盘的二维数组用来保存棋盘信息，初始化0为没有走过的，1为白棋走的，2为黑棋走的
        for (var x = 0; x < 15; x++) {
            chessData[x] = new Array(15);
            for (var y = 0; y < 15; y++) {
                chessData[x][y] = 0;
            }
        }
    
        function drawRect() {//页面加载完毕调用函数，初始化棋盘
            canvas = document.getElementById("canvas");
            context = canvas.getContext("2d");
 
            for (var i = 0; i <= 640; i += 40) {//绘制棋盘的线
                context.beginPath();
                context.moveTo(0, i);
                context.lineTo(640, i);
                context.closePath();
                context.stroke();
 
                context.beginPath();
                context.moveTo(i, 0);
                context.lineTo(i, 640);
                context.closePath();
                context.stroke();
            }
            if(!dangqian) {
                document.getElementById('huiqi').setAttribute('disabled', true);
                document.getElementById('chexiao').setAttribute('disabled', true);
            }
        }

        function position(e) {
            var x = parseInt((e.x - 20) / 40); //计算鼠标所在的区域，如果位置是（65，65），那么就选中（1，1）的位置
            var y = parseInt((e.y - 20) / 40);
            // if (chessData[x][y] != 0) {//判断该位置是否被下过了
            //     return;
            // }
            if (x == 15 || y == 15 || chessData[x][y] == 3) {
                return;
            }

            for (var a = 0; a < 15; a++) {
                for (var b = 0; b < 15; b++) {
                    if (chessData[a][b] == 3 && ( a != x || b != y )){
                        // 删除落子点标识
                        context.clearRect(a * 40 + 20,b * 40 + 20,40,40);
                        // 补全棋盘
                        context.beginPath();
                        context.moveTo(a * 40 + 40,b * 40 + 20);
                        context.lineTo(a * 40 + 40,b * 40 + 60);
                        context.closePath();
                        context.stroke();
                        context.beginPath();
                        context.moveTo(a * 40 + 20,b * 40 + 40);
                        context.lineTo(a * 40 + 60,b * 40 + 40);
                        context.closePath();
                        context.stroke();
                        chessData[a][b] = 0;
                    }
                }
            }

            // 绘制落子点
            if (chessData[x][y] != 3 && chessData[x][y] == 0){
                console.log(1);
                // 左上
                context.beginPath();
                context.moveTo(x * 40 + 30, y * 40 + 20);
                context.lineTo(x * 40 + 30, y * 40 + 30);
                context.lineTo(x * 40 + 20, y * 40 + 30);
                // 右上
                context.moveTo(x * 40 + 50, y * 40 + 20);
                context.lineTo(x * 40 + 50, y * 40 + 30);
                context.lineTo(x * 40 + 60, y * 40 + 30);
                // 左下
                context.moveTo(x * 40 + 30, y * 40 + 60);
                context.lineTo(x * 40 + 30, y * 40 + 50);
                context.lineTo(x * 40 + 20, y * 40 + 50);
                // 右下
                context.moveTo(x * 40 + 50, y * 40 + 60);
                context.lineTo(x * 40 + 50, y * 40 + 50);
                context.lineTo(x * 40 + 60, y * 40 + 50);
                context.stroke();
                chessData[x][y] = 3;
            }

            // if (x == 15 || y == 15 || chessData[x][y] != 0) {
            //     posi.style.display = 'none';
            //     return;
            // }
            // posi.style.display = 'block';
            // posi.style.left = x * 40 + 30 + 'px';
            // posi.style.top = y * 40 + 30 + 'px';

        }
        function positionMiss(e){
            posi.style.display = 'none';
            console.log('出去了');
        }

        function play(e) {//鼠标点击时发生
            var x = parseInt((e.clientX - 20) / 40);//计算鼠标点击的区域，如果点击了（65，65），那么就是点击了（1，1）的位置
            var y = parseInt((e.clientY - 20) / 40);
 
            if (chessData[x][y] == 2 || chessData[x][y] == 1) {//判断该位置是否被下过了
                alert("你不能在这个位置下棋");
                return;
            }

            // 删除落子点标识
            context.clearRect(x * 40 + 20,y * 40 + 20,40,40);
            // 补全棋盘
            context.beginPath();
            context.moveTo(x * 40 + 40,y * 40 + 20);
            context.lineTo(x * 40 + 40,y * 40 + 60);
            context.closePath();
            context.stroke();
            context.beginPath();
            context.moveTo(x * 40 + 20,y * 40 + 40);
            context.lineTo(x * 40 + 60,y * 40 + 40);
            context.closePath();
            context.stroke();
 
            if (isWhite) {
                isWhite = false;
                drawChess(1, x, y);
                qibu[dangqian] = [1, x, y];
                dangqian++;
            }
            else {
                isWhite = true;
                drawChess(2, x, y);
                qibu[dangqian] = [2, x, y];
                dangqian++;
            }

            document.getElementById('huiqi').removeAttribute('disabled');
            document.getElementById('chexiao').setAttribute('disabled', true);
 
        }
        function drawChess(chess, x, y) {//参数为，棋（1为白棋，2为黑棋），数组位置
            if (isWell == true) {
                alert("已经结束了，如果需要重新玩，请点击再来一把");
                return;
            }
            if (x >= 0 && x < 15 && y >= 0 && y < 15) {
                if (chess == 1) {
                    context.drawImage(img_w, x * 40 + 20, y * 40 + 20);//绘制白棋
                    chessData[x][y] = 1;
                }
                else {
                    context.drawImage(img_b, x * 40 + 20, y * 40 + 20);
                    chessData[x][y] = 2;
                }
                judge(x, y, chess);
            }
        }
        function huiqi() {
            if (isWell == true) {
                alert('人家都赢了你还好意思悔棋？');
                return;
            }
            dangqian--;

            // 删除棋子
            context.clearRect(qibu[dangqian][1] * 40 + 20,qibu[dangqian][2] * 40 + 20,img_b.width,img_b.height);
            chessData[qibu[dangqian][1]][qibu[dangqian][2]] = 0;
            // 补全棋盘
            context.beginPath();
            context.moveTo(qibu[dangqian][1] * 40 + 40,qibu[dangqian][2] * 40 + 20);
            context.lineTo(qibu[dangqian][1] * 40 + 40,qibu[dangqian][2] * 40 + 60);
            context.closePath();
            context.stroke();
            context.beginPath();
            context.moveTo(qibu[dangqian][1] * 40 + 20,qibu[dangqian][2] * 40 + 40);
            context.lineTo(qibu[dangqian][1] * 40 + 60,qibu[dangqian][2] * 40 + 40);
            context.closePath();
            context.stroke();


            isWhite = isWhite ? false : true;
            if (dangqian == 0) {
                document.getElementById('huiqi').setAttribute('disabled', true);
                return;
            }
            document.getElementById('chexiao').removeAttribute('disabled');
        }
        function chexiao() {
            drawChess(qibu[dangqian][0],qibu[dangqian][1],qibu[dangqian][2]);
            dangqian++;
            isWhite = isWhite ? false : true;
            if(dangqian == qibu.length) {
                document.getElementById('chexiao').setAttribute('disabled', true);
                document.getElementById('huiqi').removeAttribute('disabled');
            }
        }
        function judge(x, y, chess) {//判断该局棋盘是否赢了
            var count1 = 0;
            var count2 = 0;
            var count3 = 0;
            var count4 = 0;
 
            //左右判断
            for (var i = x; i >= 0; i--) {
                if (chessData[i][y] != chess) {
                    break;
                }
                count1++;
            }
            for (var i = x + 1; i < 15; i++) {
                if (chessData[i][y] != chess) {
                    break;
                }
                count1++;
            }
            //上下判断
            for (var i = y; i >= 0; i--) {
                if (chessData[x][i] != chess) {
                    break;
                }
                count2++;
            }
            for (var i = y + 1; i < 15; i++) {
                if (chessData[x][i] != chess) {
                    break;
                }
                count2++;
            }
            //左上右下判断
            for (var i = x, j = y; i >= 0, j >= 0; i--, j--) {
                if (chessData[i][j] != chess) {
                    break;
                }
                count3++;
            }
            for (var i = x + 1, j = y + 1; i < 15, j < 15; i++, j++) {
                if (chessData[i][j] != chess) {
                    break;
                }
                count3++;
            }
            //右上左下判断
            for (var i = x, j = y; i >= 0, j < 15; i--, j++) {
                if (chessData[i][j] != chess) {
                    break;
                }
                count4++;
            }
            for (var i = x + 1, j = y - 1; i < 15, j >= 0; i++, j--) {
                if (chessData[i][j] != chess) {
                    break;
                }
                count4++;
            }
 
            if (count1 >= 5 || count2 >= 5 || count3 >= 5 || count4 >= 5) {
                if (chess == 1) {
                    alert("白棋赢了");
                }
                else {
                    alert("黑棋赢了");
                }
                isWell = true;//设置该局棋盘已经赢了，不可以再走了
            }
        }
