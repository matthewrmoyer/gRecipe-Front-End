$(document).ready(function() {

	//dummy data
	var singleRecipe = [{
		"id": 1,
		"name": "Peanut Butter and Jelly",
		"author": "Steve",
		"rating": 2,
		"image": "google.com/images",
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
		// "ingredients": [
		// 	{
		// 		"id": 1,
		// 		"name": "Milk"
		// 	}, 
		// 	{
		// 	"id": 7,
		// 	"name": "Eggs"
		// 	}
		// ],
		"reviews": [
			{
				"id": 9,
				"recipe_id": 1,
				"author": "Sarah",
				"body": "this recipe sux",
				"timestamp": "September 17"
			},
			{
				"id": 12,
				"recipe_id": 1,
				"author": "Joe",
				"body": "this recipe rulz",
				"timestamp": "July 1"
			}
		]
	}]

	var ingredients = [
			{
				"id": 1,
				"name": "Milk"
			}, 
			{
			"id": 7,
			"name": "Eggs"
			}
		]

	//sanity test
	$("body").on('click', function() {
		console.log('body clicked')
	})


	var source = $("#single-recipe-template").html();
	var template = Handlebars.compile(source);

	var ingredientsSource = $("#ingredients-template").html();
	var ingredientsTemplate = Handlebars.compile(ingredientsSource)

	singleRecipe.forEach((element) => {
		var html = template(element)
		$('.recipes-placeholder').append(html)
	})



		var html = ingredientsTemplate(ingredients)
		$('.ingredients-placeholder').append(html)



});