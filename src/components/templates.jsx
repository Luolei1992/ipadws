import { Link, hashHistory } from "react-router";

const urls = {
    wordMsg: require('../images/wordMsg.png'),
    addPic: require('../images/addPic.png'),
}

export const TableHead = (props) => (     
    <div className="tableHead">
        <div className="leftLogoWord fn-left"><i className="iconfont icon-jiantou"></i>返回</div>
        <Link to='/'><img src={props.url} className="fn-right" /></Link>
    </div>
)
export const TableHeads = (props) => (    //公共头部  
    <div className="tableHead">
        <div className="leftLogoWord fn-left" onClick={()=>{hashHistory.goBack()}}><i className="iconfont icon-jiantou"></i>返回</div>
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
            props.dataList.map(function(value){
                return <li>
                    <div className="liWrap">
                        <div className="left fn-left">
                            <img src={value.path} style={{width:"100%"}}/>
                        </div>
                        <div className="mid fn-left">
                            <h3>
                                <Link to={'/company?tab=0&id=' + value.gd_company_id} onClick={() => { props.setBaseStateFun(value.gd_company_id)}}>
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
                                    <td style={{ lineHeight: "18px" }}>
                                        <p>{value.content?value.content:"无"}</p>
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
                            <p className="more" onClick={() => { props.setBaseStateFun(value.gd_company_id) }}>
                                <Link to={"/company?tab=0&id="+value.gd_company_id}><i>...</i></Link>
                            </p>
                            <ul>
                                <li>
                                    <p className="top" onClick={() => { props.setBaseStateFun(value.gd_company_id) }}>
                                        <Link to={"/visitRecord?tab=0&id="+value.gd_company_id}>{value.mission_count}</Link>
                                    </p>
                                    <p className="btm" onClick={(e) => { props.addJobs(e, value.id); props.setBaseStateFun(value.gd_company_id)}}>任务</p>
                                </li>
                                <li>
                                    <p className="top" onClick={() => { props.setBaseStateFun(value.gd_company_id) }}>
                                        <Link to={"/visitLists?tab=1&id="+value.gd_company_id}>{value.visit_back_count}</Link>
                                    </p>
                                    <p className="btm"onClick={() => { props.setBaseStateFun(value.gd_company_id)}}><Link to="/scene">回访</Link></p>
                                </li>
                                <li>
                                    <p className="top" onClick={() => { props.setBaseStateFun(value.gd_company_id) }}>
                                        <Link to={"/meetingList?tab=2&id="+value.gd_company_id}>{value.meeting_count}</Link>
                                    </p>
                                    <p className="btm"onClick={() => { props.setBaseStateFun(value.gd_company_id)}}><Link to="/meeting">纪要</Link></p>
                                </li>
                                <li>
                                    <p className="top" onClick={() => { props.setBaseStateFun(value.gd_company_id) }}>
                                        <Link to={"/qualityList?tab=0&id="+value.gd_company_id}>{value.check_count}</Link>
                                    </p>
                                    <p className="btm"onClick={() => { props.setBaseStateFun(value.gd_company_id)}}><Link to="/quality">验收</Link></p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="person">
                        <p>相关人员 : {
                            value.user_list.map(function(value){
                                return <span>{value.nick_name}<i className="iconfont icon-shanchu" onClick={(e) => { props.del(e) }}></i></span>
                            })
                        }
                            <a style={{ marginLeft: "0.5rem" }} href="javascript:;" onClick={()=>{props.getCustomList(value.gd_company_id)}}>全部</a>
                            <a href="javascript:;" onClick={(e) => { props.showModal(e, value.user_id); props.setBaseStateFun(value.gd_company_id)}}>新增</a>
                        </p>
                    </div>
                </li>
            })
        }
    </ul>
)

