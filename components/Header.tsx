
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10 shadow-md">
      <div className="container mx-auto px-4 py-4 md:px-8">
        <h1 className="text-2xl md:text-4xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 dark:from-orange-400 dark:to-red-500 font-display uppercase tracking-wider">
          The Zaragoza Global Heat Index
        </h1>
        <p className="text-center text-sm md:text-base text-slate-600 dark:text-slate-400 mt-1">
            A deadly serious investigation into a searing question.
        </p>
      </div>
    </header>
  );
};

export default Header;
