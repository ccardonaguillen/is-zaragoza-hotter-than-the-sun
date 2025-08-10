import type { City } from './types';

export const ZARAGOZA_ID = 'zaragoza';

// Data based on real coordinates.
export const CITIES_TO_MONITOR: Omit<City, 'temperature'>[] = [
    { id: ZARAGOZA_ID, city: 'Zaragoza', country: 'Spain', lat: 41.6488, lon: -0.8891 },
    { id: 'cairo', city: 'Cairo', country: 'Egypt', lat: 30.0444, lon: 31.2357 },
    { id: 'timbuktu', city: 'Timbuktu', country: 'Mali', lat: 16.7666, lon: -3.0026 },
    { id: 'khartoum', city: 'Khartoum', country: 'Sudan', lat: 15.5007, lon: 32.5599 },
    { id: 'djibouti_city', city: 'Djibouti', country: 'Djibouti', lat: 11.589, lon: 43.145 },
    { id: 'dubai', city: 'Dubai', country: 'UAE', lat: 25.276987, lon: 55.296249 },
    { id: 'riyadh', city: 'Riyadh', country: 'Saudi Arabia', lat: 24.7136, lon: 46.6753 },
    { id: 'kuwait_city', city: 'Kuwait City', country: 'Kuwait', lat: 29.3759, lon: 47.9774 },
    { id: 'basra', city: 'Basra', country: 'Iraq', lat: 30.5143, lon: 47.8181 },
    { id: 'ahvaz', city: 'Ahvaz', country: 'Iran', lat: 31.3183, lon: 48.6924 },
    { id: 'jacobabad', city: 'Jacobabad', country: 'Pakistan', lat: 28.2818, lon: 68.4382 },
    { id: 'new_delhi', city: 'New Delhi', country: 'India', lat: 28.6139, lon: 77.209 },
    { id: 'bangkok', city: 'Bangkok', country: 'Thailand', lat: 13.7563, lon: 100.5018 },
    { id: 'death_valley', city: 'Death Valley', country: 'USA', lat: 36.4626, lon: -116.8682 },
    { id: 'mexicali', city: 'Mexicali', country: 'Mexico', lat: 32.6278, lon: -115.4545 },
    { id: 'marble_bar', city: 'Marble Bar', country: 'Australia', lat: -21.174, lon: 119.742 },
    {
        id: 'alice_springs',
        city: 'Alice Springs',
        country: 'Australia',
        lat: -23.698,
        lon: 133.8807,
    },
];

export const HEAT_LEVELS: { min: number; max: number; text: string }[] = [
    { min: -Infinity, max: 20, text: 'Basically winter. Grab a jacket, maybe two.' },
    { min: 20, max: 25, text: "Pleasantly warm. We'll allow it." },
    {
        min: 25,
        max: 30,
        text: "Official T-shirt weather. The locals are complaining it's 'fresquito'.",
    },
    {
        min: 30,
        max: 35,
        text: 'Standard Zaragoza summer. The pigeons are flying with their beaks open.',
    },
    { min: 35, max: 38, text: "¡Hace un calor que te torras! - You're getting roasted!" },
    { min: 38, max: 40, text: 'Surface of the Sun mode. The asphalt is melting.' },
    { min: 40, max: Infinity, text: 'Entering Mordor. Not even the cierzo dares to blow.' },
];

export const COMPARATOR_CITIES = ['Dubai', 'Timbuktu', 'Death Valley'];
