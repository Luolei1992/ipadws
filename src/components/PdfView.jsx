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
        // this.pdfReader.openView({
        //     rect: {
        //         x: 0,
        //         y: 60,
        //         w: 'auto',
        //         h: 'auto'
        //     },
        //     path: path,
        //     fixed: true
        // }, function (ret) {
        //     // alert(JSON.stringify(ret));
        // });
        this.pdfReader.open({
            path: path,
            hidden: {
                print: true,
                export: true,
                bookmark: true,
                email: true
            },
            // backBtn: {
            //     size: {              //JSON对象；左上角按钮的大小配置
            //         w: 100,              //数字类型；左上角按钮的宽；默认：60
            //         h: 50             //数字类型；左上角按钮的高；默认：40
            //     },
            //     bg: {               //JSON 对象；按钮背景配置
            //         normal: "#fff",        //字符串类型；常态背景，支持rgb、rgba、#、img（本地图片）；默认：rgba(0,0,0,0)
            //         highlight: "#fff"       //字符串类型；高亮背景，支持rgb、rgba、#、img（本地图片）；默认：同normal
            //     },
            //     title: {             //JSON对象；按钮标题配置
            //         text: "返回",          //字符串类型；标题文本；默认：‘’
            //         size: "14",          //数字类型；标题文字大小；默认：13
            //         color: "#333",         //字符串类型；标题颜色；默认：#000
            //         alignment:  "center"      //字符串类型；标题位置，取值范围：left、center、right；默认：center
            //     },
            //     corner: 5            //数字类型；左上角按钮圆角大小；默认值：5.0
            // },
            showLoading:true
        });
        this.pdfReader.hideView();
        setTimeout(() => {
            this.pdfReader.showView();
        }, 800);
    }
    actionPdf=()=>{
        hashHistory.goBack();
        this.pdfReader.closeView();
    }
    render() {
        return (
            <div className="visitRecordWrap animatePageR" id="fromHTMLtestdiv" style={{border:"0 none"}}>
                {/* <div
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
                ><i className="iconfont icon-jiantou"></i>返回</div> */}
            </div>
        )
    }
}