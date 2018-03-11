import React from 'react';
import { Modal, Toast } from 'antd-mobile';
import { hashHistory } from "react-router";
import { div2png, readyDo, TableHeads, init, GetLocationParam } from './templates';
import { DrawBoard } from './drawBoard';

let canvas;
let drawBoard;
let numPlus = 0;
let interval=[];
let timeout=[];
const urls = {
    wordMsg: require('../images/wordMsg.png'),
}
export default class Meeting extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            meetingDate:"",
            meetingAddress:"",
            meetingAdmin:"",
            meetingWrite:"",
            meetingPersonal:"",
            meetingTitle:"",
            meetingResult:"",
            things:"",
            duty:"",
            finishTime:"",
            orderList:[],
            id:""
        },
        this.handleMeetingAdd=(res)=>{
            console.log(res);
            if(res.success){
                this.setState({
                    id: res.message.id
                })
            }
        },
        this.saveProject = (res) => {
            console.log(res);
            if(res.success) {
                Toast.info("文件保存成功", 2, null, false);
                setTimeout(() => {
                    Toast.hide();
                }, 1000);
            }else{
                setTimeout(() => {
                    Toast.hide()
                }, 1000);
                Toast.info("文件保存失败", 2, null, false);
            }
        }
    }
    componentDidMount () {
        this.props.router.setRouteLeaveHook(
            this.props.route,
            this.routerWillLeave
        )
        readyDo(this.alerts);
        init("meetingResult");
        canvas = document.getElementById("canvas");
        drawBoard = new DrawBoard(canvas);  // 初始化
        interval.push(setInterval(() => {
            this.addMeeting();
        }, 30000));
        let head = document.getElementsByClassName("tableHead")[0];
        let mainWrap = document.getElementById("mainWrap");
        head.style.position = "static";
        mainWrap.style.marginTop = '0';
    }
    routerWillLeave(nextLocation) {
        let head = document.getElementsByClassName("tableHead")[0];
        head.style.position = "fixed";
        for(let i = 0;i < interval.length;i++){
            clearInterval(interval[i]);
        }
    }
    addMeeting = () => {
        runPromise('add_meeting', {
            "gd_company_id": GetLocationParam('id') || validate.getCookie("baseId"),
            "title": this.state.meetingTitle,
            "user_ids": this.state.meetingPersonal,
            "copy_to_ids": "",
            "content": this.state.meetingResult,
            "suggest": "",
            "score": "",
            "plans": this.state.orderList,
            "address": this.state.meetingAddress,
            "master_id": this.state.meetingAdmin,
            "recorder_id": this.state.meetingWrite,
            "start_time": this.state.meetingDate,
            "end_time": ""
        }, this.handleMeetingAdd, false, "post");
    }
    clearAll = function () {
        drawBoard.clear();
    }
    cancelLast = function () {
        drawBoard.cancel();
    }
    showModal = key => (e, id) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
        setTimeout(() => {
            let iptList = document.querySelectorAll("input");
            for (var a = 0; a < iptList.length; a++) {
                iptList[a].addEventListener("focus", () => {
                    document.querySelector(".am-modal-wrap").style.marginTop = "-100px";
                }, false);
                iptList[a].addEventListener("blur", () => {
                    document.querySelector(".am-modal-wrap").style.marginTop = "0";
                }, false);
            }
        }, 500);
        // timeout.push(
        //     setTimeout(() => {
        //         let propmtTouchBox = document.querySelector(".am-modal-wrap");
        //         propmtTouchBox.addEventListener("touchmove", this.touchBlur, false);
        //     }, 500)
        // );
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
        // let propmtTouchBox = document.querySelector(".am-modal-wrap .am-modal");
        // propmtTouchBox.removeEventListener("touchmove", this.touchBlur, false);
        // for (let i = 0; i < timeout.length; i++) {
        //     clearTimeout(timeout[i]);
        // }
    }
    addOrderMsg() {       //下一任行动和计划
        ++numPlus;
        let lis = {
            seq: numPlus,
            content: this.state.things,
            user_id: this.state.duty,
            exp_time: this.state.finishTime
        }
        if (this.state.things == "") {
            Toast.info('请填写事项！', .8);
        } else if (this.state.duty == "") {
            Toast.info('请填写责任人！', .8);
        } else if (this.state.finishTime == "") {
            Toast.info('请填写完成时间！', .8);
        } else {
            this.onClose('modal2')();
            this.state.orderList.push(lis);
            this.setState({
                order: "",
                things: "",
                duty: "",
                finishTime: ""
            })
        }
    }
    alerts = (a) => {
        runPromise('sign_up_document', {
            action_type: "meeting",
            action_id: this.state.id,
            signed_file_path: a
        }, this.saveProject, true, "post");
    }
    onChangeThings(e) {
        this.setState({
            things: e.currentTarget.value
        });
    }
    onChangeDuty(e) {
        this.setState({
            duty: e.currentTarget.value
        });
    }
    onChangeFinish(e) {
        this.setState({
            finishTime: e.currentTarget.value
        });
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
    loadingToast() {
        Toast.loading('保存中...', 0, () => {
            // alert(4)
        },true);
    }
    touchBlur = () => {
        let iptList = document.getElementsByTagName("input");
        let txtList = document.getElementsByTagName("textarea");
        for (let a = 0; a < iptList.length; a++) {
            iptList[a].blur();
        }
        for (let b = 0; b < txtList.length; b++) {
            txtList[b].blur();
        }
    }
    render(){
        return (
            // <div className="visitRecordWrap" id="fromHTMLtestdiv" onTouchMove={() => { this.touchBlur(); }}>
            <div className="visitRecordWrap" id="fromHTMLtestdiv">
                <TableHeads url={urls.wordMsg} isHide={true}></TableHeads>
                <div className="recordMain animatePageY">
                    <h2>会议纪要</h2>
                    <div className="tableDetails">
                        <table className="topTable">
                            <tr>
                                <th className="darkbg">会议日期</th>
                                <td>
                                    <input type="text" 
                                        className="surveyIpt"
                                        placeholder="0000-00-00 12:00"
                                        onChange={(e)=>{this.setState({meetingDate:e.currentTarget.value})}}
                                    />
                                </td>
                                <th className="darkbg">会议地址</th>
                                <td>
                                    <input type="text" 
                                        className="surveyIpt"
                                        onChange={(e) => { this.setState({ meetingAddress: e.currentTarget.value }) }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th className="darkbg">主持人</th>
                                <td>
                                    <input type="text" 
                                        className="surveyIpt"
                                        onChange={(e) => { this.setState({ meetingAdmin: e.currentTarget.value }) }}
                                    />
                                </td>
                                <th className="darkbg">记录人</th>
                                <td>
                                    <input type="text" className="surveyIpt"
                                        onChange={(e) => { this.setState({ meetingWrite: e.currentTarget.value }) }}
                                    />
                                </td>
                            </tr>
                        </table>
                        <table className="sceneTable">
                            <tr>
                                <td className="darkbg">参加人员</td>
                                <td colSpan="3">
                                    <input type="text" className="surveyIpt" style={{padding:"0 5px"}}
                                        onChange={(e) => { this.setState({ meetingPersonal: e.currentTarget.value }) }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="darkbg">会议主题</td>
                                <td colSpan="3">
                                    <input type="text" className="surveyIpt" style={{padding:"0 5px"}}
                                        onChange={(e) => { this.setState({ meetingTitle: e.currentTarget.value }) }}                                        
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="darkbg">会议内容及成果</td>
                            </tr>
                            <tr >
                                <td colSpan="4">
                                    <textarea className="allBox" id="meetingResult" style={{minHeight:"4rem"}}
                                        onChange={(e) => { this.setState({ meetingResult: e.currentTarget.value }) }}                                            
                                    ></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="darkbg newPersonalMsg">
                                    下一步计划和行动<span onClick={this.showModal('modal2')}>新增 <i className="iconfont icon-jia"></i></span>
                                </td>
                            </tr>
                            <Modal
                                visible={this.state.modal2}
                                transparent
                                maskClosable={true}
                                onClose={this.onClose('modal2')}
                                className="personalLinkWrap"
                                footer={[
                                    { text: '取消', onPress: () => { this.onClose('modal2')() } },
                                    { text: '确定', onPress: () => { this.addOrderMsg(); } }
                                ]}
                            >
                                <div className="personalLink addDutyList">
                                    <div className="personalLinkList">
                                        <ul>
                                            <li style={{ display: "none" }}>
                                                <span>序 号</span>
                                                <input
                                                    type="text"
                                                    value={this.state.order}
                                                />
                                            </li>
                                            <li>
                                                <span style={{ color: "#333" }}>事 项</span>
                                                <input
                                                    type="text"
                                                    value={this.state.things}
                                                    onChange={(e) => { this.onChangeThings(e) }}
                                                />
                                            </li>
                                            <li>
                                                <span style={{ color: "#333" }}>责任人</span>
                                                <input
                                                    type="text"
                                                    value={this.state.duty}
                                                    onChange={(e) => { this.onChangeDuty(e) }}
                                                />
                                            </li>
                                            <li>
                                                <span style={{ color: "#333" }}>完成时间</span>
                                                <input
                                                    type="text"
                                                    value={this.state.finishTime}
                                                    onChange={(e) => { this.onChangeFinish(e) }}
                                                    placeholder="0000-00-00"
                                                />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Modal>
                            <tr>
                                <td colSpan="4">
                                    <table className="plan">
                                        <tr>
                                            <td style={{ borderTop: "0 none", borderLeft: "0 none" }}>序号</td>
                                            <td style={{ borderTop: "0 none" }}>事项</td>
                                            <td style={{ borderTop: "0 none" }}>责任人</td>
                                            <td style={{ borderTop: "0 none", borderRight: "0 none" }}>完成时间</td>
                                        </tr>
                                        {
                                            this.state.orderList.map((value, idx) => {
                                                return <tr>
                                                    <td style={{ borderLeft: "0 none" }}>{idx + 1}</td>
                                                    <td>{value.content}</td>
                                                    <td>{value.user_id}</td>
                                                    <td>{value.exp_time}</td>
                                                </tr>
                                            })
                                        }

                                    </table>
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
                                                {/* <button type="button" onClick={this.save}>确认</button> */}
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
                <button id="downloadPng" onClick={() => { 
                        this.loadingToast();
                        this.addMeeting(); 
                        for(let i = 0;i < interval.length;i++){
                            clearInterval(interval[i]);
                        }
                    }}
                >下载图片</button>
            </div>
        )
    }
}