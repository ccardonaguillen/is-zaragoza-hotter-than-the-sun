
import React, { useMemo } from 'react';
import type { CityWeather } from '../types';
import { SortByOption } from '../types';
import CityWeatherCard from './CityWeatherCard';

interface GlobalWallOfHeatProps {
  cities: CityWeather[];
  zaragozaTemp: number;
  sortBy: SortByOption;
  setSortBy: (option: SortByOption) => void;
}

const GlobalWallOfHeat: React.FC<GlobalWallOfHeatProps> = ({ cities, zaragozaTemp, sortBy, setSortBy }) => {
  const sortedCities = useMemo(() => {
    const sorted = [...cities];
    switch (sortBy) {
      case SortByOption.TEMPERATURE:
        return sorted.sort((a, b) => b.temperature - a.temperature);
      case SortByOption.CITY_ASC:
        return sorted.sort((a, b) => a.city.localeCompare(b.city));
      case SortByOption.CONTINENT: // Simplified continent grouping
         return sorted.sort((a, b) => a.country.localeCompare(b.country));
      default:
        return sorted;
    }
  }, [cities, sortBy]);

  const getButtonClass = (option: SortByOption) => {
    return sortBy === option
      ? 'bg-orange-500 text-white shadow-md'
      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-orange-100 dark:hover:bg-slate-600';
  };

  return (
    <div className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-2 font-display text-red-600 dark:text-red-400">
        The Global "Wall of Heat"
      </h2>
      <p className="text-center text-slate-600 dark:text-slate-400 mb-6">How does Zaragoza stack up against the world's hotspots?</p>

      <div className="flex justify-center flex-wrap gap-2 mb-8">
        <button onClick={() => setSortBy(SortByOption.TEMPERATURE)} className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 text-sm ${getButtonClass(SortByOption.TEMPERATURE)}`}>
          Hottest First
        </button>
        <button onClick={() => setSortBy(SortByOption.CITY_ASC)} className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 text-sm ${getButtonClass(SortByOption.CITY_ASC)}`}>
          By City (A-Z)
        </button>
        <button onClick={() => setSortBy(SortByOption.CONTINENT)} className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 text-sm ${getButtonClass(SortByOption.CONTINENT)}`}>
          By Country
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedCities.map((city) => (
          <CityWeatherCard key={city.id} city={city} zaragozaTemp={zaragozaTemp} />
        ))}
      </div>
    </div>
  );
};

export default GlobalWallOfHeat;
