import React from 'react';
import { ImagePicker } from "antd-mobile";
import { Link } from "react-router";
import { TableHeads, Quality,init } from "./templates";

const urls = {
    wordMsg: require('../images/wordMsg.png'),
    addPic: require('../images/addPic.png'),
}

export default class Visit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
            hidden: false,
            fullScreen: false,
            show:false,
            list: [0, 1, 2, 3],
            showIndex:-1,
            open: true,
            files: [],
            alertShow:false
        }
    }
    componentDidMount() {
        init('plusMsg');
    }
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }
    show = (showIndex, isShow) => {
        if (isShow) {
            this.setState({ 
                showIndex,
                open: false
            })
        } else {
            this.setState({
                showIndex,
                open: true
            })
        }
    }
    changeAlert = () =>{
        this.setState({
            alertShow: !this.state.alertShow
        })
    }
    closeAlert = () =>{
        this.setState({
            alertShow: false
        })
    }
    render() {
        const { files } = this.state;
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
                        </ul>
                    </div>
                    <div className="mainWrapRight">
                        <p className="which">
                            <input type="checkbox" /> 不满意处理<span></span><input type="checkbox" /> 到期<span></span><input type="checkbox" /> 已离职
                        </p>
                        {/* <ul className="details">
                            <li className="fullWidth">
                                <div className="top">
                                    <ul className="fn-left">
                                        <li><i></i></li>
                                        <li>张兰</li>
                                        <li style={{ color: "#ADADAD" }}>杭州画客科技有限公司</li>
                                        <li style={{ color: "#ADADAD" }}>总经理</li>
                                    </ul>
                                    <span className="slideDown iconfont icon-tubiao-" onClick={()=>this.show()}></span>
                                </div>
                                <div className="btm">
                                    <div className="btmLeft">
                                        <h4>不满意</h4>
                                        <p>设计师迟到，态度不好</p>
                                    </div>
                                    <div className="btmCenter">
                                        <span className="dataNum" style={{ color: "red" }}>5</span>
                                        <div className="explain">
                                            <p className="end" style={{ color: "red" }}>天到期</p>
                                            <p className="prey" style={{ color: "#ADADAD" }}>02-03</p>
                                        </div>
                                    </div>
                                    <div className="btmRight">
                                        <button>回访结果</button>
                                    </div>
                                </div>
                                <div className="attach" style={{display:this.state.show?"block":"none"}}>
                                    <div className="attachTop">
                                        手机：15856595686<span></span>邮箱：13565854858@qq.com<span></span>微信：15848486845<span></span>QQ：11452565684
                                        <p>2014年涣发大号书法家爱大家撒，上大街上的，上的那时间段内啥</p>
                                    </div>
                                    <div className="attachList">
                                        <ul className="attachListUl">
                                            <li>
                                                <div style={{ overflow: "hidden" }}>
                                                    <span className="attachListLeft"><i className="iconfont icon-sanjiao1"></i>满意 <i className="date">12-03</i></span>
                                                    <span className="attachListRight">12月</span>
                                                </div>
                                                <p>附加信息</p>
                                                <ul>
                                                    <li>
                                                        <img src={urls.addPic} />
                                                    </li>
                                                    <li>
                                                        <img src={urls.addPic} />
                                                    </li>
                                                    <li>
                                                        <img src={urls.addPic} />
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul> */}
                        {/* <Quality show={}></Quality> */}
                        {
                            this.state.list.map((value, index) => (
                                this.state.showIndex == index && this.state.open ? 
                                    <Quality isShow={true} index={index} show={this.show} changeAlert={this.changeAlert}></Quality> 
                                    : 
                                    <Quality isShow={false} index={index} show={this.show} changeAlert={this.changeAlert}></Quality>
                            ))
                        }
                        <div className="alertModalBg" style={{display:this.state.alertShow?"block":"none"}}></div>
                        <div className="alertModal" style={{ display: this.state.alertShow?"block":"none"}}>
                            <i className="icon-icon_chahao iconfont" onClick={this.closeAlert}></i>
                            <p className="which" style={{textAlign:"center"}}>
                                <input type="checkbox" /> 满意<span></span><input type="checkbox" /> 不满意<span></span><input type="checkbox" /> 已离职
                            </p>
                            <textarea id="plusMsg" placeholder="附加信息："></textarea>
                            <ImagePicker
                                files={files}
                                onChange={this.onChange}
                                onImageClick={(index, fs) => console.log(index, fs)}
                                selectable={files.length < 4}
                                accept="image/gif,image/jpeg,image/jpg,image/png"
                            />
                            <button>提 交</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}