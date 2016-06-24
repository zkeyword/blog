let fs      = require('fs');
let path    = require('path');
let ejs     = require('ejs');
let express = require('express');
let app     = express();

// 中间件
let favicon      = require('serve-favicon');
let logger       = require('morgan');
let cookieParser = require('cookie-parser');
let session      = require('express-session');
let bodyParser   = require('body-parser');
let compression  = require('compression');
// let upload       = require('multer')({ dest: path.join(__dirname, 'public/uploads')}); https://github.com/expressjs/multer

// 设定view engine变量，意为网页模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', ejs.__express);

// post参数的解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// gzip
app.use(compression());

// cookie session
app.use(cookieParser());
app.use(session({
    secret:'secret',
    cookie:{
        maxAge:1000*60*30
    }
}));

// accessLog
let accessLog = fs.createWriteStream('log/access.log', {flags: 'a'});
app.use(logger('dev'));
app.use(logger({stream: accessLog}));

// 设定静态文件目录，比如本地文件
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));

// 路由及端口
// app.use(router);
app.use(require('./router'))
app.use(function(err, req, res, next){
	res.status(500).render('5xx', {error: err});
});
app.use(function(req, res, next){
	res.status(404).render('404', { url: req.originalUrl });
});
app.listen(3000, function(){
	console.log('Express started on port 3000');
});


// 数据库
let mongoose = require('mongoose');
	
mongoose.connect('mongodb://localhost/blog');
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to mongodb://localhost/blog');  
});
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});