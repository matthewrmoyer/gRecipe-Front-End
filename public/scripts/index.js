$(document).ready(function() {

	//dummy data
	var allRecipes = []



	$.get('https://grecipeback.herokuapp.com/recipeRoute', (data) => {
			data.forEach((element) => {
				// console.log(element)
				//push to all reciples array to use with handlbars
				allRecipes.push(element)
			})
			console.log(allRecipes)


			var allRecipesSorted = allRecipes.sort((a, b) => {
				var a1 = a.rating
				var b1 = b.rating
				return a1 < b1 ? 1 : -1
			});



			var source = $("#all-recipes-template").html();
			var template = Handlebars.compile(source);

			allRecipesSorted.forEach((element) => {
				var html = template(element)
				$('.recipes-placeholder').append(html)
			})



		})
	//sanity test
	$("body").on('click', function() {
		console.log('body clicked')
	})



});