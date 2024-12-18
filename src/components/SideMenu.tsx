import React from 'react';
import { Menu, X } from 'lucide-react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-black/80 backdrop-blur-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-pink-500 transition-colors"
      >
        <X size={24} />
      </button>
      
      <div className="p-8 text-white">
        <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500">
          Menu
        </h2>
        <nav className="space-y-4">
          <a href="#" className="block hover:text-pink-500 transition-colors">Home</a>
          <a href="#" className="block hover:text-pink-500 transition-colors">About</a>
          <a href="#" className="block hover:text-pink-500 transition-colors">Projects</a>
          <a href="#" className="block hover:text-pink-500 transition-colors">Contact</a>
        </nav>
      </div>
    </div>
  );
};

export default SideMenu;