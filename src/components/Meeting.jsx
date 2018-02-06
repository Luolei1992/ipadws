import React from 'react';
import { hashHistory } from "react-router";
import { div2png, readyDo, TableHeads } from './templates';
import { DrawBoard } from './drawBoard';

let canvas;
let drawBoard;
const urls = {
    wordMsg: require('../images/wordMsg.png'),
}
export default class Meeting extends React.Component {
    constructor (props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount () {
        readyDo();
        canvas = document.getElementById("canvas");
        drawBoard = new DrawBoard(canvas);  // 初始化
        // console.log(drawBoard);
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
            <div id="fromHTMLtestdiv">
                <form className="visitRecordWrap">
                    <TableHeads url={urls.wordMsg} isHide={true}></TableHeads>
                    <button id="downloadPng">下载图片</button>
                    <button id="download">下载PDF</button>
                    <div className="recordMain">
                        <h2>会议纪要</h2>
                        <div className="tableDetails">
                            <table className="topTable">
                                <tr>
                                    <th className="darkbg">会议日期</th>
                                    <td></td>
                                    <th className="darkbg">会议地址</th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th className="darkbg">主持人</th>
                                    <td></td>
                                    <th className="darkbg">记录人</th>
                                    <td></td>
                                </tr>
                            </table>
                            <table className="sceneTable">
                                <tr>
                                    <td rowSpan="3" className="darkbg">参加人员</td>
                                    <td colSpan="3"></td>
                                </tr>
                                <tr>
                                    <td colSpan="3"></td>
                                </tr>
                                <tr>
                                    <td colSpan="3"></td>
                                </tr>
                                <tr>
                                    <td className="darkbg">会议主题</td>
                                    <td colSpan="3"></td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="darkbg">会议内容及成果</td>
                                </tr>
                                <tr >
                                    <td colSpan="4">
                                        <textarea className="allBox"></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="darkbg">下一步计划和行动</td>
                                </tr>
                                <tr>
                                    <td colSpan="4">
                                        <textarea className="allBox"></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="signatureTxt">
                                        <div className="suggess">
                                            <canvas id="canvas" width="768" height="150"></canvas>
                                            <div className="signature sure" style={{ position: "relative", zIndex: "1000" }}>
                                                <span style={{ backgroundColor: "#fff" }}>项目负责人(签字): </span>
                                            </div>
                                            <div className="dataType">
                                                <div className="bt-warn fn-right" style={{ position: "relative", zIndex: "1000" }}>
                                                    <button type="button" onClick={this.clearAll}>重签</button>
                                                </div>
                                                <div className="date" >
                                                    <span>日期：</span>
                                                    <ul>
                                                        <li>
                                                            <span>年</span>
                                                        </li>
                                                        <li>
                                                            <span>月</span>
                                                        </li>
                                                        <li>
                                                            <span>日</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}