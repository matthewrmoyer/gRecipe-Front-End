$(document).ready(function() {



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

	var targetRecipeId = getUrlParameter('id'); uncomment when deploying
	// var targetRecipeId = 63;  //comment this out when deploying
	console.log(targetRecipeId)

	var targetRecipe = {};

	var targetSteps = [];

//USE FOR EACH AND ARROW FOR THESE
//USE JS-NATIVE-ARRAY FROM NOTES
//FIND BY ID METHOD
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
			"steps": targetSteps
		})

		$(".recipes-placeholder").append(html)
	}

	$.get('https://grecipeback.herokuapp.com/recipeRoute', (data) => {
		data.forEach((element) => {
			recipes.push(element)
		})
		console.log("RECIPES:")
		console.log(recipes)

		$.get('https://grecipeback.herokuapp.com/stepRoute', (data) => {
			data.forEach((element) => {
				steps.push(element)
			})
			console.log("STEPS:")
			console.log(steps)
		}).then(getSuccessFunction)
	})
	$(document).on('click','.single-recipe-delete-button', () => {
		console.log('cliking delete')
		$.ajax({
			url: 'https://grecipeback.herokuapp.com/recipeRoute',
			type: 'DELETE',
			data: {
				'id': targetRecipeId
			},
			success: function(response) {
				console.log('delete success')
			}
		});
		setTimeout(function() {
			location.reload();
		}, 500)
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



	// $('.review-submit-button').on('click', () => {
	// 	console.log('clikkkkkkkk subbbigsadf')


	// 	$.post('/whatever the link should be here', {
	// 			author: $('.review-author-input').val(),
	// 			id: window.location.href.split("/").pop(),
	// 			body: $('.review-author-input').val()

	// 		})
	// 		.done(console.log('comment post success'))
	// 		.fail(console.log('comment post failed...'))


	// 	setTimeout(function() {
	// 		location.reload();
	// 	}, 500)
	// }) 



	// 	$('.single-recipe-edit-submit-button').on('click', () => {
	// 	var singleRecipeId = window.location.href.split("/").pop();
	// 	var singleRecipleEditBody = $('.single-recipe-edit-input').val();
	// 	console.log(blogpostBody)
	// 	$.ajax({
	// 		url: '/asl;kdfjakls;fjasl;fkjasl;fkjal;kfjdsal;fkjals;dfkjas;lfdk/edit',
	// 		type: 'PATCH',
	// 		data: {
	// 			'id': singleRecipeId,
	// 			'body': singleRecipeEditBody
	// 		},
	// 		success: function(response) {
	// 			console.log('patch success')
	// 		}
	// 	});
	// 	setTimeout(function() {
	// 		location.reload();
	// 	}, 500)

	// })


//recipe recveiuewsadfadsffdsa
/*
email
body
recipe id
rating 1-5
*/





	$(".single-recipe-edit-button").on("click", function() {
		$(".single-recipe-edit-input").toggleClass('display')
		$(".single-recipe-edit-submit-button").toggleClass('display')

	})

	$(".single-review-edit-button").on("click", function() {
		$(this).siblings('textarea').toggleClass('display')
		$(this).siblings('.single-recipe-review-edit-submit-button').toggleClass('display')


	})


});