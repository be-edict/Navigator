const weatherDiv = document.getElementById('weather');

//status anzeigen
weatherDiv.innerHTML = "Position wird ermittelt...";

//#region getting location
let latitude;
let longitude;
getGeolocation();

let locationname;

function getGeolocation(weatherDiv) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
    } else {
        weatherDiv.innerHTML = "Geolocation is not supported";
    }
}

function getPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    getCity(latitude, longitude);
}

function getCity(latitude, longitude) {
    const url = 'https://nominatim.openstreetmap.org/reverse?lat='+ latitude +'&lon='+ longitude +'&format=jsonv2';
    console.log(url);
    fetch(url)
        .then((response) =>{
            if(!response.ok) {
                throw new Error("No network response");
            }
            return response.json();
        })
        .then((data) => {
            data.address["ISO3166-2-lvl4"] = undefined;

            for (const dataKey in data.address) {
                if( data.address[dataKey] === data.address.house_number ||
                    data.address[dataKey] === data.address.road ||
                    data.address[dataKey] === data.address.ISO3166-2||
                    data.address[dataKey] === data.address.postcode ||
                    data.address[dataKey] === data.address.country_code) { continue; }

                if(dataKey !== undefined && dataKey !== "") {
                    locationname = data.address[dataKey];
                    if(locationname.length >= 15) {
                        locationname = locationname.substr(0, 15) + "...";
                    }
                    console.log(locationname);
                    break;
                }
            }
            callWeatherApi();
        });
}
//#endregion

//status anzeigen
weatherDiv.innerHTML = weatherDiv.innerHTML = "Wetter wird geladen...";

//api aufruf
let watch = navigator.geolocation.watchPosition(callWeatherApi);

//#region getting WeatherData
function callWeatherApi() {
    navigator.geolocation.clearWatch(watch);

    console.log(latitude, longitude);
    let URL = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude +"&current=temperature_2m,is_day,weather_code&timezone=Europe%2FBerlin&forecast_days=1&models=icon_seamless";

    console.log(URL);
    fetch(URL)
        .then(response => {
            if(!response.ok) {
                throw new Error("No network response");
            }
            return response.json();
        })
        .then(data =>{
            showData(data.current.is_day, data.current.temperature_2m, data.current.weather_code);
        })
        .catch(error => {
            console.log("Error:", error);
        });
}
//#endregion

//#region showing Data
function showData(isday, temperature, weather_code) {
    isday = true;
    if(isday){
        weatherDiv.style.background = getComputedStyle(document.body).getPropertyValue("--day");
        weatherDiv.style.color = getComputedStyle(document.body).getPropertyValue("--maincolor");
    } else {
        weatherDiv.style.background = getComputedStyle(document.body).getPropertyValue("--night");
        weatherDiv.style.color = getComputedStyle(document.body).getPropertyValue("--lightfontcolor");
    }

    weatherDiv.innerHTML = "<div>" + locationname + "</div><div>" + temperature + "°C </div> <div><i class='material-symbols-outlined'>" + getWeatherIcon(weather_code, isday) + "</i></div>";
}

function getWeatherIcon(weather_code, isday) {
    switch (weather_code) {
        case 0: case 1: /*clear sky & mainly clear*/
            if(isday) {
                return "wb_sunny"; /*sun*/
            } else {
                return "nightlight"; /*moon*/
            }
        case 2: /*partly cloudy*/
            if(isday) {
                return "partly_cloudy_day"
            } else {
                return "partly_cloudy_night"
            }
        case 3: /*overcast*/
            return "cloud";
        case 45: case 48: /*fog and depositing rime fog*/
            return "foggy";
        case 51: case 53: case 55: /*drizzle :c*/
            return "rainy_light"
        case 56: case 57: case 66: case 67: /*freezing drizzle or freezing rain :c*/
            return "rainy_snow";
        case 61: case 63: case 65: /*rain :c*/
            return "rainy_heavy";
        case 71: case 73: case 75: /*snowfall*/
            return "weather_snowy";
        case 77: /*snow grains*/
            return "grain";
        case 80: case 81: case 82: /*rain showers*/
            return "rainy";
        case 85: case 86: /*snow showers*/
            return "weather_snowy";
        case 95: case 96: case 99: /*thunderstorm*/
            return "thunderstorm";
        default: "error";
    }
}
//#endregion
