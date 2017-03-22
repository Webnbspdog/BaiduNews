var express = require('express');
var router = express.Router();
var mysql=require('mysql');
// 在主页获取新闻时的请求
router.get('/', function(req, res, next) {
  var newstype=req.query.newstype;
  var connection = mysql.createConnection({
	  host     : 'localhost',
	  port     : 3306,
	  user     : 'root',
	  password : 'root',
	  database : 'news'
	});

	connection.connect();

	connection.query('select * from `news` where newstype = ?',[newstype], function(err, rows, fields) {
    if (err) throw err;
    console.log(rows);
    res.json(rows);
});
	connection.end();
});

module.exports = router;
