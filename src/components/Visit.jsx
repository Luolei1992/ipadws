import React from 'react';
import { ImagePicker } from "antd-mobile";
import { Link } from "react-router";
import { TableHeads, Quality, init } from "./templates";

const urls = {
    wordMsg: require('../images/wordMsg.png'),
    addPic: require('../images/addPic.png'),
}

export default class Visit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
            hidden: false,
            fullScreen: false,
            show: false,
            list: [0, 1],
            showIndex: -1,
            open: true,
            files: [],
            alertShow: false,
            isShow:-1,
            visitLists:{
                item_list:[]
            },
            companyLists:{
                item_list:[]
            },
            personalDetail:{}
        },
        this.handleCompanyListGet = (res) => {
            console.log(res);
            this.setState({
                companyLists:res.data
            })
        },
        this.handleVisitGet = (res) => {
            console.log(res);
            res = {
                "success": true,
                "data": {
                    "item_list": [
                        {
                            "id": "1", //回访记录id
                            "gd_company_id": "120", //公司id
                            "add_time": "2018-02-11 13:39:38", //回访时间
                            "score": "2", //满意度，0：不满意，1一般，2满意
                            "content": "请问最近的服务是否满意", //回访内容
                            "appendix": "_97378_07377_", //附件id
                            "user_id": null, //回访人员id
                            "customer_id": null, //被访人员id
                            "user_name": "张三", //回访人员姓名
                            "customer_name": null, //被访人员姓名
                            "customer_remark": null, //被访人员备注
                            "company_name": "杭州三汇", //公司名称 
                            "out_time": "2018-03-14 10:17:27", //下次回访到期的日期
                            "time_least": "20", //下次回访剩余的天数  
                            "customer_mobile":"15656565656",
                            "customer_email":"15658585858@163.com",
                            "appendixs": [//附件详细信息
                                {
                                    "id": "97378",
                                    "path": "https://huakewang.b0.upaiyun.com/2018/01/04/20180104093707896151.jpg",
                                    "width": "450",
                                    "height": "300",
                                    "alt": "",
                                    "ext": null,
                                    "size": "0",
                                    "name": null
                                },
                                {
                                    "id": "7377",
                                    "path": "https://www.huakewang.com/uploads/2013/0706/20130706032354115576.jpg",
                                    "width": "0",
                                    "height": "0",
                                    "alt": "",
                                    "ext": "jpg",
                                    "size": "21108",
                                    "name": null
                                }
                            ]
                        },
                        {
                            "id": "1", //回访记录id
                            "gd_company_id": "120", //公司id
                            "add_time": "2018-02-11 13:39:38", //回访时间
                            "score": "2", //满意度，0：不满意，1一般，2满意
                            "content": "请问最近的服务是否满意", //回访内容
                            "appendix": "_97378_07377_", //附件id
                            "user_id": null, //回访人员id
                            "customer_id": null, //被访人员id
                            "user_name": "张三", //回访人员姓名
                            "customer_name": null, //被访人员姓名
                            "customer_remark": null, //被访人员备注
                            "company_name": "杭州三汇", //公司名称 
                            "out_time": "2018-03-14 10:17:27", //下次回访到期的日期
                            "time_least": "20", //下次回访剩余的天数  
                            "customer_mobile":"15656565656",
                            "customer_email":"15658585858@163.com",
                            "appendixs": [//附件详细信息
                                {
                                    "id": "97378",
                                    "path": "https://huakewang.b0.upaiyun.com/2018/01/04/20180104093707896151.jpg",
                                    "width": "450",
                                    "height": "300",
                                    "alt": "",
                                    "ext": null,
                                    "size": "0",
                                    "name": null
                                },
                                {
                                    "id": "7377",
                                    "path": "https://www.huakewang.com/uploads/2013/0706/20130706032354115576.jpg",
                                    "width": "0",
                                    "height": "0",
                                    "alt": "",
                                    "ext": "jpg",
                                    "size": "21108",
                                    "name": null
                                }
                            ]
                        },
                        {
                            "id": "1", //回访记录id
                            "gd_company_id": "120", //公司id
                            "add_time": "2018-02-11 13:39:38", //回访时间
                            "score": "2", //满意度，0：不满意，1一般，2满意
                            "content": "请问最近的服务是否满意", //回访内容
                            "appendix": "_97378_07377_", //附件id
                            "user_id": null, //回访人员id
                            "customer_id": null, //被访人员id
                            "user_name": "张三", //回访人员姓名
                            "customer_name": null, //被访人员姓名
                            "customer_remark": null, //被访人员备注
                            "company_name": "杭州三汇", //公司名称 
                            "out_time": "2018-03-14 10:17:27", //下次回访到期的日期
                            "time_least": "20", //下次回访剩余的天数  
                            "customer_mobile":"15656565656",
                            "customer_email":"15658585858@163.com",
                            "appendixs": [//附件详细信息
                                {
                                    "id": "97378",
                                    "path": "https://huakewang.b0.upaiyun.com/2018/01/04/20180104093707896151.jpg",
                                    "width": "450",
                                    "height": "300",
                                    "alt": "",
                                    "ext": null,
                                    "size": "0",
                                    "name": null
                                },
                                {
                                    "id": "7377",
                                    "path": "https://www.huakewang.com/uploads/2013/0706/20130706032354115576.jpg",
                                    "width": "0",
                                    "height": "0",
                                    "alt": "",
                                    "ext": "jpg",
                                    "size": "21108",
                                    "name": null
                                }
                            ]
                        },
                        {
                            "id": "1", //回访记录id
                            "gd_company_id": "120", //公司id
                            "add_time": "2018-02-11 13:39:38", //回访时间
                            "score": "2", //满意度，0：不满意，1一般，2满意
                            "content": "请问最近的服务是否满意", //回访内容
                            "appendix": "_97378_07377_", //附件id
                            "user_id": null, //回访人员id
                            "customer_id": null, //被访人员id
                            "user_name": "张三", //回访人员姓名
                            "customer_name": null, //被访人员姓名
                            "customer_remark": null, //被访人员备注
                            "company_name": "杭州三汇", //公司名称 
                            "out_time": "2018-03-14 10:17:27", //下次回访到期的日期
                            "time_least": "20", //下次回访剩余的天数  
                            "customer_mobile":"15656565656",
                            "customer_email":"15658585858@163.com",
                            "appendixs": [//附件详细信息
                                {
                                    "id": "97378",
                                    "path": "https://huakewang.b0.upaiyun.com/2018/01/04/20180104093707896151.jpg",
                                    "width": "450",
                                    "height": "300",
                                    "alt": "",
                                    "ext": null,
                                    "size": "0",
                                    "name": null
                                },
                                {
                                    "id": "7377",
                                    "path": "https://www.huakewang.com/uploads/2013/0706/20130706032354115576.jpg",
                                    "width": "0",
                                    "height": "0",
                                    "alt": "",
                                    "ext": "jpg",
                                    "size": "21108",
                                    "name": null
                                }
                            ]
                        },
                        {
                            "id": "1", //回访记录id
                            "gd_company_id": "120", //公司id
                            "add_time": "2018-02-11 13:39:38", //回访时间
                            "score": "2", //满意度，0：不满意，1一般，2满意
                            "content": "请问最近的服务是否满意", //回访内容
                            "appendix": "_97378_07377_", //附件id
                            "user_id": null, //回访人员id
                            "customer_id": null, //被访人员id
                            "user_name": "张三", //回访人员姓名
                            "customer_name": null, //被访人员姓名
                            "customer_remark": null, //被访人员备注
                            "company_name": "杭州三汇", //公司名称 
                            "out_time": "2018-03-14 10:17:27", //下次回访到期的日期
                            "time_least": "20", //下次回访剩余的天数  
                            "customer_mobile":"15656565656",
                            "customer_email":"15658585858@163.com",
                            "appendixs": [//附件详细信息
                                {
                                    "id": "97378",
                                    "path": "https://huakewang.b0.upaiyun.com/2018/01/04/20180104093707896151.jpg",
                                    "width": "450",
                                    "height": "300",
                                    "alt": "",
                                    "ext": null,
                                    "size": "0",
                                    "name": null
                                },
                                {
                                    "id": "7377",
                                    "path": "https://www.huakewang.com/uploads/2013/0706/20130706032354115576.jpg",
                                    "width": "0",
                                    "height": "0",
                                    "alt": "",
                                    "ext": "jpg",
                                    "size": "21108",
                                    "name": null
                                }
                            ]
                        },
                        {
                            "id": "1", //回访记录id
                            "gd_company_id": "120", //公司id
                            "add_time": "2018-02-11 13:39:38", //回访时间
                            "score": "2", //满意度，0：不满意，1一般，2满意
                            "content": "请问最近的服务是否满意", //回访内容
                            "appendix": "_97378_07377_", //附件id
                            "user_id": null, //回访人员id
                            "customer_id": null, //被访人员id
                            "user_name": "张三", //回访人员姓名
                            "customer_name": null, //被访人员姓名
                            "customer_remark": null, //被访人员备注
                            "company_name": "杭州三汇", //公司名称 
                            "out_time": "2018-03-14 10:17:27", //下次回访到期的日期
                            "time_least": "20", //下次回访剩余的天数  
                            "customer_mobile":"15656565656",
                            "customer_email":"15658585858@163.com",
                            "appendixs": [//附件详细信息
                                {
                                    "id": "97378",
                                    "path": "https://huakewang.b0.upaiyun.com/2018/01/04/20180104093707896151.jpg",
                                    "width": "450",
                                    "height": "300",
                                    "alt": "",
                                    "ext": null,
                                    "size": "0",
                                    "name": null
                                },
                                {
                                    "id": "7377",
                                    "path": "https://www.huakewang.com/uploads/2013/0706/20130706032354115576.jpg",
                                    "width": "0",
                                    "height": "0",
                                    "alt": "",
                                    "ext": "jpg",
                                    "size": "21108",
                                    "name": null
                                }
                            ]
                        },
                        {
                            "id": "1", //回访记录id
                            "gd_company_id": "120", //公司id
                            "add_time": "2018-02-11 13:39:38", //回访时间
                            "score": "2", //满意度，0：不满意，1一般，2满意
                            "content": "请问最近的服务是否满意", //回访内容
                            "appendix": "_97378_07377_", //附件id
                            "user_id": null, //回访人员id
                            "customer_id": null, //被访人员id
                            "user_name": "张三", //回访人员姓名
                            "customer_name": null, //被访人员姓名
                            "customer_remark": null, //被访人员备注
                            "company_name": "杭州三汇", //公司名称 
                            "out_time": "2018-03-14 10:17:27", //下次回访到期的日期
                            "time_least": "20", //下次回访剩余的天数  
                            "customer_mobile":"15656565656",
                            "customer_email":"15658585858@163.com",
                            "appendixs": [//附件详细信息
                                {
                                    "id": "97378",
                                    "path": "https://huakewang.b0.upaiyun.com/2018/01/04/20180104093707896151.jpg",
                                    "width": "450",
                                    "height": "300",
                                    "alt": "",
                                    "ext": null,
                                    "size": "0",
                                    "name": null
                                },
                                {
                                    "id": "7377",
                                    "path": "https://www.huakewang.com/uploads/2013/0706/20130706032354115576.jpg",
                                    "width": "0",
                                    "height": "0",
                                    "alt": "",
                                    "ext": "jpg",
                                    "size": "21108",
                                    "name": null
                                }
                            ]
                        },
                        {
                            "id": "1", //回访记录id
                            "gd_company_id": "120", //公司id
                            "add_time": "2018-02-11 13:39:38", //回访时间
                            "score": "2", //满意度，0：不满意，1一般，2满意
                            "content": "请问最近的服务是否满意", //回访内容
                            "appendix": "_97378_07377_", //附件id
                            "user_id": null, //回访人员id
                            "customer_id": null, //被访人员id
                            "user_name": "张三", //回访人员姓名
                            "customer_name": null, //被访人员姓名
                            "customer_remark": null, //被访人员备注
                            "company_name": "杭州三汇", //公司名称 
                            "out_time": "2018-03-14 10:17:27", //下次回访到期的日期
                            "time_least": "20", //下次回访剩余的天数  
                            "customer_mobile":"15656565656",
                            "customer_email":"15658585858@163.com",
                            "appendixs": [//附件详细信息
                                {
                                    "id": "97378",
                                    "path": "https://huakewang.b0.upaiyun.com/2018/01/04/20180104093707896151.jpg",
                                    "width": "450",
                                    "height": "300",
                                    "alt": "",
                                    "ext": null,
                                    "size": "0",
                                    "name": null
                                },
                                {
                                    "id": "7377",
                                    "path": "https://www.huakewang.com/uploads/2013/0706/20130706032354115576.jpg",
                                    "width": "0",
                                    "height": "0",
                                    "alt": "",
                                    "ext": "jpg",
                                    "size": "21108",
                                    "name": null
                                }
                            ]
                        },
                        {
                            "id": "1", //回访记录id
                            "gd_company_id": "120", //公司id
                            "add_time": "2018-02-11 13:39:38", //回访时间
                            "score": "2", //满意度，0：不满意，1一般，2满意
                            "content": "请问最近的服务是否满意", //回访内容
                            "appendix": "_97378_07377_", //附件id
                            "user_id": null, //回访人员id
                            "customer_id": null, //被访人员id
                            "user_name": "张三", //回访人员姓名
                            "customer_name": null, //被访人员姓名
                            "customer_remark": null, //被访人员备注
                            "company_name": "杭州三汇", //公司名称 
                            "out_time": "2018-03-14 10:17:27", //下次回访到期的日期
                            "time_least": "20", //下次回访剩余的天数  
                            "customer_mobile":"15656565656",
                            "customer_email":"15658585858@163.com",
                            "appendixs": [//附件详细信息
                                {
                                    "id": "97378",
                                    "path": "https://huakewang.b0.upaiyun.com/2018/01/04/20180104093707896151.jpg",
                                    "width": "450",
                                    "height": "300",
                                    "alt": "",
                                    "ext": null,
                                    "size": "0",
                                    "name": null
                                },
                                {
                                    "id": "7377",
                                    "path": "https://www.huakewang.com/uploads/2013/0706/20130706032354115576.jpg",
                                    "width": "0",
                                    "height": "0",
                                    "alt": "",
                                    "ext": "jpg",
                                    "size": "21108",
                                    "name": null
                                }
                            ]
                        },
                        {
                            "id": "1", //回访记录id
                            "gd_company_id": "120", //公司id
                            "add_time": "2018-02-11 13:39:38", //回访时间
                            "score": "2", //满意度，0：不满意，1一般，2满意
                            "content": "请问最近的服务是否满意", //回访内容
                            "appendix": "_97378_07377_", //附件id
                            "user_id": null, //回访人员id
                            "customer_id": null, //被访人员id
                            "user_name": "张三", //回访人员姓名
                            "customer_name": null, //被访人员姓名
                            "customer_remark": null, //被访人员备注
                            "company_name": "杭州三汇", //公司名称 
                            "out_time": "2018-03-14 10:17:27", //下次回访到期的日期
                            "time_least": "20", //下次回访剩余的天数  
                            "customer_mobile":"15656565656",
                            "customer_email":"15658585858@163.com",
                            "appendixs": [//附件详细信息
                                {
                                    "id": "97378",
                                    "path": "https://huakewang.b0.upaiyun.com/2018/01/04/20180104093707896151.jpg",
                                    "width": "450",
                                    "height": "300",
                                    "alt": "",
                                    "ext": null,
                                    "size": "0",
                                    "name": null
                                },
                                {
                                    "id": "7377",
                                    "path": "https://www.huakewang.com/uploads/2013/0706/20130706032354115576.jpg",
                                    "width": "0",
                                    "height": "0",
                                    "alt": "",
                                    "ext": "jpg",
                                    "size": "21108",
                                    "name": null
                                }
                            ]
                        },
                        {
                            "id": "1", //回访记录id
                            "gd_company_id": "120", //公司id
                            "add_time": "2018-02-11 13:39:38", //回访时间
                            "score": "2", //满意度，0：不满意，1一般，2满意
                            "content": "请问最近的服务是否满意", //回访内容
                            "appendix": "_97378_07377_", //附件id
                            "user_id": null, //回访人员id
                            "customer_id": null, //被访人员id
                            "user_name": "张三", //回访人员姓名
                            "customer_name": null, //被访人员姓名
                            "customer_remark": null, //被访人员备注
                            "company_name": "杭州三汇", //公司名称 
                            "out_time": "2018-03-14 10:17:27", //下次回访到期的日期
                            "time_least": "20", //下次回访剩余的天数  
                            "customer_mobile":"15656565656",
                            "customer_email":"15658585858@163.com",
                            "appendixs": [//附件详细信息
                                {
                                    "id": "97378",
                                    "path": "https://huakewang.b0.upaiyun.com/2018/01/04/20180104093707896151.jpg",
                                    "width": "450",
                                    "height": "300",
                                    "alt": "",
                                    "ext": null,
                                    "size": "0",
                                    "name": null
                                },
                                {
                                    "id": "7377",
                                    "path": "https://www.huakewang.com/uploads/2013/0706/20130706032354115576.jpg",
                                    "width": "0",
                                    "height": "0",
                                    "alt": "",
                                    "ext": "jpg",
                                    "size": "21108",
                                    "name": null
                                }
                            ]
                        },
                        {
                            "id": "1", //回访记录id
                            "gd_company_id": "120", //公司id
                            "add_time": "2018-02-11 13:39:38", //回访时间
                            "score": "2", //满意度，0：不满意，1一般，2满意
                            "content": "请问最近的服务是否满意", //回访内容
                            "appendix": "_97378_07377_", //附件id
                            "user_id": null, //回访人员id
                            "customer_id": null, //被访人员id
                            "user_name": "张三", //回访人员姓名
                            "customer_name": null, //被访人员姓名
                            "customer_remark": null, //被访人员备注
                            "company_name": "杭州三汇", //公司名称 
                            "out_time": "2018-03-14 10:17:27", //下次回访到期的日期
                            "time_least": "20", //下次回访剩余的天数  
                            "customer_mobile":"15656565656",
                            "customer_email":"15658585858@163.com",
                            "appendixs": [//附件详细信息
                                {
                                    "id": "97378",
                                    "path": "https://huakewang.b0.upaiyun.com/2018/01/04/20180104093707896151.jpg",
                                    "width": "450",
                                    "height": "300",
                                    "alt": "",
                                    "ext": null,
                                    "size": "0",
                                    "name": null
                                },
                                {
                                    "id": "7377",
                                    "path": "https://www.huakewang.com/uploads/2013/0706/20130706032354115576.jpg",
                                    "width": "0",
                                    "height": "0",
                                    "alt": "",
                                    "ext": "jpg",
                                    "size": "21108",
                                    "name": null
                                }
                            ]
                        },
                        {
                            "id": "1", //回访记录id
                            "gd_company_id": "120", //公司id
                            "add_time": "2018-02-11 13:39:38", //回访时间
                            "score": "2", //满意度，0：不满意，1一般，2满意
                            "content": "请问最近的服务是否满意", //回访内容
                            "appendix": "_97378_07377_", //附件id
                            "user_id": null, //回访人员id
                            "customer_id": null, //被访人员id
                            "user_name": "张三", //回访人员姓名
                            "customer_name": null, //被访人员姓名
                            "customer_remark": null, //被访人员备注
                            "company_name": "杭州三汇", //公司名称 
                            "out_time": "2018-03-14 10:17:27", //下次回访到期的日期
                            "time_least": "20", //下次回访剩余的天数  
                            "customer_mobile":"15656565656",
                            "customer_email":"15658585858@163.com",
                            "appendixs": [//附件详细信息
                                {
                                    "id": "97378",
                                    "path": "https://huakewang.b0.upaiyun.com/2018/01/04/20180104093707896151.jpg",
                                    "width": "450",
                                    "height": "300",
                                    "alt": "",
                                    "ext": null,
                                    "size": "0",
                                    "name": null
                                },
                                {
                                    "id": "7377",
                                    "path": "https://www.huakewang.com/uploads/2013/0706/20130706032354115576.jpg",
                                    "width": "0",
                                    "height": "0",
                                    "alt": "",
                                    "ext": "jpg",
                                    "size": "21108",
                                    "name": null
                                }
                            ]
                        },
                        {
                            "id": "1", //回访记录id
                            "gd_company_id": "120", //公司id
                            "add_time": "2018-02-11 13:39:38", //回访时间
                            "score": "2", //满意度，0：不满意，1一般，2满意
                            "content": "请问最近的服务是否满意", //回访内容
                            "appendix": "_97378_07377_", //附件id
                            "user_id": null, //回访人员id
                            "customer_id": null, //被访人员id
                            "user_name": "张三", //回访人员姓名
                            "customer_name": null, //被访人员姓名
                            "customer_remark": null, //被访人员备注
                            "company_name": "杭州三汇", //公司名称 
                            "out_time": "2018-03-14 10:17:27", //下次回访到期的日期
                            "time_least": "20", //下次回访剩余的天数  
                            "customer_mobile":"15656565656",
                            "customer_email":"15658585858@163.com",
                            "appendixs": [//附件详细信息
                                {
                                    "id": "97378",
                                    "path": "https://huakewang.b0.upaiyun.com/2018/01/04/20180104093707896151.jpg",
                                    "width": "450",
                                    "height": "300",
                                    "alt": "",
                                    "ext": null,
                                    "size": "0",
                                    "name": null
                                },
                                {
                                    "id": "7377",
                                    "path": "https://www.huakewang.com/uploads/2013/0706/20130706032354115576.jpg",
                                    "width": "0",
                                    "height": "0",
                                    "alt": "",
                                    "ext": "jpg",
                                    "size": "21108",
                                    "name": null
                                }
                            ]
                        },
                        {
                            "id": "1", //回访记录id
                            "gd_company_id": "120", //公司id
                            "add_time": "2018-02-11 13:39:38", //回访时间
                            "score": "2", //满意度，0：不满意，1一般，2满意
                            "content": "请问最近的服务是否满意", //回访内容
                            "appendix": "_97378_07377_", //附件id
                            "user_id": null, //回访人员id
                            "customer_id": null, //被访人员id
                            "user_name": "张三", //回访人员姓名
                            "customer_name": null, //被访人员姓名
                            "customer_remark": null, //被访人员备注
                            "company_name": "杭州三汇", //公司名称 
                            "out_time": "2018-03-14 10:17:27", //下次回访到期的日期
                            "time_least": "20", //下次回访剩余的天数  
                            "customer_mobile":"15656565656",
                            "customer_email":"15658585858@163.com",
                            "appendixs": [//附件详细信息
                                {
                                    "id": "97378",
                                    "path": "https://huakewang.b0.upaiyun.com/2018/01/04/20180104093707896151.jpg",
                                    "width": "450",
                                    "height": "300",
                                    "alt": "",
                                    "ext": null,
                                    "size": "0",
                                    "name": null
                                },
                                {
                                    "id": "7377",
                                    "path": "https://www.huakewang.com/uploads/2013/0706/20130706032354115576.jpg",
                                    "width": "0",
                                    "height": "0",
                                    "alt": "",
                                    "ext": "jpg",
                                    "size": "21108",
                                    "name": null
                                }
                            ]
                        },
                        {
                            "id": "1", //回访记录id
                            "gd_company_id": "120", //公司id
                            "add_time": "2018-02-11 13:39:38", //回访时间
                            "score": "2", //满意度，0：不满意，1一般，2满意
                            "content": "请问最近的服务是否满意", //回访内容
                            "appendix": "_97378_07377_", //附件id
                            "user_id": null, //回访人员id
                            "customer_id": null, //被访人员id
                            "user_name": "张三", //回访人员姓名
                            "customer_name": null, //被访人员姓名
                            "customer_remark": null, //被访人员备注
                            "company_name": "杭州三汇", //公司名称 
                            "out_time": "2018-03-14 10:17:27", //下次回访到期的日期
                            "time_least": "20", //下次回访剩余的天数  
                            "customer_mobile":"15656565656",
                            "customer_email":"15658585858@163.com",
                            "appendixs": [//附件详细信息
                                {
                                    "id": "97378",
                                    "path": "https://huakewang.b0.upaiyun.com/2018/01/04/20180104093707896151.jpg",
                                    "width": "450",
                                    "height": "300",
                                    "alt": "",
                                    "ext": null,
                                    "size": "0",
                                    "name": null
                                },
                                {
                                    "id": "7377",
                                    "path": "https://www.huakewang.com/uploads/2013/0706/20130706032354115576.jpg",
                                    "width": "0",
                                    "height": "0",
                                    "alt": "",
                                    "ext": "jpg",
                                    "size": "21108",
                                    "name": null
                                }
                            ]
                        },
                        {
                            "id": "1", //回访记录id
                            "gd_company_id": "120", //公司id
                            "add_time": "2018-02-11 13:39:38", //回访时间
                            "score": "2", //满意度，0：不满意，1一般，2满意
                            "content": "请问最近的服务是否满意", //回访内容
                            "appendix": "_97378_07377_", //附件id
                            "user_id": null, //回访人员id
                            "customer_id": null, //被访人员id
                            "user_name": "张三", //回访人员姓名
                            "customer_name": null, //被访人员姓名
                            "customer_remark": null, //被访人员备注
                            "company_name": "杭州三汇", //公司名称 
                            "out_time": "2018-03-14 10:17:27", //下次回访到期的日期
                            "time_least": "20", //下次回访剩余的天数  
                            "customer_mobile":"15656565656",
                            "customer_email":"15658585858@163.com",
                            "appendixs": [//附件详细信息
                                {
                                    "id": "97378",
                                    "path": "https://huakewang.b0.upaiyun.com/2018/01/04/20180104093707896151.jpg",
                                    "width": "450",
                                    "height": "300",
                                    "alt": "",
                                    "ext": null,
                                    "size": "0",
                                    "name": null
                                },
                                {
                                    "id": "7377",
                                    "path": "https://www.huakewang.com/uploads/2013/0706/20130706032354115576.jpg",
                                    "width": "0",
                                    "height": "0",
                                    "alt": "",
                                    "ext": "jpg",
                                    "size": "21108",
                                    "name": null
                                }
                            ]
                        },
                        {
                            "id": "1", //回访记录id
                            "gd_company_id": "120", //公司id
                            "add_time": "2018-02-11 13:39:38", //回访时间
                            "score": "2", //满意度，0：不满意，1一般，2满意
                            "content": "请问最近的服务是否满意", //回访内容
                            "appendix": "_97378_07377_", //附件id
                            "user_id": null, //回访人员id
                            "customer_id": null, //被访人员id
                            "user_name": "张三", //回访人员姓名
                            "customer_name": null, //被访人员姓名
                            "customer_remark": null, //被访人员备注
                            "company_name": "杭州三汇", //公司名称 
                            "out_time": "2018-03-14 10:17:27", //下次回访到期的日期
                            "time_least": "20", //下次回访剩余的天数  
                            "customer_mobile":"15656565656",
                            "customer_email":"15658585858@163.com",
                            "appendixs": [//附件详细信息
                                {
                                    "id": "97378",
                                    "path": "https://huakewang.b0.upaiyun.com/2018/01/04/20180104093707896151.jpg",
                                    "width": "450",
                                    "height": "300",
                                    "alt": "",
                                    "ext": null,
                                    "size": "0",
                                    "name": null
                                },
                                {
                                    "id": "7377",
                                    "path": "https://www.huakewang.com/uploads/2013/0706/20130706032354115576.jpg",
                                    "width": "0",
                                    "height": "0",
                                    "alt": "",
                                    "ext": "jpg",
                                    "size": "21108",
                                    "name": null
                                }
                            ]
                        },
                        {
                            "id": "1", //回访记录id
                            "gd_company_id": "120", //公司id
                            "add_time": "2018-02-11 13:39:38", //回访时间
                            "score": "2", //满意度，0：不满意，1一般，2满意
                            "content": "请问最近的服务是否满意", //回访内容
                            "appendix": "_97378_07377_", //附件id
                            "user_id": null, //回访人员id
                            "customer_id": null, //被访人员id
                            "user_name": "张三", //回访人员姓名
                            "customer_name": null, //被访人员姓名
                            "customer_remark": null, //被访人员备注
                            "company_name": "杭州三汇", //公司名称 
                            "out_time": "2018-03-14 10:17:27", //下次回访到期的日期
                            "time_least": "20", //下次回访剩余的天数  
                            "customer_mobile":"15656565656",
                            "customer_email":"15658585858@163.com",
                            "appendixs": [//附件详细信息
                                {
                                    "id": "97378",
                                    "path": "https://huakewang.b0.upaiyun.com/2018/01/04/20180104093707896151.jpg",
                                    "width": "450",
                                    "height": "300",
                                    "alt": "",
                                    "ext": null,
                                    "size": "0",
                                    "name": null
                                },
                                {
                                    "id": "7377",
                                    "path": "https://www.huakewang.com/uploads/2013/0706/20130706032354115576.jpg",
                                    "width": "0",
                                    "height": "0",
                                    "alt": "",
                                    "ext": "jpg",
                                    "size": "21108",
                                    "name": null
                                }
                            ]
                        },
                        {
                            "id": "1", //回访记录id
                            "gd_company_id": "120", //公司id
                            "add_time": "2018-02-11 13:39:38", //回访时间
                            "score": "2", //满意度，0：不满意，1一般，2满意
                            "content": "请问最近的服务是否满意", //回访内容
                            "appendix": "_97378_07377_", //附件id
                            "user_id": null, //回访人员id
                            "customer_id": null, //被访人员id
                            "user_name": "张三", //回访人员姓名
                            "customer_name": null, //被访人员姓名
                            "customer_remark": null, //被访人员备注
                            "company_name": "杭州三汇", //公司名称 
                            "out_time": "2018-03-14 10:17:27", //下次回访到期的日期
                            "time_least": "20", //下次回访剩余的天数  
                            "customer_mobile":"15656565656",
                            "customer_email":"15658585858@163.com",
                            "appendixs": [//附件详细信息
                                {
                                    "id": "97378",
                                    "path": "https://huakewang.b0.upaiyun.com/2018/01/04/20180104093707896151.jpg",
                                    "width": "450",
                                    "height": "300",
                                    "alt": "",
                                    "ext": null,
                                    "size": "0",
                                    "name": null
                                },
                                {
                                    "id": "7377",
                                    "path": "https://www.huakewang.com/uploads/2013/0706/20130706032354115576.jpg",
                                    "width": "0",
                                    "height": "0",
                                    "alt": "",
                                    "ext": "jpg",
                                    "size": "21108",
                                    "name": null
                                }
                            ]
                        },
                        {
                            "id": "1", //回访记录id
                            "gd_company_id": "120", //公司id
                            "add_time": "2018-02-11 13:39:38", //回访时间
                            "score": "2", //满意度，0：不满意，1一般，2满意
                            "content": "请问最近的服务是否满意", //回访内容
                            "appendix": "_97378_07377_", //附件id
                            "user_id": null, //回访人员id
                            "customer_id": null, //被访人员id
                            "user_name": "张三", //回访人员姓名
                            "customer_name": null, //被访人员姓名
                            "customer_remark": null, //被访人员备注
                            "company_name": "杭州三汇", //公司名称 
                            "out_time": "2018-03-14 10:17:27", //下次回访到期的日期
                            "time_least": "20", //下次回访剩余的天数  
                            "customer_mobile":"15656565656",
                            "customer_email":"15658585858@163.com",
                            "appendixs": [//附件详细信息
                                {
                                    "id": "97378",
                                    "path": "https://huakewang.b0.upaiyun.com/2018/01/04/20180104093707896151.jpg",
                                    "width": "450",
                                    "height": "300",
                                    "alt": "",
                                    "ext": null,
                                    "size": "0",
                                    "name": null
                                },
                                {
                                    "id": "7377",
                                    "path": "https://www.huakewang.com/uploads/2013/0706/20130706032354115576.jpg",
                                    "width": "0",
                                    "height": "0",
                                    "alt": "",
                                    "ext": "jpg",
                                    "size": "21108",
                                    "name": null
                                }
                            ]
                        },
                        {
                            "id": "1", //回访记录id
                            "gd_company_id": "120", //公司id
                            "add_time": "2018-02-11 13:39:38", //回访时间
                            "score": "2", //满意度，0：不满意，1一般，2满意
                            "content": "请问最近的服务是否满意", //回访内容
                            "appendix": "_97378_07377_", //附件id
                            "user_id": null, //回访人员id
                            "customer_id": null, //被访人员id
                            "user_name": "张三", //回访人员姓名
                            "customer_name": null, //被访人员姓名
                            "customer_remark": null, //被访人员备注
                            "company_name": "杭州三汇", //公司名称 
                            "out_time": "2018-03-14 10:17:27", //下次回访到期的日期
                            "time_least": "20", //下次回访剩余的天数  
                            "customer_mobile":"15656565656",
                            "customer_email":"15658585858@163.com",
                            "appendixs": [//附件详细信息
                                {
                                    "id": "97378",
                                    "path": "https://huakewang.b0.upaiyun.com/2018/01/04/20180104093707896151.jpg",
                                    "width": "450",
                                    "height": "300",
                                    "alt": "",
                                    "ext": null,
                                    "size": "0",
                                    "name": null
                                },
                                {
                                    "id": "7377",
                                    "path": "https://www.huakewang.com/uploads/2013/0706/20130706032354115576.jpg",
                                    "width": "0",
                                    "height": "0",
                                    "alt": "",
                                    "ext": "jpg",
                                    "size": "21108",
                                    "name": null
                                }
                            ]
                        },
                        {
                            "id": "1", //回访记录id
                            "gd_company_id": "120", //公司id
                            "add_time": "2018-02-11 13:39:38", //回访时间
                            "score": "2", //满意度，0：不满意，1一般，2满意
                            "content": "请问最近的服务是否满意", //回访内容
                            "appendix": "_97378_07377_", //附件id
                            "user_id": null, //回访人员id
                            "customer_id": null, //被访人员id
                            "user_name": "张三", //回访人员姓名
                            "customer_name": null, //被访人员姓名
                            "customer_remark": null, //被访人员备注
                            "company_name": "杭州三汇", //公司名称 
                            "out_time": "2018-03-14 10:17:27", //下次回访到期的日期
                            "time_least": "20", //下次回访剩余的天数  
                            "customer_mobile":"15656565656",
                            "customer_email":"15658585858@163.com",
                            "appendixs": [//附件详细信息
                                {
                                    "id": "97378",
                                    "path": "https://huakewang.b0.upaiyun.com/2018/01/04/20180104093707896151.jpg",
                                    "width": "450",
                                    "height": "300",
                                    "alt": "",
                                    "ext": null,
                                    "size": "0",
                                    "name": null
                                },
                                {
                                    "id": "7377",
                                    "path": "https://www.huakewang.com/uploads/2013/0706/20130706032354115576.jpg",
                                    "width": "0",
                                    "height": "0",
                                    "alt": "",
                                    "ext": "jpg",
                                    "size": "21108",
                                    "name": null
                                }
                            ]
                        },
                    ],
                    "total_count": "1"
                }
            }
            if(res.success){
                this.setState({
                    visitLists:res.data
                });
                this.getPersonDetails(res.data.customer_id);
            }
            
        },
        this.handlePersonalGet=(res)=>{
            console.log(res);
            res = {
                "success": true,
                "data": {
                    "id": "4",
                    "is_in_survey": "0", //是否参与调研，0：否，1：是
                    "user_id": "70083",
                    "username": "13291831252", //username
                    "nick_name": "hkw9183125", //昵称
                    "real_name": "陈哲", //实名
                    "email": null, //邮箱
                    "mobile": "13291831252", //电话
                    "job_name": "UI设计师"	//职位
                }
            }
            if (res.success) {
                this.setState({
                    personalDetail:res.data
                })
            }
        }

    }
    componentDidMount() {
        init('plusMsg');
        runPromise('get_company_list', {   //获取公司列表
            offset: "0",
            limit: "20"
        }, this.handleCompanyListGet, false, "post");
        runPromise('get_visit_back_list', {   //获取回访列表
            gd_company_id: "0",
            offset: "0",
            limit: "20",
            score: "-1",
            timeOut: "-1",
            work_status: "-1"
        }, this.handleVisitGet, false, "post");
    }
    getPersonDetails(id){
        runPromise('get_user_info', {   //获取联系人信息
            user_id:id
        }, this.handlePersonalGet, false, "post");
    }
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }
    show = (showIndex) => {
        console.log(showIndex);
        if(this.state.isShow == showIndex) {
            this.setState({
                isShow: -1
            })
        }else{
            this.setState({
                isShow: showIndex
            })
        }
        
    }
    changeAlert = () => {
        this.setState({
            alertShow: !this.state.alertShow
        })
    }
    closeAlert = () => {
        this.setState({
            alertShow: false
        })
    }
    render() {
        const { files } = this.state;
        return (
            <div id="capture" className="visitWrap visitRecordWrap" style={{ backgroundColor: "#eeeeee" }}>
                <TableHeads
                    url={urls.wordMsg}
                    isHide={false}
                    tag={<h3 className="fn-left">质 检</h3>}
                ></TableHeads>
                <div className="mainWrap">
                    <div className="mainWrapLeft">
                        <p className="allQuality"><span>全部</span><i>{this.state.companyLists.total_count}</i></p>
                        <ul>
                            {
                                this.state.companyLists.item_list.map((value,idx)=>(
                                    <li>
                                        <a href={"#visit?" + idx + "F"} name={"visit?" + idx + "F"}>
                                            <p style={{color:"#fff"}}><span>{value.company_name}</span><i>{value.visit_back_count}</i></p>
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="mainWrapRight">
                        <p className="which">
                            <input type="checkbox" /> 不满意处理<span></span><input type="checkbox" /> 到期<span></span><input type="checkbox" /> 已离职
                        </p>
                        {/* <ul className="details">
                            <li className="fullWidth">
                                <div className="top">
                                    <ul className="fn-left">
                                        <li><i></i></li>
                                        <li>张兰</li>
                                        <li style={{ color: "#ADADAD" }}>杭州画客科技有限公司</li>
                                        <li style={{ color: "#ADADAD" }}>总经理</li>
                                    </ul>
                                    <span className="slideDown iconfont icon-tubiao-" onClick={()=>this.show()}></span>
                                </div>
                                <div className="btm">
                                    <div className="btmLeft">
                                        <h4>不满意</h4>
                                        <p>设计师迟到，态度不好</p>
                                    </div>
                                    <div className="btmCenter">
                                        <span className="dataNum" style={{ color: "red" }}>5</span>
                                        <div className="explain">
                                            <p className="end" style={{ color: "red" }}>天到期</p>
                                            <p className="prey" style={{ color: "#ADADAD" }}>02-03</p>
                                        </div>
                                    </div>
                                    <div className="btmRight">
                                        <button>回访结果</button>
                                    </div>
                                </div>
                                <div className="attach" style={{display:this.state.show?"block":"none"}}>
                                    <div className="attachTop">
                                        手机：15856595686<span></span>邮箱：13565854858@qq.com<span></span>微信：15848486845<span></span>QQ：11452565684
                                        <p>2014年涣发大号书法家爱大家撒，上大街上的，上的那时间段内啥</p>
                                    </div>
                                    <div className="attachList">
                                        <ul className="attachListUl">
                                            <li>
                                                <div style={{ overflow: "hidden" }}>
                                                    <span className="attachListLeft"><i className="iconfont icon-sanjiao1"></i>满意 <i className="date">12-03</i></span>
                                                    <span className="attachListRight">12月</span>
                                                </div>
                                                <p>附加信息</p>
                                                <ul>
                                                    <li>
                                                        <img src={urls.addPic} />
                                                    </li>
                                                    <li>
                                                        <img src={urls.addPic} />
                                                    </li>
                                                    <li>
                                                        <img src={urls.addPic} />
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul> */}
                        {/* <Quality show={}></Quality> */}
                        {/* {
                            this.state.list.map((value, index) => (
                                this.state.showIndex == index && this.state.open ?
                                    <Quality visitLis={this.state.visitLists.item_list} isShow={true} index={index} show={this.show} changeAlert={this.changeAlert}></Quality>
                                    :
                                    <Quality visitLis={this.state.visitLists.item_list} isShow={false} index={index} show={this.show} changeAlert={this.changeAlert}></Quality>
                            ))
                        } */}
                        {
                            <Quality
                                visitLis={this.state.visitLists.item_list}
                                isShow={this.state.isShow}
                                show={this.show}
                                changeAlert={this.changeAlert}>
                            </Quality>
                        }
                        
                        
                        <div className="alertModalBg" style={{ display: this.state.alertShow ? "block" : "none" }}></div>
                        <div className="alertModal" style={{ display: this.state.alertShow ? "block" : "none" }}>
                            <i className="icon-icon_chahao iconfont" onClick={this.closeAlert}></i>
                            <p className="which" style={{ textAlign: "center" }}>
                                <input type="checkbox" /> 满意<span></span><input type="checkbox" /> 不满意<span></span><input type="checkbox" /> 已离职
                            </p>
                            <textarea id="plusMsg" placeholder="附加信息："></textarea>
                            <ImagePicker
                                files={files}
                                onChange={this.onChange}
                                onImageClick={(index, fs) => console.log(index, fs)}
                                selectable={files.length < 4}
                                accept="image/gif,image/jpeg,image/jpg,image/png"
                            />
                            <button>提 交</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}