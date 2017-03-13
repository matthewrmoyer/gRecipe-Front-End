$(document).ready(function() {


	var allRecipes = [
		{
			"id": 1,
			"name": "Peanut Butter and Jelly",
			"rating": 3
		},
		{
			"id": 2,
			"name": "Cereal",
			"rating": 5
		}
	]
	$("body").on('click', function(){
		console.log('body clicked')
	})




	var source   = $("#all-recipes-template").html();
	var template = Handlebars.compile(source);


	for( var i = 0; i<allRecipes.length; i++) {
		var html = template(allRecipes[i])
		$('.content-placeholder').append(html)
	}









});