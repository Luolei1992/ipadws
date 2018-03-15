import React from 'react';
import { hashHistory, Link } from "react-router";
import { div2png, readyDo, TableHeads, GetLocationParam } from './templates';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
}

export default class VisitList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backVisit: {
                item_list: [],
                project_info: {
                    master_name:""
                }
            },
            backVisitDetail: {

            }
        },
        this.handleBackVisitGet = (res) => {
            console.log(res);
            if(res.success) {
                this.setState({
                    backVisit: res.data
                })
            }
        },
        this.handleVisitDetailGet = (res) => {
            console.log(res);
            if(res.success) {
                this.setState({
                    backVisitDetail: res.data
                })
            }
        }
    }
    componentDidMount() {
        runPromise('get_record_list', {
            "gd_project_id": validate.getCookie('project_id'),
            "offset": "0",
            "limit": "20"
        }, this.handleBackVisitGet, true, "post");
        runPromise('get_visit_back_simple_list', {
            "gd_company_id": GetLocationParam('id') || validate.getCookie('baseId'),
            "offset": "0",
            "limit": "20"
        }, this.handleVisitDetailGet, true, "post");
    }
    render() {
        return (
            <div id="fromHTMLtestdiv">
                <form className="visitRecordWrap">
                    <TableHeads url={urls.wordMsg} isHide={false} tag={<h3>走访记录</h3>}></TableHeads>
                    <div className="recordMain">
                        <h2 style={{ letterSpacing: "1px", marginTop: "0.8rem" }}>{validate.getCookie('company_name')}</h2>
                        <p style={{ textAlign: "center" }}>
                            责任设计师: {this.state.backVisitDetail.master_designer_name} <span style={{ padding: "0 15px" }}></span>
                            {/* 时间: <span style={{ padding: "0 15px" }}></span> */}
                            回访: {'共' + (this.state.backVisitDetail.total_count || "0") + '次回访' + ' '} {(this.state.backVisitDetail.low_score_total || "0")+'次不满意'}
                        </p>
                        <div className="visitLists">
                            <ul>
                                {
                                    this.state.backVisit.item_list.map((value) => (
                                        <Link to={'/sceneStatic?id='+value.id}>
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
                                                <p>{value.score == 0 ? "不满意" : value.score == 1 ? "一般" : "满意"}</p>
                                                <p>{(value.add_time + '').split(" ")[0]}</p>
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