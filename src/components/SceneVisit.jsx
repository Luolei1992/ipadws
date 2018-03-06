import React from 'react';
import { Modal, Toast } from 'antd-mobile';
import { div2png, readyDo, TableHeads, init, GetLocationParam } from './templates';
import { DrawBoard } from './drawBoard';
import { get } from 'https';

let canvas;
let drawBoard;
let surveyArr=[
    { score: "2", survey_menu_id: "1" },
    { score: "2", survey_menu_id: "2" },
    { score: "2", survey_menu_id: "3" },
    { score: "2", survey_menu_id: "4" },
    { score: "2", survey_menu_id: "5" },
];
let personalLis1 = [];
let personalLis2 = [];
let name1 = [];
let name2=[];
let interval;
const urls = {
    wordMsg: require('../images/wordMsg.png')
}
export default class SceneVisit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allChecked: true,
            silent: true,
            modal: true,            
            modal2: false,
            modal3:false,
            id:"",
            order: "",
            things: "",
            duty: "",
            finishTime: "",
            currentCompany:"",
            orderList:[],
            checkArr1: [true, false, false],
            checkArr2: [true, false, false],
            checkArr3: [true, false, false],
            checkArr4: [true, false, false],
            checkArr5: [true, false, false],
            firstMet:[true,false,false,false],
            gd_company_id:"",
            title:"",
            user_ids:"",
            customer_ids:"",
            content:"",
            suggest:"",
            score:"3",
            plans:[
                {
                    seq:"",
                    content:"",
                    user_id:"",
                    exp_time:""
                },
            ],
            surveys:[
                { score: "2", survey_menu_id:"1"},
                { score: "2", survey_menu_id:"2"},
                { score: "2", survey_menu_id:"3"},
                { score: "2", survey_menu_id:"4"},
                { score: "2", survey_menu_id:"5"},
            ],
            toPersonalList:[],
            getPersonalList:[],
            name01:"",
            name02:""
        },
        this.handleSceneVisitGet = (res) => {
            console.log(res);
            if(res.success) {
                this.setState({
                    id:res.message.id
                })
            }
        },
        this.saveProject = (res) => {
            if (res.success) {
                Toast.info("文件保存成功", 2, null, false);
                setTimeout(() => {
                    Toast.hide();
                }, 1000);
            } else {
                setTimeout(() => {
                    Toast.hide()
                }, 1000);
                Toast.info("文件保存失败", 2, null, false);
            }
        },
        this.toPersonalList = (res) =>{
            console.log(res)
            this.setState({toPersonalList:res.data})
        },
        this.getPersonalList = (res) =>{
            console.log(res)
            this.setState({getPersonalList:res.data})
        }
    }
    componentDidMount() {
        this.props.router.setRouteLeaveHook(
            this.props.route,
            this.routerWillLeave
        )
        init("sceneResult");
        init("sceneNext");
        readyDo(this.alerts);
        canvas = document.getElementById("canvas");
        drawBoard = new DrawBoard(canvas);  // 初始化
        interval=setInterval(() => {
            this.addRecordToback();
        }, 30000);
        this.getPersonLis();
        this.toPersonLis();
    }
    routerWillLeave(nextLocation) {
        clearInterval(interval);
    }
    loadingToast() {
        Toast.loading('保存中...', 0, () => {
            // alert(4)
        }, true);
    }
    addRecordToback=()=>{
        runPromise('add_record', {
            "gd_company_id": validate.getCookie('baseId'),
            "title": this.state.title,
            "user_ids": this.state.user_ids,
            "customer_ids": this.state.customer_ids,
            "content": this.state.content,
            "suggest": this.state.suggest,
            "score": this.state.score,
            "plans": this.state.orderList,
            "surveys": this.state.surveys,
            "company_name": this.state.currentCompany
        }, this.handleSceneVisitGet, true, "post");
    }
    getPersonLis=()=>{
        runPromise('get_staff_list', {},this.getPersonalList, false, "get");
    }
    toPersonLis=()=>{
        runPromise('get_company_user_list', {
            gd_company_id: validate.getCookie('baseId')
        }, this.toPersonalList, true, "post");
    }
    alerts = (a) => {
        runPromise('sign_up_document', {
            action_type: "record",
            action_id: this.state.id,
            signed_file_path: a
        }, this.saveProject, true, "post");
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
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
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
    changeCheck = () => {
        this.setState({
            allChecked: !this.state.allChecked
        })
    }
    isCheck1 = (num, idx) => {
        let arr = [false, false, false];
        if (idx) {
            arr[idx] = !arr[idx];
            arr[0] = false;
            this.setState({
                allChecked: false
            });
        } else {
            arr[idx] = !arr[idx];
        };
        switch (num) {
            case 1:
                surveyArr[0].score=(idx == 2?0:idx == 0?2:1);
                this.setState({
                    checkArr1: arr,
                    surveys: surveyArr
                })
                break;
            case 2:
                surveyArr[1].score = (idx == 2 ? 0 : idx == 0 ? 2 : 1);
                this.setState({
                    checkArr2: arr,
                    surveys: surveyArr
                })
                break;
            case 3:
                surveyArr[2].score = (idx == 2 ? 0 : idx == 0 ? 2 : 1);
                this.setState({
                    checkArr3: arr,
                    surveys: surveyArr
                })
                break;
            case 4:
                surveyArr[3].score = (idx == 2 ? 0 : idx == 0 ? 2 : 1);
                this.setState({
                    checkArr4: arr,
                    surveys: surveyArr
                })
                break;
            case 5:
                surveyArr[4].score = (idx == 2 ? 0 : idx == 0 ? 2 : 1);
                this.setState({
                    checkArr5: arr,
                    surveys: surveyArr
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
    getWhichChecked = () =>{
        
    }
    addOrderMsg() {       //下一任行动和计划
        let lis = {
            seq: this.state.order,
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
    firstMet=(idx)=>{
        let arr = [false,false,false,false];
        arr[idx] = true;
        this.setState({
            firstMet:arr,
            score:idx == 0?3:idx==1?2:idx==2?1:0
        })
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
    pullGetPerson=(id,name)=>{
        personalLis2.push(id);
        name1.push(name);
        this.setState({user_ids:personalLis2.join("_"),name02:name1.join(",")});
        this.onClose('modal3')();
    }
    pullToPerson=(id,name)=>{
        personalLis1.push(id);
        name2.push(name);
        this.setState({customer_ids:personalLis1.join("_"),name01:name2.join(",")});     
        this.onClose('modal4')();   
    }
    render() {
        return (
            <div className="visitRecordWrap" id="fromHTMLtestdiv">
                <TableHeads
                    url={urls.wordMsg}
                    isHide={true}
                ></TableHeads>
                <button id="downloadPng" onClick={() => { this.loadingToast();this.addRecordToback();clearInterval(interval);}}>下载图片</button>
                <div className="recordMain">
                    <h2>现场回访记录</h2>
                    <div className="tableDetails">
                        <table className="topTable">
                            <tr className="sixToOne">
                                <td className="darkbg">顾客单位</td>
                                <td>
                                    <input type="text" className="qualityIpt" 
                                        onChange={(e, value) => {
                                            this.setState({
                                                currentCompany: e.currentTarget.value
                                            })
                                        }}
                                    />
                                </td>
                                <td className="darkbg">回访主题</td>
                                <td>
                                    <input type="text" className="qualityIpt"
                                        onChange={(e, value) => {
                                            this.setState({
                                                title: e.currentTarget.value
                                            })
                                        }}
                                     />
                                </td>
                            </tr>
                            <tr className="sixToOne">
                                <td className="darkbg">受访人员</td>
                                <td>
                                    {this.state.name01}
                                    <i onClick={this.showModal('modal4')}
                                        className="iconfont icon-jia" 
                                        style={{
                                            float: "right", 
                                            fontSize: "28px", 
                                            marginTop: "2px",
                                            marginRight:"2px"
                                        }}
                                    ></i>
                                    {/* <input type="text" className="qualityIpt" 
                                        onChange={(e, value) => {
                                            this.setState({
                                                customer_ids: e.currentTarget.value
                                            })
                                        }}
                                    /> */}
                                </td>
                                <td className="darkbg">回访人员</td>
                                <td>
                                    {this.state.name02}
                                    <i onClick={this.showModal('modal3')}
                                            className="iconfont icon-jia" 
                                            style={{
                                                float: "right", 
                                                fontSize: "28px", 
                                                marginTop: "2px",
                                                marginRight:"2px"
                                            }}
                                    ></i>
                                    {/* <input type="text" className="qualityIpt" 
                                        onChange={(e, value) => {
                                            this.setState({
                                                user_ids: e.currentTarget.value
                                            })
                                        }}
                                    /> */}
                                </td>
                            </tr>
                        </table>
                        <Modal
                            visible={this.state.modal3}
                            transparent
                            maskClosable={true}
                            onClose={this.onClose('modal3')}
                            className="personalLinkWrap"
                            style={{width:"800px"}}
                        >
                            <table className="personalLis" style={{
                                textAlign: "center",
                                width:"100%",
                                border:"1px solid #ccc"
                            }}>
                                <tr>
                                    <td style={{width:"15%"}}>姓名</td>
                                    <td style={{width:"25%"}}>手机号</td>
                                    <td style={{width:"30%"}}>邮箱</td>
                                    <td style={{width:"30%"}}>备注</td>
                                </tr>
                                {
                                    this.state.getPersonalList.map((value)=>(
                                        <tr onClick={()=>{this.pullGetPerson(value.user_id,value.real_name)}}>
                                            <td>{value.real_name}</td>
                                            <td>{value.mobile}</td>
                                            <td>{value.email}</td>
                                            <td>{value.job_name}</td>
                                        </tr>
                                    ))
                                }
                            </table>
                        </Modal>
                        <Modal
                            visible={this.state.modal4}
                            transparent
                            maskClosable={true}
                            onClose={this.onClose('modal4')}
                            className="personalLinkWrap"
                            style={{width:"800px"}}
                            // footer={[
                            //     { text: '取消', onPress: () => { this.onClose('modal3')() } },
                            //     { text: '确定', onPress: () => { this.addOrderMsg(); } }
                            // ]}
                        >
                            <table className="personalLis" style={{
                                textAlign: "center",
                                width:"100%",
                                border:"1px solid #ccc"
                            }}>
                                <tr>
                                    <td style={{width:"15%"}}>姓名</td>
                                    <td style={{width:"25%"}}>手机号</td>
                                    <td style={{width:"30%"}}>邮箱</td>
                                    <td style={{width:"30%"}}>备注</td>
                                </tr>
                                {
                                    this.state.toPersonalList.map((value)=>(
                                        <tr onClick={()=>{this.pullToPerson(value.user_id,value.name)}}>
                                            <td>{value.name}</td>
                                            <td>{value.mobile}</td>
                                            <td>{value.email}</td>
                                            <td>{value.remark}</td>
                                        </tr>
                                    ))
                                }
                            </table>
                        </Modal>
                        <table className="sceneTable">
                            <tr>
                                <td style={{ textAlign: "center", fontWeight: "800" }} colSpan="4" className="darkbg">回访内容及成果</td>
                            </tr>
                            <tr >
                                <td colSpan="4">
                                    <textarea className="allBox" id="sceneResult" style={{ minHeight: "3rem" }}
                                        onChange={(e, value) => {
                                            console.log(e.currentTarget.value);
                                            this.setState({
                                                content: e.currentTarget.value
                                            })
                                        }}
                                    ></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: "center", fontWeight: "800" }} colSpan="4" className="darkbg newPersonalMsg">
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
                                                <span style={{color:"#333"}}>事 项</span>
                                                <input
                                                    type="text"
                                                    value={this.state.things}
                                                    onChange={(e) => { this.onChangeThings(e) }}
                                                />
                                            </li>
                                            <li>
                                                <span style={{color:"#333"}}>责任人</span>
                                                <input
                                                    type="text"
                                                    value={this.state.duty}
                                                    onChange={(e) => { this.onChangeDuty(e) }}
                                                />
                                            </li>
                                            <li>
                                                <span style={{color:"#333"}}>完成时间</span>
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
                                <td style={{
                                    textAlign: "center",
                                    fontWeight: "800"
                                }}
                                    colSpan="4"
                                    className="darkbg"
                                >
                                    满意度调查 <span style={{ float: "right", fontWeight: 500, marginRight: "0.3rem" }}>
                                        <input type="checkbox" id="allAgree" checked={this.state.allChecked} onChange={() => { this.toggleAgree() }} onClick={() => { this.changeCheck() }} />&nbsp;
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
                                <td><input type="checkbox" checked={this.state.checkArr1[0]} onClick={(e) => { this.isCheck1(1, 0) }} /></td>
                                <td><input type="checkbox" checked={this.state.checkArr1[1]} onClick={(e) => { this.isCheck1(1, 1) }} /></td>
                                <td><input type="checkbox" checked={this.state.checkArr1[2]} onClick={(e) => { this.isCheck1(1, 2) }} /></td>
                            </tr>
                            <tr className="fourToOne">
                                <td>沟通能力</td>
                                <td><input type="checkbox" checked={this.state.checkArr2[0]} onClick={(e) => { this.isCheck1(2, 0) }} /></td>
                                <td><input type="checkbox" checked={this.state.checkArr2[1]} onClick={(e) => { this.isCheck1(2, 1) }} /></td>
                                <td><input type="checkbox" checked={this.state.checkArr2[2]} onClick={(e) => { this.isCheck1(2, 2) }} /></td>
                            </tr>
                            <tr className="fourToOne">
                                <td>工作成果</td>
                                <td><input type="checkbox" checked={this.state.checkArr3[0]} onClick={(e) => { this.isCheck1(3, 0) }} /></td>
                                <td><input type="checkbox" checked={this.state.checkArr3[1]} onClick={(e) => { this.isCheck1(3, 1) }} /></td>
                                <td><input type="checkbox" checked={this.state.checkArr3[2]} onClick={(e) => { this.isCheck1(3, 2) }} /></td>
                            </tr>
                            <tr className="fourToOne">
                                <td>服务态度</td>
                                <td><input type="checkbox" checked={this.state.checkArr4[0]} onClick={(e) => { this.isCheck1(4, 0) }} /></td>
                                <td><input type="checkbox" checked={this.state.checkArr4[1]} onClick={(e) => { this.isCheck1(4, 1) }} /></td>
                                <td><input type="checkbox" checked={this.state.checkArr4[2]} onClick={(e) => { this.isCheck1(4, 2) }} /></td>
                            </tr>
                            <tr className="fourToOne">
                                <td>是否准时到达</td>
                                <td><input type="checkbox" checked={this.state.checkArr5[0]} onClick={(e) => { this.isCheck1(5, 0) }} /></td>
                                <td><input type="checkbox" checked={this.state.checkArr5[1]} onClick={(e) => { this.isCheck1(5, 1) }} /></td>
                                <td><input type="checkbox" checked={this.state.checkArr5[2]} onClick={(e) => { this.isCheck1(5, 2) }} /></td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="signatureTxt">
                                    <div className="suggess">
                                        <div className="midDiv" style={{top:"-0.2rem"}}>
                                            <span style={{ lineHeight: "46px" }}>总体印象: </span>
                                            <ul>
                                                <li>
                                                    <input type="checkbox" id="gloab" checked={this.state.firstMet[0]} onClick={()=>{this.firstMet(0)}} />
                                                    <label htmlFor="gloab"> 很满意</label>
                                                </li>
                                                <li>
                                                    <input type="checkbox" id="just" checked={this.state.firstMet[1]} onClick={() => { this.firstMet(1) }} />
                                                    <label htmlFor="just"> 一般</label>
                                                </li>
                                                <li>
                                                    <input type="checkbox" id="dont" checked={this.state.firstMet[2]} onClick={() => { this.firstMet(2) }} />
                                                    <label htmlFor="dont"> 不满意</label>
                                                </li>
                                                <li>
                                                    <input type="checkbox" id="bad" checked={this.state.firstMet[3]} onClick={() => { this.firstMet(3) }} />
                                                    <label htmlFor="bad"> 很不满意</label>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="midDivTop">
                                            <span>您的宝贵建议: </span>&nbsp;&nbsp;
                                            <textarea id="sceneNext" className="suggessMsg" onChange={(e)=>{this.setState({suggest:e.currentTarget.value})}}></textarea>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="signatureTxt">
                                    <div className="suggess">
                                        <canvas id="canvas" width="1536" height="300"></canvas>
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

                    {/* <Modal
                        visible={this.state.modal}
                        transparent
                        maskClosable={true}
                        onClose={this.onClose('modal')}
                        style={{ width: "800px" }}
                        className="personalLinkWrap myCustomModal"
                        id="personalLinkWrap"
                        footer={[
                            { text: '取消', onPress: () => { console.log('cancle'); this.onClose('modal')(); } },
                            { text: '确定', onPress: () => { console.log('ok'); this.onClose('modal')(); } }
                        ]}
                    >
                        <table className="personVisit">
                            <tr>
                                <td style={{width:"10%"}}>姓名</td>
                                <td style={{width:"20%"}}>职位</td>
                                <td style={{width:"20%"}}>手机号</td>
                                <td style={{width:"20%"}}>邮箱</td>
                                <td style={{width:"30%"}}>备注</td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="radio" style={{ width: "16px", height: "16px", position: "relative", top: "2px" }} /> 名字
                                </td>
                                <td>大大</td>
                                <td>大大</td>
                                <td>发大润发</td>
                                <td>挺好听</td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="radio" style={{ width: "16px", height: "16px", position: "relative", top: "2px" }} /> 名字
                                </td>
                                <td>大大</td>
                                <td>大大</td>
                                <td>发大润发</td>
                                <td>挺好听</td>
                            </tr>
                        </table>
                    </Modal> */}
                </div>
            </div>
        )
    }
}