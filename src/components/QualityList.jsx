import React from 'react';
import { hashHistory, Link } from "react-router";
import { TableHeads, Customs } from './templates';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
    custom: require('../images/custom.png')
}
export default class QualityList extends React.Component{
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
                <TableHeads 
                    url={urls.wordMsg} 
                    isHide={false}
                    tag={<h3 className="fn-left">
                        <Link to='/quality'><span style={{color:"#fff"}}>新建验收单</span></Link>
                        <span style={{ borderBottom: "3px solid red" }}>历史验收单</span>
                    </h3>}
                ></TableHeads>
                <div className="surveyList">
                    <ul>
                        <Link to='/quality'>
                            <li>
                                <h3>上海泰宇信息技术有限公司</h3>
                                <p>采购合同名称：<span></span>项目合同名称：<span></span>项目负责人：</p>
                                <p className="redText">第2节点<span></span><i>节点描述：</i>符合顺丰回复就打扫房间的双方都瓦房店市氛围</p>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        )
    }
}