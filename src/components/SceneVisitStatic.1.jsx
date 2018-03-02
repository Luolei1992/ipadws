import React from 'react';
// import { Checkbox, Flex } from 'antd-mobile';
import { div2png, readyDo, TableHeads, init, GetLocationParam } from './templates';
import { DrawBoard } from './drawBoard';

let canvas;
let drawBoard;
let ischeck=true;
const urls = {
    wordMsg: require('../images/wordMsg.png'),
}
export default class SceneVisitStatic extends React.Component {
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
            sceneVisits: {
                survey_list: [
                    {},{},{},{},{}
                ],
                user_list: [],
                customer_list: []
            },
            scenePlan:{
                item_list:[]
            }
        },
        this.handleSceneVisitGet = (res) => {
            console.log(res);
            res = {
                "success": true,
                "data": {
                    "id": "1",
                    "gd_company_id": "120", //公司id
                    "title": "现场记录标题", //回访主题
                    "user_ids": "_24_27_25_",
                    "customer_ids": "_67553_67554_",
                    "content": "<p>1>dsadsa</p><div>2zzzzzzdfzs</div>", //回访内容及成果
                    "score": "2", //总体印象
                    "suggest": "客户建议", //客户建议
                    "add_time": "2018-02-11 16:34:25", //添加时间
                    "signed_file_path": "null", //签名文件路径
                    "survey_list": [//满意度调查列表
                        {
                            "id": "3",
                            "survey_menu_id": "3", //满意度调查问卷菜单id
                            "score": "2", //满意度打分
                            "name": "工作成果"	//满意度调查问卷菜单名称
                        },
                        {
                            "id": "2",
                            "survey_menu_id": "2",
                            "score": "1",
                            "name": "沟通能力"
                        },
                        {
                            "id": "1",
                            "survey_menu_id": "1",
                            "score": "1",
                            "name": "仪容仪表"
                        },
                        {
                            "id": "5",
                            "survey_menu_id": "5",
                            "score": "0",
                            "name": "是否准时到达"
                        },
                        {
                            "id": "4",
                            "survey_menu_id": "4",
                            "score": "2",
                            "name": "服务态度"
                        }
                    ],
                    "user_list": [//回访人员列表
                        {
                            "user_id": "24",
                            "mobile": "13958054563", //手机号码
                            "email": "oob400@126.com", //邮箱
                            "name": "张兰"	//姓名
                        },
                        {
                            "user_id": "27",
                            "mobile": "010-59273171",
                            "email": "service@eicodesign.c",
                            "name": null
                        },
                        {
                            "user_id": "25",
                            "mobile": "18666024194",
                            "email": "270859699@qq.com",
                            "name": null
                        }
                    ],
                    "customer_list": [//被访人员列表
                        {
                            "user_id": "67553",
                            "mobile": "13767896789", //手机号码
                            "email": "123@123.com", //邮箱
                            "name": "测试人员"	//姓名
                        },
                        {
                            "user_id": "67554",
                            "mobile": "13756785679",
                            "email": "",
                            "name": "张5"
                        }
                    ]
                }
            };
            res.data.survey_list.map((value)=>{
                if(value.score != 2){
                    ischeck = false;
                };
                return ischeck;
            })
            this.setState({
                sceneVisits: res.data
            })
        },
        this.handleScenePlanGet = (req) => {
            console.log(req);
            req = {
                "success": true,
                "data": {
                    "item_list": [
                        {
                            "id": "5",
                            "seq": "0", //序号
                            "content": "这是计划的详细内容", //下一步计划和行动的具体内容
                            "user_id": "24", //责任人id
                            "exp_time": "2018-02-01 00:00:00", //期望完成的时间
                            "action_type": "project",
                            "add_time": "2018-02-11 15:12:57", //添加时间
                            "action_id": "4",
                            "username": "13958054563", //责任人的username
                            "nick_name": "Mia Zhang", //责任人的昵称
                            "real_name": "张兰"	//责任人的真实姓名
                        },
                        {
                            "id": "3",
                            "seq": "1",
                            "content": "这是第一步计划",
                            "user_id": "24",
                            "exp_time": "2018-02-11 00:00:00",
                            "action_type": "project",
                            "add_time": "2018-02-11 14:46:58",
                            "action_id": "4",
                            "username": "13958054563",
                            "nick_name": "Mia Zhang",
                            "real_name": "张兰"
                        },
                        {
                            "id": "4",
                            "seq": "2",
                            "content": "这是第二步计划",
                            "user_id": "27",
                            "exp_time": "2018-03-11 00:00:00",
                            "action_type": "project",
                            "add_time": "2018-02-11 14:46:59",
                            "action_id": "4",
                            "username": "service@eicodesign.com",
                            "nick_name": "eico design",
                            "real_name": null
                        }
                    ],
                    "total_count": "3"
                }
            };
            this.setState({
                scenePlan: req.data
            })
        };
    }
    componentDidMount() {
        // readyDo();
        canvas = document.getElementById("canvas");
        drawBoard = new DrawBoard(canvas);  // 初始化
        runPromise('get_record_info', {
            "record_id": GetLocationParam('id')
        }, this.handleSceneVisitGet, false, "post");
        runPromise('get_plan_list', {
            "limit": "20",
            "offset": "0",
            "action_type": "record",
            "action_id": GetLocationParam('id')
        }, this.handleScenePlanGet, false, "post");
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
    toggleAgree = () => {
        if (!this.state.allChecked) {
            this.setState({
                checkArr1: [true, false, false],
                checkArr2: [true, false, false],
                checkArr3: [true, false, false],
                checkArr4: [true, false, false],
                checkArr5: [true, false, false],
            })
        } else {
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
            <div className="visitRecordWrap" id="fromHTMLtestdiv">
                <TableHeads
                    url={urls.wordMsg}
                    isHide={true}
                ></TableHeads>
                {/* <button id="downloadPng">下载图片</button> */}
                <div className="recordMain">
                    <h2>现场回访记录</h2>
                    <div className="tableDetails">
                        <table className="topTable">
                            <tr className="sixToOne">
                                <td className="darkbg">顾客单位</td>
                                <td>{this.state.sceneVisits.id}</td>
                                <td className="darkbg">回访主题</td>
                                <td>{this.state.sceneVisits.title}</td>
                            </tr>
                            <tr className="sixToOne">
                                <td className="darkbg">受访人员</td>
                                <td>
                                    {
                                        this.state.sceneVisits.customer_list.map((value) => (
                                            <span style={{ margin: "0 5px" }}>{value.name}</span>
                                        ))
                                    }
                                </td>
                                <td className="darkbg">回访人员</td>
                                <td>
                                    {
                                        this.state.sceneVisits.user_list.map((value) => (
                                            <span style={{ margin: "0 5px" }}>{value.name}</span>
                                        ))
                                    }
                                </td>
                            </tr>
                        </table>
                        <table className="sceneTable">
                            <tr>
                                <td style={{ textAlign: "center", fontWeight: "800" }} colSpan="4" className="darkbg">回访内容及成果</td>
                            </tr>
                            <tr >
                                <td colSpan="4" style={{ padding: "0 5px" }}>
                                    <pre dangerouslySetInnerHTML={{ __html: this.state.sceneVisits.content }}>

                                    </pre>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: "center", fontWeight: "800" }} colSpan="4" className="darkbg">下一步计划和行动</td>
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
                                            this.state.scenePlan.item_list.map((value) => (
                                                <tr>
                                                    <td>{value.seq}</td>
                                                    <td>{value.content}</td>
                                                    <td>{value.real_name}</td>
                                                    <td>{(value.exp_time+'').split(" ")[0]}</td>
                                                </tr>
                                            ))
                                        }

                                    </table>
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
                                        <input type="checkbox" id="allAgree" checked={
                                            ischeck
                                        } />&nbsp;
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
                                <td><input type="checkbox" checked={this.state.sceneVisits.survey_list[2].score==2?true:false}/></td>
                                <td><input type="checkbox" checked={this.state.sceneVisits.survey_list[2].score==1?true:false}/></td>
                                <td><input type="checkbox" checked={this.state.sceneVisits.survey_list[2].score==0?true:false}/></td>
                            </tr>
                            <tr className="fourToOne">
                                <td>沟通能力</td>
                                <td><input type="checkbox" checked={this.state.sceneVisits.survey_list[1].score == 2 ? true : false} /></td>
                                <td><input type="checkbox" checked={this.state.sceneVisits.survey_list[1].score == 1 ? true : false} /></td>
                                <td><input type="checkbox" checked={this.state.sceneVisits.survey_list[1].score == 0 ? true : false} /></td>
                            </tr>
                            <tr className="fourToOne">
                                <td>工作成果</td>
                                <td><input type="checkbox" checked={this.state.sceneVisits.survey_list[0].score == 2 ? true : false} /></td>
                                <td><input type="checkbox" checked={this.state.sceneVisits.survey_list[0].score == 1 ? true : false} /></td>
                                <td><input type="checkbox" checked={this.state.sceneVisits.survey_list[0].score == 0 ? true : false} /></td>
                            </tr>
                            <tr className="fourToOne">
                                <td>服务态度</td>
                                <td><input type="checkbox" checked={this.state.sceneVisits.survey_list[4].score == 2 ? true : false} /></td>
                                <td><input type="checkbox" checked={this.state.sceneVisits.survey_list[4].score == 1 ? true : false} /></td>
                                <td><input type="checkbox" checked={this.state.sceneVisits.survey_list[4].score == 0 ? true : false} /></td>
                            </tr>
                            <tr className="fourToOne">
                                <td>是否准时到达</td>
                                <td><input type="checkbox" checked={this.state.sceneVisits.survey_list[3].score == 2 ? true : false} /></td>
                                <td><input type="checkbox" checked={this.state.sceneVisits.survey_list[3].score == 1 ? true : false} /></td>
                                <td><input type="checkbox" checked={this.state.sceneVisits.survey_list[3].score == 0 ? true : false} /></td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="signatureTxt">
                                    <div className="suggess">
                                        <div className="midDiv" style={{top:"-0.2rem"}}>
                                            <span style={{ lineHeight: "46px" }}>总体印象: </span>
                                            <ul>
                                                <li>
                                                    <input type="checkbox" id="gloab" checked={this.state.sceneVisits.score == 3 ? true : false} />
                                                    <label htmlFor="gloab"> 很满意</label>
                                                </li>
                                                <li>
                                                    <input type="checkbox" id="just" checked={this.state.sceneVisits.score == 2?true:false} />
                                                    <label htmlFor="just"> 一般</label>
                                                </li>
                                                <li>
                                                    <input type="checkbox" id="dont" checked={this.state.sceneVisits.score == 1?true:false} />
                                                    <label htmlFor="dont"> 不满意</label>
                                                </li>
                                                <li>
                                                    <input type="checkbox" id="bad" checked={this.state.sceneVisits.score == 0?true:false} />
                                                    <label htmlFor="bad"> 很不满意</label>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="midDivTop">
                                            <span>您的宝贵建议: </span>&nbsp;&nbsp;
                                            <textarea className="suggessMsg" value={this.state.sceneVisits.suggest} readOnly></textarea>
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
            </div>
        )
    }
}