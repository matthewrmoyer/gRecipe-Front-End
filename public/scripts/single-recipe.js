$(document).ready(function() {

	//dummy data
	var singleRecipe = [{
		"id": 1,
		"name": "Peanut Butter and Jelly",
		"author": "Steve",
		"rating": 2,
		"steps": [
			{
			"id": 1,
			"body": "call your mom and ask her what to do",
			"stepNumber": 1,
			"recipe_id": 1
			}, 
			{
			"id": 9,
			"body": "just use the microwave",
			"stepNumber": 2,
			"recipe_id": 1
			}, 
		],
		"ingredients": [
			{
				"id": 1,
				"name": "Milk"
			}, 
			{
			"id": 7,
			"name": "Eggs"
			}
		]
	}]

	//sanity test
	$("body").on('click', function() {
		console.log('body clicked')
	})






	var source = $("#all-recipes-template").html();
	// console.log(source)
	var template = Handlebars.compile(source);

	singleRecipe.forEach((element) => {
		var html = template(element)
		$('.recipes-placeholder').append(html)
	})



});