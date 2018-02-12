import React from 'react';
import { hashHistory , Link } from "react-router";
import { div2png, readyDo, TableHeads } from './templates';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
}

export default class VisitList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount () {
        readyDo();
    }
    render(){
        return (
            <div id="fromHTMLtestdiv">
                <form className="visitRecordWrap">
                    <TableHeads url={urls.wordMsg} isHide={false} tag={<h3>走访记录</h3>}></TableHeads>
                    <button id="btnGenerate">下载图片</button>
                    <a id="downloadPng"></a>    <input id="filename" style={{display:"none"}}/>
                    {/* <button id="download">下载PDF</button> */}
                    <div className="recordMain">
                        <h2 style={{letterSpacing:"1px",marginTop:"0.8rem"}}>上海泰宇公司回访记录</h2>
                        <p style={{textAlign:"center"}}>
                            责任设计师:  <span style={{ padding: "0 15px" }}></span>时间: <span style={{ padding: "0 15px" }}></span>回访:
                        </p>
                        <div className="visitLists">
                            <ul>
                                <Link to='/scene'>
                                    <li>
                                        <p>很满意</p>
                                        <p>2017-12-12</p>
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}