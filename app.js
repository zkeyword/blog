let path    = require('path');
let ejs     = require('ejs');
let express = require('express');
let app     = express();
let router  = require('./router');

let favicon      = require('serve-favicon');
let logger       = require('morgan');
let cookieParser = require('cookie-parser');
let session      = require('express-session')
let bodyParser   = require('body-parser');

var fs = require('fs');
var accessLog = fs.createWriteStream('log/access.log', {flags: 'a'});
var errorLog = fs.createWriteStream('log/error.log', {flags: 'a'});


// 设定view engine变量，意为网页模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', ejs.__express);

//post参数的解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
    secret:'secret',
    cookie:{
        maxAge:1000*60*30
    }
}));

app.use(logger('dev'));
app.use(logger({stream: accessLog}));
app.use(function (err, req, res, next) {
  var meta = '[' + new Date() + '] ' + req.url + '\n';
  errorLog.write(meta + err.stack + '\n');
  next();
});


// 设定静态文件目录，比如本地文件
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(function(err, req, res, next) {
  console.error(1212);
  res.status(500).send('500');
  next();
});


app.use(router);
app.listen(3000, function(){
	console.log('stared locathost://3000');  
});