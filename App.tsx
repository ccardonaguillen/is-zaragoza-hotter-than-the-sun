
import React, { useState, useEffect, useMemo } from 'react';
import { fetchWeatherData } from './services/weatherService';
import type { CityWeather } from './types';
import { SortByOption } from './types';
import { ZARAGOZA_ID } from './constants';

import Header from './components/Header';
import Footer from './components/Footer';
import ZaragozaHeatIndexWidget from './components/ZaragozaHeatIndexWidget';
import GlobalWallOfHeat from './components/GlobalWallOfHeat';
import HeatMap from './components/HeatMap';
import DynamicComparator from './components/DynamicComparator';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
    const [weatherData, setWeatherData] = useState<CityWeather[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortByOption>(SortByOption.TEMPERATURE);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await fetchWeatherData();
                setWeatherData(data);
                setError(null);
            } catch (err) {
                setError("Failed to fetch weather data. Please try again later.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const { zaragozaData, otherCitiesData, zaragozaRank } = useMemo(() => {
        if (weatherData.length === 0) {
            return { zaragozaData: null, otherCitiesData: [], zaragozaRank: 0 };
        }

        const sortedByTemp = [...weatherData].sort((a, b) => b.temperature - a.temperature);
        const zData = weatherData.find(c => c.id === ZARAGOZA_ID) || null;
        const oData = weatherData.filter(c => c.id !== ZARAGOZA_ID);
        const zRank = zData ? sortedByTemp.findIndex(c => c.id === ZARAGOZA_ID) + 1 : 0;

        return { zaragozaData: zData, otherCitiesData: oData, zaragozaRank: zRank };
    }, [weatherData]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900">
                <LoadingSpinner />
                <p className="mt-4 text-lg font-semibold text-slate-700 dark:text-slate-300 font-display">
                    Checking Global Temperatures...
                </p>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-red-100 dark:bg-red-900">
                <p className="text-xl text-red-700 dark:text-red-200">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 heat-shimmer">
            <Header />
            <main className="container mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-3">
                        {zaragozaData && <ZaragozaHeatIndexWidget temperature={zaragozaData.temperature} rank={zaragozaRank} total={weatherData.length} />}
                    </div>

                    <div className="lg:col-span-3 bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-lg">
                       <h2 className="text-3xl font-bold text-center mb-6 font-display text-orange-600 dark:text-orange-400">Is Zaragoza Hotter Than...?</h2>
                       {zaragozaData && <DynamicComparator zaragozaData={zaragozaData} otherCitiesData={otherCitiesData} />}
                    </div>
                    
                    <div className="lg:col-span-3 bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-lg">
                        <h2 className="text-3xl font-bold text-center mb-2 font-display text-red-600 dark:text-red-400">Interactive Heat Map of the World</h2>
                        <p className="text-center text-slate-600 dark:text-slate-400 mb-6">Hover over the dots to see who's really sweating.</p>
                        <HeatMap weatherData={weatherData} />
                    </div>

                    <div className="lg:col-span-3">
                        <GlobalWallOfHeat
                            cities={otherCitiesData}
                            zaragozaTemp={zaragozaData?.temperature || 0}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;
