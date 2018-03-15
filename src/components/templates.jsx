import { Link, hashHistory } from "react-router";
import { Toast } from 'antd-mobile';

const urls = {
    wordMsg: require('../images/wordMsg.png'),
    addPic: require('../images/addPic.png')
}

export const TableHead = (props) => (     
    <div className="tableHead" style={{paddingTop:'20px',position:"fixed",width:"100%",top:"0",left:"0"}}>
        <div className="leftLogoWord fn-left"><i className="iconfont icon-jiantou"></i>返回</div>
        <Link to='/'><img src={props.url} className="fn-right" /></Link>
    </div>
)
export const TableHeads = (props) => (    //公共头部  
    <div className="tableHead" style={{ paddingTop: '20px',position:"fixed",width:"100%",top:"0",left:"0"}}>
        <div className="leftLogoWord fn-left" onClick={() => {
            hashHistory.push({
                pathname: '/customs'
            })}}><i className="iconfont icon-jiantou"></i>返回</div>
        {
            props.isHide ? "" : props.tag
        }
        <Link to='/'><img src={props.url} className="fn-right" /></Link>
    </div>
)
export const TableHeadOne = (props) => (    //公共头部  
    <div className="tableHead" style={{ paddingTop: '20px',position:"fixed",width:"100%",top:"0",left:"0"}}>
        <div className="leftLogoWord fn-left" onClick={() => {hashHistory.go(-1)}}><i className="iconfont icon-jiantou"></i>返回</div>
        {
            props.isHide ? "" : props.tag
        }
        <Link to='/'><img src={props.url} className="fn-right" /></Link>
    </div>
)
export const TableHeadServey = (props) => (    //公共头部  
    <div className="tableHead" style={{ paddingTop: '20px',position:"static",width:"100%",top:"0",left:"0"}}>
        <div className="leftLogoWord fn-left" onClick={() => {
            hashHistory.push({
                pathname: '/guide'
            })}}><i className="iconfont icon-jiantou"></i>返回</div>
        {
            props.isHide ? "" : props.tag
        }
        <Link to='/'><img src={props.url} className="fn-right" /></Link>
    </div>
)
export const TableHeadb = (props) => (    //公共头部  
    <div className="tableHead" style={{ paddingTop: '20px',position:"fixed",width:"100%",top:"0",left:"0"}}>
        <div className="leftLogoWord fn-left" onClick={()=>{props.backPdf()}}><i className="iconfont icon-jiantou"></i>返回</div>
        {
            props.isHide ? "" : props.tag
        }
        <Link to='/'><img src={props.url} className="fn-right" /></Link>
    </div>
)
export const TableHeada = (props) => (    //公共头部  
    <div className="tableHead" style={{ paddingTop: '20px',position:"fixed",width:"100%",top:"0",left:"0"}}>
        <div className="leftLogoWord fn-left"  onClick={() => {
            hashHistory.push({
                pathname: '/'
            })  }}><i className="iconfont icon-jiantou"></i>返回</div>
        {
            props.isHide ? "" : props.tag
        }
        <Link to='/'><img src={props.url} className="fn-right" /></Link>
    </div>
)
export const GetLocationParam = (name) => {
    var url = window.location.href;
    if (~url.indexOf("?")) {
        var search = {};
        var arrayParam = url.split("?")[1].split("&");
        arrayParam.map(function (value, index, elem) {
            var key = value.split("=")[0];
            var val = value.split("=")[1];
            search[key] = val;
        });
        if (name in search) {
            return search[name];
        } else {
            return "";
        }
    }
    return "";
}
export const Customs = (props) =>(         //我的客户信息展示
    <ul className="customDetails">
        {
            props.dataList.map(function(value,index){
                return <li>
                    <div className="liWrap">
                        <div className="left fn-left">
                            <img src={value.path} style={{width:"100%"}}/>
                        </div>
                        <div className="mid fn-left">
                            <h3>
                                <Link to={'/company?tab=0&id=' + value.gd_company_id} onClick={() => { props.setBaseStateFun(value.gd_company_id,value.company_name,value.id)}}>
                                    {value.company_name}<span>{value.type == 1?"包年项目":value.type==2?"一次性项目":"调研"}</span>
                                </Link>
                            </h3>
                            <table>
                                <tr>
                                    <td style={{ width: "60px", position: "relative" }}>
                                        <span style={{
                                            float: "left",
                                            position: "absolute",
                                            left: "0",
                                            top: "0",
                                            lineHeight: "18px"
                                        }}>服务内容:</span>
                                    </td>
                                    <td className="eclipsLine" style={{ 
                                        lineHeight: "18px"
                                     }} ><pre dangerouslySetInnerHTML={{__html:value.content?value.content:"无"}} ></pre>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <table>
                                            <tr>
                                                <td style={{ width: "35px", position: "relative",height:"18px" }}>
                                                    <span style={{ 
                                                        float: "left", 
                                                        position: "absolute", 
                                                        left: "0", 
                                                        top: "0", 
                                                        lineHeight: "18px" 
                                                    }}>备注:</span>
                                                </td>
                                                <td style={{
                                                    lineHeight: "18px"
                                                }}><p>{value.remark}</p></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <table>
                                            <tr>
                                                <td style={{ width: "35px", position: "relative" }}>
                                                    <span style={{ 
                                                        float: "left", 
                                                        position: "absolute", 
                                                        left: "0", 
                                                        top: "0", 
                                                        lineHeight: "18px" 
                                                    }}>条件:</span>
                                                </td>
                                                <td style={{ lineHeight: "18px" }}><p>{value.condition}</p></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div className="right fn-right">
                            <p className="more" onClick={() => { props.setBaseStateFun(value.gd_company_id,value.company_name,value.id) }}>
                                <Link to={"/company?tab=0&id="+value.gd_company_id}><i>...</i></Link>
                            </p>
                            <ul>
                                <li>
                                    <p className="top" onClick={() => { props.setBaseStateFun(value.gd_company_id,value.company_name,value.id) }}>
                                        <Link to={"/visitRecord?tab=1&id="+value.gd_company_id}>{value.mission_count}</Link>
                                    </p>
                                    <p className="btm" style={{dispaly:"inline-block",padding:"4px 0"}} onClick={(e) => { props.addJobs(e, value.id); props.setBaseStateFun(value.gd_company_id,value.company_name,value.id)}}>任务</p>
                                </li>
                                <li>
                                    <p className="top" onClick={() => { props.setBaseStateFun(value.gd_company_id,value.company_name,value.id) }}>
                                        <Link to={"/visitLists?tab=2&id="+value.gd_company_id}>{value.record_count}</Link>
                                    </p>
                                    <p className="btm" style={{dispaly:"inline-block",padding:"4px 0"}} onClick={() => { props.setBaseStateFun(value.gd_company_id,value.company_name,value.id)}}><Link to="/scene">回访</Link></p>
                                </li>
                                <li>
                                    <p className="top" onClick={() => { props.setBaseStateFun(value.gd_company_id,value.company_name,value.id) }}>
                                        <Link to={"/meetingList?tab=3&id="+value.gd_company_id}>{value.meeting_count}</Link>
                                    </p>
                                    <p className="btm" style={{dispaly:"inline-block",padding:"4px 0"}} onClick={() => { props.setBaseStateFun(value.gd_company_id,value.company_name,value.id)}}><Link to="/meeting">纪要</Link></p>
                                </li>
                                <li>
                                    <p className="top" onClick={() => { props.setBaseStateFun(value.gd_company_id,value.company_name,value.id) }}>
                                        <Link to={"/qualityList?tab=6&id="+value.gd_company_id}>{value.check_count}</Link>
                                    </p>
                                    <p className="btm" style={{dispaly:"inline-block",padding:"4px 0"}} onClick={() => { props.setBaseStateFun(value.gd_company_id,value.company_name,value.id)}}><Link to="/quality">验收</Link></p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="person">
                        <p>相关人员 : {
                            value.user_list.length > 0?
                            value.user_list.map((val,idx)=>{
                                return (<span>{val.nick_name}<i 
                                    className="iconfont icon-shanchu"
                                    onClick={(e) => { props.delPerson(e,val.user_id,value.id); }}>
                                </i></span>)
                            }) :"暂无"
                        }
                            {/* <a style={{ marginLeft: "0.5rem" }} 
                            href="javascript:;" 
                            onClick={()=>{props.getCustomList(val.gd_company_id)}}>全部</a> */}
                            <a href="javascript:;" 
                                style={{ color:"#1067ef"}}
                                onClick={(e) => { 
                                    props.showModal(e, value.user_id); 
                                    props.setBaseStateFun(value.gd_company_id,value.company_name,value.id)
                                }}>新增</a>
                        </p>
                    </div>
                </li>
            })
        }
    </ul>
)

