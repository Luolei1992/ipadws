/**
 * Created by junjie on 2017/5/3.
 */
class DrawBoard {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.isWriting = false;
        // this.context.scale(2,2);
        this.lastX = 0;   //画笔上次停留坐标x轴值
        this.lastY = 0;   //画笔上次停留坐标y轴值
        this.lineWidthMax = 0, //画笔最大粗细
        this.lineWidthMin = 1, //画笔最小粗细
        this.lastTime = 0;  //画笔上次时间
        this.lastLineWidth = 0;   //画笔最近宽度

        this.lastImg = "";  //最近一次签字

        this.init();
        //事件监听
        this.bindEvent();
    }

    init() {
        this.context.lineCap = 'round';             //平滑处理
        this.context.lineJoin = 'round';            //平滑处理
        this.lineWidthMax = 1.5;   //画笔最粗值
        //设置落笔的最近线条宽度 lastWidth
        this.lastLineWidth = this.lineWidthMax / 2;
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    cancel() {
        this.context.putImageData(this.lastImg, 0, 0);
    }

    /**
     * 保存签名图片
     * @param type 保存类型
     * @param _callback
     */
    save(type, _callback) {
        // 未签字返回 false
        if (!this.lastX) {
            console.log('null');
            if (_callback) _callback(false);
            return;
        }

        if (type == "only-draw") {
            //将签名后的canvas存为图片
            var oldUrl = this.canvas.toDataURL("image/png");
            var img = new Image();
            img.src = oldUrl;

            //用9参数的drawImage方法对图片进行裁减
            var canvas2 = document.createElement('canvas');
            var context2 = canvas2.getContext('2d');
            context2.scale(2,2);

            img.onload = () => {
                var Coordinate = this._getImgCoordinate();
                canvas2.setAttribute('width', Coordinate.width);
                canvas2.setAttribute('height', Coordinate.height);
                context2.drawImage(img, Coordinate.minX, Coordinate.minY, Coordinate.width, Coordinate.height, 0, 0, Coordinate.width, Coordinate.height);
                var newUrl = canvas2.toDataURL("image/png");
                if (_callback) _callback(newUrl);
            }
        } else {
            var url = this.canvas.toDataURL("image/png");
            if (_callback) _callback(url);
        }
    }

    bindEvent() {
        //  pc 端
        //  下笔
        this.canvas.onmousedown = (e) => {
            e.preventDefault();
            this.startWrite(this._getCo(e.clientX, e.clientY));
        }

        //移动，在鼠标移动期间不断执行。
        this.canvas.onmousemove = (e) => {
            e.preventDefault();
            if (this.isWriting) {
                this.writing(this._getCo(e.clientX, e.clientY));
            }
        };

        //收笔
        this.canvas.onmouseup = (e) => {
            e.preventDefault();
            if (this.isWriting) {
                this.endWrite();
            }
        };

        //出界
        this.canvas.onmouseout = (e) => {
            e.preventDefault();
            if (this.isWriting) {
                this.endWrite();
            }
        };

        //手机端
        //下笔
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            var touch = e.touches[0];//第一个触摸手指
            this.startWrite(this._getCo(touch.clientX, touch.clientY))
        });

        //移动
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (this.isWriting) {
                var touch = e.touches[0];
                this.writing(this._getCo(touch.clientX, touch.clientY));
            }
        });

        //收笔
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.endWrite();
        })
    }

    /*
     *  描绘区
     */
    startWrite(co) {
        this.isWriting = true;
        this.lastX = co.x;
        this.lastY = co.y;
        //设置当前时间
        this.lastTime = new Date().getTime();
        //设置落笔的最近线条宽度 lastWidth
        this.lastLineWidth = this.lineWidthMax / 2;

        this.lastImg = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);    //保留最近一次
    }
    writing(co) {
        var curTime = new Date().getTime(); //获取当前时间戳（毫秒级）

        /* 维护笔画宽度 */
        if (curTime != this.lastTime) {
            this.context.beginPath();
            //设置笔画宽度，根据 _getLineWidth 计算出来
            this.context.lineWidth = this._getLineWidth(this._getS(this.lastX, this.lastY, co.x, co.y), curTime - this.lastTime);
            this.context.moveTo(this.lastX, this.lastY);
            this.context.lineTo(co.x, co.y);
            this.context.stroke();

            //维护更新鼠标的上一次位置为当前位置，供下一次writing使用
            this.lastX = co.x;
            this.lastY = co.y;
            //维护更新鼠标的上一次写笔时间为当前时间，供下一次writing使用
            this.lastTime = curTime;
        }
    }
    endWrite() {
        this.isWriting = false;
    }

    /**
     * 根据传进来的鼠标坐标，return 当前点相对于canvas 坐标
     * @param clientX
     * @param clientY
     * @returns {{x: number, y: number}}
     */
    _getCo(clientX, clientY) {
        var canvasLT = canvas.getBoundingClientRect();
        return { x: clientX - canvasLT.left, y: clientY - canvasLT.top };
    }

    //根据坐标计算距离
    _getS(sx, sy, ex, ey) {
        return Math.sqrt((ex - sx) * (ex - sx) + (ey - sy) * (ey - sy))
    }
    //根据 距离s 和 时间t 计算笔画粗细
    _getLineWidth(s, t) {
        var v = s / t;
        var resultLineWidth = 0;
        if (v < 0.1) {//速度到达某个最小值时，笔画很大，这里的8和0.1是我自己随便调的数，有兴趣的朋友可以自己找到更合理的方式和数值
            resultLineWidth = this.lineWidthMax;
        }
        else if (v > 8) {//速度到达某个最大值时，笔画很小
            resultLineWidth = this.lineWidthMin;
        }
        else { // 根据速度赋予线条宽度值，速度比例和笔画宽度比例的计算
            resultLineWidth = this.lineWidthMax - (v - 0.1) / (8 - 0.1) * (this.lineWidthMax - this.lineWidthMin)
        }

        //防止变化突然，使线条平滑，借鉴上次线条粗细取值
        resultLineWidth = this.lastLineWidth * 3 / 5 + resultLineWidth * 2 / 5;
        this.lastLineWidth = resultLineWidth;

        return resultLineWidth;
    }
    //获取签字坐标
    _getImgCoordinate() {
        var imgData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height).data

        var lOffset = canvas.width, rOffset = 0, tOffset = canvas.height, bOffset = 0

        for (var i = 0; i < canvas.width; i++) {
            for (var j = 0; j < canvas.height; j++) {
                var pos = (i + canvas.width * j) * 4
                if (imgData[pos] > 0 || imgData[pos + 1] > 0 || imgData[pos + 2] || imgData[pos + 3] > 0) {
                    // 说第j行第i列的像素不是透明的
                    // 楼主貌似底图是有背景色的,所以具体判断RGBA的值可以根据是否等于背景色的值来判断
                    bOffset = Math.max(j, bOffset) // 找到有色彩的最底部的纵坐标
                    rOffset = Math.max(i, rOffset) // 找到有色彩的最右端

                    tOffset = Math.min(j, tOffset) // 找到有色彩的最上端
                    lOffset = Math.min(i, lOffset) // 找到有色彩的最左端
                }
            }
        }
        // 由于循环是从0开始的,而我们认为的行列是从1开始的
        lOffset++
        rOffset++
        tOffset++
        bOffset++
        return {
            minX: lOffset - 1,
            minY: tOffset - 1,
            width: rOffset - lOffset,
            height: bOffset - tOffset
        }
        // console.log(lOffset, rOffset, tOffset, bOffset) // 1 100 26 50
        // 意思是说包含有像素的区域是 左边第1行,到右边第100行,顶部第26行,到底部50行
        // 此时如果你想找到外部区域的话,就是 left和top减1  right和bottom加1的区域
        // 分别是0, 101, 25, 51.这个区间能够刚好包裹住
    }

}

export { DrawBoard };
