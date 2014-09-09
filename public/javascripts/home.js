$(document).ready(function(){
	app.bindEvents();
});

app.bindEvents = function(){
	$("#goButton").bind("click",app.onClickGoButton);
	$("#saveButton").bind("click",app.onClickSaveButton);
	$("#goTag").bind("click",app.onClickFetchButton);
	$("#showList li").bind("click",app.changeSite);
}
app.changeSite = function(e){
	log(this);
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
			$("#showList").append("<li class='list-group-item' src='"+xhr[i].notes+"' >"+xhr[i].notes+"</li>")
		}
		else
		{
			log(xhr[i].tags)
			log(temp)	
		}
	}
}
app.ajaxSuccess = function(xhr,status,error){
	log(xhr);
}
app.ajaxError = function(result,status,xhr){
	log(result.responseText);
}
