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
            console.log(res);
            // res = {
            //     "success": true,
            //     "data": {
            //         "id": "1",
            //         "content": "<p>\r\n 1、第一点</p>\r\n<p>\r\n 2、第二点</p>\r\n<p>\r\n 3、第三点</p>\r\n", //项目详细说明（合同内容）, html格式保存的，直接显示即可
            //         "gd_company_id": "120", //公司ID
            //         "remark": "备注内容太短", //备注
            //         "condition": "条件太多", //条件
            //         "document_id": "V.S.C-H20180208123926000", //文件编号（项目编号）
            //         "add_time": "2018-02-08 19:39:26", //项目添加时间
            //         "start_time": "2018-02-08 19:40:50", //项目开始时间
            //         "end_time": "2018-02-28 19:40:52", //项目结束时间
            //         "type": "2", //项目类型，1：包年项目，2：一次性项目，3：调研
            //         "appendix": "",
            //         "score": "1", //客户意见，0很不满意，1不满意，2满意，3很满意
            //         "master_id": "67554", //项目负责人id
            //         "name": "测试项目", //合同名称
            //         "contract_no": "HT123", //合同编号
            //         "purchase_user_id": "67553", //采购人员id
            //         "implement_company_id": "119", //实施公司id
            //         "implement_user_id": "67556", //实施负责人id
            //         "file_path": "", //附件地址
            //         "other_name": "测试项目123", //其他名称-采购合同名称
            //         "file_path_title": "", //附件标题
            //         "master_name": "张5", //项目负责人姓名
            //         "purchase_name": "测试人员", //采购人员姓名
            //         "implement_user_name": "张7", //实施负责人姓名
            //         "company_name": "广东东源新地物流有限公司", //公司名称
            //         "path": "https://huakewang.b0.upaiyun.com/2015/02/15/20150215125816452397.jpg", //公司logo
            //         "implement_company_name": "杭州微聊网络科技有限公司", //实施公司名称
            //         "signed_file_path": "xxxx", //签名后的文件位置
            //         "user_list": [//联系人列表
            //             {
            //                 "id": "2",
            //                 "is_in_survey": 1, //是否参与调研，0：否，1：是
            //                 "user_id": "67547",
            //                 "username": "13957192040",
            //                 "nick_name": "hkw5719204",
            //                 "real_name": null,
            //                 "email": "oob400@126.com",
            //                 "job_name": "前端开发"
            //             }
            //         ],
            //         "appendixs": [
            //             urls.addPic1, urls.addPic2, urls.addPic3
            //         ], //附件图片列表
            //         "company_info": {
            //             //公司信息
            //             "company_name": "广东东源新地物流有限公司", //公司名称
            //             "start_time": "0000-00-00 00:00:00", //成立时间，这里是demo数据有问题
            //             "address": "文二路元茂大厦5楼515室", //公司地址
            //             "url": "http://my.chinawuliu.com.cn/20129341"	//公司网址
            //         },
            //         "plan_list": [//下一步的行动和计划列表
            //             {
            //                 "id": "4",
            //                 "seq": "2", //序号
            //                 "content": "这是第二步计划", //内容（事项）
            //                 "user_id": "27", //责任人id
            //                 "exp_time": "2018-03-11 00:00:00", //计划完成实际
            //                 "action_type": "project", //添加此计划的类型，前端不用理会
            //                 "add_time": "2018-02-11 14:46:59", //添加时间
            //                 "action_id": "4", //添加此计划的类型对应的id，前端不用理会
            //                 "username": "service@eicodesign.com", //责任人用户名
            //                 "nick_name": "eico design", //责任人昵称
            //                 "real_name": null	//责任人实名（具体显示的时候应该用实名）
            //             },
            //             {
            //                 "id": "2",
            //                 "seq": "1",
            //                 "content": "这是第一步计划",
            //                 "user_id": "24",
            //                 "exp_time": "2018-02-11 00:00:00",
            //                 "action_type": "project",
            //                 "add_time": "2018-02-11 14:46:58",
            //                 "action_id": "4",
            //                 "username": "13958054563",
            //                 "nick_name": "Mia Zhang",
            //                 "real_name": "张兰"
            //             }
            //         ]
            //     }
            // };
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
        // readyDo();
        this.props.state = [true, false, false, false, false, false];
        runPromise('get_project_info', {
            "gd_project_id": GetLocationParam('id') || validate.getCookie('baseId')
        }, this.handleProjectGet, true, "post");
    }
    // clearAll = function () {
    //     drawBoard.clear();
    // }
    // cancelLast = function () {
    //     drawBoard.cancel();
    // }
    // save = function () {
    //     drawBoard.save('only-draw', function (url) {
    //         if (!url) {
    //             alert("请先签字后再保存");
    //             return;
    //         } else {
    //             console.log(url);
    //         }
    //     });
    // }
    render() {
        let tempDate = this.state.companyDetail;
        let starttime = tempDate.start_time + '';
        let endtime = tempDate.end_time + '';
        return (
            <div className="visitRecordWrap" id="fromHTMLtestdiv">
                <TableHeads
                    url={urls.wordMsg}
                    isHide={false}
                    tag={<h3 className="fn-left">我的客户</h3>}
                ></TableHeads>
                {/* <button id="downloadPng">下载图片</button> */}
                {/* <a id="downloadPng"></a>    <input id="filename" style={{ display: "none" }} /> */}
                {/* <button id="download">下载PDF</button> */}
                <div className="recordMain">
                    <h2 style={{ letterSpacing: "1px", marginTop: "0.8rem" }}>{tempDate.company_name}</h2>
                    <p style={{ textAlign: "center" }}>
                        文件编号: {tempDate.document_id}  <span style={{ padding: "0 15px" }}></span>起止时间: {starttime.split(" ")[0]} 至 {(endtime.split(" ")[0])}<span style={{ padding: "0 15px" }}></span>
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
                                            <td colSpan="4" style={{ border: "0 none",padding:"10px",lineHeight:"10px"}}>
                                                <pre dangerouslySetInnerHTML={{ __html: tempDate.content }}>
                                                    {/* {tempDate.content} */}
                                                </pre>
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
                                            tempDate.plan_list.map((value) => (
                                                <tr>
                                                    <td style={{ borderLeft: "0 none" }}>{value.seq}</td>
                                                    <td>{value.content}</td>
                                                    <td>{value.real_name}</td>
                                                    <td>{value.exp_time.split(" ")[0]}</td>
                                                </tr>
                                            ))
                                        }
                                        
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="signatureTxt">
                                    <div className="suggess">
                                        <div className="midDiv" style={{top:"-0.2rem"}}>
                                            <span style={{ lineHeight: "46px" }}>总体印象: </span>
                                            <ul>
                                                <li>
                                                    <input type="checkbox" id="gloab" checked={tempDate.score == 3?true:false}/>
                                                    <label htmlFor="gloab"> 很满意</label>
                                                </li>
                                                <li>
                                                    <input type="checkbox" id="just"  checked={tempDate.score == 2?true:false}/>
                                                    <label htmlFor="just"> 满意</label>
                                                </li>
                                                <li>
                                                    <input type="checkbox" id="dont"  checked={tempDate.score == 1?true:false}/>
                                                    <label htmlFor="dont"> 不满意</label>
                                                </li>
                                                <li>
                                                    <input type="checkbox" id="bad"  checked={tempDate.score == 0?true:false}/>
                                                    <label htmlFor="bad"> 很不满意</label>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="midDivTop">
                                            <span>您的宝贵建议: </span>&nbsp;&nbsp;
                                            <textarea className="suggessMsg" readOnly></textarea>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            {/* <tr>
                                <td colSpan="4" className="signatureTxt" style={{borderTop:"0 none"}}>
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
            </div>

        )
    }
}