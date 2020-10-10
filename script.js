// function for initial AJAX aPI requset for lon, lat information
function searchCity() {


    // API call parameters
    var cityInput = $("#city-input").val()
    var key = "81fb2d9b5eaa43adaf9049768eeaf307"
    var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + key



    // AJAX API call
    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        var lon = response.coord.lon
        var lat = response.coord.lat

        // call function for forecast AJAX call
        forecast(lon, lat);
    });
};

function forecast(lon, lat) {
    
    var key = "81fb2d9b5eaa43adaf9049768eeaf307"
    var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +"&exclude=hourly&appid=" + key
    
    // AJAX API call
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response) {

        console.log(response);

    });
};


// search btn listener
var $searchBtnEl = $("#search-btn")
$searchBtnEl.on("click", searchCity)