let path = require('path'),
	fs   = require('fs'),
	app  = require('express');

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

	parent.use(app);
}