import React from "react";
import axios from "axios";
import { List, InputItem, Toast, Button, Modal } from 'antd-mobile';
import { Link, hashHistory } from 'react-router';
import { GetLocationParam } from './templates'
const urls = {
    wordLogo:require('../images/wordLogo.png'),
    left:require('../images/left.png'),
    bg:require('../images/bg.png'),
    wordMsg:require('../images/wordMsg.png'),
    logo:require('../images/logo.png')
}

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            hasError: false,
            error: false,
            modal: false,
            animating: false,
            value: '',
            keywords: '',
            code: "",
            codeNum: 2
        },
        this.handleSend=(res)=>{
            console.log(res);
            if(res.success) {
                validate.setCookie('user_id', res.data.id);
                validate.setCookie('user_name', res.data.real_name);
                let to = GetLocationParam('to');
                let tab = GetLocationParam('tab');
                hashHistory.push({
                    pathname: '/'+to,
                    query: { tab:tab }
                });
            }else{
                Toast.info(res.message, 2, null, false);
            }
        }
    }
    componentDidMount(){
        if (validate.getCookie('user_id')) {
            hashHistory.push({
                pathname: '/',
            });
        };
    }
    onLogin = () => {
        runPromise("login", {
            username: this.state.value,
            password: this.state.keywords,
        }, this.handleSend, false, "post");
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
            <div className="loginWrap">
                <div className="head">
                    <img src={urls.logo} className="logo" />
                    <img src={urls.wordMsg} className="wordMsg" />
                </div>
                <div className="loginIpt midCenterFull">
                    <div className="wordLogo">
                        <img src={urls.wordLogo} />
                    </div>
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
                    <Button
                        className="btn"
                        type="primary"
                        onClick={this.onLogin}
                    >登 陆</Button>
                </div>
                {/* <i className="iconfont icon-leftarrow" onClick={() => { hashHistory.goBack();}}></i> */}
                <div className="left" onClick={() => {
                    hashHistory.push({
                        pathname: '/',
                    });}}>
                    <img src={urls.left} />
                </div>
            </div>
        )
    }
}