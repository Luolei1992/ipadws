import { Link } from "react-router";

export const TableHead = (props) => (     
    <div className="tableHead">
        <div className="leftLogoWord fn-left"><i className="iconfont icon-jiantou"></i>返回</div>
        <img src={props.url} className="fn-right" />
    </div>
)

export const BottomLis = (props) => (     // 底部导航
    <ul className="footNavList">
        <li><Link to="/login">合同内容</Link></li>
        <li><Link to="/login">任务记录</Link></li>
        <li><Link to="/login">回访记录</Link></li>
        <li><Link to="/login">会议纪要</Link></li>
        <li><Link to="/login">联系人</Link></li>
        <li><Link to="/login">调研档案</Link></li>
    </ul>
)
export const Customs = (props) =>(         //我的客户信息展示
    <ul className="customDetails">
        {
            props.dataList.map(function(value){
                return <li>
                    <div className="liWrap">
                        <div className="left fn-left">
                            <img src='' />
                        </div>
                        <div className="mid fn-left">
                            <h3>{value.company}<span> {value.tag}</span></h3>
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
                                        <p>{value.content}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <table>
                                            <tr>
                                                <td style={{ width: "35px", position: "relative" }}>
                                                    <span style={{ float: "left", position: "absolute", left: "0", top: "0", lineHeight: "18px" }}>备注:</span>
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
                                                    <span style={{ float: "left", position: "absolute", left: "0", top: "0", lineHeight: "18px" }}>条件:</span>
                                                </td>
                                                <td style={{ lineHeight: "18px" }}><p>{value.resean}</p></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div className="right fn-right">
                            <p className="more"><i>...</i></p>
                            <ul>
                                <li>
                                    <p className="top">{value.duty}</p>
                                    <p className="btm">任务</p>
                                </li>
                                <li>
                                    <p className="top">{value.visit}</p>
                                    <p className="btm">回访</p>
                                </li>
                                <li>
                                    <p className="top">{value.summary}</p>
                                    <p className="btm">纪要</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="person">
                        <p>相关人员 : {
                            value.relate.map(function(value){
                                return <span onClick={(e) => {props.del(e)}}>{value}<i className="iconfont icon-shanchu"></i></span>
                            })
                        }
                            <a style={{ marginLeft: "0.5rem" }} href="javascript:;">全部</a>
                            <a href="javascript:;" onClick={(e)=>{props.showModal(e)}}>新增</a>
                        </p>
                    </div>
                </li>
            })
        }
    </ul>
)
export const div2png =(dom, name) => {         //html转图片
    html2canvas(dom, {
        onrendered: function (canvas) {
            canvas.id = "mycanvas";
            document.body.appendChild(canvas);
            var newCanvas = document.getElementById("mycanvas");
            var type = "png";
            var imgData = newCanvas.toDataURL(type);
            var _fixType = function (type) {
                type = type.toLowerCase().replace(/jpg/i, 'jpeg');
                var r = type.match(/png|jpeg|bmp|gif/)[0];
                return 'image/' + r;
            };

            imgData = imgData.replace(_fixType(type), 'image/octet-stream');
            var saveFile = function (data, filename) {
                var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
                save_link.href = data;
                save_link.download = filename;

                var event = document.createEvent('MouseEvents');
                event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                save_link.dispatchEvent(event);
            };
            // 下载后的问题名
            var filename = name + '_' + (new Date()).getTime() + '.' + type;
            // download
            saveFile(imgData, filename);
            //   $("#mycanvas").remove();
            newCanvas.remove();
        },
        useCORS: true
    });
}
export const readyDo = () => {
    let downloadPng = document.getElementById("downloadPng");
    let fromHTMLtestdiv = document.getElementById("fromHTMLtestdiv");
    let download = document.getElementById("download");
    downloadPng.onclick = function () {
        div2png(fromHTMLtestdiv, 'png')
    }
    download.onclick = function () {
        html2canvas(fromHTMLtestdiv, {
            onrendered: function (canvas) {
                var imgData = canvas.toDataURL('image/png');
                var imgWidth = 210;
                var pageHeight = 295;
                var imgHeight = canvas.height * imgWidth / canvas.width;
                var heightLeft = imgHeight;

                var doc = new jsPDF('p', 'mm');
                var position = 0;

                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    doc.addPage();
                    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
                doc.save('sample-file.pdf');
            },
            useCORS: true
        });
    };
}