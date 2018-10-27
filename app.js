$( document ).ready(function() {

var animals = ['parrot', 'cat', 'dog', 'elephant', 'coyote', 'moose', 'fox', 'pig', 'chicken'];

function renderButtons() {
    $("#animal-array").empty();
    for (var i = 0; i < animals.length; i++) {
        var animalArray = $("<button>");
        animalArray.addClass("animal-btn");
        animalArray.attr("data-name", animals[i]);
        animalArray.text(animals[i]);
        $("#animal-array").append(animalArray);
    }
}

function displayGifInfo() {
    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        results = response.data
        for (var i = 0; i < results.length; i++) {
            var gifImageUrl = results[i].images.fixed_height_still.url;
            var gifUrl = results[i].images.original.url;
            var rating = $("<p>").text("Rating: " + results[i].rating);
            var gifImage = $("<img>");
            var gifDiv = $("<div>"); 
            gifImage.addClass("gifImage");
            gifImage.attr("src", gifImageUrl);
            gifImage.attr("data-still", gifImageUrl);
            gifImage.attr("data-animate", gifUrl);
            gifImage.attr("data-state", "still");
            gifImage.attr("alt", "gif image");
            gifDiv.addClass("gifDiv");
            gifDiv.append(rating);
            gifDiv.append(gifImage);
            $("#gif-view").prepend(gifDiv);
        }
    });
}

$(document).on("click", ".animal-btn", displayGifInfo);

$("#add-animal").on("click", function (event) {
    event.preventDefault();
    var animal = $("#animal-input").val().trim();
    animals.push(animal);
    renderButtons();
});

// $(document).on("click", ".gifImage", displayGifInfo);
$(document).on("click", ".gifImage", function () {
    var state = $(this).attr("data-state");
    console.log(state)
    // 
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    // 
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

renderButtons();

});