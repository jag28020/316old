var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/:page', function(req, res, next){
	var page = req.params.page;
	page = page.endsWith('.html') ? page.substring(0,page.indexOf('.')) : page //Remove .html from theme pages. Dev Only
	res.render(page, {});
});

module.exports = router;
