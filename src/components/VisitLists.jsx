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
                item_list: []
            }
        },
        this.handleBackVisitGet = (res) => {
            console.log(res);
            res = {
                "success": true,
                "data": {
                    "item_list": [
                        {
                            "id": "1",
                            "title": "现场记录标题",
                            "score": "2",
                            "add_time": "2018-02-21 16:34:25"
                        }
                    ],
                    "total_count": "1"
                }
            }
            this.setState({
                backVisit: res.data
            })
        }
    }
    componentDidMount() {
        readyDo();
        runPromise('get_record_list', {
            "gd_company_id": GetLocationParam('id') || this.props.props.state.baseFlagId,
            "offset": "0",
            "limit": "20"
        }, this.handleBackVisitGet, false, "post");
    }
    render() {
        return (
            <div id="fromHTMLtestdiv">
                <form className="visitRecordWrap">
                    <TableHeads url={urls.wordMsg} isHide={false} tag={<h3>走访记录</h3>}></TableHeads>
                    <button id="btnGenerate">下载图片</button>
                    <a id="downloadPng"></a>    <input id="filename" style={{ display: "none" }} />
                    {/* <button id="download">下载PDF</button> */}
                    <div className="recordMain">
                        <h2 style={{ letterSpacing: "1px", marginTop: "0.8rem" }}>上海泰宇公司回访记录</h2>
                        <p style={{ textAlign: "center" }}>
                            责任设计师:  <span style={{ padding: "0 15px" }}></span>时间: <span style={{ padding: "0 15px" }}></span>回访:
                        </p>
                        <div className="visitLists">
                            <ul>
                                {
                                    this.state.backVisit.item_list.map((value) => (
                                        <Link to={'/sceneStatic?id='+value.id}>
                                            <li>
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