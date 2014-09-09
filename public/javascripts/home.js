$(document).ready(function(){
	app.bindEvents();
});

app.bindEvents = function(){
	$("#goButton").bind("click",app.onClickGoButton);
	$("#saveButton").bind("click",app.onClickSaveButton);
	$("#goTag").bind("click",app.onClickFetchButton);
}
app.changeSite = function(){
	log(this);
	$("#urlIframe").attr("src",$(this).attr("url"));
}
app.onClickGoButton = function(){
	var url = $("#urlText").val();
	$("#urlIframe").attr("src",url);
	log(url);
}
app.onClickSaveButton = function(){
	var options = {};
	options.notes = $("#notesElement").val();
	options.tags = $("#tagElement").val();
	options.url = $("#urlIframe").attr("src");	
	log(options);
	$.ajax({
		"url" : "/save",
		"data" : options,
		"contentType" : "JSON",
		"success" : app.ajaxSuccess,
		"error" : app.ajaxError
	});
}

app.onClickFetchButton = function(){
	$(".glyphicon.glyphicon-refresh.glyphicon-refresh-animate").show();
	var options = {};
	options.notes = $("#notesElement").val();
	options.tags = $("#tagElement").val();
	options.url = $("#urlIframe").attr("src");
	$.ajax({
		"url" : "/fetch",
		"data" : options,
		"contentType" : "JSON",
		"success" : app.ajaxResult,
		"error" : app.ajaxError
	});

}
app.ajaxResult = function(xhr,status,error){
	$("#showList").html("");
	log(xhr.length);
	var temp = $("#goText").val();
	for(var i=0;i<xhr.length;i++)
	{
		if(temp == xhr[i].tags)
		{
			$("#showList").append("<li class='list-group-item' url='"+xhr[i].url+"' >"+xhr[i].notes+"</li>");
		}
		else
		{
			log(xhr[i].tags);			log(temp);
		}
	}
	$(".list-group-item").bind("click",app.changeSite);
	$(".glyphicon.glyphicon-refresh.glyphicon-refresh-animate").hide();
}
app.ajaxSuccess = function(xhr,status,error){
	log(xhr);
}
app.ajaxError = function(result,status,xhr){
	log(result.responseText);
	$(".glyphicon.glyphicon-refresh.glyphicon-refresh-animate").hide();
}
