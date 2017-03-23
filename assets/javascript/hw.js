$( document ).ready(function() {

	var topics = ['All That', 'Kenan & Kel', 'Are You Afraid of the Dark?', 'Salute Your Shorts', 'Hey Dude', 'Legends of the Hidden Temple']

	function makeButtonsFunc() {
		$('.gifButtons').empty();
		for (var i = 0; i < topics.length; i++) {
			var newButton = $('<button>');
			newButton.addClass('categoryButton');
			newButton.attr('data-topic', topics[i]);
			newButton.text(topics[i]);
			$('.gifButtons').append(newButton);
		}
	}

	makeButtonsFunc();

	$("#add-category").on('click', function(event) {
		event.preventDefault();
		var newTopic = $('#category-input').val().trim();
        topics.push(newTopic);
		makeButtonsFunc();
	});

	$('.gifButtons').on('click', 'button.categoryButton', function() {
		var searchTerm = $(this).attr('data-topic');
		var apiKey = 'dc6zaTOxFJmzC';
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key="+apiKey+"&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
			})
		.done(function(response) {
			var results = response.data;
			console.log(response);
			$('#categories').empty();

			for (var i = 0; i < results.length; i++) {
				if (results[i].rating !== "r") {
					var gifDiv = $("<div class='item'>");
					var rating = results[i].rating;
					var p = $("<p>").text("Rating: " + rating);
					var topicImage = $("<img>");
					topicImage.attr("src", results[i].images.fixed_height_still.url);
					topicImage.attr("data-state", 'still');
					topicImage.attr("data-still", results[i].images.fixed_height_still.url);
					topicImage.attr("data-animate", results[i].images.fixed_height.url);
					gifDiv.append(p);
					gifDiv.prepend(topicImage);

					$('#categories').prepend(gifDiv);
					// console.log(queryURL);
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