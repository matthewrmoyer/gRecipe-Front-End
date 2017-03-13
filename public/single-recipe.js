$(document).ready(function() {

	//dummy data
	var singleRecipe = [
		{
			"id": 1,
			"name": "Peanut Butter and Jelly",
			"author": "Steve",
			"rating": 2
		}
	]

	//sanity test
	$("body").on('click', function(){
		console.log('body clicked')
	})




	




	var source   = $("#all-recipes-template").html();
	var template = Handlebars.compile(source);

	allRecipesSorted.forEach((element) => {
		var html = template(element)
		$('.recipes-placeholder').append(html)
	})






});