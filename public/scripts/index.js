$(document).ready(function() {
	const $blogPostSubmitButton = $(".blogpost-submit-button")
	const $blogPostEditButton = $(".blogpost-edit-button")

	// if(window.location.href.split('#').pop()=='new-blog-form'){
	// console.log(window.location.href.split('#').pop())
	// setTimeout(function(){window.location.hash = '#new-blog-form'}, 1000)

	// }

	$("body").on('click', function(){
		console.log('body clicked')
	})


	$.get('/blogpost', (data) => {
		data.forEach((element) => {
			console.log(element)
			$(".blogs")
				.append(`<div class='single-blog-container col-xs-10'>
							<h3><a class = "blog-title" href = /blogpost/single-blogpost/${element['id']}> ${element['title']} </a> </h3>
							<h4 class='blog-author'> by ${element['name']} </h4>
							<p class='blog-body'>${element['body']} </p>
								<div class = "blogpost-button-container col-xs-12">
									<button data-id = ${element['id']} class = 'blogpost-comment-button blogpost-comment-button-${element['title'].toLowerCase().replace(' ', '-')}'><a class = "blog-title" href = /blogpost/single-blogpost/${element['id']}> <i class="fa fa-commenting" aria-hidden="true"></i> </a>
 </button>
									<button data-id = ${element['id']} class = 'blogpost-edit-button blogpost-edit-button-${element['title'].toLowerCase().replace(' ', '-')}'> <a class = "blog-title" href = /blogpost/single-blogpost/${element['id']}><i class="fa fa-pencil" aria-hidden="true"></i>
</a> 
</button>
									<button data-id = ${element['id']} class = 'blogpost-delete-button blogpost-delete-button-${element['title'].toLowerCase().replace(' ', '-')}'> <i class="fa fa-trash-o" aria-hidden="true"></i>
 </button>
								</div>
						</div>`)
		})
	})

	$(document).on("click", ".blogpost-delete-button", function() {
		console.log('cliking delete')
		var id = $(this).data('id')
		$.ajax({
			url: '/blogpost',
			type: 'DELETE',
			data: {
				'id': id
			},
			success: function(response) {
				console.log('delete success')
			}
		});
		location.reload();
	})



	$blogPostSubmitButton.on("click", (event) => {
		event.preventDefault()
		console.log('click')


		$.post('/blogpost', {
				name: $(".name-input").val(),
				email: $(".email-input").val(),
				blogpostTitle: $(".title-input").val(),
				blogpostBody: $(".body-input").val()
			})
			.done(console.log('post success'))
			.fail(console.log('post failed'))
		location.reload();
	})



});