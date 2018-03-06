import React from "react";
import { hashHistory } from "react-router";
import { TableHeads, Customs ,noLogin} from './templates';
import { Modal, List ,Toast} from 'antd-mobile';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
    custom: require('../images/custom.png')
}
let currentType="add_time";
// function closest(el, selector) {
//     const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
//     while (el) {
//         if (matchesSelector.call(el, selector)) {
//             return el;
//         }
//         el = el.parentElement;
//     }
//     return null;
// }

export default class Custom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            show2: false,
            modal: false,
            modal1: false,
            type:"add_time",
            order: "全部",
            check: "全部",
            company: "",
            job: "",
            name: "",
            phone: "",
            email: "",
            remark: "",
            hasError1: false,
            hasError2: false,
            data: [],
            happenTime: "",
            content: "",
            finishTime: "",
            give: "",
            id:""
        },
        this.handleProjectGet = (res) => {
            console.log(res);
            if(res.success) {
                this.setState({
                    data:res.data.item_list
                })
            }
        },
        this.handleAddPersonalMsg=(res)=>{
            console.log(res);
            if(res.success){
                Toast.info("添加成功", 2, null, false);
                this.getProjectLis(this.state.type);   //更新项目数据
                this.setState({name:"",job:"",phone:"",email:"",remark:""}); 
                this.onClose('modal1')(); 
            }else{
                Toast.info(res.message, 2, null, false);
            }
        },
        this.handleAddMission=(res)=>{
            console.log(res);
            if(res.success){
                Toast.info("添加成功", 2, null, false);
                this.getProjectLis(this.state.type);   //更新项目数据                
                this.setState({happenTime:"",finishTime:"",content:"",give:""});
                this.onClose('modal1')();
            }else{
                Toast.info(res.message, 2, null, false);
            }
        },
        this.handleDel=(res)=>{
            console.log(res);
            // if(res.success){
            //     Toast.info("删除成功", 2, null, false);
            // }else{
            //     Toast.info(res.message, 2, null, false);
            // }
        }
    }
    componentDidMount() {
        this.getProjectLis("add_time");
    }
    getProjectLis=(type)=>{
        runPromise('get_project_list', {
            "type": "0",
            "offset": 0,
            "limit": 10,
            "sort": type,
            "choose": 0
        }, this.handleProjectGet, true, "post");
    }
    addPersonalMsg=()=>{
        if(this.state.name == ''){
            Toast.info('请填写名字', 2, null, false);
        }else if(this.state.phone == ''){
            Toast.info('请填写手机号', 2, null, false);
        }else{
            runPromise('add_project_linker_ex', {
                "gd_project_id":validate.getCookie('project_id'),
                "name":this.state.name,
                "job_name":this.state.job,
                "mobile":this.state.phone,
                "email":this.state.email,
                "remark":this.state.remark
            }, this.handleAddPersonalMsg, true, "post");
        }
    }
    addMission = () => {      
        runPromise('add_mission', {
            "gd_project_id": validate.getCookie('project_id'),
            "start_time": this.state.happenTime,
            "finish_time": this.state.finishTime,
            "content": this.state.content,
            "rtn_ifo": this.state.give,
        }, this.handleAddMission, true, "post");
    }
    changeOrder(e,type) {
        currentType=type;
        this.setState({
            order: e.currentTarget.innerHTML,
            show: !this.state.show,
            type:type
        });
        this.getProjectLis(type);
    }
    setBaseStateFun = (id,name,project) => {
        validate.setCookie("baseId",id);
        validate.setCookie("company_name",name);
        validate.setCookie("project_id",project);
    }
    changeCheck(e) {
        this.setState({
            check: e.currentTarget.innerHTML,
            show2: !this.state.show2
        })
    }
    delPerson(e,id,project_id) {      //删除联系人
        runPromise('del_project_linker',{
            gd_project_id:project_id,
            user_id:id
        }, (res)=>{
            if(res.success){
                runPromise('get_project_list', {
                    "type": "0",
                    "offset": 0,
                    "limit": 20,
                    "sort": currentType,
                    "choose": 0
                }, ()=>{location.reload();}, true, "post");
                Toast.info("删除成功", 2, null, false);
            }else{
                Toast.info(res.message, 2, null, false);
            }
        }, true, "post")
    }
    showModal = key => (e, id) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
            id:id
        });
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    onChangePhone(e) {
        let val = e.currentTarget.value;
        this.setState({
            hasError1: validate.CheckPhone(val).hasError,
            phone: val
        });
    }
    onChangeEmail(e) {
        let val = e.currentTarget.value;
        this.setState({
            hasError2: validate.CheckEmail(val).hasError,
            email: val
        });
    }
    onChangeCompany(e) {
        this.setState({
            company: e.currentTarget.value
        });
    }
    onChangeJob(e) {
        this.setState({
            job: e.currentTarget.value
        });
    }
    onChangeName(e) {
        this.setState({
            name: e.currentTarget.value
        });
    }
    onChangeRemark(e) {
        this.setState({
            remark: e.currentTarget.value
        });
    }
    onChangeHappenTime = (e) => {
        this.setState({
            happenTime: e.currentTarget.value
        })
    }
    onChangeContent = (e) => {
        this.setState({
            content: e.currentTarget.value
        })
    }
    onChangeFinishTime = (e) => {
        this.setState({
            finishTime: e.currentTarget.value
        })
    }
    onChangeGive = (e) => {
        this.setState({
            give: e.currentTarget.value
        })
    }
    render() {
        return (
            <div className="customsLists visitRecordWrap">
                <TableHeads url={urls.wordMsg} isHide={true}></TableHeads>
                <div className="customsHead ">
                    <h3 className="center">
                        我的客户
                    </h3>
                    <div className="right pub">
                        <div className="selectWrap">
                            <span>排序：</span>
                            <div style={{ display: "inline-block" }}>
                                <span onClick={() => {
                                    this.setState({
                                        show: !this.state.show
                                    })
                                    this.state.show2 ? this.setState({ show2: false }) : "";
                                }}>{this.state.order} <i className="iconfont icon-tubiao-"></i></span>
                                <ul style={{ display: this.state.show ? "block" : "none" }}>
                                    <li onClick={(e) => { this.changeOrder(e,"") }}>全部</li>
                                    <li onClick={(e) => { this.changeOrder(e,"start_time") }}>最新合作</li>
                                    <li onClick={(e) => { this.changeOrder(e,"end_time") }}>即将过期</li>
                                    <li onClick={(e) => { this.changeOrder(e,"score") }}>评价高低</li>
                                </ul>
                            </div>
                            {/* <span style={{ marginLeft: "0.5rem" }}>筛选：</span>
                            <div style={{ display: "inline-block" }}>
                                <span onClick={() => {
                                    this.setState({
                                        show2: !this.state.show2
                                    })
                                    this.state.show ? this.setState({ show: false }) : "";
                                }}>{this.state.check} <i className="iconfont icon-tubiao-"></i></span>
                                <ul style={{ display: this.state.show2 ? "block" : "none" }}>
                                    <li onClick={(e) => { this.changeOrder(e,"") }}>全部</li>
                                    <li onClick={(e) => { this.changeOrder(e,"start_time") }}>最新合作</li>
                                    <li onClick={(e) => { this.changeOrder(e,"end_time") }}>即将过期</li>
                                    <li onClick={(e) => { this.changeOrder(e,"score") }}>评价高低</li>
                                </ul>
                            </div> */}
                        </div>
                    </div>
                </div>
                <Modal
                    visible={this.state.modal}
                    transparent
                    maskClosable={true}
                    onClose={this.onClose('modal')}
                    className="personalLinkWrap"
                    footer={[
                        { text: '取消', onPress: () => { this.onClose('modal')(); } },
                        { text: '确定', onPress: () => { 
                            this.addPersonalMsg();
                        } }
                    ]}
                // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div className="personalLink">
                        <div className="personalLinkList">
                            <ul>
                                {/* <li>
                                    <span>公司：</span>
                                    <input 
                                        type="text" 
                                        value={this.state.company}
                                        onChange={(e) => { this.onChangeCompany(e)}}
                                    />
                                </li> */}
                                <li>
                                    <span>姓名：</span>
                                    <input
                                        type="text"
                                        value={this.state.name}
                                        onChange={(e) => { this.onChangeName(e) }}
                                    />
                                </li>
                                <li>
                                    <span>职位：</span>
                                    <input
                                        type="text"
                                        value={this.state.job}
                                        onChange={(e) => { this.onChangeJob(e) }}
                                    />
                                </li>
                                <li>
                                    <span>手机：</span>
                                    <input
                                        type="text"
                                        value={this.state.phone}
                                        onChange={(e) => { this.onChangePhone(e) }}
                                        className={this.state.hasError1 ? "txtRed" : ""}
                                    />
                                </li>
                                <li>
                                    <span>邮箱：</span>
                                    <input
                                        type="text"
                                        value={this.state.email}
                                        onChange={(e) => { this.onChangeEmail(e) }}
                                        className={this.state.hasError2 ? "txtRed" : ""}
                                    />
                                </li>
                                <li>
                                    <span>备注：</span>
                                    <input
                                        type="text"
                                        value={this.state.remark}
                                        onChange={(e) => { this.onChangeRemark(e) }}
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </Modal>
                <div className="mainCustomList">
                    <Customs
                        dataList={this.state.data}
                        delPerson={this.delPerson}
                        showModal={this.showModal('modal')}
                        addJobs={this.showModal('modal1')}
                        getCustomList={this.getCustomList}
                        setBaseStateFun={this.setBaseStateFun}
                    ></Customs>
                </div>
                <Modal
                    visible={this.state.modal1}
                    transparent
                    maskClosable={true}
                    onClose={this.onClose('modal1')}
                    style={{ width: "300px" }}
                    className="personalLinkWrap myCustomModal"
                    footer={[
                        { text: '取消', onPress: () => { this.onClose('modal1')(); } },
                        { text: '确定', onPress: () => { this.addMission(); } }
                    ]}
                >
                    <div className="personalLink">
                        <div className="personalLinkList">
                            <ul>
                                <li>
                                    <span style={{ textAlignLast: "justify", width: "25%" }}>发生时间</span>:
                                    <input
                                        type="text"
                                        value={this.state.happenTime}
                                        placeholder="0000-00-00"
                                        onChange={(e) => { this.onChangeHappenTime(e) }}
                                        style={{ paddingLeft: "5px" }}
                                    />
                                </li>
                                <li>
                                    <span style={{ textAlignLast: "justify", width: "25%" }}>内容</span>:
                                    {/* <span>内容：</span> */}
                                    <input
                                        type="text"
                                        value={this.state.content}
                                        onChange={(e) => { this.onChangeContent(e) }}
                                        style={{ paddingLeft: "5px" }}
                                    />
                                </li>
                                <li>
                                    <span style={{ textAlignLast: "justify", width: "25%" }}>完成时间</span>:
                                    <input
                                        type="text"
                                        value={this.state.finishTime}
                                        placeholder="0000-00-00"
                                        onChange={(e) => { this.onChangeFinishTime(e) }}
                                        style={{ paddingLeft: "5px" }}
                                    />
                                </li>
                                <li>
                                    <span style={{ textAlignLast: "justify", width: "25%" }}>交割情况</span>:
                                    <input
                                        type="text"
                                        value={this.state.give}
                                        onChange={(e) => { this.onChangeGive(e) }}
                                        style={{ paddingLeft: "5px" }}
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

