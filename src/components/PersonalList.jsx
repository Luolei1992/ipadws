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
        runPromise('get_company_user_list', {
            gd_company_id: GetLocationParam('id') || validate.getCookie('baseId')
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
                                        <td>{value.name}</td>
                                        <td>{value.mobile}</td>
                                        <td>{value.email}</td>
                                        <td>{value.remark}</td>
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