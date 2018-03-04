import React from 'react';
import {Link} from 'react-router';
import { TableHeads,GetLocationParam } from './templates';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
}
export default class QualityStatic extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            meetingShow:{
                user_list:[],
                copy_to_list:[],
                plan_list:[],
            }
        },
        this.handleMeetingDetailsGet = (res) => {
            if(res.success){
                this.setState({
                    meetingShow: res.data
                })
            }
        }
    }
    componentDidMount(){
        runPromise('get_record_info', {
            "check_id": GetLocationParam('id'),
        }, this.handleMeetingDetailsGet, false, "post");
    }
    render(){
        return (
            <div id="fromHTMLtestdiv">
                <div className="qualityFormWrap visitRecordWrap">
                    <TableHeads url={urls.wordMsg} isHide={false} tag={<h3>验收单</h3>}></TableHeads>
                    <img src={this.state.meetingShow.signed_file_path} style={{ width: "100%", marginTop: "-1.5rem" }} />
                </div>
            </div>
        )
    }
}