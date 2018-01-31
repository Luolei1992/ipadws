import React from 'react';
import { div2png, readyDo, TableHead } from './templates';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
}

export default class SceneVisit extends React.Component {
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
                    <h2>现场回访记录</h2>
                    <div className="tableDetails">
                        <table className="sceneTable">
                            <tr>
                                <th className="darkbg">顾客单位</th>
                                <td></td>
                                <th className="darkbg">回访主题</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th className="darkbg">回访人员</th>
                                <td></td>
                                <th className="darkbg">回访人员</th>
                                <td></td>
                            </tr>
                            <tr>
                                <td style={{textAlign:"center",fontWeight:"800"}} colSpan="4" className="darkbg">回访内容及成果</td>
                            </tr>
                            <tr >
                                <td colSpan="4">
                                    <textarea></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td style={{textAlign:"center",fontWeight:"800"}} colSpan="4" className="darkbg">下一步计划和行动</td>
                            </tr>
                            <tr >
                                <td colSpan="4">
                                    <textarea></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ 
                                    textAlign: "center", 
                                    fontWeight: "800" 
                                    }} 
                                    colSpan="4" 
                                    className="darkbg"
                                >满意度调查 <span style={{float:"right"}}><input type="checkbox"/>全满意</span></td>
                            </tr>
                            <tr >
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr >
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr >
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