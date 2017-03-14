$(document).ready(function() {


	//sanity test
	// $("body").on('click', function(){
	// 	console.log('body asdadsfafdas')
	// })


	$('.create-a-recipe-submit-button').on("click", (event) => {
		event.preventDefault()

		console.log('create a click')

// var blah = {
// 				name: $(".create-a-recipe-name-input").val(),
// 				email: $(".create-a-recipe-username-input").val(),
// 				blogpostTitle: $(".create-a-recipe-title-input").val(),
// 				blogpostBody: $(".create-a-recipe-body-input").val(),
// 				image: $(".create-a-recipe-image-input").val()
// 			}
// 			console.log(blah)



		$.post('/WHATEVER THE RECIPE ROUTE IS', {
				name: $(".create-a-recipe-name-input").val(),
				email: $(".create-a-recipe-email-input").val(),
				blogpostTitle: $(".create-a-recipe-title-input").val(),
				blogpostBody: $(".create-a-recipe-body-input").val()
			})
			.done(console.log('post success'))
			.fail(console.log('post failed'))
		//location.reload();
	})

});