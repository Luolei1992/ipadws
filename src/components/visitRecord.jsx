import React from 'react';
import { div2png, readyDo, TableHead } from './templates';

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
    }
    render(){
        return (
            <div className="visitRecordWrap" id="fromHTMLtestdiv">
                <TableHead url={urls.wordMsg}></TableHead>
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
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}