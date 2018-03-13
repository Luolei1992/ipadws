import React from 'react';
import { Toast } from 'antd-mobile';
import { div2png, readyDo, TableHeads, init, GetLocationParam } from './templates';
import { DrawBoard } from './drawBoard';

let canvas;
let drawBoard;
const urls = {
    wordMsg: require('../images/wordMsg.png'),
    example: require('../images/example.png')    
}
export default class SceneVisitStatic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sceneVisits: {
                survey_list: [
                    {},{},{},{},{}
                ],
                user_list: [],
                customer_list: []
            }
        },
        this.handleSceneVisitGet = (res) => {
            console.log(res);
            if (res.success) {
                this.setState({
                    sceneVisits: res.data
                })
            }else{
                Toast.info(res.message, 2, null, false);
            }
        }
    }
    componentDidMount() {
        // readyDo();
        runPromise('get_record_info', {
            "record_id": GetLocationParam('id')
        }, this.handleSceneVisitGet, false, "post");
    }
    
    render() {
        return (
            <div className="visitRecordWrap" id="fromHTMLtestdiv">
                <TableHeads
                    url={urls.wordMsg}
                    isHide={true}
                ></TableHeads>
                <div style={{ height: "1.3rem", position: "relative", width: "100%" }}></div> 
                <img src={this.state.sceneVisits.signed_file_path} style={{ width: "100%", marginTop: "-1.5rem" }} />
            </div>
        )
    }
}