//我的客户信息展示
export const Customs2 = (props) => {
    let value = props.dataList;
    return(         
        <li key={props.rowID}>
            <div className="liWrap">
                <Link to={'/company?tab=0&id=' + value.gd_company_id} onClick={() => { props.setBaseStateFun(value.gd_company_id, value.company_name, value.id) }}>
                    <div className="left fn-left">
                        <img src={value.path} style={{ width: "100%" }} />
                    </div>
                </Link>
                
                <Link to={'/company?tab=0&id=' + value.gd_company_id} onClick={(e) => { 
                        props.setBaseStateFun(value.gd_company_id, value.company_name, value.id)
                    }}>
                    <div className="mid fn-left">
                                <h3>
                                    {value.company_name}<span>{value.type == 1 ? "包年项目" : value.type == 2 ? "一次性项目" : "调研"}</span>
                                </h3>
                        <table>
                            <tr>
                                <td style={{ width: "60px", position: "relative" }}>
                                    <span style={{
                                        float: "left",
                                        position: "absolute",
                                        left: "0",
                                        top: "0",
                                        lineHeight: "18px"
                                    }}>服务内容:</span>
                                </td>
                                <td className="eclipsLine" style={{ lineHeight: "18px" }}>
                                    {/* <p>{value.content ? value.content : "无"}</p> */}
                                    <p dangerouslySetInnerHTML={{__html:value.content?value.content:"无"}} ></p>                                
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <table>
                                        <tr>
                                            <td style={{ width: "60px", position: "relative", height: "18px" }}>
                                                <span style={{
                                                    float: "left",
                                                    position: "absolute",
                                                    left: "0",
                                                    top: "0",
                                                    lineHeight: "18px"
                                                }}>备注:</span>
                                            </td>
                                            <td style={{
                                                lineHeight: "18px"
                                            }}><p>{value.remark}</p></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            {
                                value.condition.length > 2?<tr>
                                    <td colSpan="2">
                                        <table>
                                            <tr>
                                                <td style={{ width: "60px", position: "relative" }}>
                                                    <span style={{
                                                        float: "left",
                                                        position: "absolute",
                                                        left: "0",
                                                        top: "0",
                                                        lineHeight: "18px"
                                                    }}>条件:</span>
                                                </td>
                                                <td style={{ lineHeight: "18px" }}><p>{value.condition}</p></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>:''
                            }
                            
                        </table>
                    </div>
                </Link>
                <div className="right fn-right">
                    <p className="more" onClick={() => { props.setBaseStateFun(value.gd_company_id, value.company_name, value.id) }}>
                        <Link to={"/company?tab=0&id=" + value.gd_company_id}><i style={{width:"40px",display:"inline-block",textAlign:"right"}}>...</i></Link>
                    </p>
                    <ul>
                        <li>
                            <Link to={"/visitRecord?tab=1&id=" + value.gd_company_id}>
                                <p className="top" onClick={() => { props.setBaseStateFun(value.gd_company_id, value.company_name, value.id) }}>
                                    {value.mission_count}
                                </p>
                            </Link>
                            <p className="btm" style={{ dispaly: "inline-block", padding: "4px 0" }} onClick={(e) => { props.addJobs(e, value.id); props.setBaseStateFun(value.gd_company_id, value.company_name, value.id) }}>任务</p>
                        </li>
                        <li>
                            <Link to={"/visitLists?tab=2&id=" + value.gd_company_id}>
                                <p className="top" onClick={() => { props.setBaseStateFun(value.gd_company_id, value.company_name, value.id) }}>
                                    {value.record_count}
                                </p>
                            </Link>
                            <Link to="/scene">
                                <p className="btm" style={{ dispaly: "inline-block", padding: "4px 0" }} onClick={() => { props.setBaseStateFun(value.gd_company_id, value.company_name, value.id) }}>回访</p>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/meetingList?tab=3&id=" + value.gd_company_id}>
                                <p className="top" onClick={() => { props.setBaseStateFun(value.gd_company_id, value.company_name, value.id) }}>
                                {value.meeting_count}
                                </p>
                            </Link>
                            <Link to="/meeting"><p className="btm" style={{ dispaly: "inline-block", padding: "4px 0" }} onClick={() => { props.setBaseStateFun(value.gd_company_id, value.company_name, value.id) }}>纪要</p></Link>
                        </li>
                        <li>
                            <Link to={"/qualityList?tab=6&id=" + value.gd_company_id}>
                                <p className="top" onClick={() => { props.setBaseStateFun(value.gd_company_id, value.company_name, value.id) }}>
                                    {value.check_count}
                                </p>
                            </Link>
                            <Link to="/quality"><p className="btm" style={{ dispaly: "inline-block", padding: "4px 0" }} onClick={() => { props.setBaseStateFun(value.gd_company_id, value.company_name, value.id) }}>验收</p></Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="line"></div>
            <div className="person">
                <p>相关人员 : {
                    value.user_list.length > 0 ?
                        value.user_list.map((val, idx) => {
                            return (<span>{val.nick_name}<i
                                className="iconfont icon-shanchu"
                                onClick={(e) => { props.delPerson(e, val.user_id, value.id); }}>
                            </i></span>)
                        }) : "暂无"
                }
                    {/* <a style={{ marginLeft: "0.5rem" }} 
                        href="javascript:;" 
                        onClick={()=>{props.getCustomList(val.gd_company_id)}}>全部</a> */}
                    <a href="javascript:;"
                        style={{ color: "#1067ef" }}
                        onClick={(e) => {
                            props.showModal(e, value.user_id);
                            props.setBaseStateFun(value.gd_company_id, value.company_name, value.id)
                        }}>新增</a>
                </p>
            </div>
        </li>
    )
}

