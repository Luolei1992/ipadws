import React from 'react';
import { div2png, readyDo, TableHead } from './templates';

let canvas;
let drawBoard;
const urls = {
    wordMsg: require('../images/wordMsg.png'),
}
export default class Quality extends React.Component {
    constructor(props) {
        super (props);
        this.state = {

        }
    }
    componentDidMount(){
        readyDo();
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
            <form className="qualityFormWrap visitRecordWrap" id="fromHTMLtestdiv">
                <TableHead url={urls.wordMsg}></TableHead>
                <div className="qualityWrap">
                    <div className="qualityWrapTop">
                        <h3>浙江中控技术股份有限公司</h3>
                        <h3>采购合同 - 阶段验收单</h3>
                    </div>
                    <table>
                        <tr>
                            <td>采购合同名称</td>
                            <td></td>
                            <td>项目合同号</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>项目合同名称</td>
                            <td></td>
                            <td>项目编号</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>项目负责人</td>
                            <td></td>
                            <td>采购人员</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>实施单位</td>
                            <td></td>
                            <td>
                                <p style={{lineHeight:"30px"}}>实施/实施单位</p>
                                <p style={{ lineHeight: "30px" }}>联系人</p>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>
            </form>
        )
    }
}