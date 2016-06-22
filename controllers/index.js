'use strict';

exports.index = function(req, res, next){
	console.log(req.url)
    res.render('index', {
        title: '呵呵'
    });
	next();
};