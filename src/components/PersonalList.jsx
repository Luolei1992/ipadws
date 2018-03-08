import React from 'react';
import { List } from 'antd-mobile';
import { TableHeads, GetLocationParam } from './templates';
const urls = {
    wordMsg: require('../images/wordMsg.png'),
}
export default class PersonalList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            personalList: [
                
            ]
        },
        this.handleCompanyUserGet = (res) => {
            console.log(res);
            if(res.success){
                this.setState({
                    personalList: res.data
                })
            }
        }
    };
    componentDidMount() {
        runPromise('get_project_linker_list', {
            gd_project_id: validate.getCookie('project_id')
        }, this.handleCompanyUserGet, true, "post");
    }
    render() {
        return (
            <div className="visitRecordWrap">
                <TableHeads url={urls.wordMsg} isHide={false} tag={<h3>联系人</h3>}></TableHeads>
                <div className="recordMain">
                    <div className="tableDetails">
                        <table style={{
                            textAlign: "center"
                        }}>
                            <tr>
                                <td>姓名</td>
                                <td>手机号</td>
                                <td>邮箱</td>
                                <td>职位</td>
                            </tr>
                            {
                                this.state.personalList.map((value)=>(
                                    <tr>
                                        <td>{value.real_name}</td>
                                        <td>{value.mobile}</td>
                                        <td>{value.email}</td>
                                        <td>{value.job_name}</td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}