import React from 'react';
import { hashHistory, Link } from "react-router";
import { TableHeads, Customs } from './templates';

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
            console.log(res);
            res = {
                "success": true,
                "data": {
                    "item_list": [
                        {
                            "id": "1",
                            "gd_company_id": "120",
                            "remark": "备注内容太短",
                            "condition": "条件太多",
                            "document_id": "V.S.C-H20180208123926000",
                            "add_time": "2018-02-08 19:39:26",
                            "start_time": "2018-02-08 19:40:50",
                            "end_time": "2018-02-28 19:40:52",
                            "type": "2",
                            "appendix": "",
                            "score": null,
                            "master_id": "67554",
                            "name": "测试项目",
                            "contract_no": "HT123",
                            "file_path": "",
                            "other_name": "测试项目123",
                            "file_path_title": "",
                            "master_name": "张5",       //负责人
                            "company_name": "广东东源新地物流有限公司",
                            "path": "https://huakewang.b0.upaiyun.com/2015/02/15/20150215125816452397.jpg",
                            "user_list": [   //相关人员
                                {
                                    "id": "2",
                                    "is_in_survey": 1,
                                    "user_id": "67547",
                                    "username": "13957192040",
                                    "nick_name": "hkw5719204",
                                    "real_name": null,
                                    "email": "oob400@126.com",
                                    "job_name": "设计师"
                                },
                                {
                                    "id": "25",
                                    "is_in_survey": 1,
                                    "user_id": "67599",
                                    "username": "13954584550",
                                    "nick_name": "hkw5796204",
                                    "real_name": null,
                                    "email": "oob950@163.com",
                                    "job_name": "前端开发"
                                }
                            ],
                            "visit_back_count": "0",
                            "meeting_count": "0",
                            "record_count": "0",
                            "check_count": "0",
                            "mission_count": "0"
                        }
                    ],
                    "total_count": "1"
                }
            }
            this.setState({
                researchHistoryList:res.data
            })
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
                <TableHeads 
                    url={urls.wordMsg} 
                    isHide={false}
                    tag={<h3 className="fn-left">
                        <Link to='/newSurveyHistory'><span style={{color:"#fff"}}>新建调研</span></Link>
                        <span style={{ borderBottom: "3px solid red" }}>历史调研</span>
                    </h3>}
                ></TableHeads>
                <div className="surveyList">
                    <ul>
                        {
                            this.state.researchHistoryList.item_list.map((value)=>(
                                <Link to={'/surveyHistory?id=' + value.gd_company_id}>
                                    <li>
                                        <h3>{value.company_name}</h3>
                                        <p>文件编号：{value.document_id} <span></span>调研日期：{(value.start_time+'').split(" ")[0]} <span></span>调研人：{value.master_name}</p>
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