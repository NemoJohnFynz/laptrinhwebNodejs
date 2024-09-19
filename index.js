import myDateTime from './date';
import getURL from './getURL';
import http from'http'



http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.write(myDateTime()+ "<br>")
    res.write(getURL.getPath(req)+"<br>")
    res.write(getURL.getParamsURL(req)+"<br>");
    res.end('hello ktpm0121, chúc bạn thành công với nodejs hmi');
}).listen(8080);