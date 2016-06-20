let path    = require('path'),
	express = require('express'),
	router  = express.Router()
	
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


router.all('*', function(req, res, next) {

	try {
		let arr = req.url.split('/');
		let controllers = require('../controllers/'+ arr[1]);
		let method = controllers['index'];
		
		console.log( arr.length, arr )

		if( !( !arr[1] || arr.length == 2 || (arr.length == 3 && !arr[2]) ) ){
			method = controllers[arr[2]];
		}
		
		if( method ){
			method(req, res, next);
		}else{
			res.render('500', { error: arr[2] + ' is not defined' });
		}
		
	} catch (err) {
		res.render('500', { error: err });
	}

	next();
});

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