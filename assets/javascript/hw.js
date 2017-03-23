$( document ).ready(function() {

	var topics = ['All That', 'Kenan & Kel', 'Are You Afraid of the Dark?', 'Salute Your Shorts', 'Hey Dude', 'Legends of the Hidden Temple']

	function makeButtonsFunc() {
		$('.gifButtons').empty();
		for (var i = 0; i < topics.length; i++) {
			var newButton = $('<button>');
			newButton.addClass('btn btn-info categoryButton');
			newButton.attr('data-topic', topics[i]);
			newButton.text(topics[i]);
			$('.gifButtons').append(newButton);
		}
	}

	makeButtonsFunc();

	$('#add-category').on('click', function(event) {
		event.preventDefault();
		function toTitleCase(str){
    		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		};
		var newTopic = toTitleCase($('#category-input').val().trim());
		if (newTopic !== "") {
			topics.push(newTopic);
			makeButtonsFunc();
		}
		$('#category-input').val('');
	});

	$('.gifButtons').on('click', 'button.categoryButton', function() {
		var searchTerm = $(this).attr('data-topic');
		var apiKey = 'dc6zaTOxFJmzC';
		var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + searchTerm + '&api_key='+apiKey+'&limit=10';

		$.ajax({
			url: queryURL,
			method: 'GET'
			})
		.done(function(response) {
			var results = response.data;
			$('#categories').empty();

			for (var i = 0; i < results.length; i++) {
				if (results[i].rating !== 'r') {
					var gifDiv = $('<div class="item">');
					var rating = results[i].rating.toUpperCase();
					var p = $('<p>').html('<strong>Rating: ' + rating+'</strong>');
					var topicImage = $('<img>');
					topicImage.attr('src', results[i].images.fixed_height_still.url);
					topicImage.attr('data-state', 'still');
					topicImage.attr('data-still', results[i].images.fixed_height_still.url);
					topicImage.attr('data-animate', results[i].images.fixed_height.url);
					gifDiv.append(p);
					gifDiv.prepend(topicImage);

					$('#categories').prepend(gifDiv);
				}
			}
		});
	}); //end of categoryButton on click

	$('#categories').on('click','img', function() {
		var state = $(this).attr('data-state');
		if (state === 'still') {
			$(this).attr('src', $(this).attr('data-animate'));
			$(this).attr('data-state', 'animate');
		} else {
			$(this).attr('src', $(this).attr('data-still'));
			$(this).attr('data-state', 'still');
		}
	});//end of gif on click

}); //end document.ready