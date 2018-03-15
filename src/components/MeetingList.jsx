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
            if(res.success){
                this.setState({
                    meetingList: res.data
                })
            }
        }
    }
    componentDidMount() {
        runPromise('get_meeting_list', {
            "gd_project_id": validate.getCookie('project_id'),
            "offset": "0",
            "limit": "20"
        }, this.handleMeetingListGet, false, "post");
    }
    render() {
        return (
            <div id="fromHTMLtestdiv">
                <form className="visitRecordWrap">
                    <TableHeads url={urls.wordMsg} isHide={false} tag={<h3>会议纪要</h3>}></TableHeads>
                    <div className="recordMain">
                        <h2 style={{ letterSpacing: "1px", marginTop: "0.8rem" }}>{validate.getCookie('company_name')}</h2>
                        <p style={{ textAlign: "center" }}>
                            {/* 责任设计师:  <span style={{ padding: "0 15px" }}></span>时间: <span style={{ padding: "0 15px" }}></span>回访: */}
                        </p>
                        <div className="visitLists">
                            <ul>
                                {
                                    this.state.meetingList.item_list.map((value)=>(
                                        <Link to={'/meetingStatic?id='+value.id}>
                                            <li style={{position:"relative"}}>
                                                {
                                                    value.signed_file_path ? <i className="iconfont icon-biaoji2"
                                                        style={{
                                                            display: "inline-block",
                                                            fontSize: "22px",
                                                            color: "#1ea1ef",
                                                            position: "absolute",
                                                            right: "0",
                                                            top: "0"
                                                        }}></i> : ""
                                                }
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