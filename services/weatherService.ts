import { CITIES_TO_MONITOR } from '../constants';
import type { City, CityWeather } from '../types';

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

if (!OPENWEATHER_API_KEY) {
    console.warn('OpenWeather API key not found. Please check your .env file.');
}

// This is a mock service. In a real application, you would use a weather API.
// It generates plausible but random temperatures to simulate a daily fetch.
export async function fetchWeatherData(): Promise<City[]> {
    const cities = CITIES_TO_MONITOR;
    // Use Promise.all to fetch all cities in parallel
    const weatherPromises = cities.map((city) =>
        getWeatherForLocation({ lat: city.lat, lon: city.lon })
    );

    const weatherResults = await Promise.all(weatherPromises);

    const citiesWithWeather = cities.map((city, index) => {
        const cityWeather = weatherResults[index];

        return {
            ...city,
            temperature: cityWeather ? Math.round(cityWeather.main.temp) : null,
        };
    });
    return citiesWithWeather;
}

export async function getWeatherForLocation(location: {
    lat: number;
    lon: number;
}): Promise<CityWeather | null> {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );
    const weatherData = await response.json();

    return weatherData;
}
