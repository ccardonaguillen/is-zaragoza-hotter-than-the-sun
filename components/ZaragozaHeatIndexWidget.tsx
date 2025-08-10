
import React from 'react';
import { HEAT_LEVELS } from '../constants';

interface ZaragozaHeatIndexWidgetProps {
    temperature: number;
    rank: number;
    total: number;
}

const getHeatLevel = (temp: number): string => {
    const level = HEAT_LEVELS.find(l => temp < l.max);
    return level ? level.text : "Beyond comprehension.";
};

const ZaragozaHeatIndexWidget: React.FC<ZaragozaHeatIndexWidgetProps> = ({ temperature, rank, total }) => {
    const heatLevelText = getHeatLevel(temperature);

    const getRankColor = () => {
        if (rank === 1) return 'text-red-500';
        if (rank <= 5) return 'text-orange-500';
        return 'text-amber-500';
    };

    return (
        <div className="bg-gradient-to-br from-white to-amber-50 dark:from-slate-800 dark:to-slate-900 p-6 md:p-8 rounded-2xl shadow-2xl text-center flex flex-col items-center border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-slate-700 dark:text-slate-200">Zaragoza Heat Index</h2>
            <div className="my-4 md:my-6">
                <span className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-red-500 to-yellow-500 animate-pulse">
                    {temperature}°C
                </span>
            </div>
            <p className="text-lg md:text-xl font-medium text-slate-600 dark:text-slate-300 italic max-w-md">
                "{heatLevelText}"
            </p>
            <div className="mt-6 border-t-2 border-dashed border-slate-300 dark:border-slate-600 w-full max-w-xs pt-4">
                <p className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 font-display">
                    Global Heat Rank Today: <span className={`${getRankColor()} font-black`}>#{rank}</span>
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">out of {total} monitored locations</p>
            </div>
        </div>
    );
};

export default ZaragozaHeatIndexWidget;
