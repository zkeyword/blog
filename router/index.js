let fs      = require('fs'),
	express = require('express')
	router  = express.Router();
	
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
			case 'show':
				method = 'get';
				url = '/' + dir + '/:' + 'id';
				break;
			case 'list':
				method = 'get';
				url = '/' + dir + 's';
				break;
			case 'edit':
				method = 'get';
				url = '/' + dir + '/:' +'id/edit';
				break;
			case 'update':
				method = 'put';
				url = '/' + dir + '/:' + 'id/update';
				break;
			case 'create':
				method = 'post';
				url = '/' + dir + '/create';
				break;
			case 'delete':
				method = 'delete';
				url = '/' + dir + '/:' + 'id/delete';
				break;
		}
		
		let handler = obj[key];
		router[method](url, handler);
	}
});

module.exports = router;