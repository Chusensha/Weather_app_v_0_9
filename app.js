// Tabs initialization
function openTab(pageName, elmnt) {
    var i, tabContent, tabBtns;
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    tabBtns = document.getElementsByClassName("tab-btn");
    
    document.getElementById(pageName).style.display = "block";
    // elmnt.style.backgroundColor = color;
  }

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();




// Initialize session storage
storage = new Storage();
// Initialize UI and Weather class instances
ui = new Ui();
// Global scope vars
latitude = "";
longitude = "";
weather = "";

// Define default values for units and language

// On start set default Units and Lang, check Storage and get weather by city name (if any) or location (if no city stored)

document.addEventListener('DOMContentLoaded', startWeather);


function startWeather() {
  storage = new Storage();
//  Set default values for Units and Lang
  if(storage.units === undefined) {
    storage.setStorageUnits('metric');
  }

  if(storage.lang === undefined) {
    storage.setStorageLang('en');
  }

// Get weather by city name (if any) or location (if no city stored)
  if(storage.city === undefined) {
    // Get weather by location
    console.log(storage.city, 'storage city is undefined at funk startWeather');
    getGeoWeather();

    } else {
      //Get weather by city
      console.log(storage.city);
      getCityWeather();
    }    
}




// -------- Functions ----------

// Get new geolocation function + get weather by location
function getGeoWeather() {
  // Hide modal if the function has been called from there
  modal.style.display = "none";
  overlay.style.display = "none"
  // Function: Get geolocation
  function getGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoords);
    } else { 
      document.getElementById('error-handler').innerText = "Geolocation is not supported by this browser.";
    }
  };
  // Function: Get coordinates and get weather by location (geoweather)
  function getCoords(position) {
    // Get coordinates as backfunction
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    // Initialize Geoweather class object
    weather = new Geoweather(latitude, longitude, storage.getStorageUnits(), storage.getStorageLang());
    // Get real weather by location
    getWeatherByLocation();
    // Delete city from storage if it is the last method used so that the app will get weather by location if settings were changed (because reloading app is set there)
    storage.deleteCity()
  }
  // Activate function
  getGeolocation();
};


// Get weather by city name from Storage
function getCityWeather() {
  weather = new Weather(storage.getStorageCity(), storage.getStorageUnits(), storage.getStorageLang());
  console.log(weather);
  getWeatherByCity();
}


// Get fetch response for city. This func will be called from 1)at start and 2)in case of city change. The callback function (func) will be used if this function is called from change city button to save the new city in Storage in case of positive result (if the new city name exists)
function getWeatherByCity() {
  weather.getWeather()
    .then(result => {
      ui.populateData(result);
      
    })
    
    .catch(err => {
      // console.log(responseData.message);
      // document.querySelector('.alert-text').innerText = 'Connection Error';
      
  })
}
  
// Get weather by geolocation
function getWeatherByLocation() {
  weather.getWeather()
    .then(result => {ui.populateData(result);})
    .catch(err => {
      document.querySelector('.alert-text').innerText = 'Connection Error';
      console.log(err);
  })
}


// -------- Modal and functionality --------
// --- Get the modal ---
var modal = document.getElementById("modal");
// Get the button that opens the modal
var locationBtn = document.getElementById("location-btn");
var overlay = document.querySelector(".overlay");

// When the user clicks the button, open the modal 
locationBtn.onclick = function() {
  modal.style.display = "block";
  overlay.style.display = "block";
  // overlayOn();
}
// Get the <span> element that closes the modal
var closeBtn = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
  modal.style.display = "none";
  overlay.style.display = "none"
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == overlay) {
    overlay.style.display = "none";
    modal.style.display = "none";
  }
}

// --- Modal functions ---
// Modal buttons selected
const btnCity = document.querySelector('.btn-change-city');
const btnLocation = document.querySelector('.btn-change-location');
// Modal buttons functionality
btnLocation.addEventListener('click', getGeoWeather);
btnCity.addEventListener('click', getNewCity);


// Get weather by new city from modal
function getNewCity() {
  city = document.getElementById("new_city").value;
  console.log(city);
  weather = new Weather(city, storage.getStorageUnits(), storage.getStorageLang());
  getWeatherByCity(city);

  weather.changeWeatherCity(city);
  modal.style.display = "none";
  overlay.style.display = "none";
}


// -------- Error Handler --------

function showErr(text) {
  errAlert = document.querySelector('.err-alert');
  alertMessage = errAlert.querySelector('.alert-text');
  alertMessage.innerText = text;
  errAlert.style.display = 'flex';
}




// -------- SETTINGS --------
// Define a short var for Setting form
const formSettings = document.getElementById('settings');

// Event listener for Settings tab button
document.getElementById('btnSettings').addEventListener('click', showSettings);

// Get and show previously set settings for Units and Lang.NB: the form is selected here by its NAME (because the short var from above does not working!?)
function showSettings() {
  openTab('Settings', this);
  document.settings.units.value = sessionStorage.units;
  document.settings.lang.value = sessionStorage.lang;
}

// Settings form - button functionality
formSettings.addEventListener('submit', (e) => {
  // Prevent default submit action
  e.preventDefault();
  // Get newly selected setting for Units and Lang
  units = formSettings.querySelector('input[name = "units"]:checked').value;
  lang = formSettings.querySelector('input[name = "lang"]:checked').value;
  // Save the new setting into the Storage
  storage.setStorageUnits(units);
  storage.setStorageLang(lang);
  // Reload the app
  
  openTab('Today', this);
  startWeather();
  // window.location.reload();
});


