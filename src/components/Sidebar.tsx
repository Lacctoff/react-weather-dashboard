import React, { useState } from 'react';
import type { City } from '../types';
import { HiX } from 'react-icons/hi';

interface SidebarProps {
  cities: City[];
  onCitySelect: (city: City) => void;
  selectedCity: City | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ cities, onCitySelect, selectedCity, isOpen, setIsOpen }) => {
  const [filter, setFilter] = useState('');

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleCityClick = (city: City) => {
    onCitySelect(city);
    setIsOpen(false);
  };

  return (
    <aside
      className={`
        absolute top-0 left-0 z-50 h-full w-72 bg-gray-50 p-4 shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:w-80 md:translate-x-0 md:shadow-none
        
        flex flex-col
      `}
    >
      {/* Non-scrolling part */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Filter Cities</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl text-gray-500 hover:text-red-500 md:hidden"
            aria-label="Close sidebar"
          >
            <HiX />
          </button>
        </div>

        <input
          type="text"
          placeholder="Start typing a city name..."
          className="mt-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Scrollable list */}
      <ul className="mt-4 space-y-1 flex-grow overflow-y-auto"> {/* <-- ADDED: flex-grow and overflow-y-auto */}
        {filteredCities.map(city => (
          <li
            key={city.name}
            className={`cursor-pointer rounded-md p-3 transition-colors ${
              selectedCity?.name === city.name
                ? 'bg-blue-500 font-bold text-white'
                : 'hover:bg-gray-200'
            }`}
            onClick={() => handleCityClick(city)}
          >
            {city.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;