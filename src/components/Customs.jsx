import React from "react";
import { PullToRefresh, Button } from 'antd-mobile';


// function genData() {
//     const dataArr = [];
//     for (let i = 0; i < 20; i++) {
//         dataArr.push(i);
//     }
//     return dataArr;
// }
export default class Custom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            down: true,
            height: document.documentElement.clientHeight,
            arr: [1],
        }
    }
    componentDidMount(){
        // const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
        // setTimeout(() => this.setState({
        //     height: hei,
        //     // data: genData(),
        // }), 0);
    }
    dataRefresh(){
        this.setState({
            arr: this.state.arr.push(1)
        });
        console.log(this.state.arr);
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
                    <ul className="customDetails">
                        <li>
                            <div className="left fn-left">
                                <img src='' />
                            </div>
                            <h3>上海泰宇信息技术股份有限公司<span> 年度服务</span><i>...</i></h3>
                            <div className="mid fn-left">
                                {/* <div className="serverContent">
                                    <span>服务内:</span>
                                    <p>1.都是空氛围foe扣分点我咖啡我看号入口it日如题个人简介热干面。2.看发咯入口发热管控热偶工控人</p>
                                </div>
                                <div className="serverContent">
                                    <span>备注:</span>
                                    <p>1.都是空氛围foe扣分点我咖啡我看号入口it日如题个人简介热干面，看发咯入口发热管控热偶工控人。</p>
                                </div>
                                <div className="serverContent">
                                    <span>条件:</span>
                                    <p>都是空氛围分点我咖啡我看。</p>
                                </div> */}
                                <table>
                                    <tr>
                                        <td style={{width:"60px",position:"relative"}}>
                                            <span style={{ float: "left", position: "absolute", left: "0", top: "0", lineHeight: "18px"}}>服务内容:</span>
                                        </td>
                                        <td style={{lineHeight:"18px"}}>1.都是空氛围foe扣分点我咖啡我看号入口it日如题个人简介热干面。2.看发咯入口发热管控热偶工控人</td>
                                    </tr>
                                    <tr> 
                                        <td colSpan="2">
                                            <table>
                                                <tr>
                                                    <td style={{ width: "35px", position: "relative" }}>
                                                        <span style={{ float: "left", position: "absolute", left: "0", top: "0", lineHeight: "18px" }}>备注:</span>
                                                    </td>
                                                    <td style={{ lineHeight: "18px" }}>都是空氛围foe扣分点我咖啡我看号简介热干面。口发热管控热偶工控人</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr> 
                                        <td colSpan="2">
                                            <table>
                                                <tr>
                                                    <td style={{ width: "35px", position: "relative" }}>
                                                        <span style={{ float: "left", position: "absolute", left: "0", top: "0", lineHeight: "18px" }}>条件:</span>
                                                    </td>
                                                    <td style={{ lineHeight: "18px" }}>都是空氛围foe扣分点我咖啡我看号人简介管控热偶工控人</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className="right fn-left">
                                <ul>
                                    <li>
                                        <p className="top">55</p>
                                        <p className="btm">任务</p>
                                    </li>
                                    <li>
                                        <p className="top">55</p>
                                        <p className="btm">回访</p>
                                    </li>
                                    <li>
                                        <p className="top">5</p>
                                        <p className="btm">纪要</p>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    {/* <PullToRefresh
                        ref={el => this.ptr = el}
                        style={{
                            height: this.state.height,
                            overflow: 'auto',
                        }}
                        direction={'down'}
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.setState({ 
                                refreshing: true,
                                // arr:[1,2,3,6]
                                
                            });
                            this.dataRefresh();
                            setTimeout(() => {
                                this.setState({ refreshing: false });
                            }, 1000);

                        }}
                    >
                        {this.state.arr.map((i) => (
                            <div key={i} style={{ textAlign: 'center', padding: 20 }}>
                                pull down {i}
                            </div>
                        ))}
                    </PullToRefresh> */}
                    
                </div>
            </div>
        )
    }
}