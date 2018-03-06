import React from 'react';
import { hashHistory } from "react-router";
import { GetLocationParam, TableHeadb } from './templates';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
    example: require('../images/example.png'),
    company: 'widget://res/company.pdf',
    government: 'widget://res/government.pdf',
    internet: 'widget://res/internet.pdf'
}
export default class PdfView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        },
        this.pdfReader = api.require('pdfReader');
    }
    componentDidMount() {
        let ss = this.props.location.query.src;
        this.pdfView(urls[ss]);
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
            <div className="visitRecordWrap" id="fromHTMLtestdiv">
                <TableHeadb
                    url={urls.wordMsg}
                    isHide={true}
                    backPdf={this.actionPdf}
                ></TableHeadb>
            </div>
        )
    }
}