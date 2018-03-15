import React from 'react';
import { hashHistory, Link } from "react-router";
import { TableHeads, Customs,GetLocationParam } from './templates';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
    custom: require('../images/custom.png')
}
export default class QualityList extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            meetingList:{
                item_list:[]
            }
        },
        this.handleMeetingListGet = (res) => {
            console.log(res);
            if(res.success){
                this.setState({
                    meetingList: res.data
                })
            }
        }
    }
    componentDidMount(){
        runPromise('get_check_list', {
            "gd_project_id": validate.getCookie('project_id'),
            "offset": "0",
            "limit": "20"
        }, this.handleMeetingListGet, true, "post");
    }
    render(){
        return (
            <div className="surveyWrap visitRecordWrap">
                <TableHeads url={urls.wordMsg} isHide={false} tag={<h3>验收单</h3>}></TableHeads>
                <div className="surveyList">
                    <ul>
                        {
                            this.state.meetingList.item_list.map((value)=>(
                                <Link to={'/qualityStatic?id='+value.id}>
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
                                        <h3>{validate.getCookie("company_name")}</h3>
                                        <p className="redText">
                                            第{value.des_name2 || 1}节点<span></span><i>节点描述：</i>{value.des_detail2 || "无"}
                                        </p>
                                        <p>验收结果：{value.chk_result || "无"}<span></span>验收时间：{(value.chk_time+'').split(" ")[0]}</p>
                                    </li>
                                </Link>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}