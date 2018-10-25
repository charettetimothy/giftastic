var animals = ['parrot', 'cat', 'dog', 'elephant', 'coyote', 'moose', 'fox', 'pig', 'chicken'];

function displayGifInfo() {

    var gif = $(this).attr("data-name");
    console.log(this)
    var queryURL = "https://api.giphy.com/v1/gifs/" + gif + "?api_key=bL9rUyK3uIdKJ7tcGzyZ3JnwROJKT8P4";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#gif-view").text(JSON.stringify(response));
        console.log(response)
    });
}

// Function for displaying gif data
function renderButtons() {
    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#animal-array").empty();
    // Looping through the array of movies
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

renderButtons();