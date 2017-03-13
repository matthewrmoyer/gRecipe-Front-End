$(document).ready(function() {

	//dummy data
	var allRecipes = [
		{
			"id": 1,
			"name": "Peanut Butter and Jelly",
			"author": "Steve",
			"rating": 2
		},
		{
			"id": 2,
			"name": "Cereal",
			"author": "Joe",
			"rating": 5
		}
	]

	//sanity test
	$("body").on('click', function(){
		console.log('body clicked')
	})



	var allRecipesSorted = allRecipes.sort((a,b) =>{
		var a1 = a.rating
		var b1 = b.rating
		return a1<b1? 1: -1
	});
	




	var source   = $("#all-recipes-template").html();
	var template = Handlebars.compile(source);

	allRecipesSorted.forEach((element) => {
		var html = template(element)
		$('.recipes-placeholder').append(html)
	})






});