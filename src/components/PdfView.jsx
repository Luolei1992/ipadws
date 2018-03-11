import React from 'react';
import { hashHistory } from "react-router";
import { GetLocationParam, TableHeadb } from './templates';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
    example: require('../images/example.png'),
    // company: 'widget://res/company.pdf',
    company: 'https://www.huakewang.com/workOrder/company.pdf',
    government: 'https://www.huakewang.com/workOrder/government.pdf',
    internet: 'https://www.huakewang.com/workOrder/internet.pdf'
}
export default class PdfView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        },
        this.pdfReader = api.require('pdfReader');
    }
    componentDidMount() {
        this.props.router.setRouteLeaveHook(
            this.props.route,
            this.routerWillLeave
        )
        let ss = this.props.location.query.src;
        this.pdfView(urls[ss]);
    }
    routerWillLeave=(nextLocation)=> {
        this.pdfReader.closeView();
    }
    pdfView = (path) => {
        this.pdfReader.openView({
            rect: {
                x: 0,
                y: 75,
                w: 'auto',
                h: 'auto'
            },
            path: path,
            fixed: true
        }, function (ret) {
            // alert(JSON.stringify(ret));
        });
    }
    actionPdf=()=>{
        hashHistory.goBack();
        this.pdfReader.closeView();
    }
    render() {
        return (
            <div className="visitRecordWrap" id="fromHTMLtestdiv" style={{border:"0 none"}}>
                <div
                    style={{
                        padding: ".24rem .4rem 0.2rem .488281rem",
                        position:"fixed",
                        top:"20px",
                        left:"0",
                        zIndex:"10000"
                    }}
                    onClick={()=>{
                        this.actionPdf();
                    }}
                ><i className="iconfont icon-jiantou"></i>返回</div>
            </div>
        )
    }
}