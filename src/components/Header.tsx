import React from 'react';
import type { City } from '../types';
import { HiMenu } from 'react-icons/hi';

interface HeaderProps {
  selectedCity: City | null;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ selectedCity, onMenuClick }) => {
  return (
    <header className="flex h-16 w-full items-center justify-between bg-white px-4 shadow-md md:hidden">
      <button
        onClick={onMenuClick}
        className="text-2xl text-gray-600 hover:text-blue-500"
        aria-label="Open sidebar"
      >
        <HiMenu />
      </button>
      <h1 className="text-lg font-bold text-gray-800">
        {selectedCity ? selectedCity.name : 'Select a City'}
      </h1>
      <div className="w-6"></div>
    </header>
  );
};

export default Header;