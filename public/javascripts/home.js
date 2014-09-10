$(document).ready(function(){
	app.bindEvents();
});

app.bindEvents = function(){
	$("#goButton").bind("click",app.onClickGoButton);
	$("#saveButton").bind("click",app.onClickSaveButton);
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
		"success" : app.ajaxSuccess,
		"error" : app.ajaxError
	});
}
app.ajaxSuccess = function(xhr,status,error){
	log(xhr);
}
app.ajaxError = function(result,status,xhr){
	log(result.responseText);
}