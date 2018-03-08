import React from 'react';
import { hashHistory,Link } from "react-router";
import { Modal, ImagePicker, Toast } from 'antd-mobile';
import { div2png, readyDo, TableHeads, init, GetLocationParam } from './templates';
import { DrawBoard } from './drawBoard';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
    upload: require('../images/upload.png'),
}
let canvas;
let drawBoard;
let numPlus=0;
let fileNum = 0;
let uploadFiles=0;
let arrIds = [];
let interval;
let timeout = [];
export default class NewSurveyHistory extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            company: "",
            id:"",
            job: "",
            name: "",
            phone: "",
            email: "",
            remark: "",
            baseId:"",
            radio:"否",
            researchResult:"",
            hasError1: false,
            hasError2: false,
            title:"",
            meetingTime:'',
            meetingAddress:'',
            companyName:'',
            companyAddress:'',
            order:'',
            things:'',
            duty:'',
            finishTime:'',
            txt: "",
            files: [],
            isShow:"block",
            ids:[],
            modal1:false,
            modal2:false,
            modal3:false,
            modal4:true,
            personLink: [],
            orderList:[],
            impress:[true,false,false,false],
            suggest:"",
            choose:'',
            score:3,
            companyList:{
                item_list:[]
            }
        },
        this.handleResearchAdd=(res)=>{
            console.log(res);
            if(res.success) {
                this.setState({
                    id: res.message.id
                })
            }else{
                // if (res.message == '公司id不能为空'){
                //     // Toast.info("请先选择公司", 2, null, false);
                //     alert("请先选择公司名称");
                // }
            }
        },
        this.handleBackPicSrc=(res)=>{
            console.log(res);
            let tmpArrIds = this.state.ids;
            tmpArrIds.push(res.data.id);
            this.setState({
                ids: tmpArrIds
            })
        },
        this.handleSrc=(res)=>{
            console.log(res);
        },
        this.handleCompanyListGet=(res)=>{
            console.log(res);
            this.setState({
                companyList:res.data
            })
        },
        this.handleDetailsGet=(res)=>{
            console.log(res);
            this.setState({
                meetingTime:res.data.start_time.split(" ")[0],
                meetingAddress: res.data.address,
                companyAddress:res.data.url,
                baseId:res.data.id
            })
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

    componentDidMount () {
        this.props.router.setRouteLeaveHook(
            this.props.route,
            this.routerWillLeave
        )
        init('allBox');
        init('suggest');
        readyDo(this.alerts);
        canvas = document.getElementById("canvas");
        drawBoard = new DrawBoard(canvas);  // 初始化
        interval=setInterval(() => {
            this.addResearch();
        }, 30000);
        runPromise('get_company_list',{
            offset:"0",
            limit:"20"
        },this.handleCompanyListGet,true,"post");
        let head = document.getElementsByClassName("tableHead")[0];
        let mainWrap = document.getElementById("mainWrap");
        head.style.position = "static";
        mainWrap.style.marginTop = '0';
    }
    touchBlur() {
        var iptList = document.getElementsByTagName("input");
        var txtList = document.getElementsByTagName("textarea");
        for (var a = 0; a < iptList.length; a++) {
            iptList[a].blur();
        }
    }
    routerWillLeave(nextLocation) {
        clearInterval(interval);
    }
    addResearch=()=>{
        runPromise('add_project_ex', {
            "gd_company_id": this.state.baseId,
            "suggest":this.state.suggest,  
            "type":3,
            "score":this.state.score,
            "content":this.state.researchResult,
            "file_Path":"",
            "file_path_title":"",
            "appendix":this.state.ids.join("_"),
            "linkers":this.state.personLink,
            "plans":this.state.orderList,
            "id":this.state.id
        }, this.handleResearchAdd, true, "post");
    }
    getCompanyDetails=(id)=>{
        runPromise('get_company_info', {
            "gd_company_id":id
        }, this.handleDetailsGet, true, "post");
    }
    clearAll = function () {
        drawBoard.clear();
    }
    cancelLast = function () {
        drawBoard.cancel();
    }
    alerts = (a) =>{
        runPromise('sign_up_document',{
            action_type:"project",
            action_id:this.state.id,
            signed_file_path:a
        },this.saveProject,true,"post");
    }
    save = (e) => {
        drawBoard.save('only-draw',  (url)=> {
            if (!url) {
                alert("请先签字后再保存");
                return;
            } else {
                console.log(url);
                runPromise('upload_image_byw_upy2', {
                    "arr":url
                }, this.handleSrc, false, "post");
            }
        });
        // console.log(e.currentTarget.scrollTop);
    }
    showModal = key => (e, id) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
        timeout.push(
            setTimeout(() => {
                // let iptList = document.getElementsByTagName("input");
                // for (var a = 0; a < iptList.length; a++) {
                //     iptList[a].blur();
                // }
                let propmtTouchBox = document.querySelector(".am-modal-wrap");
                propmtTouchBox.addEventListener("touchmove", this.touchBlur, false);
            }, 500)
        );
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
        let propmtTouchBox = document.querySelector(".am-modal-wrap .am-modal");
        propmtTouchBox.removeEventListener("touchmove", this.touchBlur, false);
        for(let i = 0;i<timeout.length;i++){
            clearTimeout(timeout[i]);
        }
    }
    changeStyle = ()=>{
        let head = document.getElementsByClassName("tableHead")[0];
        let mainWrap = document.getElementById("mainWrap");
        head.style.position="static";
        mainWrap.style.marginTop='0';
    }
    touchBlur=()=>{
        let iptList = document.getElementsByTagName("input");
        let txtList = document.getElementsByTagName("textarea");
        for (let a = 0; a < iptList.length; a++) {
            iptList[a].blur();
        }
        for (let b = 0; b < txtList.length; b++) {
            txtList[b].blur();
        }
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
    onChangeOrder(e) {
        this.setState({
            order: e.currentTarget.value
        });
    }
    onChangeThings(e) {
        this.setState({
            things: e.currentTarget.value
        });
    }
    onChangeDuty(e) {
        this.setState({
            duty: e.currentTarget.value
        });
    }
    onChangeFinish(e) {
        this.setState({
            finishTime: e.currentTarget.value
        });
    }
   
    addPersonLink(){     //添加联系人
        let tmp = {
            job_name: this.state.job,
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            remark: this.state.remark,
            is_in_survey:this.state.radio
        }
        if(this.state.name == ""){
            Toast.info('请输入姓名',.8);
        } else if(this.state.phone == ""){
            Toast.info('请输入手机号',.8);
        } else if(this.state.hasError1){
            Toast.info('请输入正确的手机号',.8);
        }else if(this.state.hasError2){
            Toast.info('请输入正确的邮箱',.8);
        }else{
            this.onClose('modal1')();
            this.state.personLink.push(tmp);
            this.setState( {
                job: "",
                name: "",
                phone: "",
                email: "",
                remark: "",
                radio:"否"
            })
        };
    }
    addOrderMsg(){       //下一任行动和计划
        ++numPlus;
        let lis = {
            seq: numPlus,
            content:this.state.things,
            name:this.state.duty,
            exp_time:this.state.finishTime
        }
        if (this.state.things == ""){
            Toast.info('请填写事项！', .8);
        }else if(this.state.duty == ""){
            Toast.info('请填写责任人！', .8);
        }else if(this.state.finishTime == ""){
            Toast.info('请填写完成时间！', .8);
        } else {
            this.onClose('modal2')();
            this.state.orderList.push(lis); 
            this.setState({
                order: "",
                things: "",
                duty: "",
                finishTime: ""
            })
        }
    }
    changeCheckState(e,idx){
        let impress = [false, false, false, false];
        console.log(e.currentTarget.checked);
        impress[idx] = true;
        this.setState({
            impress: impress,
            choose:idx,
            score:idx==0?3:idx==1?2:idx==2?1:0
        })
    }
    onChangeFiles=(e)=>{
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]); // 读出 base64
        reader.onloadend = () => {
            // 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
            var dataURL = reader.result;
            // 下面逻辑处理
            ++uploadFiles;
            let a = document.getElementById("upload" + uploadFiles);
            a.src=dataURL;
            runPromise('upload_image_byw_upy2', {
                "arr": dataURL
            }, this.handleBackPicSrc, false, "post");
            // if(uploadFiles.length < 5) {
            //     this.setState({
            //         files: uploadFiles
            //     })
            // }else{
            //     this.setState({
            //         isShow:"none"
            //     })
            // }
        };
    }
    loadingToast() {
        Toast.loading('保存中...', 0, () => {
            // alert(4)
        }, true);
    }
    render(){
        return (
            <div id="fromHTMLtestdiv" className="visitRecordWrap" onTouchMove={()=>{this.touchBlur();}}>
                <TableHeads 
                    url={urls.wordMsg} 
                    isHide={false} 
                    tag={<h3 className="fn-left">
                        <span style={{ borderBottom:"3px solid red"}}>新建调研</span>
                        <Link to='/survey?tab=5' style={{color:"#fff"}}><span>历史调研</span></Link>
                    </h3>}
                ></TableHeads>
                <div style={{overflow:"scroll"}}>
                    <button id="downloadPng" onClick={() => { this.loadingToast(); this.addResearch(); clearInterval(interval) }}>下载图片</button>
                    {/* <a id="downloadPng"></a><input id="filename" style={{ display: "none" }} /> */}
                    {/* <div id="canvasWrap" style={{ 
                    backgroundColor: "#f5f5f5",
                    zIndex:"1000", 
                    position: "fixed", 
                    display: "none", 
                    width: "100%", 
                    height: "100%" 
                }}><img src='' id="canvasPic"/></div> */}
                    {/* <button id="download">下载PDF</button> */}

                    <div className="recordMain">
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
                                        <i onClick={this.showModal('modal4')} className="iconfont icon-jia" style={{ float: "right", fontSize: "28px", marginTop: "2px" }}></i>
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
                                    className="personalLinkWrap"
                                >
                                    <div className="personalLink" style={{ color: "#333" }}>
                                        <h4 style={{ fontSize: "22px", marginBottom: "8px" }}>选择公司名称</h4>
                                        <ul>
                                            {
                                                this.state.companyList.item_list.map((value) => (
                                                    <li style={{
                                                        borderBottom: "1px solid #ccc",
                                                        height: "0.6rem",
                                                        lineHeight: "0.6rem"
                                                    }}
                                                    onClick={(e) => {
                                                        this.setState({
                                                            company: e.currentTarget.innerHTML,
                                                            baseId: value.id
                                                        });
                                                        this.onClose('modal4')();
                                                        this.getCompanyDetails(value.id);
                                                    }}
                                                    >{value.company_name}</li>
                                                ))
                                            }
                                        </ul>
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
                                    >联系人<span onClick={this.showModal('modal1')}>新增  <i className="iconfont icon-jia"></i></span></td>
                                </tr>
                                <Modal
                                    visible={this.state.modal1}
                                    // maskClosable={true}
                                    transparent={true}
                                    onClose={this.onClose('modal1')}
                                    className="personalLinkWrap "
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
                                                <li style={{}}>
                                                    <span style={{ float: "left", marginLeft: "5px" }}>参与调研：</span>
                                                    <input
                                                        type="radio"
                                                        name="radio"
                                                        style={{ width: "16px", height: "16px", position: "relative", top: "2px" }}
                                                        onChange={(e) => { this.setState({ radio: '否' }) }}
                                                    /> 否
                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                <input
                                                        type="radio"
                                                        name="radio"
                                                        style={{ width: "16px", height: "16px", position: "relative", top: "2px" }}
                                                        onChange={(e) => { this.setState({ radio: '是' }) }}
                                                    /> 是
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
                                                        <td>{value.phone}</td>
                                                        <td>{value.email}</td>
                                                        <td>{value.remark}</td>
                                                        <td>{value.is_in_survey}</td>
                                                    </tr>
                                                })
                                            }

                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="darkbg">合同内容</td>
                                </tr>
                                <tr >
                                    <td colSpan="4">
                                        <div style={{ overflow: "hidden" }}>
                                            <textarea className="allBox textareaPub" id="allBox"
                                                onChange={(e) => { this.setState({ researchResult: e.currentTarget.value }) }}
                                            ></textarea>
                                        </div>
                                        <div className="surveyUpload">
                                            <div className="staticUpload" style={{ position: "relative" }}>
                                                {/* <ImagePicker
                                                files={files}
                                                onChange={this.onChangeFile}
                                                multiple={false}
                                                onImageClick={(index, fs) => console.log(index, fs[0])}
                                                selectable={files.length < 6}
                                                accept="image/gif,image/jpeg,image/jpg,image/png"
                                            /> */}
                                                <div
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
                                                <img src="" id="upload4" style={{ width: "2rem", height: "2rem", float: "left", margin: "3px 5px" }} />
                                            </div>
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
                                        下一步计划和行动<span onClick={this.showModal('modal2')}>新增 <i className="iconfont icon-jia"></i></span>
                                    </td>
                                </tr>
                                <Modal
                                    visible={this.state.modal2}
                                    transparent={true}
                                    maskClosable={true}
                                    onClose={this.onClose('modal2')}
                                    className="personalLinkWrap"
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
                                                <li>
                                                    <span>事 项</span>
                                                    <input
                                                        type="text"
                                                        value={this.state.things}
                                                        onChange={(e) => { this.onChangeThings(e) }}
                                                    />
                                                </li>
                                                <li>
                                                    <span>责任人</span>
                                                    <input
                                                        type="text"
                                                        value={this.state.duty}
                                                        onChange={(e) => { this.onChangeDuty(e) }}
                                                    />
                                                </li>
                                                <li>
                                                    <span>完成时间</span>
                                                    <input
                                                        type="text"
                                                        placeholder="0000-00-00"
                                                        value={this.state.finishTime}
                                                        onChange={(e) => { this.onChangeFinish(e) }}
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
                                                <td style={{ borderTop: "0 none", borderRight: "0 none" }}>完成时间</td>
                                            </tr>
                                            {
                                                this.state.orderList.map((value, idx) => {
                                                    return <tr>
                                                        <td style={{ borderLeft: "0 none" }}>{idx + 1}</td>
                                                        <td>{value.content}</td>
                                                        <td>{value.name}</td>
                                                        <td>{value.exp_time}</td>
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
                                                    <ul>
                                                        <li>
                                                            {/* <span>年</span> */}
                                                        </li>
                                                        <li>
                                                            {/* <span>月</span> */}
                                                        </li>
                                                        <li>
                                                            {/* <span>日</span> */}
                                                        </li>
                                                    </ul>
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
                
            </div>
        )
    }
}