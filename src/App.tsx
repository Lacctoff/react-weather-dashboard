import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import Header from './components/Header';
import type { City } from './types';
import { CITIES } from './constants/cities';

function App() {
  const [selectedCity, setSelectedCity] = useState<City | null>(CITIES[1]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative h-screen w-screen overflow-hidden md:flex">
      <Sidebar
        cities={CITIES}
        onCitySelect={setSelectedCity}
        selectedCity={selectedCity}
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="flex h-screen flex-1 flex-col">
        <Header
          selectedCity={selectedCity}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-grow">
          <Map selectedCity={selectedCity} />
        </main>
      </div>
      
      {isSidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="absolute inset-0 z-40 bg-black/50 md:hidden"
        ></div>
      )}
    </div>
  );
}

export default App;