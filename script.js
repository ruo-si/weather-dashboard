
let units = "imperial"
let unitLabel = " °F"
let searchHistory = ["paris", "london", "madrid"]
let $historyContainerEl = $(".history-container")


function loadPage() {

    // clear previous btns
    $historyContainerEl.empty();

    // if the search history is not empty
    if (!searchHistory.length) {
        return;
    }
    else {

        // for every element in history-array
        for (var i = 0; i < searchHistory.length; i++) {

            // create and format btns
            var historybtns = $("<btn>").text(searchHistory[i]).addClass("btn history-btn").attr("data-city", searchHistory[i])

            // append btns to history-container
            $historyContainerEl.append(historybtns);

        };

        // display result of last searched
        searchCity(searchHistory[0])
    };

};

// function for initial AJAX aPI requset for lon, lat information
function searchCity(cityInput) {

    // API access info
    var key = "81fb2d9b5eaa43adaf9049768eeaf307"
    var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + key + "&units=" + units

    // AJAX API call request
    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function (response) {

        // target and assign lon and lat to variable
        let lon = response.coord.lon
        let lat = response.coord.lat

        const currIconInfo = response.weather[0].icon
        const currTempInfo = response.main.temp.toFixed() + unitLabel


        $("#city-info").empty().text(cityInput.toUpperCase())
        $("#curr-temp").empty().text(currTempInfo)
        $("#curr-icon").empty().attr("src", "http://openweathermap.org/img/wn/" + currIconInfo + "@2x.png");


        // call function for forecast AJAX call
        forecast(lon, lat);

        saveSearch(cityInput)
    });
};

function saveSearch(cityInput) {

    // save the last search to the first element
    searchHistory.unshift(cityInput);

    // check if more than 5 items, remove last index element
    if (searchHistory.length > 5) {
        searchHistory.pop()
    }
    console.log(searchHistory)

}

// function for initial AJAX aPI requset for additional forecast information
function forecast(lon, lat) {

    // get reference to forecast container
    const $forecastContainer = $(".forecast-container");

    // API access info
    var key = "81fb2d9b5eaa43adaf9049768eeaf307"
    var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&units=" + units + "&appid=" + key

    // AJAX API call
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response) {

        // clear previous search info in forecast cards
        $forecastContainer.empty();

        // forecast today info from response
        const currDateInfo = moment.unix(response.current.dt).format("dddd MMMM Do YYYY");
        const currHumidityInfo = response.current.humidity
        const currWindSpeedInfo = response.current.wind_speed
        const currUvIndexInfo = response.current.uvi

        // append today/current additional forecast info
        $("#curr-date").text(currDateInfo);
        $("#curr-humidity").text("Humidity: " + currHumidityInfo + "%");
        $("#curr-wind-speed").text("Wind Speed " + currWindSpeedInfo + " MPH");
        $("#curr-uvi").text("UV Index " + currUvIndexInfo);

        // check .favorable, .moderate or .severe and add appropriate class
        if (currUvIndexInfo < 6) { $("#curr-uvi").addClass("favorable"); }

        else if (currUvIndexInfo > 6 && currUvIndexInfo < 8) {

            $("#curr-uvi").addClass("moderate");

            // remove previous conditions
            $("#curr-uvi").removeClass("favorable");
        }

        else {
            $("#curr-uvi").addClass("severe");

            // remove previous conditions
            $("#curr-uvi").removeClass("favorable moderate");
        }


        // forcast 5 day array
        const forecast5 = response.daily

        // loop through days array generate and append 5 day forecast cards dynamically
        for (let i = 1; i < 6; i++) {

            // set up information reference from API response
            const iconInfo = forecast5[i].weather[0].icon;
            const dateInfo = moment.unix(forecast5[i].dt).format("dddd");
            const tempInfo = forecast5[i].temp.day.toFixed() + unitLabel;

            // create and format forecast elements
            const $forecastDayCardEl = $("<div>").addClass("card text-center").attr("style", "20rem;");
            const $forecastDateEl = $("<div>").addClass("date").text(dateInfo);
            const $forecastIconEl = $("<img>").addClass("icon").attr("src", "http://openweathermap.org/img/wn/" + iconInfo + "@2x.png");
            const $forecastTempEl = $("<p>").addClass("temp").text(tempInfo);


            // append info to card
            $forecastDayCardEl
                .append($forecastDateEl)
                .append($forecastIconEl)
                .append($forecastTempEl)

            // append card to container/display
            $forecastContainer.append($forecastDayCardEl);
        };
    });
};

// switch between metric and imperial units on display
function unitToggle() {
    // check current unit
    // if imperial, change to standard
    if (units === "imperial") {
        units = "metric";
        unitLabel = " °C";
        $unitBtnEl.text("°C");
    }

    // else, set to imperial
    else {
        units = "imperial";
        unitLabel = " °F"
        $unitBtnEl.text("°F");
    };
    searchCity()
};

// set up detail info card
// grab informatin from response
// change attribute to change colour with CSS
// append information to card
// set up show hide conditnions 


// units btn listener
const $unitBtnEl = $("#unit-btn");
$unitBtnEl.on("click", unitToggle)

// search btn listener
const $searchBtnEl = $("#search-btn");
$searchBtnEl.on("click", function search() {

    // get user input value
    var cityInput = $("#city-input").val().trim();

    // call searchCity 
    searchCity(cityInput);
});

// set history btn event listener
let $historyBtnEl = $(".history-btn");
$historyBtnEl.on("click", function () {

    // call searchCity function with history-btn data
    searchCity($(this).attr("data-city"))
})

// load page call with to load previous search upon opening 
loadPage()