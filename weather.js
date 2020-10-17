class Weather {
    constructor(city, units, lang) {
        // this.apiKey = '76b93cbb410678929b546b3dcd258ec6';
        this.city = city;
        this.units = units;
        this.lang = lang;
    }

    // Fetch weather for a CITY from API as promise
    async getWeather() {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=${this.units}&lang=${this.lang}&appid=76b93cbb410678929b546b3dcd258ec6`);

        const responseData = await response.json();
        console.log(response);
        if(response.status === 200) {
            storage.setStorageCity(this.city);
            return responseData;
        } else {
            switch(responseData.cod) {
                case '404':
                    showErr('No such city found');
                    break;
                case '400':
                    showErr(`You didn't pass any city name`);
                    break;
                default:
                    showErr(responseData.message);
                    break;
            }
            
        }
    }

    // Change city method
    changeWeatherCity(city) {
        this.city = city;
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

