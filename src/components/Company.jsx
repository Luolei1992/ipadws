import React from 'react';
import { div2png, readyDo, TableHead } from './templates';
import { DrawBoard } from './drawBoard';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
}
let canvas;
let drawBoard;
export default class Company extends React.Component {
    constructor (props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount () {
        readyDo();
        canvas = document.getElementById("canvas");
        drawBoard = new DrawBoard(canvas);  // 初始化
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
                    <TableHead url={urls.wordMsg}></TableHead>
                    <button id="downloadPng">下载图片</button>
                    <button id="download">下载PDF</button>
                    <div className="recordMain">
                        <h2 style={{letterSpacing:"1px",marginTop:"0.8rem"}}>上海泰宇公司回访记录</h2>
                        <p style={{textAlign:"center"}}>
                            文件编号: 156489415164  <span style={{ padding: "0 15px" }}></span>起止时间: 2018.10.11-2019.1.23<span style={{ padding: "0 15px" }}></span>
                        </p>
                        <div className="tableDetails">
                            <table className="topTable">
                                <tr>
                                    <td colSpan="4" className="darkbg">客户信息</td>
                                </tr>
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
                                    <td colSpan="4" className="darkbg">客户信息</td>
                                </tr>
                                <tr>
                                    <td colSpan="4">
                                        <table className="personalMsg">
                                            <tr style={{borderBottom:"1px solid #ccc"}}>
                                                <td>姓名</td>
                                                <td>职位</td>
                                                <td>手机号</td>
                                                <td>邮箱</td>
                                                <td>备注</td>
                                            </tr>
                                            <tr>
                                                <td style={{width:"10%"}}>张三</td>
                                                <td style={{ width: "10%"}}>前端开发</td>
                                                <td style={{ width: "20%"}}>15658585959</td>
                                                <td style={{ width: "20%"}}>1151565654@qq.com</td>
                                                <td style={{ width: "40%"}}>的分别是第开大萨达撒大的核辐射的覅偶</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="darkbg">合同内容</td>
                                </tr>
                                <tr >
                                    <td colSpan="4">
                                        <textarea className="allBox"></textarea>
                                        文件上传
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="darkbg">下一步计划和行动</td>
                                </tr>
                                <tr>
                                    <td colSpan="4">
                                        <table className="plan">
                                            <tr>
                                                <td style={{borderTop:"0 none",borderLeft:"0 none"}}>序号</td>
                                                <td style={{borderTop:"0 none"}}>事项</td>
                                                <td style={{borderTop:"0 none"}}>责任人</td>
                                                <td style={{borderTop:"0 none",borderRight:"0 none"}}>完成时间</td>
                                            </tr>
                                            <tr>
                                                <td style={{borderLeft:"0 none"}}></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="signatureTxt">
                                        <div className="suggess">
                                            <div className="midDiv">
                                                <span style={{ lineHeight: "46px" }}>总体印象: </span>
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
                                    <td colSpan="4" className="signatureTxt" style={{borderTop:"0 none"}}>
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