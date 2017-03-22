var express = require('express');
var router = express.Router();
var mysql=require('mysql');
var moment=require('moment');

var connection = mysql.createPool({   //创建链接池
	  host     : 'localhost',
	  port     : 3306,
	  user     : 'root',
	  password : 'root',
	  database : 'news'
	});
/* 后台路由页面 */
// 获取所有新闻列表

router.get('/getnews', function(req, res, next) {
	var newstype=req.query.newstype;
	connection.query('select * from `news` ',function(err,rows){
		res.json(rows);
	});
});
// 确认更新
router.post('/update',function(req,res){
	
	var newsid=req.body.id;
	var newstype=req.body.newstype;
	var newstitle=req.body.newstitle;
	var newsimg=req.body.newsimg;
	var newstime=moment(req.body.newstime).format("YYYY-MM-DD HH:mm");
	var newssrc=req.body.newssrc;
	connection.query('UPDATE `news` SET `newstitle` = ?,`newstype` = ?,`newsimg` = ?,`newssrc` =?,`newstime` = ? WHERE `id` = ?',
		[newstitle,newstype,newsimg,newssrc,newstime,newsid],function(err, rows){
			console.log(rows.changedRows);
			res.json(rows);
		});
});
//模态框取值
router.get('/curnews',function(req,res){
	var newsid=req.query.newsid;
	connection.query('select * from `news` where id = ?', [newsid],function(err,rows){
		res.json(rows);
	});
});
//删除
router.post('/delete',function(req,res){
	var newsid=req.body.newsid;
	connection.query('DELETE FROM `news` WHERE `news` . `id` = ?',[newsid],function(err,rows){

		res.json(rows);
	});
});
//插入
router.post('/insert',function(req,res){
	
	var newstype=req.body.newstype;
	var newstitle=req.body.newstitle;
	var newsimg=req.body.newsimg;
	var newstime=moment(req.body.newstime).format("YYYY-MM-DD HH:mm");
	var newssrc=req.body.newssrc;
	connection.query('INSERT INTO `news` (`newstype`,`newstitle`,`newsimg`,`newstime`,`newssrc`) VALUES (?,?,?,?,?)',
		[newstype,newstitle,newsimg,newstime,newssrc],function(err,rows){
		if(!err){
			
			res.json(rows);
		}
	});
});
module.exports = router;
