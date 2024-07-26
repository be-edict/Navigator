let latitude;
let longitude;
const weatherDiv = document.getElementById('weather');

getGeolocation();

let watch = navigator.geolocation.watchPosition(callApi);

function getGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
    } else {
        weatherDiv.innerHTML = "Geolocation is not supported";
    }
}

function getPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
}

function callApi() {
    navigator.geolocation.clearWatch(watch);

    console.log(latitude, longitude);
    let URL = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude +"&hourly=temperature_2m,weather_code&timezone=Europe%2FBerlin&forecast_days=1&models=icon_seamless"

    fetch(URL)
        .then(response => {
            if(!response.ok) {
                throw new Error("No network response");
            }
            return response.json();
        })
        .then(data =>{
            console.log(data);
        })
        .catch(error => {
            console.log("Error:", error);
        });

}