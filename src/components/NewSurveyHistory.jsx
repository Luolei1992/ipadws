import React from 'react';
import { hashHistory, Link } from "react-router";
import { Modal, ImagePicker, Toast, TextareaItem } from 'antd-mobile';
import { div2png, readyDo, TableHeadServey, init, GetLocationParam } from './templates';
import { DrawBoard } from './drawBoard';

import PhotoSwipeItem from './photoSwipeElement.jsx';
import '../js/photoswipe/photoswipe.css';
import '../js/photoswipe/default-skin/default-skin.css';
import PhotoSwipe from '../js/photoswipe/photoswipe.min.js';
import PhotoSwipeUI_Default from '../js/photoswipe/photoswipe-ui-default.min.js';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
    upload: require('../images/upload.png'),
}
let canvas;
let drawBoard;
let numPlus = 0;
let fileNum = 0;
let uploadFiles = 0;
let arrIds = [];
let interval = [];
let timeout = [];
let size = [];
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
export default class NewSurveyHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company: "",
            id: "",
            job: "",
            name: "",
            phone: "",
            email: "",
            remark: "",
            baseId: "",
            radio: "否",
            researchResult: "",
            hasError1: false,
            hasError2: false,
            title: "",
            meetingTime: '',
            meetingAddress: '',
            companyName: '',
            companyAddress: '',
            order: '',
            things: '',
            duty: '',
            finishTime: '',
            txt: "",
            files: [],
            isShow: "block",
            ids: [],
            modal1: false,
            modal2: false,
            modal3: false,
            modal4: false,
            modal5: false,
            personLink: [],
            orderList: [],
            impress: [true, false, false, false],
            suggest: "",
            choose: '',
            score: 3,
            companyList: {
                item_list: []
            },
            company_name: "",
            company_address: "",
            company_url: "",
            company_start_time: "",
            company_referee_name: "",
            question: false,
            which: "-1",
            radio1:[true,false]
        },
            this.handleResearchAdd = (res) => {
                console.log(res);
                if (res.success) {
                    this.setState({
                        id: res.message.id
                    })
                } else {
                    Toast.info("请填写公司名称", 2, null, false);
                    // if (res.message == '公司id不能为空'){
                    //     // Toast.info("请先选择公司", 2, null, false);
                    //     alert("请先选择公司名称");
                    // }
                }
            },
            this.handleBackPicSrc = (res) => {
                console.log(res);
                let tmpArrIds = this.state.ids;
                tmpArrIds.push(res.data.id);
                this.setState({
                    ids: tmpArrIds
                })
            },
            this.handleSrc = (res) => {
                console.log(res);
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
            }
    }

    componentDidMount() {
        this.props.router.setRouteLeaveHook(
            this.props.route,
            this.routerWillLeave
        )
        init('allBox');
        init('suggest');
        readyDo(this.alerts);
        canvas = document.getElementById("canvas");
        drawBoard = new DrawBoard(canvas);  // 初始化
        // let head = document.getElementsByClassName("tableHead")[0];
        // let mainWrap = document.getElementById("mainWrap");
        // head.style.position = "fixed";
        // mainWrap.style.marginTop = '1.3rem';
        // setTimeout(() => {
        //     let delAnimate = document.querySelector("delAnimate");
        //     delAnimate.classList.remove('animatePageY');
        // }, 1000);
    }
    routerWillLeave(nextLocation) {
        // let mainWrap = document.getElementById("mainWrap");
        // mainWrap.style.marginTop = '1.3rem';
        // let head = document.getElementsByClassName("tableHead")[0];
        // head.style.position = "fixed";
        for (let i = 0; i < interval.length; i++) {
            clearInterval(interval[i]);
        }
    }
    addResearch = () => {
        runPromise('add_project_ex', {
            "gd_company_id": this.state.baseId, //公司id
            "suggestion": this.state.suggest,
            "type": 3,
            "score": this.state.score,
            "content": this.state.researchResult,
            "file_Path": "",
            "file_path_title": "",
            "appendix": this.state.ids.join("_"),
            "linkers": this.state.personLink,
            "plans": this.state.orderList,
            "id": this.state.id,  //项目id
            "company_name": this.state.company_name,
            "company_address": this.state.company_address,
            "company_url": this.state.company_url,
            "company_start_time": this.state.company_start_time,
            "company_referee_name": this.state.company_referee_name
        }, this.handleResearchAdd, true, "post");
    }
    handleDetailsGet = (res) => {
        if (this.state.company_name == "") {
            Toast.info("请输入公司名称", 2, null, false);
        }
        // else if (this.state.company_address == "") {
        //     Toast.info("请输入公司地址", 2, null, false);
        // }else if(this.state.company_url == ""){
        //     Toast.info("请输入公司网址", 2, null, false);
        // }else if(this.state.company_start_time == ""){
        //     Toast.info("请输入公司成立时间", 2, null, false);
        // }
        else {
            this.setState({
                meetingTime: this.state.company_start_time,
                meetingAddress: this.state.company_address,
                companyAddress: this.state.company_url,
                company: this.state.company_name
            });
            interval.push(setInterval(() => {
                this.addResearch();
            }, 30000));
            this.onClose('modal4')();
        };
    }
    clearAll = () => {
        drawBoard.clear();
    }
    cancelLast = () => {
        drawBoard.cancel();
    }
    alerts = (a) => {
        if (this.state.id) {
            runPromise('sign_up_document', {
                action_type: "project",
                action_id: this.state.id,
                signed_file_path: a
            }, this.saveProject, true, "post");
        }
    }
    save = (e) => {
        drawBoard.save('only-draw', (url) => {
            if (!url) {
                alert("请先签字后再保存");
                return;
            } else {
                console.log(url);
                runPromise('upload_image_byw_upy2', {
                    "arr": url
                }, this.handleSrc, false, "post");
            }
        });
    }
    showModal = key => (e, flg, index) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        }, () => {
            if(flg){
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
                    document.querySelector(".am-modal-wrap").style.marginTop = "-150px";
                }, false);
                iptList[a].addEventListener("blur", () => {
                    document.querySelector(".am-modal-wrap").style.marginTop = "0";
                }, false);
            }
        }, 500);
    }
    delPlanLis(idx) {
        console.log(idx);
        this.state.orderList.splice(idx, 1);
        this.setState({
            orderList: this.state.orderList
        })
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
            this.setState({ orderList:aa});
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
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
        // let propmtTouchBox = document.querySelector(".am-modal-wrap .am-modal");
        // propmtTouchBox.removeEventListener("touchmove", this.touchBlur, false);
        // for(let i = 0;i<timeout.length;i++){
        //     clearTimeout(timeout[i]);
        // }
    }
    onChangeOrder(e) {
        this.setState({
            order: e.currentTarget.value
        });
    }
    addPersonLink() {     //添加联系人
        let tmp = {
            job_name: this.state.job,
            name: this.state.name,
            mobile: this.state.phone,
            email: this.state.email,
            remark: this.state.remark,
            is_in_survey: this.state.radio == "是"?1:0
        }
        if (this.state.name == "") {
            Toast.info('请输入姓名', .8);
        } else if (this.state.phone == "") {
            Toast.info('请输入手机号', .8);
        } else if (this.state.hasError1) {
            Toast.info('请输入正确的手机号', .8);
        } else if (this.state.hasError2) {
            Toast.info('请输入正确的邮箱', .8);
        } else {
            this.onClose('modal1')();
            this.state.personLink.push(tmp);
            this.setState({
                job: "",
                name: "",
                phone: "",
                email: "",
                remark: "",
                radio: "否"
            })
        };
    }

    changeCheckState(e, idx) {
        let impress = [false, false, false, false];
        console.log(e.currentTarget.checked);
        impress[idx] = true;
        this.setState({
            impress: impress,
            choose: idx,
            score: idx == 0 ? 3 : idx == 1 ? 2 : idx == 2 ? 1 : 0
        })
    }
    // onChangeFiles=(e)=>{
    //     var reader = new FileReader();
    //     reader.readAsDataURL(e.target.files[0]); // 读出 base64
    //     reader.onloadend = () => {
    //         // 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
    //         var dataURL = reader.result;
    //         // 下面逻辑处理
    //         ++uploadFiles;
    //         let a = document.getElementById("upload" + uploadFiles);
    //         a.src=dataURL;
    //         runPromise('upload_image_byw_upy2', {
    //             "arr": dataURL
    //         }, this.handleBackPicSrc, false, "post");
    //         // if(uploadFiles.length < 5) {
    //         //     this.setState({
    //         //         files: uploadFiles
    //         //     })
    //         // }else{
    //         //     this.setState({
    //         //         isShow:"none"
    //         //     })
    //         // }
    //     };
    // }
    onChange = (files, type, index) => {
        console.log(files, type, index);
        let img = new Image();
        let item = {};
        img.src = files[files.length - 1].url;
        img.onload = function (argument) {
            item.w = this.width;
            item.h = this.height;
        }
        if (type == 'remove') {
            this.state.ids.splice(index, 1);
            this.state.files.splice(index, 1);
            size.splice(index, 1);
            this.setState({
                files,
            });
        } else {
            size.push(item);
            runPromise('upload_image_byw_upy2', {
                "arr": files[files.length - 1].url
            }, this.handleBackPicSrc, false, "post");
            this.setState({
                files,
            });
        }
    };
    loadingToast() {
        Toast.loading('保存中...', 0, () => {
            // alert(4)
        }, true);
    }
    onTouchImg = (index) => {
        let items = [];
        this.state.files.map((value) => {
            let item = {};
            item.w = size[index].w;
            item.h = size[index].h;
            item.src = value.url;
            items.push(item);
        })
        openPhotoSwipe(items, index);
    }
    render() {
        return (
            // <div id="fromHTMLtestdiv" className="visitRecordWrap" onTouchMove={()=>{this.touchBlur();}}>
            <div id="fromHTMLtestdiv" className="visitRecordWrap">
                <TableHeadServey
                    url={urls.wordMsg}
                    isHide={false}
                    tag={<h3 className="fn-left">
                        <span style={{ borderBottom: "3px solid red" }}>新建调研</span>
                        <Link to='/survey?tab=5' style={{ color: "#fff" }}><span>历史调研</span></Link>
                    </h3>}
                ></TableHeadServey>
                {/* <div className="delAnimate animatePageY"> */}
                <button id="downloadPng" onClick={() => {
                    this.loadingToast();
                    this.addResearch();
                    for (let i = 0; i < interval.length; i++) {
                        clearInterval(interval[i]);
                    }
                }}>保存文件</button>
                <div style={{ overflow: "scroll" }}>
                    <div className="recordMain">
                        <h2 style={{ letterSpacing: "1px", marginTop: "0.8rem" }}>{this.state.company}</h2>
                        {/* <h2 style={{letterSpacing:"1px",marginTop:"0.8rem"}}> */}
                        {/* 上海泰宇信息技术有限公司 */}
                        {/* <input type="text" style={{ border: "0 none", borderBottom: "1px solid #ccc" }} autoFocus/> */}
                        {/* </h2> */}
                        {/* <p style={{textAlign:"center"}}> */}
                        {/* 文件编号: 54648566565441 */}
                        {/* <span style={{ padding: "0 15px" }}></span> */}
                        {/* 起止时间: <input type="text"/>
                        <span style={{ padding: "0 15px" }}></span> */}
                        {/* </p> */}
                        <div className="tableDetails">
                            <table className="topTable">
                                <tr>
                                    <td colSpan="4" className="darkbg">客户信息</td>
                                </tr>
                                <tr>
                                    <th className="darkbg">公司名称</th>
                                    <td className="lightbg">
                                        {/* <input 
                                        type="text" 
                                        className="surveyIpt" 
                                        readOnly
                                        value={this.state.companyName} 
                                        onChange={(e) => { this.setState({ companyName:e.currentTarget.value})}} 
                                    /> */}
                                        {this.state.company}
                                        <i onClick={this.showModal('modal4')}
                                            className="iconfont icon-jia"
                                            style={{
                                                float: "right", fontSize: "28px", marginTop: "2px"
                                            }}></i>
                                    </td>
                                    <th className="darkbg">成立时间</th>
                                    <td className="lightbg">
                                        <input
                                            type="text"
                                            className="surveyIpt"
                                            readOnly
                                            value={this.state.meetingTime}
                                            onChange={(e) => { this.setState({ meetingTime: e.currentTarget.value }) }}
                                        /></td>
                                </tr>
                                <Modal
                                    visible={this.state.modal4}
                                    transparent={true}
                                    maskClosable={true}
                                    onClose={this.onClose('modal4')}
                                    className="personalLinkWrap newSurveyCompany"
                                    footer={[
                                        { text: '取消', onPress: () => { this.onClose('modal4')() } },
                                        { text: '确定', onPress: () => { this.handleDetailsGet() } }
                                    ]}
                                >
                                    <div className="personalLink">
                                        <div className="personalLinkList">
                                            <ul>
                                                <li>
                                                    <span>公司名称：</span>
                                                    <input
                                                        type="text"
                                                        value={this.state.company_name}
                                                        onChange={(e) => { this.setState({ company_name: e.currentTarget.value }) }}
                                                    />
                                                </li>
                                                <li>
                                                    <span>公司地址：</span>
                                                    <input
                                                        type="text"
                                                        value={this.state.company_address}
                                                        onChange={(e) => { this.setState({ company_address: e.currentTarget.value }) }}
                                                    />
                                                </li>
                                                <li>
                                                    <span>公司网址：</span>
                                                    <input
                                                        type="text"
                                                        value={this.state.company_url}
                                                        onChange={(e) => { this.setState({ company_url: e.currentTarget.value }) }}
                                                    />
                                                </li>
                                                <li>
                                                    <span>成立时间：</span>
                                                    <input
                                                        type="text"
                                                        value={this.state.company_start_time}
                                                        placeholder="0000-00-00"
                                                        // onFocus={(e)=>{
                                                        //     document.querySelector(".am-modal-wrap").scrollIntoView(true);

                                                        //     // document.querySelector(".am-modal-wrap").style.position="absolute"
                                                        // }}                                                     
                                                        onChange={(e) => { this.setState({ company_start_time: e.currentTarget.value }) }}
                                                    />
                                                </li>
                                                <li>
                                                    <span>推荐人：</span>
                                                    <input
                                                        type="text"
                                                        value={this.state.company_referee_name}
                                                        onChange={(e) => { this.setState({ company_referee_name: e.currentTarget.value }) }}
                                                    />
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </Modal>
                                <tr>
                                    <th className="darkbg">公司地址</th>
                                    <td className="lightbg">
                                        <input
                                            type="text"
                                            className="surveyIpt"
                                            value={this.state.meetingAddress}
                                            readOnly
                                            onChange={(e) => { this.setState({ meetingAddress: e.currentTarget.value }) }}
                                        /></td>
                                    <th className="darkbg">公司网址</th>
                                    <td className="lightbg">
                                        <input
                                            type="text"
                                            className="surveyIpt"
                                            readOnly
                                            value={this.state.companyAddress}
                                            onChange={(e) => { this.setState({ companyAddress: e.currentTarget.value }) }}
                                        /></td>
                                </tr>
                            </table>
                            <table className="sceneTable">
                                <tr>
                                    <td colSpan="4"
                                        className="darkbg newPersonalMsg"
                                    >联系人<span onClick={this.showModal('modal1')}>新增 <i className="iconfont icon-jia"></i></span></td>
                                </tr>
                                <Modal
                                    visible={this.state.modal1}
                                    // maskClosable={true}
                                    transparent={true}
                                    onClose={this.onClose('modal1')}
                                    className="personalLinkWrap addPersonalDetail"
                                    footer={[
                                        { text: '取消', onPress: () => { console.log('cancle'); this.onClose('modal1')() } },
                                        { text: '确定', onPress: () => { this.addPersonLink(); } }
                                    ]}
                                >
                                    <div className="personalLink">
                                        <div className="personalLinkList">
                                            <ul>
                                                <li>
                                                    <span>姓名：</span>
                                                    <input
                                                        type="text"
                                                        value={this.state.name}
                                                        onChange={(e) => {
                                                            this.setState({
                                                                name: e.currentTarget.value
                                                            });
                                                        }}
                                                    />
                                                </li>
                                                <li>
                                                    <span>职位：</span>
                                                    <input
                                                        type="text"
                                                        value={this.state.job}
                                                        onChange={(e) => {
                                                            this.setState({
                                                                job: e.currentTarget.value
                                                            });
                                                        }}
                                                    />
                                                </li>
                                                <li>
                                                    <span>手机：</span>
                                                    <input
                                                        type="number"
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
                                                            });
                                                        }}
                                                        className={this.state.hasError2 ? "txtRed" : ""}
                                                    />
                                                </li>
                                                <li>
                                                    <span>备注：</span>
                                                    <input
                                                        type="text"
                                                        value={this.state.remark}
                                                        onChange={(e) => {
                                                            this.setState({
                                                                remark: e.currentTarget.value
                                                            });
                                                        }}
                                                    />
                                                </li>
                                                <li style={{}}>
                                                    <span style={{ float: "left", marginLeft: "5px" }}>参与调研：</span>
                                                    {/* <input
                                                        type="radio"
                                                        name="radio"
                                                        id="yes"
                                                        style={{ width: "20px", height: "20px", position: "relative", top: "4px", color: "#000" }}
                                                        onChange={(e) => { this.setState({ radio: '否' }) }}
                                                    />  */}
                                                    <div style={{ 
                                                        border: "1px solid #878787", 
                                                        display: "inline-block", 
                                                        width: "22px", 
                                                        height: "22px", 
                                                        borderRadius: "50%",
                                                        textAlign:"center",
                                                        lineHeight:"24px",
                                                        position: "relative",
                                                        top: "4px",
                                                        right: "4px"
                                                    }}>
                                                        <i style={{
                                                                display: "inline-block",
                                                                width: "22px",
                                                                height: "22px",
                                                                border: "5px solid #d6d6d6",
                                                                backgroundColor: this.state.radio1[0] ? "#333" :"#d6d6d6",
                                                                boxSizing: "border-box",
                                                                borderRadius: "50%"
                                                            }}
                                                            onClick={(e)=>{this.setState({radio1:[true,false],radio:"否"})}}
                                                        ></i>
                                                    </div>
                                                    否
                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                    <div style={{
                                                        border: "1px solid #878787",
                                                        display: "inline-block",
                                                        width: "22px",
                                                        height: "22px",
                                                        borderRadius: "50%",
                                                        textAlign: "center",
                                                        lineHeight: "24px",
                                                        position: "relative",
                                                        top: "4px",
                                                        right: "4px"
                                                        }}>
                                                        <i style={{
                                                            display: "inline-block",
                                                            width: "22px",
                                                            height: "22px",
                                                            border: "5px solid #d6d6d6",
                                                            backgroundColor: this.state.radio1[1] ? "#333" : "#d6d6d6",
                                                            boxSizing: "border-box",
                                                            borderRadius: "50%"
                                                        }}
                                                            onClick={(e) => { this.setState({ radio1: [false, true],radio:"是" }) }}
                                                        ></i>
                                                    </div>
                                                    是
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </Modal>
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
                                                this.state.personLink.map((value) => {
                                                    return <tr style={{ borderBottom: "1px solid #CBCBCB" }}>
                                                        <td>{value.name}</td>
                                                        <td>{value.job_name}</td>
                                                        <td>{value.mobile}</td>
                                                        <td>{value.email}</td>
                                                        <td>{value.remark}</td>
                                                        <td>{value.is_in_survey?"是":"否"}</td>
                                                    </tr>
                                                })
                                            }

                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="darkbg">合同内容</td>
                                </tr>
                                <tr style={{ position: "relative" }}>
                                    <td colSpan="4">
                                        <div
                                            className="iconfont icon-iconfontquestion"
                                            style={{
                                                padding: "10px",
                                                fontSize: "22px",
                                                position: "absolute",
                                                right: "0",
                                                marginRight: "1.2rem",
                                                zIndex: "1000"
                                            }}
                                            onClick={() => { this.setState({ question: !this.state.question }) }}
                                        ></div>
                                        <div className="questions" style={{
                                            padding: "0 10px",
                                            position: "absolute",
                                            right: "0",
                                            marginRight: "1.4rem",
                                            marginTop: "0.8rem",
                                            border: "1px solid #ccc",
                                            fontSize: "12px",
                                            borderRadius: "5px",
                                            zIndex: "1000",
                                            display: this.state.question ? "block" : "none"
                                        }}>
                                            <p>现有品牌？</p>
                                            <p>有什么服务，主要客户？</p>
                                            <p>有什么软件产品，主要客户？</p>
                                            <p>有什么硬件产品，主要客户？</p>
                                        </div>
                                        <div style={{ overflow: "hidden" }}>
                                            <textarea className="allBox textareaPub" id="allBox"
                                                onChange={(e) => { this.setState({ researchResult: e.currentTarget.value }) }}
                                            ></textarea>
                                        </div>
                                        <div className="surveyUpload">
                                            <div className="staticUpload" style={{ position: "relative" }}>

                                                {/* <div
                                                    style={{
                                                        height: "2rem",
                                                        width: "2rem",
                                                        position: "absolute",
                                                        bottom: "-14px",
                                                        zIndex: "2",
                                                        display: this.state.isShow
                                                    }}
                                                ><img src={urls.upload} style={{ width: "100%" }} /></div>
                                                <input
                                                    onChange={(e) => { this.onChangeFiles(e) }}
                                                    type="file"
                                                    style={{
                                                        float: "left",
                                                        width: "2rem",
                                                        height: "2rem",
                                                        position: "relative",
                                                        zIndex: "3",
                                                        opacity: "0",
                                                        display: this.state.isShow
                                                    }}
                                                />

                                                <img src="" id="upload1" style={{ width: "2rem", height: "2rem", float: "left", margin: "3px 5px" }} />
                                                <img src="" id="upload2" style={{ width: "2rem", height: "2rem", float: "left", margin: "3px 5px" }} />
                                                <img src="" id="upload3" style={{ width: "2rem", height: "2rem", float: "left", margin: "3px 5px" }} />
                                                <img src="" id="upload4" style={{ width: "2rem", height: "2rem", float: "left", margin: "3px 5px" }} /> */}
                                                <ImagePicker
                                                    files={this.state.files}
                                                    onChange={this.onChange}
                                                    multiple={true}
                                                    onImageClick={(index, fs) => this.onTouchImg(index)}
                                                    selectable={this.state.files.length < 10}
                                                    accept="image/gif,image/jpeg,image/jpg,image/png"
                                                />
                                            </div>
                                            <Modal
                                                visible={this.state.modal5}
                                                // maskClosable={true}
                                                transparent={true}
                                                onClose={this.onClose('modal5')}
                                                className="personalLinkWrap "
                                                footer={[
                                                    { text: '取消', onPress: () => { console.log('cancle'); this.onClose('modal1')() } },
                                                    { text: '确定', onPress: () => { this.addPersonLink(); } }
                                                ]}
                                            >
                                                <div style={{ position: "fixed", width: "100%", height: "100%" }}>
                                                    <img src='' />
                                                </div>
                                            </Modal>
                                            <Modal
                                                visible={this.state.modal3}
                                                transparent={true}
                                                maskClosable={true}
                                                onClose={this.onClose('modal3')}
                                                className="personalLinkWrap"
                                            // footer={[
                                            //     { text: '取消', onPress: () => { this.onClose('modal3')() } },
                                            //     { text: '确定', onPress: () => { this.addPersonLink(); } }
                                            // ]}
                                            >
                                                <div>
                                                    <img src='' />
                                                </div>
                                            </Modal>
                                            <ul className="fileNameList">
                                                {/* <li>haha</li>
                                            <li>haha</li> */}
                                            </ul>
                                        </div>
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
                                    transparent={true}
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
                                    <td colSpan="4" className="signatureTxt" style={{ height: "auto" }}>
                                        <div className="suggess" style={{ height: "auto", paddingTop: "0" }}>
                                            <div className="midDiv">
                                                <span style={{ lineHeight: "46px" }}>总体印象: </span>
                                                <ul>
                                                    <li>
                                                        <input
                                                            type="checkbox"
                                                            id="gloab"
                                                            onClick={(e) => { this.changeCheckState(e, 0); }}
                                                            checked={this.state.impress[0]}
                                                        />
                                                        <label htmlFor="gloab"> 很满意</label>
                                                    </li>
                                                    <li>
                                                        <input
                                                            type="checkbox"
                                                            id="just"
                                                            onClick={(e) => { this.changeCheckState(e, 1); }}
                                                            checked={this.state.impress[1]}
                                                        />
                                                        <label htmlFor="just"> 一般</label>
                                                    </li>
                                                    <li>
                                                        <input
                                                            type="checkbox"
                                                            id="dont"
                                                            onClick={(e) => { this.changeCheckState(e, 2); }}
                                                            checked={this.state.impress[2]}
                                                        />
                                                        <label htmlFor="dont"> 不满意</label>
                                                    </li>
                                                    <li>
                                                        <input
                                                            type="checkbox"
                                                            id="bad"
                                                            onClick={(e) => { this.changeCheckState(e, 3); }}
                                                            checked={this.state.impress[3]}
                                                        />
                                                        <label htmlFor="bad"> 很不满意</label>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="midDivTop">
                                                <span>您的宝贵建议: </span>&nbsp;&nbsp;
                                            {/* <textarea className="suggessMsg"></textarea> */}
                                                <textarea
                                                    className="allBox textareaPub"
                                                    id="suggest"
                                                    style={{ float: "left", width: "80%", padding: "2px 10px" }}
                                                    onChange={(e) => { this.setState({ suggest: e.currentTarget.value }) }}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="signatureTxt" style={{ borderTop: "0 none" }}>
                                        <div className="suggess">
                                            <div className="signature sure" style={{ position: "relative", zIndex: "100" }}>
                                                <span style={{ backgroundColor: "#fff" }}>项目负责人(签字): </span>
                                            </div>
                                            <div className="dataType">
                                                <div className="bt-warn fn-right" style={{ position: "relative", zIndex: "1000" }}>
                                                    <button type="button" onClick={this.clearAll}>重签</button>
                                                    {/* <button type="button" onClick={(e)=>{this.save(e)}}>重签</button> */}
                                                </div>
                                                <div className="date" >
                                                    <span>日期：</span>
                                                    <input type="text" value={validate.getNowFormatDate()} />
                                                </div>
                                            </div>
                                            <canvas id="canvas" width="1536" height="300"></canvas>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <PhotoSwipeItem />
            </div>
        )
    }
}