import React from 'react';
import { Link } from 'react-router';
import { Modal } from 'antd-mobile';
import { GetLocationParam } from './templates'

export default class MyCustom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: [false, false, false, false, false, false],
            slideUp:false,
            modal:false,
            happenTime:"",
            content:"",
            finishTime:"",
            give:"",
            jobList:[]
        },
        this.handleAddMission=(res)=>{
            console.log(res);
            location.reload();
        }
    }
    componentDidMount() {
        let newflag = [false, false, false, false, false, false];
        let number = window.location.href.split("tab=")[1].slice(0, 1)-0;
        newflag[number] = true;
        this.setState({
            flag: newflag
        })
    }
    addMission = () => {
        runPromise('add_mission', {
            "gd_project_id": GetLocationParam('id') || this.props.state.baseFlagId,
            "start_time": this.state.happenTime,
            "finish_time": this.state.finishTime,
            "content": this.state.content,
            "rtn_ifo": this.state.give,
        }, this.handleAddMission, false, "post");
    }
    showModal = key => (e, id) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
        console.log(id);    //得到对应id的元素
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    handleClickLi(index) {
        let newflag = [false, false, false, false, false, false];
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
    showModal = key => (e, id) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
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
            <div className="myCustomWrap">
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
                    </ul>
                    <span onClick={this.addNewList} >新增</span>
                    <div className="addNewList" style={{display:this.state.slideUp?"block":"none"}}>
                        <ul>
                            <li onClick={this.showModal('modal')}>任务</li>
                            <li onClick={this.showModal('modal')}>联系人</li>
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
                        style={{width:"300px"}}
                        className="personalLinkWrap myCustomModal"
                        footer={[
                            { text: '取消', onPress: () => { console.log('cancle'); this.onClose('modal')(); } },
                            { text: '确定', onPress: () => { this.onClose('modal')(); this.addMission(); window.location.href; } }
                        ]}
                    >
                        <div className="personalLink">
                            <div className="personalLinkList">
                                <ul>
                                    <li>
                                        <span style={{ textAlignLast:"justify",width:"25%",color:"#333"}}>发生时间:</span>
                                        <input
                                            type="text"
                                            value={this.state.name}
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
                                            value={this.state.job}
                                            onChange={(e) => { this.onChangeContent(e) }}
                                            style={{paddingLeft:"5px"}}
                                        />
                                    </li>
                                    <li>
                                        <span style={{ textAlignLast:"justify",width:"25%",color:"#333"}}>完成时间:</span>
                                        <input
                                            type="text"
                                            value={this.state.phone}
                                            onChange={(e) => { this.onChangeFinishTime(e) }}
                                            style={{ paddingLeft: "5px" }}
                                            placeholder="0000-00-00"
                                        />
                                    </li>
                                    <li>
                                        <span style={{ textAlignLast:"justify",width:"25%",color:"#333"}}>交割情况:</span>
                                        <input
                                            type="text"
                                            value={this.state.email}
                                            onChange={(e) => { this.onChangeGive(e) }}
                                            style={{paddingLeft:"5px"}}
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