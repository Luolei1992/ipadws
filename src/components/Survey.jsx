import React from 'react';
import { hashHistory, Link } from "react-router";
import { Toast } from 'antd-mobile';
import { TableHeadServey, Customs } from './templates';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
    custom: require('../images/custom.png')
}
export default class survey extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            researchHistoryList:{
                item_list:[]
            }
        },
        this.handleProjectGet=(res)=>{
            if(res.success){
                this.setState({
                    researchHistoryList:res.data
                })
            }else{
                Toast.info(res.message, 2, null, false);
            }
        }
    }
    componentDidMount(){
        runPromise('get_project_list', {
            "type": "3",
            "offset": 0,
            "limit": 20,
            "sort": "add_time",
            "choose": 0
        }, this.handleProjectGet, false, "post");
    }
    render(){
        return (
            <div className="surveyWrap visitRecordWrap">
                <TableHeadServey 
                    url={urls.wordMsg} 
                    isHide={false}
                    tag={<h3 className="fn-left">
                        <Link to='/newSurveyHistory'><span style={{color:"#fff"}}>新建调研</span></Link>
                        <span style={{ borderBottom: "3px solid red" }}>历史调研</span>
                    </h3>}
                ></TableHeadServey>
                {/* <div style={{ height: "1.3rem", position: "relative", width: "100%" }}></div>                 */}
                <div className="surveyList animatePageY">
                    <ul>
                        {
                            this.state.researchHistoryList.item_list.map((value)=>(
                                <Link to={'/surveyHistory?id=' + value.gd_company_id}>
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
                                                }}></i>:""
                                        }
                                        <h3>{value.company_name}</h3>
                                        <p>文件编号：{value.document_id} <span></span>调研日期：{(value.add_time+'').split(" ")[0]} <span></span>调研人：{value.master_name}</p>
                                        <p className="redText"><i>综合意见：</i>{value.suggest}</p>
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