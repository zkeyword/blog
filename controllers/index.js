'use strict';

exports.index = function(req, res, next){
    res.render('index', {
        title: '呵呵'
    });
};