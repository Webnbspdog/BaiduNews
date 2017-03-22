$(document).ready(function(){
	refreshNews('精选');
	$("nav a").click(function(e){
		e.preventDefault();
		var type=$(this).text();
		refreshNews(type);
	});
	
});
function refreshNews(type){    //更新新闻内容
	var $lista=$("<a></a>").attr("href","#").addClass("newscow").appendTo("article");
	$.ajax({
		url:"/news",
		type:"get",
		datatype:"json",
		data:{newstype:type},
		success:function(data){
			$lista.empty();
			data.forEach(function(item,index,array){
				var $list=$("<ul></ul>").addClass("newscontainer").appendTo($lista);
				var $newsImg=$("<li></li>").addClass("newsimg").prependTo($list);
				var $newsmain=$("<li></li>").addClass("newsmain").appendTo($list);
				var $img=$("<img>").attr("src",item.newsimg).appendTo($newsImg);
				var	$newstitle=$("<div></div>").html(item.newstitle).addClass("newstitle").appendTo($newsmain);
				var $newstime=$("<span></span>").html(item.newstime).addClass("newstime").appendTo($newsmain);
				var $newssrc=$("<span></span>").html(item.newssrc).addClass("newssrc").appendTo($newsmain);
			});
		}
	});
	
}