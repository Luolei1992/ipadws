import React from "react";
import {Link,hashHistory} from "react-router"

const urls = {
    logo: require('../images/logo.png'),
    right: require('../images/right.png'),
    play: require('../images/play.png'),
    guideBg: require('../images/guideBg.png'),
    guide1: require('../images/guide1.png'),
    guide2: require('../images/guide2.png'),
    guide3: require('../images/guide3.png'),
}
export default class Guide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
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
    render() {
        return (
            <div className="guideWrap" style={{ background:"url("+urls.guideBg+") no-repeat center center / 100% 100%"}}>
                <div className="head">
                    <img src={urls.logo} />
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
                        hashHistory.push({
                            pathname: '/pdf',
                            query: { src: "company" }
                        })  
                    }}></div>
                    <div className="internetPdf pubTangle" onClick={()=>{
                        hashHistory.push({
                            pathname: '/pdf',
                            query: { src: "internet" }
                        })  
                    }}></div>
                    <div className="govermentPdf pubTangle" onClick={()=>{
                        hashHistory.push({
                            pathname: '/pdf',
                            query: { src: "government" }
                        })  
                    }}></div>
                </div>
            </div>
        )
    }
}