$(document).ready(function() {


	var ingredientsArray = []
	//sanity test
	$("body").on('click', function(){
		console.log('body clicked')
	})

	$.get('https://grecipeback.herokuapp.com/ingredientRoute', (data) => {
			data.forEach((element) => {
				ingredientsArray.push(element['name'])
				$(".ingredient-placeholder").append(element['name'])
			})
			console.log(ingredientsArray)
		})




		

			// var source = $("#all-recipes-template").html();
			// var template = Handlebars.compile(source);

			// allRecipesSorted.forEach((element) => {
			// 	var html = template(element)
			// 	$('.recipes-placeholder').append(html)
			// })



		


});