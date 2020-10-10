// function for initial AJAX aPI requset for lon, lat information
function searchCity() {


    // API call parameters
    var cityInput = $("#city-input").val()
    var key = "81fb2d9b5eaa43adaf9049768eeaf307"
    var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + key



    // AJAX API call request
    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        // target and assign lon and lat to variable
        var lon = response.coord.lon
        var lat = response.coord.lat

        // append today/current forecast info
            // grab reference from response assign to variable
            // append information to page

        // generate history buttons dynamically
            // create button
            // set attributes
            // append to button
            // append button to page

        // set up detail info card
            // grab informatin from response
            // change attribute to change colour with CSS
            // append information to card
            // set up show hide conditnions 


        // call function for forecast AJAX call
        forecast(lon, lat);
    });
};


// function for initial AJAX aPI requset for additional forecast information
function forecast(lon, lat) {

    // get reference to forecast container
    var $forecastContainer = $("#forecast-container")
    var key = "81fb2d9b5eaa43adaf9049768eeaf307"
    var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +"&exclude=hourly&appid=" + key
    
    // AJAX API call
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        // loop through days array generate and append 5 day forecast cards dynamically

            // create cards and information reference from response
            var $forcastDayCard = $("<div>")
            var $forecastDate = $("<div>")
            var $forecastTemp = $("<p>")
            var $forecastIcon = $("<img>")

            // append information from response

            // append cards to container


    });
};


// search btn listener
var $searchBtnEl = $("#search-btn")
$searchBtnEl.on("click", searchCity)

