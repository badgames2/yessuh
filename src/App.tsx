import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import TripTunnel from './components/TripTunnel';
import Text3D from './components/Text3D';
import SideMenu from './components/SideMenu';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <TripTunnel />
      
      <div className="relative z-10">
        <Text3D />
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-16">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full 
                     text-white border border-white/20 hover:bg-white/20 
                     transition-all duration-300 flex items-center gap-2"
          >
            <Menu size={20} />
            Open Menu
          </button>
        </div>
      </div>

      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
}

export default App;