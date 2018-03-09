import React from 'react';
import { ImagePicker,Toast } from "antd-mobile";
import { Link } from "react-router";
import { TableHeada, Quality, init } from "./templates";

const urls = {
    wordMsg: require('../images/wordMsg.png'),
    addPic: require('../images/addPic.png'),
}
let arrIds = [];
export default class Visit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            order:[false,false,false],
            agree:[true,false,false],
            visitLists:{
                item_list:[]
            },
            companyLists:{
                item_list:[]
            },
            personalDetail:{},
            id:""
        },
        this.handleCompanyListGet = (res) => {
            console.log(res);
            this.setState({
                companyLists:res.data
            })
        },
        this.handleVisitGet = (res) => {
            console.log(res);
            if(res.success){
                this.setState({
                    visitLists:res.data
                });
            }
        },
        this.handleAddVisit = (res) =>{
            console.log(res);
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
    componentDidMount() {
        init('plusMsg');
        runPromise('get_company_list', {   //获取公司列表
            offset: "0",
            limit: "20"
        }, this.handleCompanyListGet, true, "post");
        runPromise('get_visit_back_list', {   //获取回访列表
            gd_company_id: "0",
            offset: "0",
            limit: "20",
            score: "-1",
            timeOut: "-1",
            work_status: "-1"
        }, this.handleVisitGet, true, "post");
    }
    orderVisitBack(score,timeOut,status,idx){
        let arr = [false,false,false];
        arr[idx] = true;
        this.setState({
            order:arr
        })
        runPromise('get_visit_back_list', {   //获取回访列表
            gd_company_id: "0",
            offset: "0",
            limit: "20",
            score: score,
            timeOut: timeOut,
            work_status: status
        }, this.handleVisitGet, true, "post");
    }
    addVisitBack=()=>{
        runPromise('add_visit_back',{
            gd_company_id:this.state.tempCompanyId,
            score:this.state.score,
            content:this.state.fujia,
            appendix:this.state.ids.join("_"),
            id:this.state.id
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
        console.log(showIndex);
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
    changeAlert = (idx,visitId) => {
        this.setState({
            alertShow: !this.state.alertShow,
            tempCompanyId:idx,
            id:visitId
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
    clickChangeBg=(e)=>{  //#4e4c4c
        let tar = e.currentTarget;
        let mainWrapLeftList = document.querySelectorAll(".bgCompany");
        for (let i = 0; i < mainWrapLeftList.length;i++) {
            mainWrapLeftList[i].style.backgroundColor="#000";
        }
        tar.style.backgroundColor = "#4e4c4c";
    }
    render() {
        const { files } = this.state;
        return (
            <div id="capture" className="visitWrap visitRecordWrap" style={{ backgroundColor: "#eeeeee" }}>
                <TableHeada
                    url={urls.wordMsg}
                    isHide={false}
                    tag={<h3 className="fn-left">质 检</h3>}
                ></TableHeada>
                <div className="mainWrap">
                    <div className="mainWrapLeft">
                        <p className="allQuality"><span>全部</span><i>{this.state.companyLists.total_count}</i></p>
                        <ul>
                            {
                                this.state.companyLists.item_list.map((value,idx)=>(
                                    <li className="bgCompany" onClick={(e)=>{this.clickChangeBg(e)}}>
                                        <a href={"#visit?" + value.id + "F"} name={"visit?" + value.id + "F"}>
                                            <p style={{color:"#fff"}}><span>{value.company_name}</span><i>{value.visit_back_count}</i></p>
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="mainWrapRight">
                        <p className="which">
                            <input type="checkbox" checked={this.state.order[0]} onClick={()=>{this.orderVisitBack(2,-1,-1,0)}} /> 不满意处理<span></span>
                            <input type="checkbox" checked={this.state.order[1]} onClick={()=>{this.orderVisitBack(-1,0,-1,1)}}/> 到期<span></span>
                            <input type="checkbox" checked={this.state.order[2]} onClick={() => { this.orderVisitBack(-1, -1, 2, 2) }} /> 已离职
                        </p>
                        <Quality
                            visitLis={this.state.visitLists.item_list}
                            isShow={this.state.isShow}
                            show={this.show}
                            changeAlert={this.changeAlert}>
                        </Quality>
                        <div className="alertModalBg" style={{ display: this.state.alertShow ? "block" : "none" }}></div>
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