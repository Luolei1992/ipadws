import React from 'react';
// import { Checkbox, Flex } from 'antd-mobile';
import { div2png, readyDo, TableHeads, init } from './templates';
import { DrawBoard } from './drawBoard';

let canvas;
let drawBoard;
const urls = {
    wordMsg: require('../images/wordMsg.png'),
}
export default class SceneVisit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allChecked: true,
            silent: true,
            checkArr1: [true, false, false],
            checkArr2: [true, false, false],
            checkArr3: [true, false, false],
            checkArr4: [true, false, false],
            checkArr5: [true, false, false],
        }
    }
    componentDidMount() {
        init("sceneResult");
        init("sceneNext");
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
    changeCheck = () => {
        this.setState({
            allChecked: !this.state.allChecked
        })
    }
    isCheck1 = (num,idx) => {
        let arr = [false, false, false];
        if(idx){
            arr[idx] = !arr[idx];
            arr[0] = false;
            this.setState({
                allChecked: false
            });
        }else{
            arr[idx] = !arr[idx];
        };
        switch (num) {
            case 1:
                this.setState({
                    checkArr1: arr
                })
                break;
            case 2:
                this.setState({
                    checkArr2: arr
                })
                break;
            case 3:
                this.setState({
                    checkArr3: arr
                })
                break;
            case 4:
                this.setState({
                    checkArr4: arr
                })
                break;
            case 5:
                this.setState({
                    checkArr5: arr
                })
                break;
            default:
                break;
        }


        // if (this.state.checkArr1[0] && this.state.checkArr2[0] && this.state.checkArr3[0] && this.state.checkArr4[0] && this.state.checkArr5[0]) {
        //     this.setState({
        //         allChecked: true
        //     });
        // };
    }
    toggleAgree=()=>{
        if(!this.state.allChecked){
            this.setState({
                checkArr1: [true, false, false],
                checkArr2: [true, false, false],
                checkArr3: [true, false, false],
                checkArr4: [true, false, false],
                checkArr5: [true, false, false],
            })
        }else{
            this.setState({
                checkArr1: [false, false, false],
                checkArr2: [false, false, false],
                checkArr3: [false, false, false],
                checkArr4: [false, false, false],
                checkArr5: [false, false, false],
            })
        }
    }
    render() {
        return (
            <form className="visitRecordWrap" id="fromHTMLtestdiv">
                <TableHeads
                    url={urls.wordMsg}
                    isHide={true}
                ></TableHeads>
                <button id="btnGenerate">下载图片</button>
                <a id="downloadPng"></a>    <input id="filename" style={{ display: "none" }} />
                <div className="recordMain">
                    <h2>现场回访记录</h2>
                    <div className="tableDetails">
                        <table className="topTable">
                            <tr className="sixToOne">
                                <td className="darkbg">顾客单位</td>
                                <td><input type="text" className="qualityIpt" /></td>
                                <td className="darkbg">回访主题</td>
                                <td><input type="text" className="qualityIpt" /></td>
                            </tr>
                            <tr className="sixToOne">
                                <td className="darkbg">受访人员</td>
                                <td><input type="text" className="qualityIpt" /></td>
                                <td className="darkbg">回访人员</td>
                                <td><input type="text" className="qualityIpt" /></td>
                            </tr>
                        </table>
                        <table className="sceneTable">
                            <tr>
                                <td style={{ textAlign: "center", fontWeight: "800" }} colSpan="4" className="darkbg">回访内容及成果</td>
                            </tr>
                            <tr >
                                <td colSpan="4">
                                    <textarea className="allBox" id="sceneResult" style={{ minHeight: "3rem" }}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: "center", fontWeight: "800" }} colSpan="4" className="darkbg">下一步计划和行动</td>
                            </tr>
                            <tr>
                                <td colSpan="4">
                                    <textarea className="allBox" id="sceneNext" style={{ minHeight: "3rem" }}></textarea>
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
                                    满意度调查 <span style={{ float: "right", fontWeight: 500, marginRight: "0.3rem" }}>
                                        <input type="checkbox" id="allAgree" checked={this.state.allChecked} onChange={() => { this.toggleAgree()}} onClick={() => { this.changeCheck() }} />&nbsp;
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
                                <td><input type="checkbox" checked={this.state.checkArr1[0]} onClick={(e) => { this.isCheck1(1,0) }} /></td>
                                <td><input type="checkbox" checked={this.state.checkArr1[1]} onClick={(e) => { this.isCheck1(1,1) }} /></td>
                                <td><input type="checkbox" checked={this.state.checkArr1[2]} onClick={(e) => { this.isCheck1(1,2) }} /></td>
                            </tr>
                            <tr className="fourToOne">
                                <td>沟通能力</td>
                                <td><input type="checkbox" checked={this.state.checkArr2[0]} onClick={(e) => { this.isCheck1(2,0) }} /></td>
                                <td><input type="checkbox" checked={this.state.checkArr2[1]} onClick={(e) => { this.isCheck1(2,1) }} /></td>
                                <td><input type="checkbox" checked={this.state.checkArr2[2]} onClick={(e) => { this.isCheck1(2,2) }} /></td>
                            </tr>
                            <tr className="fourToOne">
                                <td>工作成果</td>
                                <td><input type="checkbox" checked={this.state.checkArr3[0]} onClick={(e) => { this.isCheck1(3,0) }} /></td>
                                <td><input type="checkbox" checked={this.state.checkArr3[1]} onClick={(e) => { this.isCheck1(3,1) }} /></td>
                                <td><input type="checkbox" checked={this.state.checkArr3[2]} onClick={(e) => { this.isCheck1(3,2) }} /></td>
                            </tr>
                            <tr className="fourToOne">
                                <td>服务态度</td>
                                <td><input type="checkbox" checked={this.state.checkArr4[0]} onClick={(e) => { this.isCheck1(4,0) }} /></td>
                                <td><input type="checkbox" checked={this.state.checkArr4[1]} onClick={(e) => { this.isCheck1(4,1) }} /></td>
                                <td><input type="checkbox" checked={this.state.checkArr4[2]} onClick={(e) => { this.isCheck1(4,2) }} /></td>
                            </tr>
                            <tr className="fourToOne">
                                <td>是否准时到达</td>
                                <td><input type="checkbox" checked={this.state.checkArr5[0]} onClick={(e) => { this.isCheck1(5,0) }} /></td>
                                <td><input type="checkbox" checked={this.state.checkArr5[1]} onClick={(e) => { this.isCheck1(5,1) }} /></td>
                                <td><input type="checkbox" checked={this.state.checkArr5[2]} onClick={(e) => { this.isCheck1(5,2) }} /></td>
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
                                <td colSpan="4" className="signatureTxt">
                                    <div className="suggess">
                                        <canvas id="canvas" width="768" height="150"></canvas>
                                        <div className="signature" style={{ position: "relative", zIndex: "100" }}>
                                            <span style={{ backgroundColor: "#fff" }}>顾客/客户(签字): </span>
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