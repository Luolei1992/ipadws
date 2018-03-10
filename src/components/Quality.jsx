import React from 'react';
import {Link,hashHistory} from 'react-router';
import { Modal, Toast } from 'antd-mobile';
import { readyDo, TableHeads,init } from './templates';
import { DrawBoard } from './drawBoard';

let canvas;
let drawBoard;
let interval;

const urls = {
    wordMsg: require('../images/wordMsg.png'),
}
export default class Quality extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            htName:"",
            htNum:"",
            xmName:"",
            xmNum:"",
            xmMaster:"",
            cgName:"",
            ssCompany:"",
            ssName:"",
            jdDes:"",
            fkOrder:"",
            fkDes:"",
            getThings:"",
            goThings:"",
            zlThings:"",
            ysResult:"",
            id:"",
            companyDetail:{

            },
            animating: false            
        },
        this.saveProject = (res) => {
            console.log(res);
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
        this.addCheckDetail=(res)=>{
            console.log(res);
            if(res.success){
                this.setState({
                    id: res.message.id
                })
            }
        },
            this.handleProjectGet = (res) => {
                console.log(res);
                if (res.success) {
                    this.setState({
                        htName: res.data.length == 0 ? "" : res.data.other_name,
                        htNum: res.data.length == 0 ? "" : res.data.contract_no,
                        xmName: res.data.length == 0 ? "" : res.data.name,
                        xmNum: res.data.length == 0 ? "" : res.data.document_id,
                        xmMaster: res.data.length == 0 ? "" : res.data.master_name,
                        cgName: res.data.length == 0 ? "" : res.data.purchase_name,
                        ssCompany: res.data.length == 0 ? "" : res.data.implement_company_name,
                        ssName: res.data.length == 0 ? "" : res.data.implement_user_name
                    })
                } else {
                    Toast.info(res.message, 2, null, false);
                }
            }
    }
    componentDidMount(){
        this.props.router.setRouteLeaveHook(
            this.props.route,
            this.routerWillLeave
        )
        init('result');
        readyDo(this.alerts);
        canvas = document.getElementById("canvas");
        drawBoard = new DrawBoard(canvas);  // 初始化
        interval = setInterval(() => {
            this.addCheck();
        }, 30000);
        runPromise('get_project_info', {
            "gd_project_id": validate.getCookie('baseId')
        }, this.handleProjectGet, true, "post");
    }
    routerWillLeave(nextLocation) {
        clearInterval(interval);
    }
    // touchBlur = () => {
    //     let iptList = document.getElementsByTagName("input");
    //     let txtList = document.getElementsByTagName("textarea");
    //     for (let a = 0; a < iptList.length; a++) {
    //         iptList[a].blur();
    //     }
    //     for (let b = 0; b < txtList.length; b++) {
    //         txtList[b].blur();
    //     }
    // }
    addCheck=()=>{
        runPromise('add_check', {
            gd_project_id:validate.getCookie('project_id'),
            // des_order:this.state.fkOrder,  //验收节点数，第几节点（每个节点都会有个验收单）
            // ht_name:this.state.htName,  //合同名称
            // xm_name:this.state.xmName, //项目合同名称
            // ht_num:this.state.htNum, //合同编号
            // xm_num:this.state.xmNum, //项目编号
            // xm_master:this.state.xmMaster,  //项目负责人
            // cg_name:this.state.cgName,  //采购人员
            // ss_company:this.state.ssCompany,  //实施单位
            // ss_name:this.state.ssName,  //实施人员
            des_name:this.state.jdDes,
            des_detail:this.state.fkDes,
            chk_daohuo:this.state.getThings,
            chk_yunxing:this.state.goThings,
            chk_ziliao:this.state.zlThings,
            chk_result:this.state.ysResult,
            chk_time:"",
            id:this.state.id
        }, this.addCheckDetail, true, "post");
    }
    clearAll = function () {
        drawBoard.clear();
    }
    cancelLast = function () {
        drawBoard.cancel();
    }
    alerts = (a) => {
        runPromise('sign_up_document', {
            action_type: "check",
            action_id: this.state.id,
            signed_file_path: a
        }, this.saveProject, true, "post");
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
    loadingToast() {
        Toast.loading('保存中...', 0, () => {
            // alert(4)
        }, true);
    }
    render(){
        return (
            // <div id="fromHTMLtestdiv" className="qualityFormWrap visitRecordWrap" onTouchMove={() => { this.touchBlur(); }}>
            <div id="fromHTMLtestdiv" className="qualityFormWrap visitRecordWrap">
                <TableHeads url={urls.wordMsg} isHide={false} tag={<h3>验收单</h3>}></TableHeads>
                <button id="downloadPng" onClick={() => { this.loadingToast();this.addCheck();clearInterval(interval)}}>下载图片</button>
                <div className="qualityWrap">
                    <div className="qualityWrapTop">
                        <h3>{decodeURIComponent(validate.getCookie('company_name'))}</h3>
                        <h3>采购合同 - 阶段验收单</h3>
                    </div>
                    <table>
                        <tr>
                            <td>采购合同名称</td>
                            <td>
                                <input type="text" className="qualityIpt" readOnly
                                    // onChange={(e)=>{this.setState({htName:e.currentTarget.value})}}
                                    value={this.state.htName}
                                />
                            </td>
                            <td>项目合同号</td>
                            <td><input type="text" className="qualityIpt" readOnly
                                // onChange={(e)=>{this.setState({htNum:e.currentTarget.value})}} 
                                value={this.state.htNum}                               
                            /></td>
                        </tr>
                        <tr>
                            <td>项目合同名称</td>
                            <td><input type="text" className="qualityIpt" readOnly
                                // onChange={(e)=>{this.setState({xmName:e.currentTarget.value})}}
                                value={this.state.xmName}
                            /></td>
                            <td>项目编号</td>
                            <td><input type="text" className="qualityIpt" readOnly
                                // onChange={(e)=>{this.setState({xmNum:e.currentTarget.value})}}
                                value={this.state.xmNum}
                            /></td>
                        </tr>
                        <tr>
                            <td>项目负责人</td>
                            <td><input type="text" className="qualityIpt" readOnly
                                // onChange={(e)=>{this.setState({xmMaster:e.currentTarget.value})}}
                                value={this.state.xmMaster}
                            /></td>
                            <td>采购人员</td>
                            <td><input type="text" className="qualityIpt" readOnly
                                // onChange={(e)=>{this.setState({cgName:e.currentTarget.value})}}
                                value={this.state.cgName}
                            /></td>
                        </tr>
                        <tr>
                            <td>实施单位</td>
                            <td><input type="text" className="qualityIpt" readOnly
                                // onChange={(e)=>{this.setState({ssCompany:e.currentTarget.value})}}
                                value={this.state.ssCompany}
                            /></td>
                            <td>
                                <p style={{ lineHeight: "30px" }}>实施/实施单位</p>
                                <p style={{ lineHeight: "30px" }}>联系人</p>
                            </td>
                            <td><input type="text" className="qualityIpt" readOnly
                                // onChange={(e)=>{this.setState({ssName:e.currentTarget.value})}}
                                value={this.state.ssName}
                            /></td>
                        </tr>
                        <tr>
                            <td rowSpan="2">
                                <p style={{ lineHeight: "30px" }}>阶段（节点）</p>
                                <p style={{ lineHeight: "30px" }}>说明</p>
                            </td>
                            <td>节点描述</td>
                            <td colSpan="2"><input type="text" className="qualityIpt" 
                                onChange={(e)=>{this.setState({jdDes:e.currentTarget.value})}}
                            /></td>
                        </tr>
                        <tr>
                            <td>
                                <p style={{ lineHeight: "30px" }}>本次付款为</p>
                                <p style={{ lineHeight: "30px" }}>
                                    第<i style={{ textDecoration: "underline" }}>
                                        <input maxLength="1" type="text" style={{
                                            width:"10px",
                                            border:"0 none",
                                            borderBottom:"1px solid #ccc",
                                            color: "red"
                                        }} 
                                            onChange={(e)=>{this.setState({fkOrder:e.currentTarget.value})}}
                                        />
                                    </i>节点
                                </p>
                            </td>
                            <td colSpan="2"><input type="text" className="qualityIpt" 
                                onChange={(e)=>{this.setState({fkDes:e.currentTarget.value})}}
                            /></td>
                        </tr>
                        <tr>
                            <td>
                                <table style={{ border: "0 none" }}>
                                    <tr>
                                        <td style={{
                                            borderTop: "0 none",
                                            borderLeft: "0 none",
                                            borderBottom: "0 none",
                                            width: "33.33%"
                                        }} rowSpan="3">
                                            <p style={{ lineHeight: "30px" }}>验 收</p>
                                            <p style={{ lineHeight: "30px" }}>内 容</p>
                                        </td>
                                        <td style={{ borderTop: "0 none", borderRight: "0 none", width: "66.66%" }}>到货情况</td>
                                    </tr>
                                    <tr>
                                        <td style={{ borderRight: "0 none", borderLeft: "0 none" }}>运行情况</td>
                                    </tr>
                                    <tr>
                                        <td style={{ borderRight: "0 none", borderBottom: "0 none" }}>资料情况</td>
                                    </tr>
                                </table>
                            </td>
                            <td colSpan="3">
                                <table style={{ border: "0 none" }}>
                                    <tr>
                                        <td style={{ border: "0 none", borderBottom: "1px solid #000" }}>
                                            <input type="text" className="qualityIpt" 
                                                onChange={(e)=>{this.setState({getThings:e.currentTarget.value})}}
                                            /></td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: "0 none" }}><input type="text" className="qualityIpt" 
                                            onChange={(e)=>{this.setState({goThings:e.currentTarget.value})}}
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: "0 none", borderTop: "1px solid #000" }}>
                                        <input type="text" className="qualityIpt" 
                                            onChange={(e)=>{this.setState({zlThings:e.currentTarget.value})}}
                                        /></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p style={{ lineHeight: "40px" }}>验收结果</p>
                                <p style={{ lineHeight: "40px" }}>后续处理</p>
                            </td>
                            <td colSpan="3">
                                <textarea 
                                    id="result" 
                                    style={{width:"100%",minHeight:"1.5rem",padding:".2rem",boxSizing:"border-box",border:"0 none"}}
                                    onChange={(e)=>{this.setState({ysResult:e.currentTarget.value})}}
                                ></textarea>
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
                                                    
                                                </li>
                                                <li>
                                                    
                                                </li>
                                                <li>
                                                    
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
        )
    }
}