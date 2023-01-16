interface SelectedCity {
    name: string;
    value: {
        lat: number,
        lon: number
    }
}

interface WeatherData {
    weather: {
        "id": number,
        "main": string,
        "description": string,
        "icon": string
    }[],
    main: {
        "temp": number,
        "feels_like": number,
        "temp_min": number,
        "temp_max": number,
        "pressure": number,
        "humidity": number,
        "sea_level": number,
        "grnd_level": number
    },
    visibility: number,
    wind: {
        "speed": number,
        "deg": number,
        "gust": number
    },
    clouds: {
        "all": number
    }
}

interface IFavouriteCity {
    [key: string]: {
        currentCity: SelectedCity,
        weatherData: WeatherData
    }
}

interface IContext {
    favouriteCity: IFavouriteCity | null,
    setFavouriteCity: (args: any) => void
}



// @ts-ignore
export { SelectedCity, WeatherData, IContext, IFavouriteCity }