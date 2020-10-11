// function for initial AJAX aPI requset for lon, lat information

let units = "imperial"



function searchCity() {


    // API access info
    let cityInput = $("#city-input").val()
    const key = "81fb2d9b5eaa43adaf9049768eeaf307"
    const queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + key



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
    const $forecastContainer = $(".forecast-container")


    // API access info
    const key = "81fb2d9b5eaa43adaf9049768eeaf307"
    const queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&units=" + units + "&appid=" + key

    // AJAX API call
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response) {

        // clear previous search info forecast cards
        $forecastContainer.empty();

        // forcast 5 day array
        let forecast5 = response.daily

        // loop through days array generate and append 5 day forecast cards dynamically
        for (let i = 1; i < 6; i++) {


            // set up information reference from API response
            const iconInfo = forecast5[i].weather[0].icon;
            const dateInfo = moment.unix(forecast5[i].dt).format("dddd");
            const tempInfo = forecast5[i].temp.day + " °F";

            // create and format forecast elements
            var $forecastDayCardEl = $("<div>").addClass("card text-center").attr("style", "20rem;");
            var $forecastDateEl = $("<div>").addClass("date").text(dateInfo);
            var $forecastIconEl = $("<img>").addClass("icon").attr("src", "http://openweathermap.org/img/wn/" + iconInfo + "@2x.png");
            var $forecastTempEl = $("<p>").addClass("temp").text(tempInfo);

            // append info to card
            $forecastDayCardEl
                .append($forecastDateEl)
                .append($forecastIconEl)
                .append($forecastTempEl)

            // append card to container/display
            $forecastContainer.append($forecastDayCardEl)

        };

    });
};


// search btn listener
var $searchBtnEl = $("#search-btn")
$searchBtnEl.on("click", searchCity)

