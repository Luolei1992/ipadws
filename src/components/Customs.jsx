import React from "react";
import { TableHead, Customs } from './templates';
import { Modal, List, Button, WhiteSpace, WingBlank } from 'antd-mobile';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
    custom:require('../images/custom.png')
}
function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

export default class Custom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            show2:false,
            modal:false,            
            order:"全部",
            check:"全部",
            data: [
                {
                    company: "上海泰宇信息技术有限公司",
                    tag: "年度服务",
                    content: "1.都是空氛围foe扣分点我咖啡我看号入口it日如题个人简介热干面。",
                    remark: "备注带我去二无群二多撒付热无若翁群若群",
                    resean: "条件丰富的的沙发丰富的的沙发丰富的的沙发丰富的的沙发",
                    rules: "验收标准萨达萨达撒的违法人的双方都是",
                    path: urls.custom,
                    duty: "55",
                    visit: "88",
                    summary: "8",
                    relate: ["张三", "李四", "王五"],
                },
                {
                    company: "北京齐天大圣科技有限公司",
                    tag: "智能设备",
                    content: "没有什么是理所应当",
                    remark: "这是一场无情的战争，只需成功，不许失败！",
                    resean: "没范德萨范德萨KJM大数据量第三款的撒娇考虑分散",
                    rules: "个付过的风格萨达上的人复古风",
                    path: "",
                    duty: "5",
                    visit: "65",
                    summary: "14",
                    relate: ["张三", "李四", "王五", "赵六"],
                }
            ]
        }
    }
    componentDidMount(){
        
    }
    changeOrder(e){
        this.setState({
            order: e.currentTarget.innerHTML,
            show:!this.state.show
        })
    }
    changeCheck(e){
        this.setState({
            check:e.currentTarget.innerHTML,
            show2: !this.state.show2
        })
    }
    delPerson(e){      //删除联系人
        e.currentTarget.style.display = "none";
    }
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    render(){
        return (
            <div className="customsLists visitRecordWrap">
                <TableHead url={urls.wordMsg}></TableHead>
                <div className="customsHead ">
                    <h3 className="center" onClick={this.showModal('modal')}>
                        我的客户
                    </h3>
                    <div className="right pub">
                        <div className="selectWrap">
                            <span>排序：</span>
                            <div style={{display:"inline-block"}}>
                                <span onClick={() => {
                                    this.setState({
                                        show: !this.state.show
                                    })
                                    this.state.show2 ? this.setState({ show2: false }) : "";                                    
                                }}>{this.state.order} <i className="iconfont icon-tubiao-"></i></span>
                                <ul style={{ display: this.state.show?"block":"none"}}>
                                    <li onClick={(e) => { this.changeOrder(e)}}>全部</li>
                                    <li onClick={(e) => { this.changeOrder(e)}}>最新</li>
                                    <li onClick={(e) => { this.changeOrder(e)}}>即将过期</li>
                                </ul>
                            </div>
                            <span style={{ marginLeft: "0.5rem" }}>筛选：</span>
                            <div style={{display:"inline-block"}}>
                                <span onClick={()=>{
                                    this.setState({
                                        show2: !this.state.show2
                                    })
                                    this.state.show ? this.setState({ show: false }) : "";
                                }}>{this.state.check} <i className="iconfont icon-tubiao-"></i></span>
                                <ul style={{ display: this.state.show2 ? "block" : "none" }}>
                                    <li onClick={(e) => {this.changeCheck(e)}}>全部</li>
                                    <li onClick={(e) => {this.changeCheck(e)}}>合作中</li>
                                    <li onClick={(e) => {this.changeCheck(e)}}>已过期</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    visible={this.state.modal}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('modal')}
                    footer={[
                        { text: '取消', onPress: () => { console.log('cancle'); this.onClose('modal')(); } },
                        { text: '确定', onPress: () => { console.log('ok'); this.onClose('modal')(); } }
                    ]}
                    // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div style={{ height: 100, overflow: 'scroll' }}>
                        scoll content...<br />
                        scoll content...<br />
                        scoll content...<br />
                        scoll content...<br />
                        scoll content...<br />
                        scoll content...<br />
                    </div>
                </Modal>
                <div className="mainCustomList">
                    <Customs 
                        dataList={this.state.data} 
                        del={this.delPerson}
                        showModal={this.showModal('modal')}
                    ></Customs>
                </div>
            </div>
        )
    }
}

