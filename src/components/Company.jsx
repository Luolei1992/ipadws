import React from 'react';
import { hashHistory } from "react-router";
import { div2png, readyDo, TableHeads, init, GetLocationParam } from './templates';
import { DrawBoard } from './drawBoard';
import { Modal,Toast } from 'antd-mobile';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
    addPic1: require('../images/addPic.png'),
    addPic2: require('../images/addPic.png'),
    addPic3: require('../images/addPic.png'),
}
let canvas;
let drawBoard;
export default class Company extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flags: [],
            companyDetail : {
                user_list:[],
                company_info:{
                    start_time:""
                },
                plan_list:[],
                appendixs:[]
            }
        },
        this.handleProjectGet = (res) => {
            if(res.success) {
                this.setState({
                    companyDetail : res.data.length == 0?this.state.companyDetail:res.data
                })
            }else{
                Toast.info(res.message, 2, null, false);
            }
        }
    }

    componentDidMount() {
        this.props.state = [true, false, false, false, false, false];
        runPromise('get_project_info', {
            "gd_project_id": validate.getCookie('project_id')
        }, this.handleProjectGet, true, "post");
    }
    render() {
        let tempDate = this.state.companyDetail;
        let starttime = (tempDate.start_time + '').split(" ")[0];
        let endtime = (tempDate.end_time + '').split(" ")[0];
        return (
            <div className="visitRecordWrap" id="fromHTMLtestdiv">
                <TableHeads
                    url={urls.wordMsg}
                    isHide={false}
                    tag={<h3 className="fn-left">我的客户</h3>}
                ></TableHeads>
                <div className="recordMain">
                    <h2 style={{ letterSpacing: "1px", marginTop: "0.8rem" }}>{validate.getCookie("company_name")}</h2>
                    <p style={{ textAlign: "center" }}>
                        文件编号: {tempDate.document_id}  <span style={{ padding: "0 15px" }}></span>
                        起止时间: {starttime == 'undefined' ? "0000-00-00" : starttime} 至 {(endtime == 'undefined' ? "0000-00-00" : endtime)}<span style={{ padding: "0 15px" }}></span>
                    </p>
                    <div className="tableDetails">
                        <table className="topTable">
                            <tr>
                                <td colSpan="4" className="darkbg">客户信息</td>
                            </tr>
                            <tr>
                                <th className="darkbg">公司名称</th>
                                {/* <td><textarea id="textarea1" className="textareaCompany"></textarea></td> */}
                                {/* <td className="lightbg" onClick={() => Modal.prompt('defaultValue', 'defaultValue for prompt', [
                                    { text: 'Cancel' },
                                    { text: 'Submit', onPress: value => console.log(`输入的内容:${value}`) },
                                ], 'default', '100')}></td> */}
                                <td className="lightbg">{tempDate.company_info.company_name}</td>
                                <th className="darkbg">成立时间</th>
                                {/* <td><textarea id="textarea2" className="textareaCompany"></textarea></td> */}
                                <td className="lightbg">{tempDate.company_info.start_time.split(" ")[0]}</td>
                            </tr>
                            <tr>
                                <th className="darkbg">公司地址</th>
                                <td className="lightbg">{tempDate.company_info.address}</td>
                                <th className="darkbg">公司网址</th>
                                <td className="lightbg">{tempDate.company_info.url}</td>
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
                                            tempDate.user_list.map(function(value){
                                                return <tr>
                                                    <td style={{ width: "10%",padding:"0 5px" }}>{value.nick_name}</td>
                                                    <td style={{ width: "10%",padding:"0 5px" }}>{value.job_name}</td>
                                                    <td style={{ width: "20%",padding:"0 5px" }}>{value.username}</td>
                                                    <td style={{ width: "20%",padding:"0 5px" }}>{value.email}</td>
                                                    <td style={{ width: "40%",padding:"0 5px" }}>{value.remark}</td>
                                                </tr>
                                            })
                                        }
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="darkbg">合同内容</td>
                            </tr>
                            <tr>
                                <td colSpan="4">
                                    {/* <div style={{float:"left",width:"100%"}}>
                                        <textarea className="allBox" value={ tempDate.content } readOnly>{tempDate.content}</textarea>
                                    </div> */}
                                    <table style={{ border: "0 none", marginBottom: ".3rem"}}>
                                        <tr>
                                            <td colSpan="4" style={{ border: "0 none",padding:"6px"}}>
                                                <p dangerouslySetInnerHTML={{ __html: tempDate.content }} style={{minHeight:"150px"}}>
                                                    {/* {tempDate.content} */}
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                    <div style={{float:"left",width:"100%"}}>
                                        <ul>
                                            {
                                                tempDate.appendixs.map( (value)=> (
                                                    <li style={{ width: "3.5rem", height: "2.8rem", paddingLeft: ".5rem" }}>
                                                        <img src={value} style={{ width: "100%" }} />
                                                    </li>
                                                ))
                                            }
                                            
                                        </ul>
                                    </div>
                                    
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

        )
    }
}