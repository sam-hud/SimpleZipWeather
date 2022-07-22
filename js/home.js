$(document).ready(function(){
    $("#submitButton").click(function(){
        getWeather();
    });

});

//For enter key functionality
$(".form-horizontal").keypress(function(e) {
    if((e.which == 13) || (e.which ==3)) {
        getWeather();
        return false;
    }
});

function getWeather(){
    var zip = $("#zipCode").val();
    var units = $("#unitChoice").val();
    var API_KEY = config.API_KEY;
    if(zip != ""){
        $.ajax({
            type: 'GET',
            url: "https://api.openweathermap.org/data/2.5/weather?zip=" + zip +"&appid="+ API_KEY + "&units=" + units,
            dataType: "jsonp",
            success: function(result) {
                var weatherDiv = $('#weatherDiv');
                weatherDiv.empty();
                if(units == "metric"){
                    weatherDiv.append(showResultsMetric(result));
                }else{
                    weatherDiv.append(showResultsImperial(result));
                }

                $("#zipErrorText").hide();
                },
            error: function() {
                $("#zipErrorText").show();
            }
        });}
    else{
        $("#zipErrorText").show();
    }
}
function showResultsMetric(data){
    return  '<h1 class="text-center text-muted"><small class="text-muted">Current Weather for '+data.name+', '+data.sys.country+'</small></h1>'+
            "<center><h3>Weather: "+data.weather[0].main+"</h3>"+
            "<h3>Description:<img src='http://openweathermap.org/img/w/"+data.weather[0].icon+".png'> "+data.weather[0].description+"</h3>"+
            "<h3>Temperature: "+data.main.temp+" &deg;C</h3>"+
            "<h3>Pressure: "+data.main.pressure+" hpa</h3>"+
            "<h3>Humidity: "+data.main.humidity+"%</h3>"+
            "<h3>Min Temperature: "+data.main.temp_min+"&deg;C</h3>"+
            "<h3>Max Temperature: "+data.main.temp_max+"&deg;C</h3>"+
            "<h3>Wind Speed: "+data.wind.speed+"m/s</h3>"+
            "<h3>Wind Direction: "+data.wind.deg+"&deg;</h3></center>";
}

function showResultsImperial(data){
    return  '<h1 class="text-center text-muted"><small class="text-muted">Current Weather for '+data.name+', '+data.sys.country+'</small></h1>'+
            "<center><h3>Weather: "+data.weather[0].main+"</h3>"+
            "<h3>Description:<img src='http://openweathermap.org/img/w/"+data.weather[0].icon+".png'> "+data.weather[0].description+"</h3>"+
            "<h3>Temperature: "+data.main.temp+" F</h3>"+
            "<h3>Pressure: "+data.main.pressure+" hpa</h3>"+
            "<h3>Humidity: "+data.main.humidity+"%</h3>"+
            "<h3>Min Temperature: "+data.main.temp_min+" F</h3>"+
            "<h3>Max Temperature: "+data.main.temp_max+" F</h3>"+
            "<h3>Wind Speed: "+data.wind.speed+"ft/s</h3>"+
            "<h3>Wind Direction: "+data.wind.deg+"&deg;</h3></center>";
}

