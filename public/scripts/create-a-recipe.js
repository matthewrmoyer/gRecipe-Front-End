$(document).ready(function() {


	//sanity test
	// $("body").on('click', function(){
	// 	console.log('body asdadsfafdas')
	// })


	$('.create-a-recipe-submit-button').on("click", (event) => {
		event.preventDefault()

		console.log('create a click')

		$.post('https://grecipeback.herokuapp.com/recipeRoute', {
				title: $(".create-a-recipe-name-input").val(),
				body: $(".create-a-recipe-body-input").val(),
				image: $(".create-a-recipe-image-input").val()
			})
			.done(console.log('post success'))
			.fail(console.log('post failed'))
		//location.reload();
	})

});