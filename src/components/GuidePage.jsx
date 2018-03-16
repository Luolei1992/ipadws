import React from "react";
import {Link,hashHistory} from "react-router"
import { Toast } from 'antd-mobile';
const urls = {
    logo: require('../images/logo.png'),
    right: require('../images/right.png'),
    play: require('../images/play.png'),
    guideBg: require('../images/guideBg.png'),
    guide1: require('../images/guide1.png'),
    guide2: require('../images/guide2.png'),
    guide3: require('../images/guide3.png'),
    company: 'https://www.huakewang.com/workorder/company.pdf',
    government: 'https://www.huakewang.com/workorder/government.pdf',
    internet: 'https://www.huakewang.com/workorder/internet.pdf'
}
export default class Guide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
        this.handleSceneVisitGet =(res)=> {
            validate.setCookie('user_id', "");
            if(res.success){
                hashHistory.push({
                    pathname: '/login'
                })
            }else{
                Toast.info(res.message, 2, null, false);
            }
        }
        // this.pdfReader = api.require('pdfReader')        
    }
    componentDidMount(){

    }
    pdfView = (path) => {
        let pdfReader = api.require('pdfReader');
        pdfReader.open({
            path: path,
            hidden: {
                print: true,
                export: true,
                bookmark: true,
                email: true
            },
            backBtn: {
                title: {            
                    text: "返回",       
                },
            },
            // showLoading: true
        });
    }
    beforeLogin=(page,tab)=>{
        validate.getCookie('user_id')? 
            hashHistory.push({
                pathname: '/'+page,
                query: { tab:tab }
            })   
            :hashHistory.push({
                pathname: '/login',
                query: { to: page,tab:tab }
            })
    }
    logout = () => {
        runPromise('logout', {
            
        }, this.handleSceneVisitGet, true, "post");
    }
    render() {
        return (
            // <div className="guideWrap" style={{ background:"url("+urls.guideBg+") no-repeat center center / 100% 100%"}}>
            <div className="guideWrap">
                {/* <div className="head">
                    <img src={urls.logo} />
                </div> */}
                <div style={{position:"absolute",width:"100%",height:"100%"}}>
                    <img src={urls.guideBg} style={{width:"100%"}} />
                </div>
                <a><img className="midCenter" src={urls.play} onClick={()=>{this.beforeLogin('customs','0')}}/></a>
                <div className="main">
                    <h2><span>同心</span>共进&nbsp;&nbsp;<span>感恩</span>汇聚</h2>
                    <ul className="guideList">
                        <li>
                            <a onClick={()=>{this.beforeLogin('newSurveyHistory','5')}}>
                                <img src={urls.guide1} />调 研
                            </a>
                        </li>
                        <li>
                            <a onClick={()=>{this.beforeLogin('customs','0')}}>
                                <img src={urls.guide2} />回 访
                            </a>
                        </li>
                        <li>
                            <a onClick={()=>{this.beforeLogin('visit','0')}}>
                                <img src={urls.guide3} />质 检
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="pdfShowWrap">
                    <div className="companyPdf" onClick={()=>{
                        this.pdfView(urls.company);
                    }}></div>
                    <div className="internetPdf pubTangle" onClick={()=>{
                        this.pdfView(urls.internet); 
                    }}></div>
                    <div className="govermentPdf pubTangle" onClick={()=>{
                        this.pdfView(urls.government); 
                    }}></div>
                </div>
                <div className="iconfont icon-084tuichu"
                    onClick={() => { this.logout()}}
                    style={{
                        fontSize:"20px",
                        position:"absolute",
                        left:"0",
                        bottom:"0",
                        padding:"20px",
                        color:"rgba(255,255,255,0.5)",
                    }}
                ></div>
            </div>
        )
    }
}