import React from 'react';
import { Button, NavBar, Icon, TabBar, Tabs } from "antd-mobile";
import { Link } from "react-router";
import { TableHeads } from "./templates";

const urls = {
    wordMsg: require('../images/wordMsg.png'),
}

export default class Visit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
            hidden: false,
            fullScreen: false,
        }
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <div id="capture" className="visitWrap visitRecordWrap" style={{backgroundColor:"#eeeeee"}}>
                <TableHeads
                    url={urls.wordMsg}
                    isHide={false}
                    tag={<h3 className="fn-left">质 检</h3>}
                ></TableHeads>
                <div className="mainWrap">
                    <div className="mainWrapLeft">
                        <p className="allQuality"><span>全部</span><i>100</i></p>
                        <ul>
                            <li>
                                <p><span>上海泰宇信息技术股份有限公司</span><i>6</i></p>
                            </li>
                            <li>
                                <p><span>上海泰宇信息技术股份有限公司</span><i>6</i></p>
                            </li>
                            <li>
                                <p><span>上海泰宇信息技术股份有限公司</span><i>6</i></p>
                            </li>
                            <li>
                                <p><span>上海泰宇信息技术股份有限公司</span><i>6</i></p>
                            </li>
                            <li>
                                <p><span>上海泰宇信息技术股份有限公司</span><i>6</i></p>
                            </li>
                            <li>
                                <p><span>上海泰宇信息技术股份有限公司</span><i>6</i></p>
                            </li>
                            <li>
                                <p><span>上海泰宇信息技术股份有限公司</span><i>6</i></p>
                            </li>
                        </ul>
                    </div>
                    <div className="mainWrapRight">
                        <p className="which">
                            <input type="checkbox" /> 不满意处理<span></span><input type="checkbox" /> 到期<span></span><input type="checkbox" /> 已离职
                        </p>
                        <ul className="details">
                            <li className="fullWidth">
                                <div className="top">
                                    <ul className="fn-left">
                                        <li><i></i></li>
                                        <li>张兰</li>
                                        <li style={{color:"#ADADAD"}}>杭州画客科技有限公司</li>
                                        <li style={{color:"#ADADAD"}}>总经理</li>
                                    </ul>
                                    <span className="slideDown iconfont icon-tubiao-"></span>
                                </div>
                                <div className="btm">
                                    <div className="btmLeft">
                                        <h4>不满意</h4>
                                        <p>设计师迟到，态度不好</p>
                                    </div>
                                    <div className="btmCenter">
                                        <span className="dataNum" style={{color:"red"}}>5</span>
                                        <div className="explain">
                                            <p className="end" style={{color:"red"}}>天到期</p>
                                            <p className="prey" style={{ color:"#ADADAD"}}>02-03</p>
                                        </div>
                                    </div>
                                    <div className="btmRight">
                                        <button>回访结果</button>
                                    </div>
                                </div>
                                <div className="attach">
                                    <div className="attachTop">
                                        手机：15856595686<span></span>邮箱：13565854858@qq.com<span></span>微信：15848486845<span></span>QQ：11452565684
                                        <p>2014年涣发大号书法家爱大家撒，上大街上的，上的那时间段内啥</p>
                                    </div>
                                    <div className="attachList">
                                        <ul>
                                            <li>
                                                
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}