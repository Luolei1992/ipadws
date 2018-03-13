import React from 'react';
import { hashHistory,Link } from "react-router";
import { Toast } from 'antd-mobile';
import { div2png, readyDo, TableHeads, init, GetLocationParam} from './templates';
import { DrawBoard } from './drawBoard';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
    addPic1: require('../images/addPic.png'),
    addPic2: require('../images/addPic.png'),
    addPic3: require('../images/addPic.png'),
}
let canvas;
let drawBoard;
export default class SurveyHistoryStatic extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            txt: "",
            companyDetail: {
                company_info: {},
                user_list: [],
                plan_list: [],
                appendixs: []
            }
        },
            this.handleProjectGet = (res) => {
                console.log(res);
                if (res.success) {
                    this.setState({
                        companyDetail: res.data
                    })

                }else{
                    Toast.info(res.message, 2, null, false);
                }
            }
    }

    componentDidMount () {
        runPromise('get_survey_info', {     //调研详细
            // "gd_project_id": this.props.state.baseFlagId
            "gd_company_id": validate.getCookie("baseId")
        }, this.handleProjectGet, false, "post");
    }

    render(){
        return (
            <div id="fromHTMLtestdiv">
                <form className="visitRecordWrap">
                    <TableHeads 
                        url={urls.wordMsg} 
                        isHide={false} 
                        tag={<h3 className="fn-left">调研档案</h3>}
                    ></TableHeads>
                    <img src={this.state.companyDetail.signed_file_path} style={{ width: "100%", marginTop: "-1.5rem" }} />
                </form>
            </div>
            
        )
    }
}