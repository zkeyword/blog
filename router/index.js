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
	
module.exports = router;


// 设置跨域访问
/* app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("x-Powered-By", " 3.2.1");
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
}); */