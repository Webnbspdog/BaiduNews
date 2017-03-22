$(document).ready(function(){
	refreshNews();
	$("#btnsubmit").click(function(e){
		e.preventDefault();//阻止默认设置
		if($("#newstitle").val()===""||$("#newsimg").val()===""||$("#newssrc").val()===""||$("#newstime").val()==="")
		{
			//r如果为空返回错误
			if($("#newstitle").val()===""){
				$("#newstitle").parent().addClass("has-error");
			}
			else{
				$("#newstitle").parent().remove("has-error");
			}
			if($("#newsimg").val()===""){
				$("#newsimg").parent().addClass("has-error");
			}
			else{
				$("#newsimg").parent().remove("has-error");
			}
			if($("#newssrc").val()===""){
				$("#newssrc").parent().addClass("has-error");
			}
			else{
				$("#newssrc").parent().remove("has-error");
			}
			if($("#newstime").val()===""){
				$("#newstime").parent().addClass("has-error");
			}
			else{
				$("#newstime").parent().remove("has-error");
			}
		}
		else{
			var jsonNews={
				newstitle:$("#newstitle").val(),
				newstype:$("#newstype").val(),
				newsimg:$("#newsimg").val(),
				newstime:$("#newstime").val(),
				newssrc:$("#newssrc").val()

			};
			$.ajax({
				url:"admin/insert",
				type:"post",
				data:jsonNews,
				datatype:"json",
				success:function(data){
					console.log(data);
					refreshNews();
				}
			});
		} 
	});
});

//删除新闻
var deleteId=null; 
var $newstable=$("#newstable tbody");//点击删除
$newstable.on("click",".btn-danger",function(e){
	$("#deleteModal").modal("show");//模式出现
	deleteId=$(this).parent().prevAll().eq(5).html();
	//console.log(deleteId);
})
$("#deleteModal #confirmdelete").click(function(){
	if(deleteId){
		$.ajax({
			url:"/admin/delete",
			type:"post",
			data:{newsid:deleteId},
			datatype:"json",
			success:function(data){
				console.log(data);
				$("#deleteModal").modal("hide");
				refreshNews();
			}
		});
	}
	
});

//修改新闻
var updateId=null; 
var $newstable=$("#newstable tbody");//点击删除
$newstable.on("click",".btn-primary",function(e){
	$("#updateModal").modal("show");//模式出现
	updateId=$(this).parent().prevAll().eq(5).html();
	$.ajax({
		url:"/admin/curnews",
		type:"get",
		data:{newsid:updateId},
		datatype:"json",
		
		success:function(data){
			console.log(data);	
			$("#unewstitle").val(data[0].newstitle);
			$("#unewstype").val(data[0].newstype);
			$("#unewsimg").val(data[0].newsimg);
			$("#unewssrc").val(data[0].newssrc);
			$("#unewstime").val(data[0].newstime);

		}
	})
})
$("#updateModal #confirmupdate").click(function(){
	$.ajax({
		url:"/admin/update",
		type:"post",
		data:{
			newstitle:$("#unewstitle").val(),
			newstype:$("#unewstype").val(),
			newsimg:$("#unewsimg").val(),
			newstime:$("#unewstime").val(),
			newssrc:$("#unewssrc").val(),
			id:updateId
		},
		datatype:"json",
		success:function(data){
			$("#updateModal").modal("hide");
			refreshNews();

		}
	})
});

function refreshNews(){
	
	
	$.ajax({
		url:"/admin/getnews",
		type:"get",
		datatype:"json",
		success:function(data){
			$newstable.empty();
			console.log(data);
			data.forEach(function(item,index,array){
				var $tdid=$("<td></td>").html(item.id);
				var $tdtype=$("<td></td>").html(item.newstype);
				var $tdtitle=$("<td></td>").html(item.newstitle);
				var $tdimg=$("<td></td>").html(item.newsimg);
				var $tdsrc=$("<td></td>").html(item.newssrc);
				var $tdtime=$("<td></td>").html(item.newstime);
				var $tdctrl=$("<td></td>");
				var $btnupdate=$("<button></button>").addClass("btn btn-primary").appendTo($tdctrl).html("编辑");
				var $btnupdelete=$("<button></button>").addClass("btn btn-danger").appendTo($tdctrl).html("删除");
				var $tRow=$("<tr></tr>");
				$tRow.append($tdid,$tdtype,$tdtitle,$tdimg,$tdsrc,$tdtime,$tdctrl);
				$newstable.append($tRow);
			});
		}
	});
}