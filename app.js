var animals = ['parrot', 'cat', 'dog', 'elephant', 'coyote', 'moose', 'fox', 'pig', 'chicken'];

function displayGifInfo() {

    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        // console.log(response)
        results = response.data
        // console.log(results)
        for (var i = 0; i < results.length; i++) {
            // console.log(results[i].images.fixed_height_still.url)
            var gifImageUrl = results[i].images.fixed_height_still.url;
            var gifUrl = results[i].images.original.url;
            // Creating and storing an image tag
            var gifImage = $("<img>");
            gifImage.addClass("gifImage");
            // Setting the gifImage src attribute to imageUrl
            gifImage.attr("src", gifImageUrl);
            gifImage.attr("data-still", gifImageUrl);
            gifImage.attr("data-animate", gifUrl);
            gifImage.attr("data-state", "still");
            gifImage.attr("alt", "gif image");
            // Prepending the catImage to the images div
            var gifDiv = $("<div>");
            gifDiv.addClass("gifDiv");
            var rating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(rating);
            gifDiv.append(gifImage);
            $("#gif-view").prepend(gifDiv);
        }
    });
}

// Function for displaying gif data
function renderButtons() {
    // Deleting the animal buttons prior to adding new animal buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#animal-array").empty();
    // Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {
        // Then dynamicaly generating buttons for each animal in the array.
        var a = $("<button>");
        a.addClass("animal-btn");
        // Adding a data-attribute with a value of the animal at index i
        a.attr("data-name", animals[i]);
        // Providing the button's text with a value of the animal at index i
        a.text(animals[i]);
        // Adding the button to the HTML
        $("#animal-array").append(a);
    }
}

// This function handles events where one button is clicked
$("#add-animal").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();
    // This line will grab the text from the input box
    var animal = $("#animal-input").val().trim();
    // The animal from the textbox is then added to our array
    animals.push(animal);
    // calling renderButtons which handles the processing of our animal array
    renderButtons();
});

$(document).on("click", ".animal-btn", displayGifInfo);


$(".gifImage").on("click", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

renderButtons();