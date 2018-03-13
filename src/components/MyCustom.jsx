import React from 'react';
import { Link, hashHistory } from 'react-router';
import { Modal ,Toast} from 'antd-mobile';
import { GetLocationParam } from './templates'

export default class MyCustom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: [false, false, false, false, false, false,false],
            slideUp:false,
            modal:false,
            modal1:false,
            happenTime:"",
            content:"",
            finishTime:"",
            give:"",
            jobList:[],
            job: "",
            name: "",
            phone: "",
            email: "",
            remark: "",
            hasError1: false,
            hasError2: false,
        },
        this.handleAddMission=(res)=>{
            if(window.location.href.indexOf('visitRecord') != -1){
                location.reload();
            }
        },
        this.handleCompanyUserGet = (res) => {
            if (res.success) {
                this.setState({
                    personalList: res.data
                })
            }
        },
        this.handleAddPersonalMsg=(res)=>{
            if(res.success){
                Toast.info("添加成功", 2, null, false);
                this.setState({name:"",job:"",phone:"",email:"",remark:""}); 
                this.onClose('modal1')();
                if (window.location.href.indexOf('PersonalList') != -1) {
                    location.reload();
                }
            }else{
                Toast.info(res.message, 2, null, false);
            }
        }
    }
    componentDidMount() {
        let newflag = [false, false, false, false, false, false,false];
        let number = window.location.href.split("tab=")[1].slice(0, 1)-0;
        newflag[number] = true;
        this.setState({
            flag: newflag
        })
    }
    addMission = () => {
        runPromise('add_mission', {
            "gd_project_id": validate.getCookie('project_id'),
            "start_time": this.state.happenTime,
            "finish_time": this.state.finishTime,
            "content": this.state.content,
            "rtn_ifo": this.state.give,
        }, this.handleAddMission, false, "post");
    }
    addPersonalMsg=()=>{
        if(this.state.name == ''){
            Toast.info('请填写名字', 2, null, false);
        } else if (this.state.phone == '' || this.state.hasError1){
            Toast.info('请填写正确的手机号', 2, null, false);
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
    showModal = key => (e,modal) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.onClose(modal)();
        this.setState({
            [key]: true,
            slideUp:false
        });
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
    }
    onChangeEmail(e) {
        let val = e.currentTarget.value;
        this.setState({
            hasError2: validate.CheckEmail(val).hasError,
            email: val
        });
    }
    onChangePhone(e) {
        let val = e.currentTarget.value;
        this.setState({
            hasError1: validate.CheckPhone(val).hasError,
            phone: val
        });
    }
    handleClickLi(index) {
        let newflag = [false, false, false, false, false, false,false];
        newflag[index] = true;
        this.setState({
            flag: newflag
        })
    }
    addNewList=()=>{
        this.setState({
            slideUp:!this.state.slideUp
        })
    }
    
    onChangeHappenTime =(e)=>{
        this.setState({
            happenTime: e.currentTarget.value
        })
    }
    onChangeContent =(e)=>{
        this.setState({
            content: e.currentTarget.value
        })
    }
    onChangeFinishTime =(e)=>{
        this.setState({
            finishTime: e.currentTarget.value
        })
    }
    onChangeGive =(e)=>{
        this.setState({
            give: e.currentTarget.value
        })
    }
    render() {
        const { mode } = this.state;
        return (
            <div className="myCustomWrap animatePage">
                <div style={{ height: "1.3rem", position: "relative", width: "100%" }}></div>
                {this.props.children && React.cloneElement(
                    this.props.children, { state: this.state, props: this.props, setState: this.setState.bind(this) })}
                <div className="tableBottom">
                    <ul className="tableBottomMainList">
                        <li
                            style={this.state.flag[0] ? { borderBottom: "3px solid red" } : { borderBottom: "3px solid transparent" }}
                            onClick={() => { this.handleClickLi(0) }}>
                            <Link to='/company?tab=0'>合同内容</Link>
                        </li>
                        <li
                            style={this.state.flag[1] ? { borderBottom: "3px solid red" } : { borderBottom: "3px solid transparent" }}
                            onClick={() => { this.handleClickLi(1) }}>
                            <Link to='/visitRecord?tab=1'>任务记录</Link>
                        </li>
                        <li
                            style={this.state.flag[2] ? { borderBottom: "3px solid red" } : { borderBottom: "3px solid transparent" }}
                            onClick={() => { this.handleClickLi(2) }}>
                            <Link to='/visitLists?tab=2'>走访记录</Link>
                        </li>
                        <li
                            style={this.state.flag[3] ? { borderBottom: "3px solid red" } : { borderBottom: "3px solid transparent" }}
                            onClick={() => { this.handleClickLi(3) }}>
                            <Link to='/meetingList?tab=3'>会议纪要</Link>
                        </li>
                        <li
                            style={this.state.flag[4] ? { borderBottom: "3px solid red" } : { borderBottom: "3px solid transparent" }}
                            onClick={() => { this.handleClickLi(4) }}>
                            <Link to='/PersonalList?tab=4'>联系人</Link>
                        </li>
                        <li
                            style={this.state.flag[5] ? { borderBottom: "3px solid red" } : { borderBottom: "3px solid transparent" }}
                            onClick={() => { this.handleClickLi(5) }}>
                            <Link to='/surveyHistoryStatic?tab=5'>调研档案</Link>
                        </li>
                        <li
                            style={this.state.flag[6] ? { borderBottom: "3px solid red" } : { borderBottom: "3px solid transparent" }}
                            onClick={() => { this.handleClickLi(6) }}>
                            <Link to='/QualityList?tab=6'>验收</Link>
                        </li>
                    </ul>
                    <span onClick={this.addNewList} >新增</span>
                    <div className="addNewList" style={{display:this.state.slideUp?"block":"none"}}>
                        <ul>
                            <li onClick={(e)=>{ this.showModal('modal')(e,'modal1')}}>任务</li>
                            <li onClick={(e)=>{this.showModal('modal1')(e,'modal')}}>联系人</li>
                            <Link to="/scene"><li>回访</li></Link>
                            <Link to="/meeting"><li>纪要</li></Link>
                            <Link to="/quality"><li>验收</li></Link>
                        </ul>
                    </div>
                    <Modal
                        visible={this.state.modal}
                        transparent
                        maskClosable={true}
                        onClose={this.onClose('modal')}
                        style={{width:"310px"}}
                        className="personalLinkWrap myCustomModal"
                        footer={[
                            { text: '取消', onPress: () => { console.log('cancle'); this.onClose('modal')(); } },
                            { text: '确定', onPress: () => { this.onClose('modal')(); this.addMission(); } }
                        ]}
                    >
                        <div className="personalLink">
                            <div className="personalLinkList">
                                <ul>
                                    <li>
                                        <span style={{ textAlignLast:"justify",width:"25%",color:"#333"}}>发生时间:</span>
                                        <input
                                            type="text"
                                            value={this.state.happenTime}
                                            onChange={(e) => { this.onChangeHappenTime(e) }}
                                            style={{paddingLeft:"5px"}}
                                            placeholder="0000-00-00"
                                        />
                                    </li>
                                    <li>
                                        <span style={{ textAlignLast:"justify",width:"25%",color:"#333"}}>内容:</span>
                                        {/* <span>内容：</span> */}
                                        <input
                                            type="text"
                                            value={this.state.content}
                                            onChange={(e) => { this.onChangeContent(e) }}
                                            style={{paddingLeft:"5px"}}
                                        />
                                    </li>
                                    <li>
                                        <span style={{ textAlignLast:"justify",width:"25%",color:"#333"}}>完成时间:</span>
                                        <input
                                            type="text"
                                            value={this.state.finishTime}
                                            onChange={(e) => { this.onChangeFinishTime(e) }}
                                            style={{ paddingLeft: "5px" }}
                                            placeholder="0000-00-00"
                                        />
                                    </li>
                                    <li>
                                        <span style={{ textAlignLast:"justify",width:"25%",color:"#333"}}>交割情况:</span>
                                        <input
                                            type="text"
                                            value={this.state.give}
                                            onChange={(e) => { this.onChangeGive(e) }}
                                            style={{paddingLeft:"5px"}}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Modal>
                    <Modal
                    visible={this.state.modal1}
                    transparent
                    maskClosable={true}
                    onClose={this.onClose('modal1')}
                    className="personalLinkWrap"
                    footer={[
                        { text: '取消', onPress: () => { this.onClose('modal1')(); } },
                        { text: '确定', onPress: () => { 
                            this.addPersonalMsg();
                        }}
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
                                            onChange={(e) => { this.setState({name:e.currentTarget.value}) }}
                                        />
                                    </li>
                                    <li>
                                        <span>职位：</span>
                                        <input
                                            type="text"
                                            value={this.state.job}
                                            onChange={(e) => { this.setState({ job: e.currentTarget.value }) }}
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
                                            onChange={(e) => { this.setState({ remark: e.currentTarget.value }) }}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}