export const Quality = (props) => (
    <ul className="details">
        <li className="fullWidth">
            <div className="top">
                <ul className="fn-left">
                    <li><i></i></li>
                    <li>张兰</li>
                    <li style={{ color: "#ADADAD" }}>杭州画客科技有限公司</li>
                    <li style={{ color: "#ADADAD" }}>总经理</li>
                </ul>
                <span className="slideDown iconfont icon-tubiao-" onClick={() => props.show(props.index, props.isShow)}></span>
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
                    <button onClick={() => { props.changeAlert() }}>回访结果</button>
                </div>
            </div>
            <div className="attach" style={{ display: props.isShow ? "block" : "none" }}>
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
    </ul>
)
// export const div2png =(dom, name) => {         //html转图片
    // var width = dom.offsetWidth;  // 获取(原生）dom 宽度
    // var height = dom.offsetHeight; // 获取(原生）dom 高
    // var offsetTop = dom.offsetTop;  //元素距离顶部的偏移量

    // var getPixelRatio = function (context) {
    //     var backingStore = context.backingStorePixelRatio ||
    //         context.webkitBackingStorePixelRatio ||
    //         context.mozBackingStorePixelRatio ||
    //         context.msBackingStorePixelRatio ||
    //         context.oBackingStorePixelRatio ||
    //         context.backingStorePixelRatio || 1;
    //     return (window.devicePixelRatio || 1) / backingStore;
    // };

    // var canvas = document.createElement('canvas');  //创建canvas 对象
    // document.body.appendChild(canvas);
    // canvas.id = "mycanvas";
    // var newCanvas = document.getElementById("mycanvas");
    // var type = "png";
    // var context = canvas.getContext('2d');
    // // var ratio = getPixelRatio(context);    
    // // var scaleBy = 3;  //获取像素密度的方法 (也可以采用自定义缩放比例)
    // // canvas.width = width * scaleBy;   //这里 由于绘制的dom 为固定宽度，居中，所以没有偏移
    // // canvas.height = (height + offsetTop) * scaleBy;  // 注意高度问题，由于顶部有个距离所以要加上顶部的距离，解决图像高度偏移问题
    // // context.scale(scaleBy, scaleBy);

    // var opts = {
    //     allowTaint: true,//允许加载跨域的图片
    //     tainttest: true, //检测每张图片都已经加载完成
    //     scale: 3, // 添加的scale 参数
    //     canvas: canvas, //自定义 canvas
    //     logging: true, //日志开关，发布的时候记得改成false
    //     width: width, //dom 原始宽度
    //     height: height //dom 原始高度
    // };
    // html2canvas(dom, opts).then(function (canvas) {
    //     var body = document.getElementsByTagName("body");
    //     body[0].appendChild(canvas);
    //     var imgData = canvas.toDataURL(type);
    //     console.log(imgData);
    //     // var _fixType = function (type) {
    //     //     type = type.toLowerCase().replace(/jpg/i, 'jpeg');
    //     //     var r = type.match(/png|jpeg|bmp|gif/)[0];
    //     //     return 'image/' + r;
    //     // };
    //     // imgData = imgData.replace(_fixType(type), 'image/octet-stream');
    //     // var saveFile = function (data, filename) {
    //     //     var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    //     //     save_link.href = data;
    //     //     save_link.download = filename;
    //     //     var event = document.createEvent('MouseEvents');
    //     //     event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    //     //     save_link.dispatchEvent(event);
    //     // };
    //     // // 下载后的问题名
    //     // var filename = name + '_' + (new Date()).getTime() + '.' + type;
    //     // // download
    //     // saveFile(imgData, filename);
    //     //   $("#mycanvas").remove();
    //     newCanvas.remove();
    // });
// }
// export const readyDo = () => {
//     let downloadPng = document.getElementById("downloadPng");
//     let fromHTMLtestdiv = document.getElementById("fromHTMLtestdiv");
//     let download = document.getElementById("download");
//     downloadPng.onclick = function () {
//         div2png(fromHTMLtestdiv, 'png');
//     }
    // download.onclick = function () {
    //     html2canvas(fromHTMLtestdiv, {
    //         onrendered: function (canvas) {
    //             var imgData = canvas.toDataURL('image/png');
    //             var imgWidth = 210;
    //             var pageHeight = 295;
    //             var imgHeight = canvas.height * imgWidth / canvas.width;
    //             var heightLeft = imgHeight;

    //             var doc = new jsPDF('p', 'mm');
    //             var position = 0;

    //             doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    //             heightLeft -= pageHeight;

    //             while (heightLeft >= 0) {
    //                 position = heightLeft - imgHeight;
    //                 doc.addPage();
    //                 doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    //                 heightLeft -= pageHeight;
    //             }
    //             doc.save('sample-file.pdf');
    //         },
    //         useCORS: true
    //     });
    // };
// }

export const readyDo = () => {
    // var base64text = document.getElementById("base64text");
    var filename = document.getElementById("filename");
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
    filename.value = Date.now();
    //检测点击下载按钮  
    btnGenerate.addEventListener("click", function (e) {
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

            var fname = filename.value + "." + MIME[getContentType(base64text)];
            var blob = getBlob(base64text);
            console.log(blob);
            if (navigator.msSaveBlob) {
                navigator.msSaveBlob(blob, fname);
                newCanvas.remove();                
            }
            else {
                downloadPng.download = fname;
                downloadPng.href = URL.createObjectURL(blob);
                downloadPng.click();
                newCanvas.remove();                
            }
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
    text.focus();
    text.select();
    resize();
}