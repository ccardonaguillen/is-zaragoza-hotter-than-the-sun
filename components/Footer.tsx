
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 py-6 bg-slate-200 dark:bg-slate-800 border-t border-slate-300 dark:border-slate-700">
      <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-400 text-sm">
        <p className="font-bold">Disclaimer:</p>
        <p>Data is for entertainment purposes only. Do not use this site to plan your survival strategy in a heatwave.</p>
        <p>Just drink water and complain like a true 'maño'.</p>
        <p className="mt-4 text-xs">A "Highly Scientific" Project</p>
      </div>
    </footer>
  );
};

export default Footer;
