import React from 'react';
import { hashHistory, Link } from "react-router";
import { div2png, readyDo, TableHeads, GetLocationParam } from './templates';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
}

export default class MeetingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meetingList:{
                item_list:[]
            }
        },
            this.handleMeetingListGet = (res) => {
                console.log(res);
                res = {
                    "success": true,
                    "data": {
                        "item_list": [
                            {
                                "id": "1",
                                "gd_company_id": "120",
                                "start_time": "2018-02-11 13:00:00",
                                "end_time": "2018-02-11 14:00:00",
                                "address": "杭州滨江",
                                "title": "现场记录标题",
                                "master_name": "测试人员",
                                "recorder_name": null
                            },
                            {
                                "id": "2",
                                "gd_company_id": "120",
                                "start_time": "2018-02-11 13:00:00",
                                "end_time": "2018-02-11 14:00:00",
                                "address": "杭州滨江48",
                                "title": "现场记录标题84",
                                "master_name": "测试人员88",
                                "recorder_name": null
                            }
                        ],
                        "total_count": "1"
                    }
                }
                this.setState({
                    meetingList:res.data
                })
            }
    }
    componentDidMount() {
        readyDo();
        runPromise('get_meeting_list', {
            "gd_company_id": GetLocationParam('id') || this.props.props.state.baseFlagId,
            "offset": "0",
            "limit": "20"
        }, this.handleMeetingListGet, false, "post");
    }
    render() {
        return (
            <div id="fromHTMLtestdiv">
                <form className="visitRecordWrap">
                    <TableHeads url={urls.wordMsg} isHide={false} tag={<h3>会议纪要</h3>}></TableHeads>
                    <button id="btnGenerate">下载图片</button>
                    <a id="downloadPng"></a>    <input id="filename" style={{ display: "none" }} />
                    {/* <button id="download">下载PDF</button> */}
                    <div className="recordMain">
                        <h2 style={{ letterSpacing: "1px", marginTop: "0.8rem" }}>上海泰宇公司会议纪要</h2>
                        <p style={{ textAlign: "center" }}>
                            {/* 责任设计师:  <span style={{ padding: "0 15px" }}></span>时间: <span style={{ padding: "0 15px" }}></span>回访: */}
                        </p>
                        <div className="visitLists">
                            <ul>
                                {
                                    this.state.meetingList.item_list.map((value)=>(
                                        <Link to={'/meetingStatic?id='+value.id}>
                                            <li>
                                                <p>{value.title}</p>
                                                <p>{(value.start_time+'').split(" ")[0]}</p>
                                            </li>
                                        </Link>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </form>
            </div>

        )
    }
}