class Storage {
    constructor() {
        this.city = sessionStorage.city;
        this.units = sessionStorage.units;
        this.lang = sessionStorage.lang;
    }

    getStorageCity() {
        this.city = sessionStorage.getItem('city');
        return (this.city)
    }
    
    getStorageUnits() {
        this.units = sessionStorage.getItem('units');
        return this.units;
    }

    getStorageLang() {
        this.lang = sessionStorage.getItem('lang');
        return this.lang
    }


    setStorageCity(city) {
        sessionStorage.setItem('city', city);
    }

    setStorageUnits(units) {
        sessionStorage.setItem('units', units);
    }
    
    setStorageLang(lang) {
        sessionStorage.setItem('lang', lang); 
    } 

   
    deleteCity() {
        sessionStorage.removeItem("city");
    }

}