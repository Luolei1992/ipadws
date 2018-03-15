import React from 'react';
import ReactDOM from 'react-dom';
import { ImagePicker, Toast, ListView } from "antd-mobile";
import { Link } from "react-router";
import { TableHeada, Quality, init, Quality2 } from "./templates";

const urls = {
    wordMsg: require('../images/wordMsg.png'),
    addPic: require('../images/addPic.png'),
}
let arrIds = [];

function MyBody(props) {
    return (
        <ul className="details">
            {props.children}
        </ul>
    );
}

let realData = [];
let index = realData.length - 1;
let realDataLength = realData.length;
const NUM_ROWS = 6; //循环长度
let real_NUM_ROWS = 6;
let pageIndex = 0;

export default class Visit extends React.Component {
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
            dataSource: dataSource.cloneWithRows(sessionStorage.getItem("visitLists") ? JSON.parse(sessionStorage.getItem("visitLists")) : {}),
            isLoading: true,
            height: document.documentElement.clientHeight,
            selectedTab: 'redTab',
            hidden: false,
            fullScreen: false,
            show: false,
            list: [0, 1],
            showIndex: -1,
            open: true,
            files: [],
            ids:[],
            score:1,
            fujia:"",
            tempCompanyId:"",
            alertShow: false,
            isShow:-1,
            // order: [false, false, false],
            agree:[true,false,false],
            visitLists:{
                item_list: []
            },
            companyLists:{
                item_list: sessionStorage.getItem("companyLists") ? JSON.parse(sessionStorage.getItem("companyLists")) : []
            },
            personalDetail:{},
            id:"",
            gd_company_id: 0,
            classify: 0, //质检分类。0为全部，1为不满意，2为到期，3为已离职
            userId:""
        },
        this.handleCompanyListGet = (res) => {
            this.setState({
                companyLists:res.data
            })
            sessionStorage.setItem("companyLists", JSON.stringify(res.data.item_list));
        },
        this.handleVisitGet = (res) => {
            if(res.success){
                realData = res.data.item_list.reverse();
                index = realData.length - 1;
                realDataLength = res.data.item_list.length;
                real_NUM_ROWS = realDataLength;
                if (pageIndex == 0) {
                    this.rData = {};
                    this.rData = { ...this.rData, ...this.genData(pageIndex, realDataLength, res.data.item_list) };
                    sessionStorage.setItem("visitLists", JSON.stringify(realData));
                } else {
                    this.rData = { ...this.rData, ...this.genData(pageIndex, realDataLength, res.data.item_list) };
                }
                ++pageIndex;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.rData),
                    hasMore: res.data.total_count > pageIndex * NUM_ROWS ? true : false,
                    isLoading: false,
                    visitLists: res.data
                });
            } else {
                Toast.info(res.message, 2);
            }
        },
        this.handleAddVisit = (res) =>{
            if(res.success){
                Toast.info("提交成功", 2, null, false);
                this.setState({
                    alertShow:false
                })
            }else{
                Toast.info(res.message, 2, null, false);
            }
        }
    }
    onEndReached = (event) => {
        // load new data   数据加载完成
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading) {
            return;
        };
        if (!this.state.hasMore) {
            return;
        };
        this.setState({ isLoading: true }, () => {
            this.orderVisitBack(this.state.classify, pageIndex * NUM_ROWS, this.state.gd_company_id);
        });
    }
    componentDidMount() {
        init('plusMsg');
        runPromise('get_company_list', {   //获取公司列表
            offset: "0",
            limit: "200"
        }, this.handleCompanyListGet, true, "post");
        // runPromise('get_visit_back_list', {   //获取回访列表
        //     gd_company_id: "0",
        //     offset: "0",
        //     limit: "20",
        //     score: "-1",
        //     timeOut: "-1",
        //     work_status: "-1"
        // }, this.handleVisitGet, true, "post");
        // Set the appropriate height
        setTimeout(() => this.setState({
            // height: this.state.height - ReactDOM.findDOMNode(this.refs.lv).offsetTop,
            height: this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop - 5,
        }), 100);
        this.orderVisitBack();
    }
    //获取回访列表
    getvisitBackList = () => {

    }
    orderVisitBack(classify = 0, offset = 0, gd_company_id = 0){
        if (offset == 0) {
            pageIndex = 0;
        }
        this.setState({ classify, gd_company_id });
        let paramArray = [
            [-1, -1, -1],
            [2, -1, -1],
            [-1, 0, -1],
            [-1, -1, 2]
        ];
        let [score, timeOut, status] = paramArray[parseInt(classify)];
        runPromise('get_visit_back_list', {   //获取回访列表
            gd_company_id: gd_company_id,
            offset: offset,
            limit: NUM_ROWS,
            score: score,
            timeOut: timeOut,
            work_status: status
        }, this.handleVisitGet, true, "post");
    }
    componentDidUpdate() {
        let li = document.querySelector(".details li.fullWidth");
        if (li && pageIndex == 0) {
            li.scrollIntoView(true);
        }
    }
    addVisitBack=()=>{
        runPromise('add_visit_back',{
            gd_company_id:this.state.tempCompanyId,
            score:this.state.score,
            content:this.state.fujia,
            appendix:this.state.ids.join("_"),
            id:this.state.id,
            customer_id:this.state.userId
        },this.handleAddVisit,true,"post")
    }
    onChange = (files, type, index) => {
        if(type=="add") {
            runPromise('upload_image_byw_upy2', {
                "arr": files[files.length-1].url
            }, (res) => {
                arrIds.push(res.data.id);
                this.setState({
                    ids:arrIds
                })
            }, false, "post");
        }else{
            arrIds.splice(index,1);
            this.setState({
                ids: arrIds
            })
        }
        this.setState({
            files,
        });
    }
    show = (showIndex) => {
        if(this.state.isShow == showIndex) {
            this.setState({
                isShow: -1
            })
        }else{
            this.setState({
                isShow: showIndex
            })
        }
    }
    changeAlert = (idx,visitId,userId) => {
        this.setState({
            alertShow: !this.state.alertShow,
            tempCompanyId:idx,
            id:visitId,
            userId:userId,
            files:[],
            fujia:""
        })
    }
    closeAlert = () => {
        this.setState({
            alertShow: false
        })
    }
    changeAgree(idx){
        let arr = [false,false,false];
        arr[idx] = true;
        this.setState({
            agree:arr,
            score:idx==0?1:idx==1?2:5
        })
    }
    clickChangeBg=(e,id)=>{  //#4e4c4c
        // let tar = e.currentTarget;
        // let mainWrapLeftList = document.querySelectorAll(".bgCompany");
        // for (let i = 0; i < mainWrapLeftList.length;i++) {
        //     mainWrapLeftList[i].style.backgroundColor="#000";
        // }
        // tar.style.backgroundColor = "#4e4c4c";
        //调用接口获取对应公司人员的数据
        this.orderVisitBack(0, 0, id);
    }
    render() {
        const { files } = this.state;
        const row = (rowData, sectionID, rowID) => {
            return (
                <NewQuality2
                    rowID={rowID}
                    visitLis={rowData}
                    isShow={this.state.isShow}
                    show={this.show}
                    changeAlert={this.changeAlert}
                />
            )
        }
        return (
            <div id="capture" className="visitWrap visitRecordWrap animatePage" style={{ border:"0 none",backgroundColor: "#eeeeee" }}>
                <TableHeada
                    url={urls.wordMsg}
                    isHide={false}
                    tag={<h3 className="fn-left">质 检</h3>}
                ></TableHeada>
                <div className="mainWrap">
                    <div className="mainWrapLeft">
                        <p 
                            className="allQuality"
                            onClick={(e) => { this.clickChangeBg(e, 0) }}
                            onTouchStart={(e) => { e.target.style.backgroundColor = "#590e0e" }}
                            onTouchEnd={(e) => { e.target.style.backgroundColor ="#A90707" }}
                        ><span>全部</span><i>{this.state.companyLists.total_count}</i></p>
                        <ul>
                            {
                                this.state.companyLists.item_list.map((value,idx)=>(
                                    <li 
                                        className="bgCompany"
                                        style={{ "background-color": this.state.gd_company_id == value.id ? "#4e4c4c" : "#000"}}
                                        onClick={(e)=>{this.clickChangeBg(e,value.id)}}>
                                        <a>
                                            <p style={{ color: "#fff" }}><span>{value.company_name}</span><i>{value.visit_back_customer_count}</i></p>
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="mainWrapRight">
                        <p className="which">
                            <input type="checkbox" checked={this.state.classify == 1 ? true : false } onClick={()=>{this.orderVisitBack(1)}} /> 不满意处理<span></span>
                            <input type="checkbox" checked={this.state.classify == 2 ? true : false } onClick={()=>{this.orderVisitBack(2)}}/> 到期<span></span>
                            <input type="checkbox" checked={this.state.classify == 3 ? true : false } onClick={() => { this.orderVisitBack(3) }} /> 已离职
                        </p>
                        {/* <Quality
                            visitLis={this.state.visitLists.item_list}
                            isShow={this.state.isShow}
                            show={this.show}
                            changeAlert={this.changeAlert}>
                        </Quality> */}
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
                                height: this.state.height,
                                overflow: 'auto'
                            }}
                            onEndReached={this.onEndReached}
                            pageSize={5}
                        />
                        <div className="alertModalBg" 
                            style={{ display: this.state.alertShow ? "block" : "none" }}
                            onClick={(e)=>{
                                this.setState({ alertShow:false})
                            }}
                            ></div>
                        <div className="alertModal" style={{ display: this.state.alertShow ? "block" : "none" }}>
                            <i className="icon-icon_chahao iconfont" onClick={this.closeAlert}></i>
                            <p className="which" style={{ textAlign: "center" }}>
                                <input type="checkbox" checked={this.state.agree[0]} onClick={()=>{this.changeAgree(0)}}/> 满意<span></span>
                                <input type="checkbox" checked={this.state.agree[1]} onClick={()=>{this.changeAgree(1)}}/> 不满意<span></span>
                                <input type="checkbox" checked={this.state.agree[2]} onClick={()=>{this.changeAgree(2)}}/> 已离职
                            </p>
                            <textarea id="plusMsg" 
                                placeholder="附加信息：" 
                                onChange={(e)=>{this.setState({fujia:e.currentTarget.value})}} 
                                value={this.state.fujia}
                                style={{resize:"none"}}
                                onBlur={(e) => { 
                                    e.currentTarget.parentNode.style.marginTop = '0';
                                }}
                                onFocus={(e) => { 
                                    e.currentTarget.parentNode.style.marginTop = '2rem';
                                }}
                            ></textarea>
                            <ImagePicker
                                files={files}
                                onChange={this.onChange}
                                onImageClick={(index, fs) => console.log(index, fs)}
                                selectable={files.length < 4}
                                accept="image/gif,image/jpeg,image/jpg,image/png"
                            />
                            <button onClick={this.addVisitBack}>提 交</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const Mycontainer = (WrappedComponent) => 
    class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                isShow: false
            }
        }
        show = () => {
            this.setState({
                isShow: !this.state.isShow
            })
        }
        render() {
            return <WrappedComponent {...this.props} isShow={this.state.isShow} show={this.show} />
        }
    }

const NewQuality2 = Mycontainer(Quality2);