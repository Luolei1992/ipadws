import React from 'react';
// import { Checkbox, Flex } from 'antd-mobile';
import { div2png, readyDo, TableHead } from './templates';
import { DrawBoard } from './drawBoard';

let canvas;
let drawBoard;
const urls = {
    wordMsg: require('../images/wordMsg.png'),
}
export default class SceneVisit extends React.Component {
    constructor (props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount () {
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
            <form className="visitRecordWrap" id="fromHTMLtestdiv">
                <TableHead url={urls.wordMsg}></TableHead>
                <button id="downloadPng">下载图片</button>
                <button id="download">下载PDF</button>
                <div className="recordMain">
                    <h2>现场回访记录</h2>
                    <div className="tableDetails">
                        <table className="topTable">
                            <tr className="sixToOne">
                                <td className="darkbg">顾客单位</td>
                                <td></td>
                                <td className="darkbg">回访主题</td>
                                <td></td>
                            </tr>
                            <tr className="sixToOne">
                                <td className="darkbg">回访人员</td>
                                <td></td>
                                <td className="darkbg">回访人员</td>
                                <td></td>
                            </tr>
                        </table>
                        <table className="sceneTable">
                            <tr>
                                <td style={{textAlign:"center",fontWeight:"800"}} colSpan="4" className="darkbg">回访内容及成果</td>
                            </tr>
                            <tr >
                                <td colSpan="4">
                                    <textarea className="allBox"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td style={{textAlign:"center",fontWeight:"800"}} colSpan="4" className="darkbg">下一步计划和行动</td>
                            </tr>
                            <tr>
                                <td colSpan="4">
                                    <textarea className="allBox"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ 
                                    textAlign: "center", 
                                    fontWeight: "800" 
                                    }} 
                                    colSpan="4" 
                                    className="darkbg"
                                >
                                    满意度调查 <span style={{float:"right",fontWeight:500,marginRight:"0.3rem"}}>
                                        <input type="checkbox" id="allAgree" checked/>&nbsp;
                                        <label htmlFor="allAgree">全满意</label>
                                    </span>
                                </td>
                            </tr>
                            <tr className="fourToOne">
                                <td>项目</td>
                                <td>满意</td>
                                <td>一般</td>
                                <td>不满意</td>
                            </tr>
                            <tr className="fourToOne">
                                <td>仪容仪表</td>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td><input type="checkbox"/></td>
                                <td><input type="checkbox"/></td>
                            </tr>
                            <tr className="fourToOne">
                                <td>沟通能力</td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                            </tr>
                            <tr className="fourToOne">
                                <td>工作成果</td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                            </tr>
                            <tr className="fourToOne">
                                <td>服务态度</td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                            </tr>
                            <tr className="fourToOne">
                                <td>是否准时到达</td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                            </tr>
                            <tr>
                                <td colSpan="4">
                                    <div className="suggess">
                                        <div className="midDiv">
                                            <span>总体印象: </span>
                                            <ul>
                                                <li>
                                                    <input type="checkbox" id="gloab" />
                                                    <label htmlFor="gloab"> 很满意</label>
                                                </li>
                                                <li>
                                                    <input type="checkbox" id="just" />
                                                    <label htmlFor="just"> 一般</label>
                                                </li>
                                                <li>
                                                    <input type="checkbox" id="dont" />
                                                    <label htmlFor="dont"> 不满意</label>
                                                </li>
                                                <li>
                                                    <input type="checkbox" id="bad" />
                                                    <label htmlFor="bad"> 很不满意</label>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="midDivTop">
                                            <span>您的宝贵建议: </span>&nbsp;&nbsp;
                                            <textarea className="suggessMsg"></textarea>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="signatureTxt">
                                    <div className="suggess">
                                        <canvas id="canvas" width="768" height="150"></canvas>
                                        <div className="signature" style={{position:"relative",zIndex:"1000"}}>
                                            <span style={{backgroundColor:"#fff"}}>顾客/客户(签字): </span>
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
        )
    }
}