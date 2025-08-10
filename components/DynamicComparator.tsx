
import React from 'react';
import type { CityWeather } from '../types';
import { COMPARATOR_CITIES } from '../constants';
import ShareIcon from './icons/ShareIcon';

interface DynamicComparatorProps {
  zaragozaData: CityWeather;
  otherCitiesData: CityWeather[];
}

const DynamicComparator: React.FC<DynamicComparatorProps> = ({ zaragozaData, otherCitiesData }) => {
  const comparisonCities = COMPARATOR_CITIES.map(name => 
    otherCitiesData.find(c => c.city === name)
  ).filter((c): c is CityWeather => c !== undefined);

  const handleShare = (text: string) => {
    const shareableText = `${text} #ZaragozaHeatIndex`;
    if (navigator.share) {
      navigator.share({
        title: 'Zaragoza Heat Index Report',
        text: shareableText,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback for desktop browsers
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareableText)}`;
      window.open(twitterUrl, '_blank');
    }
  };

  const comparisons = comparisonCities.map(city => {
    const isHotter = zaragozaData.temperature > city.temperature;
    const comparisonText = `Today, Zaragoza (${zaragozaData.temperature}°C) is ${isHotter ? 'hotter' : 'cooler'} than ${city.city} (${city.temperature}°C).`;
    const wittyText = `Right now, you'd be sweating ${isHotter ? 'less' : 'more'} in ${city.city}!`;

    return (
      <div key={city.id} className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-slate-800 dark:text-slate-200">{comparisonText}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">{wittyText}</p>
        </div>
        <button 
          onClick={() => handleShare(comparisonText + ' ' + wittyText)}
          className="bg-sky-500 hover:bg-sky-600 text-white rounded-full p-2 transition-transform duration-200 hover:scale-110 flex-shrink-0"
          aria-label={`Share comparison with ${city.city}`}
        >
          <ShareIcon />
        </button>
      </div>
    );
  });

  return (
    <div className="space-y-4">
      {comparisons}
    </div>
  );
};

export default DynamicComparator;
