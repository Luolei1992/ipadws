import React from "react";
import { List, InputItem, Toast, Button, Modal } from 'antd-mobile';
import { Link, hashHistory } from 'react-router';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            hasError: false,
            error: false,
            modal: false,
            animating: false,
            value: '15657185156',
            keywords: 'luolei1992',
            code: "",
            codeNum: 2
        }
    }
    componentDidMount(){

    }
    onChange = (value) => {  //用户名输入
        this.setState({
            hasError: validate.CheckPhone(value).hasError,
            value: value
        });
    }
    onChangeKeyword = (value) => {   //密码输入
        this.setState({
            error: validate.CheckKeywords(value).hasError,
            keywords: value
        })
    }
    onErrorClick = (val) => { //验证错误回调
        if (this.state.hasError) {
            Toast.info(val, 2, null, false);
        } else if (this.state.error) {
            Toast.info(val, 2, null, false);
        }
    }
    render(){
        return (
            <div className="loginWrap" >
                <div className="loginIpt midCenter">
                    <h2><span>同心</span>共进&nbsp;&nbsp;<span>感恩</span>汇聚</h2>
                    <List>
                        <InputItem
                            type="number"
                            placeholder="请输入手机号"
                            error={this.state.hasError}
                            maxLength={11}
                            value={this.state.value}
                            onErrorClick={() => {
                                this.onErrorClick(validate.CheckPhone(this.state.value).errorMessage);
                            }}
                            onChange={this.onChange}
                        ></InputItem>

                        <InputItem
                            type="password"
                            placeholder="请输入密码"
                            error={this.state.error}
                            value={this.state.keywords}
                            maxLength={18}
                            onErrorClick={() => {
                                this.onErrorClick(validate.CheckKeywords(this.state.keywords).errorMessage);
                            }}
                            onChange={this.onChangeKeyword}
                        ></InputItem>
                    </List>
                    <Button className="btn">登 陆</Button>
                </div>
            </div>
        )
    }
}