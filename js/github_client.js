//define functions here
var createGist = function(file_name, content, description, token){
	var data={
		"public": true,
		"description": description,
		"files": {
			
		}
	}
	data.files[file_name]= {
		"content": content
	}
	$.ajax({
		url:"https://api.github.com/gists",
		type:'POST',
		dataType: 'json',
		headers: {
			Authorization: "token "+token,
		},
		data: JSON.stringify(data),
		

	}).done(function(response){
		myGists(response.owner.login,token)
	});
};

var myGists = function (username, token){
	$.ajax({
		url:"https://api.github.com/users/"+username+"/gists",
		type:'get',
		dataType: 'json',
		headers: {
			Authorization: "token "+token
		},
		success:function(data){
			$.each(data,function(i,gist){
				$('#result').append('<li><a href="'+gist.html_url+'">'+gist.description+'</a></li>')

			})
		}

	});
};

var bindCreateButton = function() {
  // call functions here
  $('form').submit(function(e){
  	e.preventDefault();
  	var file_name=$('#txtFileName').val();
  	var content=$('#txtContents').val();
  	var description=$('#txtDescription').val();
  	var token=$('#txtToken').val();

  	createGist(file_name, content, description, token);
  })
};

$(document).ready(function(){
	bindCreateButton();
});