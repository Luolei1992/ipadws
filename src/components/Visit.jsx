import React from 'react';
import { Button, NavBar, Icon, TabBar, Tabs } from "antd-mobile";
import { Link } from "react-router";
import { BottomLis } from "./templates";

const urls = {
    // logo:require('../images/')
}

// const tabs = [
//     { title: <Link to="/login">合同内容</Link> },
//     { title: <Link to="/login">任务记录</Link> },
//     { title: <Link to="/login">回访记录</Link> },
//     { title: <Link to="/login">会议纪要</Link> },
//     { title: <Link to="/login">联系人</Link> },
//     { title: <Link to="/login">调研档案</Link> },
// ];

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
            <div className="visitWrap">
                <div className="visitHead">
                    <NavBar
                        mode="dark"
                        icon={<span>维善 设计</span>}
                        onLeftClick={() => console.log('onLeftClick')}
                        rightContent={[
                            <div className="">
                                <img src="" />
                            </div>
                        ]}
                        style={{ backgroundColor: '#000' }}
                    ><span>新建调研</span> <span>历史调研</span></NavBar>
                </div>
                <div className="mainWrap">

                </div>
                <div className="footerBar">
                    <BottomLis >
                        
                    </BottomLis>
                </div>
            </div>
        )
    }
}