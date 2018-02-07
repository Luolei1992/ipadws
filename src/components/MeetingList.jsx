import React from 'react';
import { hashHistory , Link } from "react-router";
import { div2png, readyDo, TableHeads } from './templates';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
}

export default class MeetingList extends React.Component {
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
                    <TableHeads url={urls.wordMsg} isHide={false} tag={<h3>会议纪要</h3>}></TableHeads>
                    <button id="downloadPng">下载图片</button>
                    <button id="download">下载PDF</button>
                    <div className="recordMain">
                        <h2 style={{letterSpacing:"1px",marginTop:"0.8rem"}}>上海泰宇公司会议纪要</h2>
                        <p style={{textAlign:"center"}}>
                            责任设计师:  <span style={{ padding: "0 15px" }}></span>时间: <span style={{ padding: "0 15px" }}></span>回访:
                        </p>
                        <div className="visitLists">
                            <ul>
                                <Link to='/scene'>
                                    <li>
                                        <p>会议主题</p>
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