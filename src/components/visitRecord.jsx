import React from 'react';
import { hashHistory } from "react-router";
import { div2png, readyDo, TableHeads, GetLocationParam } from './templates';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
}

export default class VisitRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mission:{
                item_list:[
                    {
                        "add_time": "",
                        "finish_time": "",
                        "start_time":""
                    }
                ],
                project_info:{}
            }
        },
        this.handleMissionGet = (res) => {
            console.log(res);
            if(res.success) {
                this.setState({
                    mission:res.data
                })
            }else{

            }
        }
    }
    componentDidMount() {
        runPromise('get_mission_list', {
            "gd_project_id": validate.getCookie('project_id'),
            "offset": "0",
            "limit": "10"
        }, this.handleMissionGet, false, "post");
    }
    render() {
        return (
            <div id="fromHTMLtestdiv">
                <form className="visitRecordWrap">
                    <TableHeads
                        url={urls.wordMsg}
                        isHide={false}
                        tag={<h3>任务记录</h3>}
                    ></TableHeads>
                    {/* <button id="btnGenerate">下载图片</button> */}
                    {/* <a id="downloadPng"></a>    <input id="filename" style={{ display: "none" }} /> */}
                    {/* <button id="download">下载PDF</button> */}
                    <div className="recordMain">
                        <h2>任务及交割记录</h2>
                        <ul>
                            <li>
                                顾客/客户名称: {this.state.mission.project_info.company_name}
                            </li>
                            <li>
                                服务类型: {this.state.mission.project_info.type == 1 ? "包年项目" : this.state.mission.project_info.type == 2 ? "一次性项目" : this.state.mission.project_info.type==3?"调研":""}
                            </li>
                            <li>
                                设计师: {this.state.mission.project_info.master_name}
                            </li>
                        </ul>
                        <div className="tableDetails">
                            <table className="recordTable">
                                <tr>
                                    <th style={{ textAlign: "center" }}>发生时间</th>
                                    <th style={{ textAlign: "center" }}>内容</th>
                                    <th style={{ textAlign: "center" }}>完成时间</th>
                                    <th style={{ textAlign: "center" }}>交割情况<span>（格式 , 数量 , 方式）</span></th>
                                </tr>
                                {
                                    this.state.mission.item_list.map((value)=>(
                                        <tr style={{textAlign:"center"}}>
                                            <td>{value.start_time.split(" ")[0]}</td>
                                            <td>{value.content}</td>
                                            <td>{value.finish_time.split(" ")[0]}</td>
                                            <td>{value.rtn_info}</td>
                                        </tr>
                                    ))
                                }
                            </table>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}