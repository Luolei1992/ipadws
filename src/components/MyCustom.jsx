import React from 'react';
import { Link } from 'react-router';

export default class MyCustom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: [false, false, false, false, false, false]
        }
    }
    componentDidMount() {
        let newflag = [false, false, false, false, false, false];
        let number = window.location.href.split('=')[1];
        newflag[number] = true;
        this.setState({
            flag: newflag
        })
    }
    handleClickLi(index) {
        let newflag = [false, false, false, false, false, false];
        newflag[index] = true;
        this.setState({
            flag: newflag
        })
    }
    render() {
        const { mode } = this.state;
        return (
            <div className="myCustomWrap">
                {this.props.children && React.cloneElement(this.props.children, { state: this.state, props: this.props, setState: this.setState.bind(this) })}
                <div className="tableBottom">
                    <ul>
                        <li
                            style={this.state.flag[0] ? { borderBottom: "3px solid red" } : { borderBottom: "3px solid transparent" }}
                            onClick={() => { this.handleClickLi(0) }}>
                            <Link to='/company?tab=0'>合同内容</Link>
                        </li>
                        <li
                            style={this.state.flag[1] ? { borderBottom: "3px solid red" } : { borderBottom: "3px solid transparent" }}
                            onClick={() => { this.handleClickLi(1) }}>
                            <Link to='/visitRecord?tab=1'>任务记录</Link>
                        </li>
                        <li
                            style={this.state.flag[2] ? { borderBottom: "3px solid red" } : { borderBottom: "3px solid transparent" }}
                            onClick={() => { this.handleClickLi(2) }}>
                            <Link to='/visitLists?tab=2'>走访记录</Link>
                        </li>
                        <li
                            style={this.state.flag[3] ? { borderBottom: "3px solid red" } : { borderBottom: "3px solid transparent" }}
                            onClick={() => { this.handleClickLi(3) }}>
                            <Link to='/meetingList?tab=3'>会议纪要</Link>
                        </li>
                        <li
                            style={this.state.flag[4] ? { borderBottom: "3px solid red" } : { borderBottom: "3px solid transparent" }}
                            onClick={() => { this.handleClickLi(4) }}>
                            <Link>联系人</Link>
                        </li>
                        <li
                            style={this.state.flag[5] ? { borderBottom: "3px solid red" } : { borderBottom: "3px solid transparent" }}
                            onClick={() => { this.handleClickLi(5) }}>
                            <Link to='/Survey?tab=5'>调研档案</Link>
                        </li>
                    </ul>
                    <span>新增</span>
                </div>
            </div>
        )
    }
}