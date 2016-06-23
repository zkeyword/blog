let path     = require('path'),
	fs       = require('fs'),
	express  = require('express'),
	router   = express.Router();

	
let mongoose = require('mongoose');
let Schema   = mongoose.Schema;
	
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


var postSchema = new Schema({
	name: Date
})

var Post = mongoose.model('post', postSchema);

function insert() {
 
    var post = new Post({
        name: new Date()
    });

    post.save(function (err, res) {
        if (err) {
            console.log("Error:" + err);
        }else {
            console.log("Res:" + res);
        }
    });
}



/*
Post.find({ name: 'a' }, function(err, data){
	console.log(data)
})
*/

// 设置跨域访问
router.all('/api/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("x-Powered-By", " 3.2.1");
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});


router.get('/api/', function(req, res) {
	res.render('index', { title: 'index' });
});

fs.readdirSync(__dirname +'/../controllers/').forEach(function(name){
	let dir    = name.replace('\.js', ''),
		obj    = require('./../controllers/' + name),
		method = 'get',
		url    = ''
		
	for (var key in obj) {
		switch (key) {
			case 'index':
				method = 'get';
				url    = '/'
				break;
		}
	}
	
	router[method](url, obj[key]);
});

/* 
router.all('*', function(req, res, next) {
	let arr = req.url.split('/');
	if( /(\.)js/g.test(arr[1]) ) {
		res.status(404);
		res.send('');
		return;
	}

	try {
		
		let controllers = require('../controllers/'+ arr[1]);
		let method = controllers['index'];
		
		console.log( arr.length, arr )

		if( !( !arr[1] || arr.length == 2 || (arr.length == 3 && !arr[2]) ) ){
			method = controllers[arr[2]];
		}
		
		if( method ){
			method(req, res, next);
		}else{
			res.render('5xx', { error: arr[2] + ' is not defined' });
		}
		
	} catch (err) {
		let meta = '[' + new Date() + '] ' + req.url + '\n';		
		let errorLog = fs.createWriteStream('log/error.log', {flags: 'a'})
		errorLog.write(meta + err.stack + '\n');
		res.render('5xx', { error: err });
	}

	next();
}); */

/*
router.get('/', function(req, res) {
	//insert();
	
	Post.find({}, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
	
	res.render('index', { title: 'index' });
});
*/


	
module.exports = router;





































let path   = require('path'),
	fs      = require('fs'),
	express = require('express');
	app     = express();

module.exports = function(parent){

	fs.readdirSync(__dirname +'/../controllers/').forEach(function(name){
		let dir    = name.replace('\.js', ''),
			obj    = require('./../controllers/' + name),
			method = 'get',
			url    = ''
			
		for (var key in obj) {
			switch (key) {
				case 'index':
					method = 'get';
					url    = '/'
					break;
			}
		}
		let handler = obj[key];
		parent[method](url, handler);
	});
	
	app.use(parent);
	
}









