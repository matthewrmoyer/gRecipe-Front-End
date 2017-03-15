$(document).ready(function() {

//get id
	function getUrlParameter(sParam) {
		const sPageURL = decodeURIComponent(window.location.search.substring(1));
		const sURLVariables = sPageURL.split('&');
		let id;
		sURLVariables.forEach((paraName) => {
			const sParameterName = paraName.split('=');
			if (sParameterName[0] === sParam) {
				id = sParameterName[1] === undefined ? false : sParameterName[1];
			}
		});
		return id;
	}

	var targetIngredientId = getUrlParameter('id');
	var ingredientsArray = []
	var recipeIdSet = new Set()
	var recipeArray = []


	//sanity test
	$("body").on('click', function() {
		console.log('body clicked')
	})

	$.get('https://grecipeback.herokuapp.com/ingredientRoute', (data) => {
		data.forEach((element) => {
			ingredientsArray.push(element['name'])

			if(element['id']==targetIngredientId){
			$(".ingredient-placeholder").append(
				`<div class = "single-ingredient-container">
					<a href="${element['name']}.com">${element['name']}</a>
				</div>`
			)
		}
			
		})
			$.get('https://grecipeback.herokuapp.com/recipe_ingredientRoute', (data) => {
				data.forEach((element) => {
				if(element['ingredient_id']==targetIngredientId)
				recipeIdSet.add(element['recipe_id'])
		})


			$.get('https://grecipeback.herokuapp.com/recipeRoute', (data) => {
				data.forEach((element) => {

				if (recipeIdSet.has(element['id'])){
				console.log(element)
				$('.recipes-placeholder').append(
					`<div class = "single-recipe">
						<a href="https://grecipe-front-end.firebaseapp.com/single-recipe.html?id=${element['id']}">${element['title']}</a>
					</div>`
					)
			}
			})
		})

			
		})
	}).then(console.log(recipeIdSet))



	// var source = $("#all-recipes-template").html();
	// var template = Handlebars.compile(source);

	// allRecipesSorted.forEach((element) => {
	// 	var html = template(element)
	// 	$('.recipes-placeholder').append(html)
	// })



});