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

	var recipes = []
	var steps = []
	var targetRecipeId = getUrlParameter('id'); //uncomment when deploying
	// var targetRecipeId = 1; //comment this out when deploying
	var targetRecipe = {};
	var targetSteps = [];

	//USE FOR EACH AND ARROW FOR THESE USE JS-NATIVE-ARRAY FROM NOTES FIND BY ID METHOD
	function getSuccessFunction() {
		for (var i = 0; i < recipes.length; i++) {
			if (recipes[i]['id'] == targetRecipeId) {
				targetRecipe = recipes[i]
			}
		}
		for (var i = 0; i < steps.length; i++) {
			if (steps[i]['recipe_id'] == targetRecipeId) {
				targetSteps.push(steps[i])
			}
		}
		var source = $("#single-recipe-template").html();
		var template = Handlebars.compile(source);
		var html = template({
			"title": targetRecipe['title'],
			"user_id": targetRecipe["user_id"],
			"image": targetRecipe["image"],
			"body": targetRecipe["body"],
			"steps": targetSteps
		})
		$(".recipes-placeholder").append(html)
	}

	$.get('https://grecipeback.herokuapp.com/recipeRoute', (data) => {
		data.forEach((element) => {
			recipes.push(element)
		})
		$.get('https://grecipeback.herokuapp.com/stepRoute', (data) => {
			data.forEach((element) => {
				steps.push(element)
			})
		}).then(getSuccessFunction)
	})

	$(document).on('click', '.single-recipe-delete-button', () => {
		$.ajax({
			method: "DELETE",
			url: `https://grecipeback.herokuapp.com/recipeRoute/${targetRecipeId}`,
			contentType: "application/json"
		}).done(setTimeout(function() {
			location.reload();
		}, 500))
	
	})

	// $(".single-review-delete-button").on('click', () => {
	// 	console.log('cliking delete')
	// 		//arrow functions fuck up 'this' figure 'this' out so you dont have to put the class in here
	// 	var id = //get number from classname
	// 	console.log(id)
	// 	$.ajax({
	// 		url: '/single-recipe-review',
	// 		type: 'DELETE',
	// 		data: {
	// 			'id': id
	// 		},
	// 		success: function(response) {
	// 			console.log('delete success')
	// 		}
	// 	});
	// 	setTimeout(function() {
	// 		location.reload();
	// 	}, 500)
	// })

	$(document).on('click', '.review-submit-button', () => {
		event.preventDefault()
		$.post('https://grecipeback.herokuapp.com/reviewRoute', {
				recipe_id: targetRecipeId,
				body: $('.review-body-input').val(),
				rating: $('.review-rating-input').val()
			})
			.done(setTimeout(function() {
				location.reload();
			}, 500))
			.fail(console.log('comment post failed...'))
	})

	//single-recipe-body-edit
	$(document).on("click", ".single-recipe-edit-button", function() {
		$(".single-recipe-edit-input").toggleClass('display')
		$(".single-recipe-edit-submit-button").toggleClass('display')
		var recipeBody = $(".single-recipe-body").text()
		console.log(recipeBody)
		$(".single-recipe-edit-input").val(recipeBody)
	})

	$(document).on('click', '.single-recipe-edit-submit-button', () => {
		var singleRecipeEditBody = $('.single-recipe-edit-input').val();
		console.log(singleRecipeEditBody)
		console.log('tri' + targetRecipeId)
		$.ajax({
			url: `https://grecipeback.herokuapp.com/recipeRoute/${targetRecipeId}`,
			method: "PUT",
			contentType: "application/json",
			data: JSON.stringify({
				body: singleRecipeEditBody
			})
		}).then(setTimeout(function() {
			location.reload();
		}, 500))
	})

	$(document).on("click", ".single-review-edit-button", function() {
		$(this).siblings('textarea').toggleClass('display')
		$(this).siblings('.single-recipe-review-edit-submit-button').toggleClass('display')
	})



});