export const Quality2 = (props) => {
    let value = props.visitLis;
    let idx = props.visitLis.id;
    return (
        <li key={props.rowID} className="fullWidth" id={"visit?" + value.gd_company_id + "F"}>
            <div className="top">
                <ul className="fn-left">
                    <li><i></i></li>
                    <li>{value.customer_name}</li>
                    <li style={{ color: "#ADADAD", margin: "0 5px" }}>{value.company_name}</li>
                    <li style={{ color: "#ADADAD" }}>{value.job_name}</li>
                </ul>
                <span className="slideDown iconfont icon-tubiao-" onClick={() => props.show()}></span>
            </div>
            <div className="btm">
                <div className="btmLeft">
                    {
                        value.score == 2 ? <h4 style={{ color: "red" }}>不满意</h4> : value.score == 5 ? <h4 style={{ color: "red" }}>已离职</h4> : <h4>满意</h4>
                    }
                    <p>{value.content}</p>
                </div>
                <div className="btmCenter">
                    {
                        value.time_least <= 0 ? <div className="explain"><p className="end" style={{ color: "red", fontSize: "18px" }}>逾期{Math.abs(value.time_least)}天</p></div> :
                            value.time_least > 7 ? <div>
                                <span className="dataNum">{value.time_least}</span>
                                <div className="explain">
                                    <p className="end" >天到期</p>
                                    <p className="prey" style={{ color: "#ADADAD" }}>{(value.out_time + '').split(" ")[0].split("-").slice(1).join("-")}</p>
                                </div>
                            </div> : <div>
                                    <span className="dataNum" style={{ color: "red" }}>{value.time_least}</span>
                                    <div className="explain">
                                        <p className="end" style={{ color: "red" }}>天到期</p>
                                        <p className="prey" style={{ color: "#ADADAD" }}>{(value.out_time + '').split(" ")[0].split("-").slice(1).join("-")}</p>
                                    </div>
                                </div>
                    }
                </div>
                <div className="btmRight">
                    {
                        value.time_least > 7 ?
                            <button style={{
                                backgroundColor: "#E6E6E6",
                                color: "#333"
                            }} onClick={() => { props.changeAlert(value.gd_company_id, value.id, value.customer_id) }}>回访结果</button> :
                            value.time_least > 0 && value.time_least < 7 ?
                                <button style={{ backgroundColor: "#0DA0F4" }} onClick={() => { props.changeAlert(value.gd_company_id, value.id) }}>回访结果</button> :
                                <button onClick={() => { props.changeAlert(value.gd_company_id, value.id) }}>回访结果</button>
                    }
                </div>
            </div>
            <div className="attach" style={{ display: props.isShow ? "block" : "none" }}>
                <div className="attachTop">
                    手机：{value.customer_mobile}<span></span>邮箱：{value.customer_email}
                    <p>{value.remark}</p>
                </div>
                <div className="attachList">
                    <ul className="attachListUl">
                        <li>
                            <div style={{ overflow: "hidden" }}>
                                <span className="attachListLeft"><i className="iconfont icon-sanjiao1"></i>{value.score == 2 ? "满意" : value.score == 1 ? "一般" : "不满意"} <i className="date">{(value.add_time + '').split(" ")[0].split("-").slice(1).join("-")}</i></span>
                                <span className="attachListRight">{(value.add_time + '').split(" ")[0].split("-")[1]}月</span>
                            </div>
                            <p>附加信息</p>
                            <ul>
                                {
                                    value.appendixs && value.appendixs.map((value) => (
                                        <li style={{ width: "3.5rem", height: "2.8rem" }}>
                                            <img src={value.path} style={{ width: "100%" }} />
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </li>
    )
}

export const Quality = (props) => (
    <ul className="details">
        {
            props.visitLis.map((value,idx)=>{ 
                return(
                    <li className="fullWidth" id={"visit?" + value.gd_company_id + "F"}>
                    <div className="top">
                        <ul className="fn-left">
                            <li><i></i></li>
                            <li>{value.user_name}</li>
                            <li style={{ color: "#ADADAD" ,margin:"0 5px"}}>{value.company_name}</li>
                            <li style={{ color: "#ADADAD" }}>{value.job_name}</li>
                        </ul>
                        <span className="slideDown iconfont icon-tubiao-" onClick={() => props.show(idx)}></span>
                    </div>
                    <div className="btm">
                        <div className="btmLeft">
                            {
                                value.score == 2 ? <h4 style={{ color: "red" }}>不满意</h4> : value.score == 5 ? <h4 style={{ color: "red" }}>已离职</h4>:<h4>满意</h4>
                            }
                            <p>{value.content}</p>
                        </div>
                        <div className="btmCenter">
                        {
                            value.time_least <= 0 ? <div className="explain"><p className="end" style={{ color: "red", fontSize: "18px" }}>逾期{Math.abs(value.time_least)}天</p></div>:
                                value.time_least > 7? <div>
                                    <span className="dataNum">{value.time_least}</span>
                                    <div className="explain">
                                        <p className="end" >天到期</p>
                                        <p className="prey" style={{ color: "#ADADAD" }}>{(value.out_time + '').split(" ")[0].split("-").slice(1).join("-")}</p>
                                    </div>
                                </div> : <div>
                                        <span className="dataNum" style={{ color: "red" }}>{value.time_least}</span>
                                        <div className="explain">
                                            <p className="end" style={{ color: "red" }}>天到期</p>
                                            <p className="prey" style={{ color: "#ADADAD" }}>{(value.out_time + '').split(" ")[0].split("-").slice(1).join("-")}</p>
                                        </div>
                                    </div>
                        }
                        </div>
                        <div className="btmRight">
                            {
                                value.time_least > 7 ? 
                                    <button style={{ 
                                        backgroundColor:"#E6E6E6",
                                        color:"#333"
                                    }} onClick={() => { props.changeAlert(value.gd_company_id,value.id) }}>回访结果</button> :
                                    value.time_least>0 && value.time_least<7 ?
                                    <button style={{ backgroundColor:"#0DA0F4"}} onClick={() => { props.changeAlert(value.gd_company_id,value.id) }}>回访结果</button>:
                                    <button onClick={() => { props.changeAlert(value.gd_company_id,value.id) }}>回访结果</button>
                            }
                        </div>
                    </div>
                    <div className="attach" style={{ display: props.isShow == idx ? "block" : "none" }}>
                        <div className="attachTop">
                            手机：{value.customer_mobile}<span></span>邮箱：{value.customer_email}
                            <p>{value.remark}</p>
                        </div>
                        <div className="attachList">
                            <ul className="attachListUl">
                                <li>
                                    <div style={{ overflow: "hidden" }}>
                                        <span className="attachListLeft"><i className="iconfont icon-sanjiao1"></i>{value.score == 2 ? "满意" : value.score == 1 ? "一般" : "不满意"} <i className="date">{(value.add_time + '').split(" ")[0].split("-").slice(1).join("-")}</i></span>
                                        <span className="attachListRight">{(value.add_time + '').split(" ")[0].split("-")[1]}月</span>
                                    </div>
                                    <p>附加信息</p>
                                    <ul>
                                        {
                                            value.appendixs.map((value)=>(
                                                <li style={{width:"3.5rem",height:"2.8rem"}}>
                                                    <img src={value.path} style={{width:"100%"}}/>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
            )})
        }
        
    </ul>
)

// export const div2png = (dom, name) => {
//     html2canvas(dom, {
//         onrendered: function (canvas) {
//             canvas.id = "mycanvas";
//             document.body.appendChild(canvas);

//             var newCanvas = document.getElementById("mycanvas");
//             var type = "png";
//             var imgData = newCanvas.toDataURL(type);
//             var _fixType = function (type) {
//                 type = type.toLowerCase().replace(/jpg/i, 'jpeg');
//                 var r = type.match(/png|jpeg|bmp|gif/)[0];
//                 return 'image/' + r;
//             };
//             runPromise('upload_image_byw_upy2', {
//                 "arr": imgData
//             }, (res) => {
//                 alert(res.data.path);
//                 download(res.data.path);
//             }, false, "post");
//             // imgData = imgData.replace(_fixType(type), 'image/octet-stream');
            
//             // var saveFile = function (data, filename) {
//             //     var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
//             //     save_link.href = data;
//             //     save_link.download = filename;

//             //     var event = document.createEvent('MouseEvents');
//             //     event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
//             //     save_link.dispatchEvent(event);
//             // };
//             // // 下载后的问题名
//             // var filename = name + '_' + (new Date()).getTime() + '.' + type;
//             // // download
//             // saveFile(imgData, filename);
//             // //   $("#mycanvas").remove();
//             // newCanvas.remove();
//         },
//         useCORS: true
//     });
// }

// export const readyDo = () => {
//     var filename = document.getElementById("filename");
//     // var filename={};
//     var btnGenerate = document.getElementById("btnGenerate");
//     var downloadPng = document.getElementById("downloadPng");
//     let dom = document.getElementById("fromHTMLtestdiv");
//     downloadPng.onclick =  () => {
//         div2png(fromHTMLtestdiv, 'png')
//     }
// }
function download(src) {
    var $a = document.createElement('a');
    $a.setAttribute("href", src);
    $a.setAttribute("download", "");

    var evObj = document.createEvent('MouseEvents');
    evObj.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
    $a.dispatchEvent(evObj);
};

export const readyDo = (a) => {
    // var base64text = document.getElementById("base64text");
    // var filename = document.getElementById("filename");
    // var filename={};
    var btnGenerate = document.getElementById("btnGenerate");
    var downloadPng = document.getElementById("downloadPng");
    let dom = document.getElementById("fromHTMLtestdiv");
    // let download = document.getElementById("download");
    var MIME = {
        "application/x-zip-compressed": "zip",
        "application/javascript": "js",
        "text/css": "css",
        "text/plain": "txt",
        "text/html": "html",
        "text/xml": "xml",
        "image/jpeg": "jpeg",
        "image/png": "png",
        "image/gif": "gif",
        "image/svg+xml": "svg"
    };
    //文件名默认当前时间戳  
    // filename.value = Date.now();
    //检测点击下载按钮  
    downloadPng.addEventListener("click", function (e) {
        var width = dom.offsetWidth;  // 获取(原生）dom 宽度
        var height = dom.offsetHeight; // 获取(原生）dom 高
        var offsetTop = dom.offsetTop;  //元素距离顶部的偏移量

        // var getPixelRatio = function (context) {
        //     var backingStore = context.backingStorePixelRatio ||
        //         context.webkitBackingStorePixelRatio ||
        //         context.mozBackingStorePixelRatio ||
        //         context.msBackingStorePixelRatio ||
        //         context.oBackingStorePixelRatio ||
        //         context.backingStorePixelRatio || 1;
        //     return (window.devicePixelRatio || 1) / backingStore;
        // };

        var canvas = document.createElement('canvas');  //创建canvas 对象
        document.body.appendChild(canvas);
        canvas.id = "mycanvas";
        var newCanvas = document.getElementById("mycanvas");
        var type = "png";
        var context = canvas.getContext('2d');
        // var ratio = getPixelRatio(context);    
        // var scaleBy = 3;  //获取像素密度的方法 (也可以采用自定义缩放比例)
        // canvas.width = width * scaleBy;   //这里 由于绘制的dom 为固定宽度，居中，所以没有偏移
        // canvas.height = (height + offsetTop) * scaleBy;  // 注意高度问题，由于顶部有个距离所以要加上顶部的距离，解决图像高度偏移问题
        // context.scale(scaleBy, scaleBy);

        var opts = {
            allowTaint: true,//允许加载跨域的图片
            tainttest: true, //检测每张图片都已经加载完成
            scale: 2, // 添加的scale 参数
            canvas: canvas, //自定义 canvas
            logging: true, //日志开关，发布的时候记得改成false
            width: width, //dom 原始宽度
            height: height //dom 原始高度
        };
        html2canvas(dom, opts).then(function (canvas) {
            var body = document.getElementsByTagName("body");
            body[0].appendChild(canvas);
            
            var base64text = canvas.toDataURL(type);
            var trans = api.require('trans');
            trans.saveImage({
                base64Str: base64text.split(',')[1],
                imgPath: "fs://",
                album: true,
                imgName: "ss.png",
            }, function (ret, err) {
                if (ret.status) {
                    newCanvas.remove();
                } else {
                    alert(JSON.stringify(err));
                }
            });
            
            runPromise('upload_image_byw_upy2', {
                "arr": base64text
            }, (res) => {
                if(res.success) {
                    // alert(res.data.path);
                    if(a) {
                        a(res.data.path);
                    }
                    // download(res.data.path);
                    // api.download({
                    //     url: res.data.path,
                    //     savePath: 'fs://' + Date.now()+'.png',
                    //     report: true,
                    //     cache: true,
                    //     allowResume: true
                    // }, function (ret, err) {
                    //     if (ret.state == 1) {
                    //         //下载成功
                    //         api.saveMediaToAlbum({
                    //             path: ret.savePath
                    //         }, function (ret, err) {
                    //             if (ret && ret.status) {
                    //                 // alert('下载成功');
                    //             } else {
                    //                 // alert('下载失败');
                    //             }
                    //         });
                    //     }
                    // });
                    // Toast.info("文件保存成功", 2, null, false);
                }
            }, false, "post");
            // console.log(imgData);
            // var _fixType = function (type) {
            //     type = type.toLowerCase().replace(/jpg/i, 'jpeg');
            //     var r = type.match(/png|jpeg|bmp|gif/)[0];
            //     return 'image/' + r;
            // };
            // imgData = imgData.replace(_fixType(type), 'image/octet-stream');
            // var saveFile = function (data, filename) {
            //     var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
            //     save_link.href = data;
            //     save_link.download = filename;
            //     var event = document.createEvent('MouseEvents');
            //     event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            //     save_link.dispatchEvent(event);
            // };
            // // 下载后的问题名
            // var filename = name + '_' + (new Date()).getTime() + '.' + type;
            // // download
            // saveFile(imgData, filename);
            //   $("#mycanvas").remove();

            // var fname = filename.value + "." + MIME[getContentType(base64text)];
            // var blob = getBlob(base64text);
            // console.log(blob,1111255);
            // if (navigator.msSaveBlob) {
            //     navigator.msSaveBlob(blob, fname);
            //     newCanvas.remove();                
            // }
            // else {
            //     downloadPng.download = fname;
            //     downloadPng.href = URL.createObjectURL(blob);
            //     downloadPng.click();
            //     newCanvas.remove();                
            // }
        });
        
    });

    /** 
     * 获取Blob 
     * @param {stirng} base64 
     */
    function getBlob(base64) {
        return b64toBlob(getData(base64), getContentType(base64));
    }

    /** 
     * 获取文件类型 
     * @param {string} base64 
     */
    function getContentType(base64) {
        return /data:([^;]*);/i.exec(base64)[1];
    }

    /** 
     * 获取base64中的数据 
     * @param {string} base64 
     */
    function getData(base64) {
        return base64.substr(base64.indexOf("base64,") + 7, base64.length);
    }

    /** 
     * base64转Blob 
     * @param {string} b64Data 
     * @param {string} contentType 
     * @param {number} sliceSize 
     */
    function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }  
} 
export const fileApi = () =>{
    var choose = document.getElementById('chooseUploadFile');
    FileAPI.event.on(choose, 'change', function (evt) {
        var files = FileAPI.getFiles(evt); // Retrieve file list
        FileAPI.filterFiles(files, function (file, info/**Object*/) {
            if (/^image/.test(file.type)) {
                if (file.size > 10 * FileAPI.MB) {
                    // alertUploadMsg("文件大小限制在10M以内！");
                    return false;
                };
                return true;
            } else {
                return false;
            };
        }, function (files/**Array*/, rejected/**Array*/) {
            console.log(files);
            var uploadFile = files[0];
            console.log(uploadFile);
            
            // if (files.length) {
            //     // Uploading Files
            //     FileAPI.upload({
            //         url: 'https://www.huakewang.com/upload/upload_images_for_mobile',
            //         files: {
            //             Filedata: uploadFile
            //         },
            //         complete: function (err, xhr) {
            //             var upfileFilePath = (JSON.parse(xhr.responseText));
            //             console.log(upfileFilePath);
            //             let a = document.getElementById("imgcc");
            //             a.src="https://huakewang.b0.upaiyun.com/2018/03/01/20180301155328260299.jpg!160x115";
            //             // a.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK0AAAAnCAYAAAB9hMj9AAAMIUlEQVR4nO2cPXJjuRGAP7icD9feYMsB580BXEMltjM9nUDUCUSdQNIJhjoBNScgdQJpq2ynpDLbiThVzvWGgWuDtYc3aAfd4ANBvB9Kmj8Wu4pFEj+NRqPRaDQaQER6tAARydqU28PLgUC2VXmRTETyXR4rEQERmUo7mH5h4nJrd9BQbiwin0SkE9QZfhkqK2matqFBYCogNZ9WPBeRvog8Gh+mwe9GGj4XfC6Z8ULbiRJzEZFE4U6c9rnBmD9uW8Y0zVBE8i9CYDVN2whtZTmBRp5XTW5L/2qCa+MwaCy4Pd5kYlJovwaIyIUNSHLwTMNIWxPnS8FLCW3Ltm6rJrYJzqfn4P/WQET47TMq94Dc/s6cc/MovwP0nHMz+50DPWBu5ZctmpkAI6Bvv2M4BuZh26Zl5yH+gNaOtT2LaN2oE/chSg/xFcBdy/58DugAHyryroG7OFHU5s1RmznFjwzoOOfmxpsc7efM6mzwyurlQOGcK4xHS+dcEZWplZsI16rdEM9vUhXqwGzHKXALvLbPrWmXUCP2gKktEY+ogAGcAo9tlg5jzMTqbNCBCvNNlDW1tn25saW9taSxmRSdqjpxH6J2Pb7XUX++lra/B05T7TvnlgllMkDH49CSRiLyIOubtwHKpwfgnaUdA0t03C/itqz9KeXmcWR4wjIh716j8rEmNyZfD4BfPQ6BBxHZaDNEXGseWCO3ifTb0PAObK1PMUNFZGDpWYwngdebAFmUPkiZDpaW2+8sZT6Y0I5SdaJya7wI2ozxrS3RW5oHU4Fh6tNU39rqmNCJ6KZ0UDWBgjGJ6fcC6v8PPb4EjqGIPCbSR2F6zANfLyGg8VhsyJeI9Exe+iKynaaVUrVfJrIvgTzBsMt4tjvnJqjaHzS16Zy7qyh7CkwalmXPoCLC+cY5l+pDEy0T4E1iSfvAlu6plwLTpgfAGdrfEaqZHhMT5xzlWUz/JdCLxm5JepwnQJaY5APgqobUc1QWVuNlv8/Q1aJSvozeCbbibmvT5qg9U8QZZsfMfZkga8OmMviZcolqghuU4CGs2WRHdZXMJpuhy/cEZU5be7oKp7fX+qjJ0UEFtngiynvXoFVNE8XK4MYmkadrgtn9xp8BcC4ib51zJ1YsB+YVq8CS9bFL2q3W/zt0PGbWXt+yk2Nt/Or48hG+MC2374FsLvaZz9/Wpu2gnauCJZGb5oU2KBPWZ3cfNfhnTRWdc0fozM1QLeR9mVvboFLa8w/ohPuAToRiW1xbgm8n/FS26ZwrnHND4AToB6aV3zim4D3ryqYObgyvH+tT6jejHaOrSRbq6PtgNG6taQsSm6IAMqKNkYhkKc0MvKJ+AqwgMbvP43Ya6k9Y10JjVIBrNTWbS/6Fpb0J+2Saq+2qsTWEGjUEE5oxcJXahZvnBsqVoAA+mkA/h5470/59W8n6wJuaKktPb4PgFkBWR9/WNi3m8qjYtPQwF0qUNajA1UdNhLbwM8ok386kqYIZ7mu7ThO2K8qlyEO8oetQ7pw9HKLLchGlv+UrgAlAjvJyAwINW9j3jMTk8ivIlqvPe1R59IlcUgk651TsYWyMhgF9VMjX0JfbSmiNsGvUTZIFCDN0xl8niD+VwL1lDPK70ip7N9X2xH7eoktR3E4KOkZrHrZPYI8FdJxHZW7ZXAkKgkEP+pIUmudCmxMxTHhk80QsQ/sQCtQVuuG6CMr5zVuP7cycidVpu+q9B95FY5GhcvMKauUrJxifDZAWJ2KBS+TBPhvHhaF7Rcrz8KmU5+NPsSlHhnNQU0YixgytzYeq9o3GxyDvk7XVD3khpXvJ90VE3UUjWXf3TWN+JGl9udgD30dPf+gCi1eQXjBmVfwYSou4AVFXX/LELcUD0RPOcCxEAndX1H5SvhpEsxmMAXlFXuzj9AEt2fNafRp4WuNBTJVpgStpIr00SPrAo7p8GeWVb1G2jTZ/UdiCzxsu1GcLbYsGv4kYhj3sDsgTNmJ72MNXh88ptEsSzuQ97OG54PYr+B6+N9ibB3v47mAvtHv47mAvtHv47mAvtHv4/kBEduaT6FvvJZzndjDypKPal3LeC92e0M1eAte32qY/gGoq9+Q7Yt8qiJ2rO+eu0TP1K2Bmx5InzrmlHT0etIxf8DASkaLqTlMFLTl6/v+D/X5noZJPgTHqRnxq/aeA51+RyrQJGV+DuUNjJvIKnJMavo/REMRZHVE7J7RoIMeDaNA3sBLkuQlsRuLCXVA2J83wAr03lYpMKyrCB49piEaT5nA9hO4o+D10LIZ15duA0O2hQpmCuWNxCeSOReUkMX6+o5xII1TgcvQOWBxI4/OLDXrKwCMfsxzDvQ9Z3DmhNUbG10Q6lFdBcupnck6a4VV1etjVnzDRtNAAOKglWCfCh6oYUqF7YXh8vOpU6C4di+sGvE1QhAIpdMWxcMH/HjAXunmi7tyxCK/NzABEJJx8HxO3fCGKnJMyJriHauGzKL+HrlarMd0pobUOeu0xQuNu/W2LQxHx13YIZnOOCmR4l22D4TVtQnnTOIQLGuJMRaPVcvSe1GY+Xa99jryQCN0jVHDfApeh8GwDLeqdohoxt/8+JPPesZi1bUfKqz+v0ADveZB3gcYsXznnTiyia4zdJbN9xAg161b1dkporWNHNnun6PWRDsqUO7/0O+ccrGb5Y2RnzixvTPVlxQ6qGa5QDRvf1uig8Z/vq2gNJtjRxnsLquV8zPGbQGCnjsWRCe4YeBC6Z6EQ/YffVTXJH/jfOg22yXIsikTxPnDiWMyt7NDKDhN98QpgIyrNbp14+uKLjwXB3sI5dyAaqvgget8wIxJY2DGhhbXl5AybxcCxiBxij4WISG6atEd0LyrQsDMSEEyISbCkT6JiqQDyFI1Ha5qHrg/IHgBXCQHJYaUlT4TuALgVunNU64Z9+T3wF+AfwH8rSBnY99Daz4O8zD4e5yHp27YzP+kjW/R1whPQI+Cr3bTG6vasf75Ox9o/NW29upC6U35aKR+MOEOZPUc3YGfARyt2Q6kRNoS2Bndmy/kD8D62vYJyXkMmo/kNxy0JDWLCuES167CJJsdigtq696xPkh+BfwN/te8fm3AZ5KipM0ZvEBxHeWv0Sn1sdGZ4jimFcRy6DkWD1KeiNtYIFdQzu+J/hO4HPqKrlg9yH+2UprUr42/MHhqgT/sUlndtHgV/leYau/PVEv3Ayh/VeB46hv+ExCsslFqkEoft2hVftDmytDyqUiQE/E/AT/b7J/v/91R7UdtDa+ODYzERuo+m/fvAXcIOzmrQ3aNCfm+mWQc4D7UryvvUKzgC/BBcv7m29B6w3Cmh9XaiMShDTQH/VM/MtONSRLxQ58GbAB5H6o0BKAdonDrIcM552/TE8Hh8GfYGAar1n+tnzaP/MzZdSP8CfkEF9hf73xpMg4MK1QW6KUuuLOidsyqb9gbVoHdUv8fWjw5uXtn3RYLPM+fcfKeENtiIDe3/EFa2VqhRr1AzYuMFFVfx8kyMcwsYoC60Syqu34vIoOqa+AZ97Xy0vwJ/BP4M/NP+twah2zGteo2++zWv8RisJmLsX7WVz5tEoT/XQ8Hm3uHc2o3TR5h5slNCC6sl+hB1UheohlxGLqzMvl/zmSGYOHlNsTEtrsRvCb8Cf9umgm3sjtFTqSHlLeNOIMghtNkTXKL7gKvYJLL/qzRblXqoXRv7c8Hs9p0TWuvskTHgAbUxV454m/UjdANzKyLD5z5e8Rwwk6Z4KXyxW6sBXgOZ0J1ivmzgxrG4s0MNrx37qG/4JHKPvaX6mVEPvn/HInJddfon5ZX3q4oyqydXd05opXwC9B1qS/n79gNUi2SYb1BE1FEvoo76zbdUM1RLP8mBn4DULd5zgqUw3mg1/Q9gvs1Bgx0NexfUvWNxZ+leiDvAgQnpXOi+Qv3Cl4HN2wfeS8UrQoGCOEDNpAcROQtXvcDmP0UFdmLpPb9B88fwvs6uXbfJUFt1hrqlfKc7qNa9I5rJUj5W8cGCbAjywhO2JRXPD6UgZQPbIGZR0YLgHSzvxH8CTCoOCVqDeQqmwM/JQwS6/oTqAPnYwwKAgs3rEt2wXVA+zney6ptuuI6dc2cmrFO0/z8TvYBpZcMHOlYnljsltHbQlYQ2gSl72A6+Fk//D+L9As6rxyu5AAAAAElFTkSuQmCC";
            //         }
            //     });
            // }
        });
    });
}
export const init = (textarea) => {
    var observe;
    if (window.attachEvent) {
        observe = function (element, event, handler) {
            element.attachEvent('on' + event, handler);
        };
    }
    else {
        observe = function (element, event, handler) {
            element.addEventListener(event, handler, false);
        };
    }
    var text = document.getElementById(textarea);
    function resize() {
        text.style.height = 'auto';
        var vHeight = text.scrollHeight - 3;
        text.style.height = vHeight + 'px';
    }
    function delayedResize() {
        window.setTimeout(resize, 0);
    }
    observe(text, 'change', resize);
    observe(text, 'cut', delayedResize);
    observe(text, 'paste', delayedResize);
    observe(text, 'drop', delayedResize);
    observe(text, 'keydown', delayedResize);
    // text.focus();
    // text.select();
    resize();
}


