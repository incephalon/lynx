$(document).ready(function(){
	app.bindEvents();
});

app.bindEvents = function(){
	$("#goButton").bind("click",app.onClickGoButton);
	$("#saveButton").bind("click",app.onClickSaveButton);
	$("#goTag").bind("click",app.onClickFetchButton);
	$("#goText").bind("click",app.emptyNotes);
	$("#clearButton").bind("click",app.clickOnClear);

}
app.clickOnClear = function (){
	$("#notesElement").val("");
	$("#tagElement").val("");
	$("#tagId").val("");
	app.emptyNotes();

}
app.emptyNotes = function(){
	$("#showList").html("");
	log("emptyNotes")
}
app.changeSite = function(){
	log(this);
	$("#urlIframe").attr("src",$(this).attr("url"));
	$("#tagElement").val($(this).attr("tag"));
	$("#notesElement").val($(this).attr("note"));
	$("#tagId").val($(this).attr("idTag"));
	app.emptyNotes();
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
	options._id = $("#tagId").val();
	$.ajax({
		"url" : "/save",
		"data" : options,
		"contentType" : "JSON",
		"success" : app.ajaxSuccess,
		"error" : app.ajaxError
	});	
	$("#notesElement").val("");
	$("#tagElement").val("");
	$("#tagId").val("");
}
app.updateTage = function(){
	
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
	log("fetch")
	log(xhr.length);

	var temp = $("#goText").val();
	for(var i=0;i<xhr.length;i++)
	{
		log(xhr[i]._id);
		if(temp == xhr[i].tags)
		{
			$("#showList").append("<li class='list-group-item' note='"+xhr[i].notes+"' tag='"+xhr[i].tags+"' idTag='"+xhr[i]._id+"' url='"+xhr[i].url+"' >"+xhr[i].notes+"</li>");
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
	log(result.responseText	);
	$(".glyphicon.glyphicon-refresh.glyphicon-refresh-animate").hide();
}
