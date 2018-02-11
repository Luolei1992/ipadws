import React from 'react';
import {Link} from 'react-router';
import { div2png, readyDo, TableHeads,init } from './templates';
import { DrawBoard } from './drawBoard';

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
        init('result');
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
            <div id="fromHTMLtestdiv">
                <form className="qualityFormWrap visitRecordWrap">
                    <TableHeads
                        url={urls.wordMsg}
                        isHide={false}
                        tag={<h3 className="fn-left">
                            <span style={{ borderBottom: "3px solid red" }}>新建验收单</span>
                            <Link to='/qualityList' style={{ color: "#fff" }}><span>历史验收单</span></Link>
                        </h3>}
                    ></TableHeads>
                    <button id="downloadPng">下载图片</button>
                    {/* <button id="download">下载PDF</button> */}
                    <div className="qualityWrap">
                        <div className="qualityWrapTop">
                            <h3>浙江中控技术股份有限公司</h3>
                            <h3>采购合同 - 阶段验收单</h3>
                        </div>
                        <table>
                            <tr>
                                <td>采购合同名称</td>
                                <td><input type="text" className="qualityIpt" /></td>
                                <td>项目合同号</td>
                                <td><input type="text" className="qualityIpt" /></td>
                            </tr>
                            <tr>
                                <td>项目合同名称</td>
                                <td><input type="text" className="qualityIpt" /></td>
                                <td>项目编号</td>
                                <td><input type="text" className="qualityIpt" /></td>
                            </tr>
                            <tr>
                                <td>项目负责人</td>
                                <td><input type="text" className="qualityIpt" /></td>
                                <td>采购人员</td>
                                <td><input type="text" className="qualityIpt" /></td>
                            </tr>
                            <tr>
                                <td>实施单位</td>
                                <td><input type="text" className="qualityIpt" /></td>
                                <td>
                                    <p style={{ lineHeight: "30px" }}>实施/实施单位</p>
                                    <p style={{ lineHeight: "30px" }}>联系人</p>
                                </td>
                                <td><input type="text" className="qualityIpt" /></td>
                            </tr>
                            <tr>
                                <td rowSpan="2">
                                    <p style={{ lineHeight: "30px" }}>阶段（节点）</p>
                                    <p style={{ lineHeight: "30px" }}>说明</p>
                                </td>
                                <td>节点描述</td>
                                <td colSpan="2"><input type="text" className="qualityIpt" /></td>
                            </tr>
                            <tr>
                                <td>
                                    <p style={{ lineHeight: "30px" }}>本次付款为</p>
                                    <p style={{ lineHeight: "30px" }}>第<i style={{ color: "red", textDecoration: "underline" }}>2</i>节点</p>
                                </td>
                                <td colSpan="2"><input type="text" className="qualityIpt" /></td>
                            </tr>
                            <tr>
                                <td>
                                    <table style={{ border: "0 none" }}>
                                        <tr>
                                            <td style={{
                                                borderTop: "0 none",
                                                borderLeft: "0 none",
                                                borderBottom: "0 none",
                                                width: "33.33%"
                                            }} rowSpan="3">
                                                <p style={{ lineHeight: "30px" }}>验 收</p>
                                                <p style={{ lineHeight: "30px" }}>内 容</p>
                                            </td>
                                            <td style={{ borderTop: "0 none", borderRight: "0 none", width: "66.66%" }}>到货情况</td>
                                        </tr>
                                        <tr>
                                            <td style={{ borderRight: "0 none", borderLeft: "0 none" }}>运行情况</td>
                                        </tr>
                                        <tr>
                                            <td style={{ borderRight: "0 none", borderBottom: "0 none" }}>资料情况</td>
                                        </tr>
                                    </table>
                                </td>
                                <td colSpan="3">
                                    <table style={{ border: "0 none" }}>
                                        <tr>
                                            <td style={{ border: "0 none", borderBottom: "1px solid #000" }}><input type="text" className="qualityIpt" /></td>
                                        </tr>
                                        <tr>
                                            <td style={{ border: "0 none" }}><input type="text" className="qualityIpt" /></td>
                                        </tr>
                                        <tr>
                                            <td style={{ border: "0 none", borderTop: "1px solid #000" }}><input type="text" className="qualityIpt" /></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p style={{ lineHeight: "40px" }}>验收结果</p>
                                    <p style={{ lineHeight: "40px" }}>后续处理</p>
                                </td>
                                <td colSpan="3">
                                    <textarea 
                                        id="result" 
                                        style={{width:"100%",minHeight:"1.5rem",padding:".2rem",boxSizing:"border-box",border:"0 none"}}
                                    ></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="signatureTxt">
                                    <div className="suggess">
                                        <canvas id="canvas" width="768" height="150"></canvas>
                                        <div className="signature sure" style={{ position: "relative", zIndex: "100" }}>
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
                </form>
            </div>
        )
    }
}