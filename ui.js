class Ui {
    constructor() {
        this.wlocation = document.getElementById('w-location');
        this.wdate = document.getElementById('w-date');
        this.weathericon = document.getElementById('w-icon');
        this.wdescription = document.getElementById('w-description');
        this.wtemperature = document.getElementById('w-temperature');
        this.wfeelslike = document.getElementById('w-feelslike');
        this.whumidity = document.getElementById('w-humidity');
        this.wwindspeed = document.getElementById('w-windspeed');
        this.wsunrise = document.getElementById('w-sunrise');
        this.wsunset = document.getElementById('w-sunset');        
    }
    
    populateData(weather) {

        // Get correct Units for Temperature and Wind speed according to the chosen Units
        let tempUnits, speedUnits;
        
        if(storage.units === 'metric') {
            tempUnits = '&#8451';
            speedUnits = 'km/h';
            
        } else {
            tempUnits = '&#8457';
            speedUnits = 'mph';
        };
        
        // Uppercase for the first letter of weather description 
        let description =  weather.weather[0].description;
        let fisrtLetter = description.slice(0, 1).toUpperCase();
        description = description.replace(description.slice(0, 1), description.slice(0, 1).toUpperCase());
        

        // Populate Weather 
        this.wlocation.innerHTML = `<span>${weather.name} ${weather.sys.country}</span> `;
        this.wdate.innerHTML = `<span>${moment(weather.dt*1000).format("Do MMMM")}</span>`;
        this.weathericon.innerHTML = `<img class="icon-main" src="img/${weather.weather[0].icon}.svg" alt="icon">`;
        this.wdescription.innerHTML = `<span>${description}</span>`;
        this.wtemperature.innerHTML = `<span>${Math.ceil(weather.main.temp)} ${tempUnits}</span>`;
        this.wfeelslike.innerHTML = `<span>${Math.ceil(weather.main.feels_like)} ${tempUnits}</span>`;
        this.whumidity.innerHTML = `<span>${weather.main.humidity} %</span>`;
        this.wwindspeed.innerHTML = `<span>${weather.wind.speed} ${speedUnits}</span>`;
        this.wsunrise.innerHTML = `<span>${moment(weather.sys.sunrise*1000).format("h:mm:ss a")}</span>`;
        this.wsunset.innerHTML = `<span>${moment(weather.sys.sunset*1000).format("h:mm:ss a")}</span>`;        
    }

}