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