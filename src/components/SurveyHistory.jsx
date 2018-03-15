import React from 'react';
import { hashHistory,Link } from "react-router";
import { div2png, readyDo, TableHeadOne, init, GetLocationParam} from './templates';
import { DrawBoard } from './drawBoard';

import PhotoSwipeItem from './photoSwipeElement.jsx';
import '../js/photoswipe/photoswipe.css';
import '../js/photoswipe/default-skin/default-skin.css';
import PhotoSwipe from '../js/photoswipe/photoswipe.min.js';
import PhotoSwipeUI_Default from '../js/photoswipe/photoswipe-ui-default.min.js';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
    addPic1: require('../images/addPic.png'),
    addPic2: require('../images/addPic.png'),
    addPic3: require('../images/addPic.png'),
}
let canvas;
let drawBoard;
let arrSize = [];
let openPhotoSwipe = function (items, index) {
    let pswpElement = document.querySelectorAll('.pswp')[0];
    let options = {
        index: index,
        showAnimationDuration: 100,
        hideAnimationDuration: 100
    }
    let gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
}
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
            },
            files:[],
        },
        this.handleProjectGet = (res) => {
            if(res.success){
                this.setState({
                    companyDetail: res.data,
                    files: res.data.appendixs,
                })
            }else{
                Toast.info(res.message, 2, null, false);
            }
        }
    }
    componentDidMount () {
        runPromise('get_survey_info', {     //调研详细
            "gd_company_id": GetLocationParam("id")
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
    onTouchImg = (index) => {
        let items = [];
        this.state.files.map((value) => {
            let item = {};
            item.w = arrSize[index].w;
            item.h = arrSize[index].h;
            item.src = value.path;
            items.push(item);
        })    
        openPhotoSwipe(items, index);
    }
    // componentWillMount(){
    //     // this.state.companyDetail.signed_file_path ?
    // }
    render(){
        return (
            <div id="fromHTMLtestdiv">
                <form className="visitRecordWrap">
                    <TableHeadOne url={urls.wordMsg} isHide={false} tag={<h3>调研详情</h3>}></TableHeadOne>
                    <div className="recordMain">
                        <div style={{ height: "1.3rem", position: "relative", width: "100%" }}></div>
                        <h2 style={{ letterSpacing: "1px", marginTop: "0.8rem" }}>{this.state.companyDetail.company_name}</h2>
                        <p style={{ textAlign: "center" }}>
                            文件编号: {this.state.companyDetail.document_id}  <span style={{ padding: "0 15px" }}></span>
                            起止时间: {this.state.companyDetail.start_time ? (this.state.companyDetail.start_time + '').split(" ")[0].split("-").join(".") : "0000-00-00"}-{this.state.companyDetail.end_time ? (this.state.companyDetail.end_time + '').split(" ")[0].split("-").join(".") : "0000-00-00"}<span style={{ padding: "0 15px" }}></span>
                        </p>
                        <div className="tableDetails">
                            <table className="topTable">
                                <tr>
                                    <td colSpan="4" className="darkbg">客户信息</td>
                                </tr>
                                <tr>
                                    <th className="darkbg">公司名称</th>
                                <td style={{ width: "33.333334%" }}>{this.state.companyDetail.company_name}</td>
                                    <th className="darkbg">成立时间</th>
                                    <td>{this.state.companyDetail.company_info ? (this.state.companyDetail.company_info.start_time + "").split(" ")[0] : ""}</td>
                                </tr>
                                <tr>
                                    <th className="darkbg">公司地址</th>
                                    <td>{this.state.companyDetail.company_info ? this.state.companyDetail.company_info.address : ""}</td>
                                    <th className="darkbg">公司网址</th>
                                    <td>{this.state.companyDetail.company_info ? this.state.companyDetail.company_info.url : ""}</td>
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
                                                <td style={{ width: "10%" }}>姓名</td>
                                                <td style={{ width: "10%" }}>职位</td>
                                                <td style={{ width: "25%" }}>手机号</td>
                                                <td style={{ width: "25%" }}>邮箱</td>
                                                <td style={{ width: "20" }}>备注</td>
                                                <td style={{ width: "10" }}>参与调研</td>
                                            </tr>
                                            {
                                                this.state.companyDetail.user_list.map((value) => (
                                                    <tr>
                                                        <td>{value.real_name}</td>
                                                        <td>{value.job_name}</td>
                                                        <td>{value.username}</td>
                                                        <td>{value.email}</td>
                                                        <td>{value.remark}</td>
                                                        <td>{value.remark}</td>
                                                    </tr>
                                                ))
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
                                                    <pre style={{ border: "0 none", padding: "10px", lineHeight: "20px" }} dangerouslySetInnerHTML={{ __html: this.state.companyDetail.content }} >

                                                    </pre>
                                                </td>
                                            </tr>
                                        </table>
                                        <div style={{ float: "left", width: "100%" }}>
                                            <ul>
                                                {
                                                    this.state.companyDetail.appendixs.map((value,idx) => {
                                                        let item = {};
                                                        let img = new Image();
                                                        img.src = value.path;
                                                        img.onload = function (argument) {
                                                            item.w = this.width;
                                                            item.h = this.height;
                                                        }
                                                        arrSize.push(item);
                                                        return(
                                                            <li style={{ width: "1.5rem", height: "1.5rem",padding:"0",margin:"5px" }}>
                                                                <img onClick={() => {this.onTouchImg(idx);}} src={value.path} style={{ width: "100%",height:"100%" }} />
                                                            </li>
                                                        )
                                                    }) 
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
                                                this.state.companyDetail.plan_list.reverse().map((value) => (
                                                    <tr>
                                                        <td style={{ borderLeft: "0 none" }}>{value.seq}</td>
                                                        <td>{value.content}</td>
                                                        <td>{value.name}</td>
                                                        <td>{value.exp_time.split(" ")[0]}</td>
                                                    </tr>
                                                ))
                                            }
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="signatureTxt">
                                        <div className="suggess" style={{height:"auto",minHeight:"2.6rem"}}>
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
                                                <textarea className="suggessMsg" style={{height:"2rem"}} readOnly value={this.state.companyDetail.suggestion}></textarea>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </form>
                <PhotoSwipeItem />
            </div>
        )
    }
}

