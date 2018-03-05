import React from 'react';
import { hashHistory,Link } from "react-router";
import { Toast } from 'antd-mobile';
import { div2png, readyDo, TableHeads, GetLocationParam} from './templates';
import { DrawBoard } from './drawBoard';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
    example: require('../images/example.png')
}
export default class SurveyHistory extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            txt: "",
            companyDetail:{
                company_info:{},
                user_list:[],
                plan_list:[],
                appendixs:[]
            }
        },
      
        this.handleProjectGet = (res) => {
            console.log(res);
            if(res.success) {
                this.setState({
                    companyDetail: res.data
                })
            }else{
                Toast.info(res.message, 2, null, false);
            }
        }
    }

    componentDidMount () {
        runPromise('get_project_info', {     //调研详细
            "gd_project_id": GetLocationParam('id') 
        }, this.handleProjectGet, true, "post");
        
    }
    render(){
        return (
            <div id="fromHTMLtestdiv">
                <div className="visitRecordWrap">
                    <TableHeads 
                        url={urls.wordMsg} 
                        isHide={false} 
                        tag={<h3 className="fn-left">
                            {/* <Link to='/newSurveyHistory'><span style={{ color: "#fff" }}>新建调研</span></Link>
                            <span style={{ borderBottom: "3px solid red" }}>历史调研</span> */}
                            调研详细
                        </h3>}
                    ></TableHeads>
                    {/* <button id="downloadPng">下载图片</button> */}
                    {/* <button id="download">下载PDF</button> */}
                    <img src={this.state.companyDetail.signed_file_path} style={{width:"100%",marginTop:"-1.4rem"}} />
                </div>
            </div>
        )
    }
}