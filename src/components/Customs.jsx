import React from "react";
import ReactDOM from 'react-dom';
import { hashHistory } from "react-router";
import { TableHeada, Customs, noLogin, Customs2} from './templates';
import { Modal, List, Toast, ListView} from 'antd-mobile';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
    custom: require('../images/custom.png')
}
let currentType="add_time";

function MyBody(props) {
    return (
        <div className="mainCustomList">
            <ul className="customDetails">
                {props.children}
            </ul>
        </div>
    );
}

let realData = [];
let index = realData.length - 1;
let realDataLength = realData.length;
const NUM_ROWS = 5; //循环长度
let real_NUM_ROWS = 5;
let pageIndex = 0;

export default class Custom extends React.Component {
    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.genData = (pIndex = 0, real_NUM_ROWS, data) => {
            const dataBlob = {};
            for (let i = 0; i < real_NUM_ROWS; i++) {
                const ii = (pIndex * NUM_ROWS) + i;
                dataBlob[`${ii}`] = data[i];
            }
            return dataBlob;
        };
        this.state = {
            dataSource: dataSource.cloneWithRows(JSON.parse(sessionStorage.getItem("customs")) ? JSON.parse(sessionStorage.getItem("customs")) : {} ),
            isLoading: true,
            height: document.documentElement.clientHeight,
            hasMore: true, //是否有更多的数据
            show: false,
            show2: false,
            animate:true,
            modal: false,
            modal1: false,
            type:"1",
            order: "合作中",
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
            id:"",
            e:""
        },
        this.handleProjectGet = (res) => {
            // console.log(res);
            if(res.success) {
                realData = res.data.item_list;
                index = realData.length - 1;
                realDataLength = res.data.item_list.length;
                real_NUM_ROWS = realDataLength;
                if (pageIndex == 0) {
                    this.rData = {};
                    this.rData = { ...this.rData, ...this.genData(pageIndex++, realDataLength, res.data.item_list) };
                    sessionStorage.setItem("customs", JSON.stringify(realData))
                } else {
                    this.rData = { ...this.rData, ...this.genData(pageIndex++, realDataLength, res.data.item_list) };
                }
                // this.rData = { ...this.rData, ...this.genData(pageIndex++, realDataLength, res.data.item_list) };
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.rData),
                    hasMore: res.data.total_count > pageIndex * NUM_ROWS ? true : false,
                    isLoading: false,
                    data:res.data.item_list
                })
            }
        },
        this.handleAddPersonalMsg=(res)=>{
            if(res.success){
                Toast.info("添加成功", 2, null, false);
                this.getProjectLis(this.state.type);   //更新项目数据
                this.setState({name:"",job:"",phone:"",email:"",remark:""}); 
                this.onClose('modal')(); 
            }else{
                Toast.info(res.message, 2, null, false);
            }
        },
        this.handleAddMission=(res)=>{
            if(res.success){
                Toast.info("添加成功", 2, null, false);
                this.getProjectLis(this.state.type);   //更新项目数据                
                this.setState({happenTime:"",finishTime:"",content:"",give:""});
                this.onClose('modal1')();
            }else{
                Toast.info(res.message, 2, null, false);
            }
        },
        this.handleDel=(res,e)=>{
            if(res.success){
                Toast.info("删除成功", 2, null, false);
                e.target.parentNode.remove();
            }else{
                Toast.info(res.message, 2, null, false);
            }
        }
    }
    onEndReached = (event) => {
        // load new data   数据加载完成
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        };
        
        this.setState({ isLoading: true });
        this.getProjectLis(this.state.type, pageIndex * NUM_ROWS);
    }
    componentDidMount() {
        // Set the appropriate height
        setTimeout(() => this.setState({
            // height: this.state.height - ReactDOM.findDOMNode(this.refs.lv).offsetTop,
            height: this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop,
        }), 100);
        this.getProjectLis("1");
        // document.getElementById("mainWrap").style.marginTop
    }
    componentDidUpdate(){
        let li = document.querySelector(".list-view-section-body>li");
        if (li && pageIndex == 0) {
            li.scrollIntoView(true);
        }
    }
    getProjectLis = (type, offset = 0)=>{
        if (offset == 0) {
            pageIndex = 0;
        }
        runPromise('get_project_list', {
            "type": "-3",
            "offset": offset,
            "limit": 5,
            "sort": "add_time",
            "choose": 0,
            "work_status": type
        }, this.handleProjectGet, true, "post");
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
    delPerson=(e,id,project_id)=> {      //删除联系人
        e.persist();
        runPromise('del_project_linker',{
            gd_project_id:project_id,
            user_id:id
        }, this.handleDel, true, "post",e)
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
    render() {
        const row = (rowData, sectionID, rowID) => {
            return (
                <Customs2
                    rowID={rowID}
                    dataList={rowData}
                    delPerson={this.delPerson}
                    showModal={this.showModal('modal')}
                    addJobs={this.showModal('modal1')}
                    getCustomList={this.getCustomList}
                    setBaseStateFun={this.setBaseStateFun}
                />
            )
        }
        return (
            // <QueueAnim className="demo-content" type={['right', 'right']}>
            //     {this.state.animate ? [
            <div className="customsLists visitRecordWrap animatePage" key="1" style={{border:"0 none"}}>
                <TableHeada
                    url={urls.wordMsg}
                    isHide={false}
                    tag={<h3 className="fn-left">我的客户</h3>}
                ></TableHeada>
                <div style={{height:"1.3rem",position:"relative",width:"100%"}}></div>
                <div className="customsHead" style={{marginTop:"10px"}}>
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
                                    <li onClick={(e) => { this.changeOrder(e, "0") }}>全部</li>
                                    <li onClick={(e) => { this.changeOrder(e, "1") }}>合作中</li>
                                    <li onClick={(e) => { this.changeOrder(e, "2") }}>已过期</li>
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
                                        onChange={(e) => {this.setState({name: e.currentTarget.value}); }}
                                    />
                                </li>
                                <li>
                                    <span>职位：</span>
                                    <input
                                        type="text"
                                        value={this.state.job}
                                        onChange={(e) => {this.setState({job: e.currentTarget.value}); }}
                                    />
                                </li>
                                <li>
                                    <span>手机：</span>
                                    <input
                                        type="text"
                                        value={this.state.phone}
                                        onChange={(e) => {
                                            this.setState({
                                                hasError1: validate.CheckPhone(e.currentTarget.value).hasError,
                                                phone: e.currentTarget.value
                                            });
                                        }}
                                        className={this.state.hasError1 ? "txtRed" : ""}
                                    />
                                </li>
                                <li>
                                    <span>邮箱：</span>
                                    <input
                                        type="text"
                                        value={this.state.email}
                                        onChange={(e) => {
                                            this.setState({
                                                hasError2: validate.CheckEmail(e.currentTarget.value).hasError,
                                                email: e.currentTarget.value
                                            }) 
                                        }}
                                        className={this.state.hasError2 ? "txtRed" : ""}
                                    />
                                </li>
                                <li>
                                    <span>备注：</span>
                                    <input
                                        type="text"
                                        value={this.state.remark}
                                        onChange={(e) => { this.setState({ remark: e.currentTarget.value }); }}
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </Modal>
                {/* <div className="mainCustomList">
                    <Customs
                        dataList={this.state.data}
                        delPerson={this.delPerson}
                        showModal={this.showModal('modal')}
                        addJobs={this.showModal('modal1')}
                        getCustomList={this.getCustomList}
                        setBaseStateFun={this.setBaseStateFun}
                    ></Customs>
                </div> */}
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    // renderHeader={() => <span>Pull to refresh</span>}
                        //     renderFooter={() => (<div style={{ padding: "20px", textAlign: 'center', display: this.state.isLoading ? 'block' : 'none' }}>
                        // {this.state.isLoading ? '加载中...' : null}
                                renderFooter={() => (<div style={{ padding: "20px", textAlign: 'center' }}>
                                    {this.state.isLoading ? '加载中...' : '加载完成'}
                    </div>)}
                    renderBodyComponent={() => <MyBody />}
                    renderRow={row}
                    style={{
                        // height: this.state.height,
                        height: "640px",
                        overflow: 'auto'
                    }}
                    onEndReached={this.onEndReached}
                    pageSize={5}
                />
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
                                        onChange={(e) => {this.setState({happenTime: e.currentTarget.value}) }}
                                        style={{ paddingLeft: "5px" }}
                                    />
                                </li>
                                <li>
                                    <span style={{ textAlignLast: "justify", width: "25%" }}>内容</span>:
                                    {/* <span>内容：</span> */}
                                    <input
                                        type="text"
                                        value={this.state.content}
                                        onChange={(e) => {this.setState({content: e.currentTarget.value}) }}
                                        style={{ paddingLeft: "5px" }}
                                    />
                                </li>
                                <li>
                                    <span style={{ textAlignLast: "justify", width: "25%" }}>完成时间</span>:
                                    <input
                                        type="text"
                                        value={this.state.finishTime}
                                        placeholder="0000-00-00"
                                        onChange={(e) => {this.setState({finishTime: e.currentTarget.value}) }}
                                        style={{ paddingLeft: "5px" }}
                                    />
                                </li>
                                <li>
                                    <span style={{ textAlignLast: "justify", width: "25%" }}>交割情况</span>:
                                    <input
                                        type="text"
                                        value={this.state.give}
                                        onChange={(e) => {this.setState({give: e.currentTarget.value}) }}
                                        style={{ paddingLeft: "5px" }}
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </Modal>
            </div>
            //     ]:null}
            // </QueueAnim>
        )
    }
}

