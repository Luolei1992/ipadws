
function div2png(dom, name) {

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
window.onload = function () { 
    let downloadPng = document.getElementById("downloadPng");
    let fromHTMLtestdiv = document.getElementById("fromHTMLtestdiv");
    let download = document.getElementById("download");
    downloadPng.onclick=function () { 
        div2png(fromHTMLtestdiv, 'png')
    }
    download.onclick=function () {
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