import React from 'react';
import { hashHistory } from "react-router";
import { div2png, readyDo, TableHeads, GetLocationParam } from './templates';
import { DrawBoard } from './drawBoard';

let canvas;
let drawBoard;
const urls = {
    wordMsg: require('../images/wordMsg.png'),
}
export default class MeetingStatic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meetingShow:{
                user_list:[],
                copy_to_list:[],
                plan_list:[],
            }
        },
        this.handleMeetingDetailsGet = (res) => {
            console.log(res);
            if(res.success){
                this.setState({
                    meetingShow: res.data
                })
            }
        }
    }
    componentDidMount() {
        runPromise('get_meeting_info', {
            "meeting_id": GetLocationParam('id'),
        }, this.handleMeetingDetailsGet, false, "post");
    }
    render() {
        return (
            <div id="fromHTMLtestdiv">
                <form className="visitRecordWrap">
                    <TableHeads url={urls.wordMsg} isHide={true}></TableHeads>
                    <div style={{ height: "1.3rem", position: "relative", width: "100%" }}></div>                    
                    <img src={this.state.meetingShow.signed_file_path} style={{ width: "100%", marginTop: "-1.5rem" }} />
                </form>
            </div>
        )
    }
}