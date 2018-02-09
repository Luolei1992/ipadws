import React from 'react';
import { hashHistory } from "react-router";
import { div2png, readyDo, TableHeads } from './templates';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
}

export default class VisitRecord extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            
        }
    }
    componentDidMount () {
        readyDo();
        // console.log(jobList);
    }
    render(){
        return (
            <form className="visitRecordWrap" id="fromHTMLtestdiv">
                <TableHeads url={urls.wordMsg} isHide={false} tag={ <h3>任务记录</h3> }></TableHeads>
                <button id="downloadPng">下载图片</button>
                <button id="download">下载PDF</button>
                <div className="recordMain">
                    <h2>任务及交割记录</h2>
                    <ul>
                        <li>
                            顾客/客户名称:
                        </li>
                        <li>
                            服务类型:
                        </li>
                        <li>
                            设计师:
                        </li>
                    </ul>
                    <div className="tableDetails">
                        <table className="recordTable">
                            <tr>
                                <th>发生时间</th>
                                <th>内容</th>
                                <th>完成时间</th>
                                <th>交割情况<span>（格式 , 数量 , 方式）</span></th>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            {/* {
                                this.state.jobList.map((value,idx)=>{
                                    return <tr>
                                        <td>value.happenTime</td>
                                        <td>value.content</td>
                                        <td>value.finishTime</td>
                                        <td>value.give</td>
                                    </tr>
                                })
                            } */}
                        </table>
                    </div>
                </div>
            </form>
        )
    }
}