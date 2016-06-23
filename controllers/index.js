'use strict';
/* exports.before = function(req, res, next){
	console.log('before')
	var id = req.params.user_id;
	if (!id) return next();
	// pretend to query a database...
	process.nextTick(function(){
		req.user = db.users[id];
		// cant find that user
		if (!req.user) return next('route');
		// found it, move on to the routes
		next();
	}); 
	next();
}; */
exports.index = function(req, res, next){
	console.log(req.url)
    res.render('index', {
        title: '呵呵'
    });
	next();
};

exports.edit = function(req, res, next){
	console.log(req.url)
    res.render('index', {
        title: '呵呵'
    });
	next();
};