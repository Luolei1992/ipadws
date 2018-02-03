import React from 'react';
import { TableHead, Customs } from './templates';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
    custom: require('../images/custom.png')
}
export default class survey extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            
        }
    }
    componentDidMount(){

    }
    render(){
        return (
            <div className="surveyWrap visitRecordWrap">
                <TableHead url={urls.wordMsg}></TableHead>
                <div className="surveyList">
                    <ul>
                        <li>
                            <h3>上海泰宇信息技术有限公司</h3>
                            <p>文件编号： <span></span>调研日期： <span></span>调研人：</p>
                            <p className="redText"><i>综合意见：</i>符合顺丰回复就打扫房间的双方都是发的顺丰回复就打扫房间的双方都是发的顺丰瓦房店市氛围</p>
                        </li>
                        <li>
                            <h3>上海泰宇信息技术有限公司</h3>
                            <p>文件编号： <span></span>调研日期： <span></span>调研人：</p>
                            <p className="redText"><i>综合意见：</i>符合顺丰回复就打扫房间的双方都是发的顺丰回复就打扫房间的双方都是发的顺丰瓦房店市氛围</p>
                        </li>
                        <li>
                            <h3>上海泰宇信息技术有限公司</h3>
                            <p>文件编号： <span></span>调研日期： <span></span>调研人：</p>
                            <p className="redText"><i>综合意见：</i>符合顺丰回复就打扫房间的双方都是发的顺丰回复就打扫房间的双方都是发的顺丰瓦房店市氛围</p>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}