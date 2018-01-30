import React from 'react';
import { DrawBoard } from './drawBoard';

let canvas;
let drawBoard;
export default class Signature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        canvas = document.getElementById("canvas");
        drawBoard = new DrawBoard(canvas);  // 初始化
        console.log(drawBoard);     
    }

    clearAll = function () {
        drawBoard.clear();
    }
    cancelLast = function () {
        drawBoard.cancel();
    }
    save = function () {
        drawBoard.save('only-draw', function (url) {
            if (!url) {
                alert("请先签字后再保存");
                return;
            } else {
                console.log(url);
            }
        });
    }
    render(){
        return (
            <div class="main">
                <p class="title">电子签名区</p>
                <canvas id="canvas" width="500" height="300" style={{backgroundColor:"red"}}></canvas>
                <div>
                    <button type="button" class="bt-warn" onClick={this.clearAll}>重签</button>
                    <button type="button" class="bt-default" onClick={this.cancelLast}>撤销</button>
                    <button type="button" class="bt-primary" onClick={this.save}>保存</button>
                </div>
            </div>
        )
    }
}