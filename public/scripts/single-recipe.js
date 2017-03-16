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
		// var targetRecipeId = getUrlParameter('id'); //uncomment when deploying
	var targetRecipeId = 1; //comment this out when deploying
	var targetRecipe = {};
	var ingredients = [];
	var targetSteps = [];
	var reviews = [];
	var avgReview = 0;

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
			"ingredients": ingredients,
			"steps": targetSteps
		})
		console.log(ingredients)
		console.log(targetSteps)
		$(".recipes-placeholder").append(html)
	}

	$.get('https://grecipeback.herokuapp.com/recipeRoute', (data) => {
		data.forEach((element) => {
			recipes.push(element)
		})

		$.get('https://grecipeback.herokuapp.com/recipe_ingredientRoute', (data) => {
			data.forEach((element) => {
				if(element['recipe_id']==targetRecipeId)
				ingredients.push({"name": element['name'], "quantity": element["quantity"], "unit": element["unit"]})
			})
		})

		$.get('https://grecipeback.herokuapp.com/stepRoute', (data) => {
			data.forEach((element) => {
				steps.push(element)
			})
		}).then(getSuccessFunction)
	})

	


	function reviewSuccessFunction() {
		var source = $("#reviews-template").html();
		var template = Handlebars.compile(source);
		for (i = 0; i < reviews.length; i++) {
			var html = template({
				"reviewAuthor": reviews[i]['reviewAuthor'],
				"reviewBody": reviews[i]['reviewBody'],
				"reviewId": reviews[i]['reviewId'],
				"rating": reviews[i]['rating']
			})
			$(".reviews-placeholder").append(html)
		}
		var total = 0;
		var count = 0;
		reviews.forEach((element) => {
			
			if(element['rating']){
			total += element['rating']
			count++;
		}

		})

		avgReview = (total/count)
		console.log(avgReview)
		$('.average-rating').append(avgReview)

	}
	$.get('https://grecipeback.herokuapp.com/reviewRoute', (data) => {
		data.forEach((element) => {
			console.log(element)
			if (element['recipe_id'] == targetRecipeId) {
				reviews.push({
					"reviewAuthor": element['name'],
					"reviewBody": element['body'],
					"reviewId": element['id'],
					"rating": element['rating']
				})
			}
		})
		console.log(reviews)
	}).then(reviewSuccessFunction)



	$(document).on('click', '.single-recipe-delete-button', () => {
		$.ajax({
			method: "DELETE",
			url: `https://grecipeback.herokuapp.com/recipeRoute/${targetRecipeId}`,
			contentType: "application/json"
		}).done(setTimeout(function() {
			location.reload();
		}, 500))

	})

	$(document).on('click', '.review-submit-button', () => {
		event.preventDefault()
		console.log(targetRecipeId)
		console.log($(".review-body-input").val())
		console.log($(".review-rating-input").val())
		console.log($(".review-email-input").val())


		$.post('https://grecipeback.herokuapp.com/reviewRoute', {
				recipe_id: targetRecipeId,
				email: $(".review-email-input").val(),
				body: $('.review-body-input').val(),
				rating: $('.review-rating-input').val()
			})
			.done(setTimeout(function() {
				location.reload();
				console.log('in post done function')
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

	//single-review-edit
	$(document).on("click", ".single-review-edit-button", function() {
		$(this).siblings('textarea').toggleClass('display')
		$(this).siblings('.single-review-rating-edit-input').toggleClass('display')
		$(this).siblings('.single-recipe-review-edit-submit-button').toggleClass('display')
		$(this).siblings('.single-review-edit-submit-button').toggleClass('display')
	})


	$(document).on("click", ".single-review-edit-submit-button", function() {
		console.log('239084uiosdjf')
		console.log('SIBLING TEXT AREA')
		console.log($(this).siblings('textarea'))

		var newRating = $(this).siblings('.single-review-rating-edit-input').val();
		var newReview = $(this).siblings('textarea').val();

		console.log(newRating)
		console.log(newReview)

		var targetReviewId = this.dataset.reviewId


		$.ajax({
			url: `https://grecipeback.herokuapp.com/reviewRoute/${targetReviewId}`,
			method: "PUT",
			contentType: "application/json",
			data: JSON.stringify({
				rating: newRating,
				body: newReview
			})
		}).then(setTimeout(function() {
			location.reload();
		}, 500))
	})

	//single step edit
	$(document).on("click", ".single-step-edit-button", function() {
		$(this).siblings('textarea').toggleClass('display')
		$(this).siblings('.single-step-rating-edit-input').toggleClass('display')
		$(this).siblings('.single-step-review-edit-submit-button').toggleClass('display')
		$(this).siblings('.single-step-edit-submit-button').toggleClass('display')
	})

	$(document).on("click", ".single-review-delete-button", function() {
		console.log('cliking on review delete')
		console.log(this)
		var targetReviewId = this.dataset.reviewId
		console.log(targetReviewId)
		$.ajax({
			method: "DELETE",
			url: `https://grecipeback.herokuapp.com/reviewRoute/${targetReviewId}`,
			contentType: "application/json"
		}).done(setTimeout(function() {
			location.reload();
		}, 500))
	})



});