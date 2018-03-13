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
                check_info:{}
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
    componentDidMount(){
        runPromise('get_check_info', {
            "check_id": GetLocationParam('id'),
        }, this.handleMeetingDetailsGet, false, "post");
    }
    render(){
        return (
            <div id="fromHTMLtestdiv">
                <div className="qualityFormWrap visitRecordWrap">
                    <TableHeads url={urls.wordMsg} isHide={false} tag={<h3>验收单</h3>}></TableHeads>
                    <div style={{ height: "1.3rem", position: "relative", width: "100%" }}></div>                                        
                    <img src={this.state.meetingShow.check_info.signed_file_path} style={{ width: "100%", marginTop: "-1.5rem" }} />
                </div>
            </div>
        )
    }
}