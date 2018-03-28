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
let interval=[];
let timeout = [];
let numPlus = 0;
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
            name02:decodeURIComponent(validate.getCookie('user_name'))
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
        let blurList = document.querySelectorAll("input");
        for (let s = 0; s < blurList.length; s++) {
            blurList[s].addEventListener('blur', () => {
                interval.push(setInterval(() => {
                    this.addRecordToback();
                }, 30000));
            })
        }
        this.getPersonLis();
        this.toPersonLis();
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
    loadingToast() {
        Toast.loading('保存中...', 0, () => {
            // alert(4)
        }, true);
    }
    addRecordToback=()=>{
        runPromise('add_record', {
            "gd_project_id": validate.getCookie('project_id'),
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
    showModal = key => (e, flg, index) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        }, () => {
            if (flg) {
                init("planThing");
            }
        });
        if (flg == 1) {
            this.setState({
                order: this.state.orderList[index].seq,
                things: this.state.orderList[index].content,
                duty: this.state.orderList[index].name,
                finishTime: this.state.orderList[index].exp_time
            })
        } else {

        }
        setTimeout(() => {
            let iptList = document.querySelectorAll(".am-modal-wrap input");
            for (var a = 0; a < iptList.length; a++) {
                iptList[a].addEventListener("focus", () => {
                    document.querySelector(".am-modal-wrap").style.marginTop = "-100px";
                }, false);
                iptList[a].addEventListener("blur", () => {
                    document.querySelector(".am-modal-wrap").style.marginTop = "0";
                }, false);
            }
        }, 500);
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
        ++numPlus;
        let lis = {
            seq: numPlus,
            content: this.state.things,
            name: this.state.duty,
            exp_time: this.state.finishTime
        }
        // if (this.state.things == ""){
        //     Toast.info('请填写事项！', .8);
        // }else if(this.state.duty == ""){
        //     Toast.info('请填写责任人！', .8);
        // }else if(this.state.finishTime == ""){
        //     Toast.info('请填写完成时间！', .8);
        // } else {
        this.onClose('modal2')();
        // }
        if (this.state.which != -1) {  //修改
            let aa = this.state.orderList;
            let bb = this.state.which;
            aa[bb].content = this.state.things;
            aa[bb].name = this.state.duty;
            aa[bb].exp_time = this.state.finishTime;
            this.setState({ orderList: aa });
        } else {     //新增
            this.state.orderList.push(lis);
            this.setState({
                order: "",
                things: "",
                duty: "",
                finishTime: ""
            })
        }
    }
    delPlanLis(idx) {
        console.log(idx);
        this.state.orderList.splice(idx, 1);
        this.setState({
            orderList: this.state.orderList
        })
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
    pullGetPerson=(id,name,e)=>{
        let color = e.currentTarget.style.backgroundColor;
        if(color == "#e2e2e2" || color == "rgb(226, 226, 226)" ) {
            e.currentTarget.style.backgroundColor = "#fff";
        }else{
            e.currentTarget.style.backgroundColor = "#e2e2e2";            
        }
    }
    getIndexPerson1=()=>{
        name1 = [decodeURIComponent(validate.getCookie('user_name'))];
        personalLis2 = [];
        let ls = document.querySelectorAll(".personalLinkWrap1 tr");
        for(let i = 0;i < ls.length;i++){
            let color = ls[i].style.backgroundColor;
            if(color == "#e2e2e2" || color == "rgb(226, 226, 226)" ){
                name1.push(this.state.getPersonalList[i-1].real_name);
                personalLis2.push(this.state.getPersonalList[i-1].user_id);
            }
        }
        this.setState({user_ids:personalLis2.join("_"),name02:name1.join(",")});
        this.onClose('modal3')();                    
    }
    getIndexPerson2=()=>{
        name2 = [];
        personalLis1 = [];
        let ls = document.querySelectorAll(".personalLinkWrap2 tr");
        for (let i = 0; i < ls.length; i++) {
            let color = ls[i].style.backgroundColor;
            if (color == "#e2e2e2" || color == "rgb(226, 226, 226)") {
                name2.push(this.state.toPersonalList[i - 1].name);
                personalLis1.push(this.state.toPersonalList[i - 1].user_id);
            }
        }
        this.setState({
            customer_ids: personalLis1.join("_"),
            name01: name2.join(",")
        });
        this.onClose('modal4')();   
    }
    render() {
        return (
            <div className="visitRecordWrap" id="fromHTMLtestdiv" onTouchMove={() => { this.touchBlur(); }}>
                <TableHeads
                    url={urls.wordMsg}
                    isHide={true}
                ></TableHeads>
                <button id="downloadPng" onClick={() => {
                    this.loadingToast();
                    this.addRecordToback();
                    for (let i = 0; i < interval.length; i++) {
                        clearInterval(interval[i]);
                    }
                }}>下载图片</button>     
                <div className="recordMain">
                    <h2>现场回访记录</h2>
                    <div className="tableDetails">
                        <table className="topTable">
                            <tr className="sixToOne">
                                <td className="darkbg">顾客单位</td>
                                <td>
                                    <input type="text" className="qualityIpt" 
                                        value={decodeURIComponent(validate.getCookie('company_name'))}
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
                                    <i onClick={(e)=>{
                                        this.state.toPersonalList.length>0?this.showModal('modal4')(e):Toast.info('暂无联系人', .8);
                                    }}
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
                            className="personalLinkWrap personalLinkWrap1"
                            style={{width:"800px"}}
                            footer={[
                                { text: '取消', onPress: () => { this.onClose('modal3')() } },
                                { text: '确定', onPress: () => { this.getIndexPerson1(); }}
                            ]}
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
                                        <tr onClick={(e)=>{this.pullGetPerson(value.user_id,value.real_name,e)}}>
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
                            className="personalLinkWrap personalLinkWrap2"
                            style={{width:"800px"}}
                            footer={[
                                { text: '取消', onPress: () => { this.onClose('modal4')() } },
                                { text: '确定', onPress: () => { this.getIndexPerson2(); } }
                            ]}
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
                                        <tr onClick={(e)=>{this.pullGetPerson(value.user_id,value.name,e)}}>
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
                                            this.setState({
                                                content: e.currentTarget.value
                                            })
                                        }}
                                    ></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="darkbg newPersonalMsg">
                                    下一步计划和行动<span onClick={(e) => {
                                        this.showModal('modal2')(e);
                                        this.setState({
                                            which: "-1",
                                            things: "",
                                            duty: "",
                                            finishTime: ""
                                        })
                                    }}>新增 <i className="iconfont icon-jia"></i></span>
                                </td>
                            </tr>
                            <Modal
                                visible={this.state.modal2}
                                transparent
                                maskClosable={true}
                                onClose={this.onClose('modal2')}
                                className="personalLinkWrap planLis"
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
                                            <li style={{ height: "auto", lineHeight: "auto", overflow: "hidden" }}>
                                                <span style={{ float: "left", paddingTop: "10px", lineHeight: "25px" }}>事&nbsp;&nbsp;&nbsp;&nbsp;项</span>
                                                <textarea
                                                    id="planThing"
                                                    style={{
                                                        minHeight: "50px",
                                                        maxHeight: "200px",
                                                        paddingTop: "14px",
                                                        paddingBottom: "10px",
                                                        border: "0 none",
                                                        resize: "none",
                                                        backgroundColor: "#f5f5f5",
                                                        float: "left"
                                                    }}
                                                    onFocus={() => { document.querySelector(".am-modal-wrap").style.marginTop = "-150px"; }}
                                                    onBlur={() => { document.querySelector(".am-modal-wrap").style.marginTop = "0"; }}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            things: e.currentTarget.value
                                                        })
                                                    }}
                                                    value={this.state.things}
                                                />
                                            </li>
                                            <li>
                                                <span>责 任 人</span>
                                                <input
                                                    type="text"
                                                    value={this.state.duty}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            duty: e.currentTarget.value
                                                        });
                                                    }}
                                                />
                                            </li>
                                            <li>
                                                <span>完成时间</span>
                                                <input
                                                    type="text"
                                                    placeholder="0000-00-00"
                                                    value={this.state.finishTime}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            finishTime: e.currentTarget.value
                                                        });
                                                    }}
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
                                            <td style={{ borderTop: "0 none" }}>完成时间</td>
                                            <td style={{ borderTop: "0 none", borderRight: "0 none" }}>操作</td>
                                        </tr>
                                        {
                                            this.state.orderList.map((value, idx) => {
                                                return <tr>
                                                    <td style={{ borderLeft: "0 none" }}>{idx + 1}</td>
                                                    {/* <td>{value.content}</td> */}
                                                    <td style={{ paddingLeft: "5px", textAlign: "left" }}>
                                                        <pre dangerouslySetInnerHTML={{ __html: value.content }}></pre>
                                                    </td>
                                                    <td>{value.name}</td>
                                                    <td>{value.exp_time}</td>
                                                    <td>
                                                        <span onClick={(e) => { this.showModal('modal2')(e, 1, idx); this.setState({ which: idx, }) }}
                                                            style={{
                                                                color: "#fff",
                                                                padding: "2px 6px",
                                                                background: "#108ee9",
                                                                borderRadius: "3px",
                                                                fontSize: "14px"
                                                            }}
                                                        >修改</span>&nbsp;/&nbsp;
                                                            <span onClick={(e) => { this.delPlanLis(idx); }}
                                                            style={{
                                                                color: "#fff",
                                                                padding: "2px 6px",
                                                                background: "red",
                                                                borderRadius: "3px",
                                                                fontSize: "14px"
                                                            }}
                                                        >删除</span>
                                                    </td>
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
                                                <input type="text" value={validate.getNowFormatDate()} />
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