import React from 'react';
import { hashHistory } from "react-router";
import { div2png, readyDo, TableHeads, GetLocationParam } from './templates';
import { DrawBoard } from './drawBoard';

let canvas;
let drawBoard;
const urls = {
    wordMsg: require('../images/wordMsg.png'),
}
export default class MeetingStatic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meetingShow:{
                user_list:[],
                copy_to_list:[],
                plan_list:[],
            }
        },
        this.handleMeetingDetailsGet = (res) => {
            console.log(res);
            res = {
                "success": true,
                "data": {
                    "id": "1",
                    "gd_company_id": "120",
                    "title": "会议标题", //会议主题
                    "user_ids": "_24_27_25_",
                    "copy_to_ids": "_67553_67554_",
                    "content": "<p>1></p><div>2</div>", //会议内容及成果
                    "add_time": "2018-02-11 18:08:35",
                    "address": "杭州滨江", //会议地址
                    "start_time": "2018-02-11 13:00:00", //会议开始时间
                    "end_time": "2018-02-11 14:00:00", //会议结束时间
                    "master_id": "67553", //主持人id
                    "recorder_id": "27", //记录人id
                    "signed_file_path": null, //签字确认文件地址
                    "master_name": "主持人员", //主持人姓名
                    "recorder_name": "记录人", //记录人姓名
                    "user_list": [//参会人员列表
                        {
                            "user_id": "24",
                            "mobile": "13958054563",
                            "email": "13958054563",
                            "name": "张兰"
                        },
                        {
                            "user_id": "27",
                            "mobile": "010-59273171",
                            "email": "service@eicodesign.c",
                            "name": "小明"
                        },
                        {
                            "user_id": "25",
                            "mobile": "18666024194",
                            "email": "270859699@qq.com",
                            "name": "小强"
                        }
                    ],
                    "copy_to_list": [//抄送人员列表
                        {
                            "user_id": "67553",
                            "mobile": "13767896789",
                            "email": null,
                            "name": "测试人员"
                        },
                        {
                            "user_id": "67554",
                            "mobile": "13756785679",
                            "email": null,
                            "name": "张5"
                        }
                    ],
                    "plan_list": [//下一步行动和计划列表
                        {
                            "id": "10",
                            "seq": "1",
                            "content": "这是第一步计划",
                            "user_id": "24",
                            "exp_time": "2018-02-11 00:00:00",
                            "action_type": "meeting",
                            "add_time": "2018-02-11 18:08:35",
                            "action_id": "1",
                            "username": "13958054563",
                            "nick_name": "Mia Zhang",
                            "real_name": "张兰"
                        },
                        {
                            "id": "11",
                            "seq": "2",
                            "content": "这是第二步计划",
                            "user_id": "27",
                            "exp_time": "2018-03-11 00:00:00",
                            "action_type": "meeting",
                            "add_time": "2018-02-11 18:08:35",
                            "action_id": "1",
                            "username": "service@eicodesign.com",
                            "nick_name": "eico design",
                            "real_name": null
                        }
                    ]
                }
            }
            this.setState({
                meetingShow:res.data
            })
        }
    }
    componentDidMount() {
        readyDo();
        canvas = document.getElementById("canvas");
        drawBoard = new DrawBoard(canvas);  // 初始化
        runPromise('get_record_info', {
            "meeting_id": GetLocationParam('id'),
        }, this.handleMeetingDetailsGet, false, "post");
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
    render() {
        return (
            <div id="fromHTMLtestdiv">
                <form className="visitRecordWrap">
                    <TableHeads url={urls.wordMsg} isHide={true}></TableHeads>
                    <button id="btnGenerate">下载图片</button>
                    <a id="downloadPng"></a>    <input id="filename" style={{ display: "none" }} />
                    {/* <button id="download">下载PDF</button> */}
                    <div className="recordMain">
                        <h2>会议纪要</h2>
                        <div className="tableDetails">
                            <table className="topTable">
                                <tr>
                                    <th className="darkbg">会议日期</th>
                                    <td style={{width:"33.333334%"}}>{this.state.meetingShow.start_time}</td>
                                    <th className="darkbg">会议地址</th>
                                    <td >{this.state.meetingShow.address}</td>
                                </tr>
                                <tr>
                                    <th className="darkbg">主持人</th>
                                    <td>{this.state.meetingShow.master_name}</td>
                                    <th className="darkbg">记录人</th>
                                    <td>{this.state.meetingShow.recorder_name}</td>
                                </tr>
                            </table>
                            <table className="sceneTable">
                                <tr>
                                    <td className="darkbg">参加人员</td>
                                    <td colSpan="3" style={{padding:"0 5px"}}>
                                        {
                                            this.state.meetingShow.user_list.map((value)=>(
                                                <span>{value.name} , </span>
                                            ))
                                        }
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td className="darkbg">会议主题</td>
                                    <td colSpan="3" style={{ padding: "0 5px" }}>{this.state.meetingShow.title}</td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="darkbg">会议内容及成果</td>
                                </tr>
                                <tr >
                                    <td colSpan="4">
                                        <pre 
                                            style={{minHeight:"3rem",padding:"0 8px"}} 
                                            dangerouslySetInnerHTML={{ __html: this.state.meetingShow.content }}
                                        ></pre>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="darkbg">下一步计划和行动</td>
                                </tr>
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
                                                this.state.meetingShow.plan_list.map((value) => (
                                                    <tr>
                                                        <td style={{ borderLeft: "0 none" }}>{value.seq}</td>
                                                        <td>{value.content}</td>
                                                        <td>{value.real_name}</td>
                                                        <td>{value.exp_time.split(" ")[0]}</td>
                                                    </tr>
                                                ))
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