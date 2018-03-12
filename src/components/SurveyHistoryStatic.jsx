import React from 'react';
import { hashHistory,Link } from "react-router";
import { div2png, readyDo, TableHeads, init, GetLocationParam} from './templates';
import { DrawBoard } from './drawBoard';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
    addPic1: require('../images/addPic.png'),
    addPic2: require('../images/addPic.png'),
    addPic3: require('../images/addPic.png'),
}
let canvas;
let drawBoard;
export default class SurveyHistoryStatic extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            txt: "",
            companyDetail: {
                company_info: {},
                user_list: [],
                plan_list: [],
                appendixs: []
            }
        },
            this.handleProjectGet = (res) => {
                console.log(res)
                this.setState({
                    companyDetail: res.data
                })
            }
    }

    componentDidMount () {
        runPromise('get_survey_info', {     //调研详细
            // "gd_project_id": this.props.state.baseFlagId
            "gd_company_id": validate.getCookie("baseId")
        }, this.handleProjectGet, false, "post");
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
    render(){
        return (
            <div id="fromHTMLtestdiv">
                <form className="visitRecordWrap">
                    <TableHeads 
                        url={urls.wordMsg} 
                        isHide={false} 
                        tag={<h3 className="fn-left">调研档案</h3>}
                    ></TableHeads>
                    <div className="recordMain">
                        <h2 style={{ letterSpacing: "1px", marginTop: "0.8rem" }}>{decodeURIComponent(validate.getCookie("company_name"))}</h2>
                        <p style={{ textAlign: "center" }}>
                            文件编号: {this.state.companyDetail.document_id}  <span style={{ padding: "0 15px" }}></span>
                            起止时间: {this.state.companyDetail.start_time?(this.state.companyDetail.start_time + '').split(" ")[0].split("-").join("."):"0000-00-00"}-{this.state.companyDetail.end_time?(this.state.companyDetail.end_time + '').split(" ")[0].split("-").join("."):"0000-00-00"}<span style={{ padding: "0 15px" }}></span>
                        </p>
                        {/* <div className="giveMsg" >
                            <textarea id="textarea"></textarea>
                        </div> */}
                        <div className="tableDetails">
                            <table className="topTable">
                                <tr>
                                    <td colSpan="4" className="darkbg">客户信息</td>
                                </tr>
                                <tr>
                                    <th className="darkbg">公司名称</th>
                                    <td style={{ width: "33.333334%" }}>{decodeURIComponent(validate.getCookie("company_name"))}</td>
                                    <th className="darkbg">成立时间</th>
                                    <td>{this.state.companyDetail.company_info?(this.state.companyDetail.company_info.start_time + "").split(" ")[0]:""}</td>
                                </tr>
                                <tr>
                                    <th className="darkbg">公司地址</th>
                                    <td>{this.state.companyDetail.company_info?this.state.companyDetail.company_info.address:""}</td>
                                    <th className="darkbg">公司网址</th>
                                    <td>{this.state.companyDetail.company_info?this.state.companyDetail.company_info.url:""}</td>
                                </tr>
                            </table>
                            <table className="sceneTable">
                                <tr>
                                    <td colSpan="4" className="darkbg">联系人</td>
                                </tr>
                                <tr>
                                    <td colSpan="4">
                                        <table className="personalMsg">
                                            <tr style={{ borderBottom: "1px solid #ccc" }}>
                                                <td>姓名</td>
                                                <td>职位</td>
                                                <td>手机号</td>
                                                <td>邮箱</td>
                                                <td>备注</td>
                                            </tr>
                                            {
                                                this.state.companyDetail.length>0?
                                                this.state.companyDetail.user_list.map((value) => (
                                                    <tr>
                                                        <td style={{ width: "10%" }}>{value.real_name}</td>
                                                        <td style={{ width: "10%" }}>{value.job_name}</td>
                                                        <td style={{ width: "20%" }}>{value.username}</td>
                                                        <td style={{ width: "20%" }}>{value.email}</td>
                                                        <td style={{ width: "40%" }}>{value.remark}</td>
                                                    </tr>
                                                )) :""
                                            }
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="darkbg">合同内容</td>
                                </tr>
                                <tr >
                                    <td colSpan="4">

                                        <table style={{ border: "0 none", marginBottom: ".3rem" }}>
                                            <tr>
                                                <td colSpan="4" style={{ border: "0 none", padding: "10px", lineHeight: "10px" }}>
                                                    <pre style={{ border: "0 none", padding: "10px", lineHeight: "10px" }} dangerouslySetInnerHTML={{ __html: this.state.companyDetail.content }} >

                                                    </pre>
                                                </td>
                                            </tr>
                                        </table>
                                        <div style={{ float: "left", width: "100%" }}>
                                            <ul>
                                                {
                                                    this.state.companyDetail.length>0?
                                                    this.state.companyDetail.appendixs.map((value) => (
                                                        <li style={{ width: "3.5rem", height: "2.8rem", paddingLeft: ".5rem" }}>
                                                            <img src={value} style={{ width: "100%" }} />
                                                        </li>
                                                    )):""
                                                }

                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="darkbg">下一步计划和行动</td>
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
                                                this.state.companyDetail.length>0?
                                                this.state.companyDetail.plan_list.reverse().map((value) => (
                                                    <tr>
                                                        <td style={{ borderLeft: "0 none" }}>{value.seq}</td>
                                                        <td>{value.content}</td>
                                                        <td>{value.real_name}</td>
                                                        <td>{value.exp_time.split(" ")[0]}</td>
                                                    </tr>
                                                )):""
                                            }
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="signatureTxt">
                                        <div className="suggess">
                                            <div className="midDiv" style={{ top: "-0.2rem" }}>
                                                <span style={{ lineHeight: "46px" }}>总体印象: </span>
                                                <ul>
                                                    <li>
                                                        <input type="checkbox" id="gloab" checked={this.state.companyDetail.score == 3 ? true : false} />
                                                        <label htmlFor="gloab"> 很满意</label>
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" id="just" checked={this.state.companyDetail.score == 2 ? true : false} />
                                                        <label htmlFor="just"> 一般</label>
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" id="dont" checked={this.state.companyDetail.score == 1 ? true : false} />
                                                        <label htmlFor="dont"> 不满意</label>
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" id="bad" checked={this.state.companyDetail.score == 0 ? true : false} />
                                                        <label htmlFor="bad"> 很不满意</label>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="midDivTop">
                                                <span>您的宝贵建议: </span>&nbsp;&nbsp;
                                                <textarea className="suggessMsg" readOnly value={this.state.companyDetail.suggest}></textarea>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                {/* <tr>
                                    <td colSpan="4" className="signatureTxt" style={{ borderTop: "0 none" }}>
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
                                </tr> */}
                            </table>
                        </div>
                    </div>
                </form>
            </div>
            
        )
    }
}