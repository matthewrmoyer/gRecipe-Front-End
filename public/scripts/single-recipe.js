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

		/* 
		$.get('/single-recipe:id', (data) => {
		data.forEach((element) => {
			//push to arrays to use with handlbars
			//do mulitple get requests for different parts if necessary
		})
	})*/



	// $(".single-recipe-delete-button").on('click', () => {
	// 	console.log('cliking delete')
	// 		//arrow functions fuck up 'this' figure 'this' out so you dont have to put the class in here
	// 	var id = window.location.href.split("/").pop();
	// 	console.log(id)
	// 	$.ajax({
	// 		url: '/single-recipe',
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







	$(".single-recipe-edit-button").on("click", function(){
		$(".single-recipe-edit-input").toggleClass('display')
		$(".single-recipe-edit-submit-button").toggleClass('display')

	})


});