class Geoweather {
    constructor(latitude, longitude, units, lang) {
        // this.apiKey = '76b93cbb410678929b546b3dcd258ec6';
        this.latitude = latitude;
        this.longitude = longitude;
        this.units = units;
        this.lang = lang;
    }

    // Fetch weather for COORDINATES from API as promise
    async getWeather() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&units=${this.units}&lang=${this.lang}&appid=76b93cbb410678929b546b3dcd258ec6`);

        const responseData = await response.json();
        return responseData;
    }

    // Change geolocation method
    changeWeatherGeolocation(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = this.longitude;
    }
    // Change Units method
    changeUnits(units) {
        this.units = units;
    }

    // Change language method
    changeLang(lang) {
        this.lang = lang;
    }
}
