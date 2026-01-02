
import React from 'react';
import { User } from '../types';

interface NavbarProps {
  user: User;
  onOpenLogin: () => void;
  onLogout: () => void;
}

const LogoSVG = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Concentric Circles */}
    <circle cx="50" cy="50" r="40" />
    <circle cx="50" cy="50" r="30" />
    <circle cx="50" cy="50" r="22" />
    <circle cx="50" cy="50" r="14" />
    
    {/* Central Bean Shape */}
    <path 
      d="M50 42 C54 42 58 46 58 50 C58 54 54 58 50 58 C46 58 42 54 42 50 C42 46 46 42 50 42 Z" 
      fill="currentColor" 
      stroke="none"
    />
    <path d="M44 54 Q50 50 56 46" stroke="white" strokeWidth="1.5" />
    
    {/* Handle Detail at the bottom right */}
    <path d="M78 78 L88 88" />
    <path d="M72 84 L82 94" />
  </svg>
);

const Navbar: React.FC<NavbarProps> = ({ user, onOpenLogin, onLogout }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <LogoSVG className="w-9 h-9 text-amber-900" />
            <span className="text-xl font-bold tracking-tight text-stone-800">MASTER COFFEE</span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-stone-600">
            <a href="#hero" className="hover:text-amber-800 transition-colors">Home</a>
            <a href="#menu" className="hover:text-amber-800 transition-colors">Menu</a>
            {user.isAuthenticated && (
              <a href="#staff" className="text-amber-800 font-bold border-b-2 border-amber-800">Staff Portal</a>
            )}
            <a href="#about" className="hover:text-amber-800 transition-colors">Our Story</a>
          </div>

          <div className="flex items-center">
            {user.isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-stone-600 hidden sm:inline">Welcome, {user.username}</span>
                <button 
                  onClick={onLogout}
                  className="px-4 py-2 text-sm font-medium text-amber-800 hover:text-amber-900"
                >
                  Logout
                </button>
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center border border-amber-200">
                  <i className="fa-solid fa-user text-amber-800"></i>
                </div>
              </div>
            ) : (
              <button 
                onClick={onOpenLogin}
                className="bg-amber-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-amber-800 transition-all shadow-md active:scale-95"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
