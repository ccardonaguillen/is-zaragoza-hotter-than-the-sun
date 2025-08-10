
import React from 'react';
import type { CityWeather } from '../types';
import SmugSunIcon from './icons/SmugSunIcon';
import ShiveringCactusIcon from './icons/ShiveringCactusIcon';

interface CityWeatherCardProps {
  city: CityWeather;
  zaragozaTemp: number;
}

const CityWeatherCard: React.FC<CityWeatherCardProps> = ({ city, zaragozaTemp }) => {
  const isHotter = city.temperature > zaragozaTemp;
  const tempDiff = Math.abs(city.temperature - zaragozaTemp);
  const tempDiffText = tempDiff.toFixed(0);

  return (
    <div className={`flex flex-col p-4 rounded-lg shadow-md transition-all duration-300 ${isHotter ? 'bg-red-50 dark:bg-red-900/40 border-red-200 dark:border-red-800' : 'bg-blue-50 dark:bg-blue-900/40 border-blue-200 dark:border-blue-800'} border`}>
      <div className="flex-grow">
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">{city.city}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{city.country}</p>
        <p className="text-4xl font-black text-slate-700 dark:text-slate-200 mb-3">{city.temperature}°C</p>
      </div>
      <div className="flex items-center gap-3 mt-auto border-t border-dashed pt-3 border-slate-300 dark:border-slate-600">
        <div className="w-10 h-10">
          {isHotter ? <SmugSunIcon /> : <ShiveringCactusIcon />}
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {isHotter ? 'Hotter' : 'Cooler'} than Zaragoza
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isHotter ? 'Just another Tuesday.' : 'You call that heat?'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CityWeatherCard;
