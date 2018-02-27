import React from 'react';
import { hashHistory,Link } from "react-router";
import { Modal, ImagePicker,Toast } from 'antd-mobile';
import { div2png, readyDo, TableHeads, init} from './templates';
import { DrawBoard } from './drawBoard';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
}
let canvas;
let drawBoard;
export default class NewSurveyHistory extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            company: "",
            job: "",
            name: "",
            phone: "",
            email: "",
            remark: "",
            hasError1: false,
            hasError2: false,
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
            modal1:false,
            modal2:false,
            modal3:false,
            personLink: [],
            orderList:[],
            impress:[false,false,false,false],
            choose:''
        }
    }

    componentDidMount () {
        init('allBox');
        init('suggest');
        readyDo();
        canvas = document.getElementById("canvas");
        drawBoard = new DrawBoard(canvas);  // 初始化
    }
    clearAll = function () {
        drawBoard.clear();
    }
    cancelLast = function () {
        drawBoard.cancel();
    }
    save = (e) => {
        drawBoard.save('only-draw', function (url) {
            if (!url) {
                alert("请先签字后再保存");
                return;
            } else {
                console.log(url);
                // let a = document.getElementById("canvasPic");
                // let b = document.getElementById("canvasWrap");
                // b.style.display = "block";
                // a.src = url;
            }
        });
        // console.log(e.currentTarget.scrollTop);
    }
    showModal = key => (e, id) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    onChangeFile = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
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
    onChangeCompany(e) {
        this.setState({
            company: e.currentTarget.value
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
    onChangeCompanyName(e) {
        this.setState({
            meetingTime: e.currentTarget.value
        });
    }
    onChangeMeetingAddress(e){
        this.setState({
            meetingAddress: e.currentTarget.value
        });
    }
    onChangeCompanys(e) {
        this.setState({
            companyName: e.currentTarget.value
        });
    }
    onChangeCompanyAddress(e){
        this.setState({
            companyAddress: e.currentTarget.value
        });
    }
    addPersonLink(){     //添加联系人
        let tmp = {
            company: this.state.company,
            job: this.state.job,
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            remark: this.state.remark,
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
                company: "",
                job: "",
                name: "",
                phone: "",
                email: "",
                remark: "",
            })
        };
    }
    addOrderMsg(){       //下一任行动和计划
        let lis = {
            order:this.state.order,
            things:this.state.things,
            duty:this.state.duty,
            finishTime:this.state.finishTime
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
            choose:idx
        })
    }
    render(){
        const { files } = this.state;
        return (
            <div id="fromHTMLtestdiv">
                <form className="visitRecordWrap">
                    <TableHeads 
                        url={urls.wordMsg} 
                        isHide={false} 
                        tag={<h3 className="fn-left">
                            <span style={{ borderBottom:"3px solid red"}}>新建调研</span>
                            <Link to='/survey?tab=5' style={{color:"#fff"}}><span>历史调研</span></Link>
                        </h3>}
                    ></TableHeads>
                    <button id="btnGenerate">下载图片</button>
                    <a id="downloadPng"></a><input id="filename" style={{ display: "none" }} />
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
                        <h2 style={{letterSpacing:"1px",marginTop:"0.8rem"}}>上海泰宇信息技术有限公司</h2>
                        <p style={{textAlign:"center"}}>
                            文件编号: 54648566565441
                            <span style={{ padding: "0 15px" }}></span>
                            {/* 起止时间: <input type="text"/>
                            <span style={{ padding: "0 15px" }}></span> */}
                        </p>
                        <div className="tableDetails">
                            <table className="topTable">
                                <tr>
                                    <td colSpan="4" className="darkbg">客户信息</td>
                                </tr>
                                <tr>
                                    <th className="darkbg">公司名称</th>
                                    <td className="lightbg">
                                        <input 
                                            type="text" 
                                            className="surveyIpt" 
                                            value={this.state.meetingTime} 
                                            onChange={(e)=>{this.onChangeCompanyName(e)}} 
                                        /></td>
                                    <th className="darkbg">成立时间</th>
                                    <td className="lightbg">
                                        <input 
                                        type="text" 
                                        className="surveyIpt" 
                                        value={this.state.meetingAddress}
                                        onChange={(e) => { this.onChangeMeetingAddress(e) }}                                         
                                    /></td>
                                </tr>
                                <tr>
                                    <th className="darkbg">公司地址</th>
                                    <td className="lightbg">
                                        <input 
                                        type="text" 
                                        className="surveyIpt" 
                                        value={this.state.companyName} 
                                        onChange={(e) => { this.onChangeCompanys(e) }} 
                                    /></td>
                                    <th className="darkbg">公司网址</th>
                                    <td className="lightbg">
                                        <input 
                                        type="text" 
                                        className="surveyIpt" 
                                        value={this.state.companyAddress} 
                                            onChange={(e) => { this.onChangeCompanyAddress(e) }}                                         
                                    /></td>
                                </tr>
                            </table>
                            <table className="sceneTable">
                                <tr>
                                    <td 
                                        colSpan="4" 
                                        className="darkbg newPersonalMsg"
                                    >联系人<span onClick={this.showModal('modal1')}>新增  <i className="iconfont icon-jia"></i></span></td>
                                </tr>
                                <Modal
                                    visible={this.state.modal1}
                                    transparent
                                    maskClosable={true}
                                    onClose={this.onClose('modal1')}
                                    className="personalLinkWrap"
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
                                            </ul>
                                        </div>
                                    </div>
                                </Modal>
                                <tr>
                                    <td colSpan="4">
                                        <table className="personalMsg">
                                            <tr style={{borderBottom:"1px solid #ccc"}}>
                                                <td>姓名</td>
                                                <td>职位</td>
                                                <td>手机号</td>
                                                <td>邮箱</td>
                                                <td>备注</td>
                                            </tr>
                                            
                                            {
                                                this.state.personLink.map((value) => { 
                                                    return <tr style={{ borderBottom:"1px solid #CBCBCB"}}>
                                                        <td style={{width:"10%"}}>{value.name}</td>
                                                        <td style={{ width: "10%"}}>{value.job}</td>
                                                        <td style={{ width: "20%"}}>{value.phone}</td>
                                                        <td style={{ width: "20%"}}>{value.email}</td>
                                                        <td style={{ width: "40%"}}>{value.remark}</td>
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
                                        <div style={{overflow:"hidden"}}>
                                            <textarea className="allBox textareaPub" id="allBox"></textarea>
                                        </div>
                                        <div className="surveyUpload">
                                            <div className="staticUpload">
                                                <ImagePicker
                                                    files={files}
                                                    onChange={this.onChangeFile}
                                                    multiple={false}
                                                    onImageClick={(index, fs) => console.log(index, fs[0])}
                                                    selectable={files.length < 6}
                                                    accept="image/gif,image/jpeg,image/jpg,image/png"
                                                />
                                            </div>
                                            <Modal
                                                visible={this.state.modal3}
                                                transparent
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
                                    transparent
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
                                                <li style={{display:"none"}}>
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
                                                <td style={{borderTop:"0 none",borderLeft:"0 none"}}>序号</td>
                                                <td style={{borderTop:"0 none"}}>事项</td>
                                                <td style={{borderTop:"0 none"}}>责任人</td>
                                                <td style={{borderTop:"0 none",borderRight:"0 none"}}>完成时间</td>
                                            </tr>
                                            {
                                                this.state.orderList.map((value,idx) => { 
                                                    return <tr>
                                                        <td style={{borderLeft:"0 none"}}>{idx+1}</td>
                                                        <td>{value.things}</td>
                                                        <td>{value.duty}</td>
                                                        <td>{value.finishTime}</td>
                                                    </tr>
                                                })
                                            }
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="signatureTxt" style={{ height: "auto" }}>
                                        <div className="suggess" style={{height:"auto",paddingTop:"0"}}>
                                            <div className="midDiv">
                                                <span style={{ lineHeight: "46px" }}>总体印象: </span>
                                                <ul>
                                                    <li>
                                                        <input 
                                                            type="checkbox" 
                                                            id="gloab" 
                                                            onClick={(e) => { this.changeCheckState(e,0);}} 
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
                                            <div className="midDivTop" style={{marginTop:"10px"}}>
                                                <span>您的宝贵建议: </span>&nbsp;&nbsp;
                                                {/* <textarea className="suggessMsg"></textarea> */}
                                                <textarea 
                                                    className="allBox textareaPub" 
                                                    id="suggest" 
                                                    style={{float:"left",width:"80%",padding:"2px 10px"}}
                                                >{this.state.suggess}</textarea>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="signatureTxt" style={{borderTop:"0 none"}}>
                                        <div className="suggess">
                                            <div className="signature sure" style={{ position: "relative", zIndex: "100" }}>
                                                <span style={{ backgroundColor: "#fff" }}>项目负责人(签字): </span>
                                            </div>
                                            <div className="dataType">
                                                <div className="bt-warn fn-right" style={{ position: "relative", zIndex: "1000" }}>
                                                    {/* <button type="button" onClick={this.clearAll}>重签</button> */}
                                                    <button type="button" onClick={(e)=>{this.save(e)}}>重签</button>
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
                                            <canvas id="canvas" width="1536" height="300"></canvas>                                            
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}