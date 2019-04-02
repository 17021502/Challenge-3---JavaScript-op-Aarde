
function getAPIdata() {

	var url = "https://api.openweathermap.org/data/2.5/weather";
	var apiKey ="41c00cb4988588cceec48485602667a8";
	var stad = document.getElementById("stad").value;

	// construct request
	var request = url + "?" + "appid=" + apiKey + "&" + "q=" + stad;
	
	// get current weather
	fetch(request)
	
	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {
		// render weatherCondition
		onAPISucces(response);	
	})
	
	// catch error
	.catch(function (error) {
		onAPIError(error);
	});
}


function onAPISucces(response) {
	// get type of weather in string format
	var type = response.weather[0].description;

	// get temperature in Celcius
	var degC = Math.floor(response.main.temp - 273.15);

	// render weather in DOM
	var weatherBox = document.getElementById('temperatuur');
	weatherBox.innerHTML = degC + "&#176;C <br>" + type;

document.getElementById('windsnelheid').innerHTML = response.wind.speed + ' m/s' ; 
document.getElementById('luchtdruk').innerHTML = response.main.pressure + ' hPa' ; 

}



function initMap(){
var options = {
	zoom:8,
	center:{lat:52.3680,lng:4.9036}
	}

var map = new google.maps.Map(document.getElementById('map'), options);
var marker = new google.maps.Marker({position:{lat:52.3680,lng:4.9036},map:map
});
}













function onAPIError(error) {
	console.error('Fetch request failed', error);
	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = 'No weather data available <br /> Did you enter a valid city?'; 
}

// init data stream
document.getElementById("getWeather").onclick = function(){
	getAPIdata();
};
