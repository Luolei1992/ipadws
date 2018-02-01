import React from "react";
import { PullToRefresh, Button } from 'antd-mobile';


function genData() {
    const dataArr = [];
    for (let i = 0; i < 20; i++) {
        dataArr.push(i);
    }
    return dataArr;
}
export default class Custom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            down: true,
            height: document.documentElement.clientHeight,
            data: [],
        }
    }
    componentDidMount(){
        const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
        setTimeout(() => this.setState({
            height: hei,
            data: genData(),
        }), 0);
    }
    render(){
        return (
            <div className="customsLists visitRecordWrap">
                <div className="customsHead ">
                    <div className="left pub">
                        <span>返回</span>
                    </div>
                    <h3 className="center">
                        我的客户
                    </h3>
                    <div className="right pub">
                        <input type="button" value="排序"/>   
                        <input type="button" value="筛选"/>   
                    </div>
                </div>
                <div className="mainCustomList">
                    <PullToRefresh
                        ref={el => this.ptr = el}
                        style={{
                            height: this.state.height,
                            overflow: 'auto',
                        }}
                        direction={'down'}
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.setState({ refreshing: true });
                            
                            setTimeout(() => {
                                this.setState({ refreshing: false });
                            }, 1000);
                        }}
                    >
                        {this.state.data.map((i) => (
                            <div key={i} style={{ textAlign: 'center', padding: 20 }}>
                                pull down {i}
                            </div>
                        ))}
                    </PullToRefresh>
                </div>
            </div>
        )
    }
}