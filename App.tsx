import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MenuCard from './components/MenuCard';
import ChatBot from './components/ChatBot';
import AuthModal from './components/AuthModal';
import StaffPortal from './components/StaffPortal';
import { COFFEE_MENU } from './constants';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User>(() => {
    const saved = sessionStorage.getItem('mc_user');
    return saved ? JSON.parse(saved) : { username: '', email: '', isAuthenticated: false };
  });
  const [showAuth, setShowAuth] = useState(false);
  const [filter, setFilter] = useState<'All' | 'Hot' | 'Cold' | 'Specialty'>('All');

  useEffect(() => {
    sessionStorage.setItem('mc_user', JSON.stringify(user));
  }, [user]);

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser({ username: '', email: '', isAuthenticated: false });
    sessionStorage.removeItem('mc_user');
  };

  const filteredMenu = filter === 'All' 
    ? COFFEE_MENU 
    : COFFEE_MENU.filter(item => item.category === filter);

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        user={user} 
        onOpenLogin={() => setShowAuth(true)} 
        onLogout={handleLogout} 
      />

      {/* Hero Section */}
      <section id="hero" className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&auto=format" 
            className="w-full h-full object-cover brightness-[0.4]"
            alt="Coffee Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-stone-900/20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="inline-block px-4 py-1.5 mb-6 bg-amber-800/80 backdrop-blur-md text-amber-50 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
            The Art of Caffeine
          </span>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1]">
            Elevate Your <br />
            <span className="text-amber-500 italic">Daily Ritual</span>
          </h1>
          <p className="text-stone-300 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed font-light">
            Sourced from the highest altitudes, roasted to perfection. Discover our world-class selection of artisanal coffees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            <a 
              href="#menu" 
              className="px-10 py-4 bg-amber-800 text-white rounded-full font-bold shadow-xl shadow-amber-900/40 hover:bg-amber-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              Explore the Menu
            </a>
            {!user.isAuthenticated && (
              <button 
                onClick={() => setShowAuth(true)}
                className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold hover:bg-white/20 transition-all"
              >
                Barista Login
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-stone-50 py-20 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold text-stone-800 mb-2">42</div>
              <div className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">Global Branches</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-stone-800 mb-2">128</div>
              <div className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">Master Baristas</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-stone-800 mb-2">9.8</div>
              <div className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">Rating Score</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-stone-800 mb-2">100%</div>
              <div className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">Ethical Sourcing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-amber-800 font-bold uppercase tracking-[0.3em] text-[10px]">Curated Selection</span>
            <h2 className="text-5xl font-bold text-stone-800 mt-4 mb-8 italic">The Brew Gallery</h2>
            
            <div className="flex flex-wrap justify-center gap-2">
              {(['All', 'Hot', 'Cold', 'Specialty'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-8 py-2.5 rounded-full text-xs font-bold transition-all border ${
                    filter === cat 
                      ? 'bg-amber-900 border-amber-900 text-white shadow-xl' 
                      : 'bg-white border-stone-200 text-stone-500 hover:border-amber-800 hover:text-amber-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredMenu.map(item => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Protected Staff Portal */}
      {user.isAuthenticated && <StaffPortal />}

      {/* Sommelier Banner */}
      <section className="bg-stone-900 py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-900/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-stone-800/40 backdrop-blur-3xl border border-white/5 rounded-[4rem] p-10 sm:p-24 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 text-center md:text-left">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-[10px]">AI Assistance</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-8 leading-tight">Can't decide on <br/>your blend?</h2>
              <p className="text-stone-400 text-lg mb-10 leading-relaxed max-w-lg">
                Talk to our **Master AI Sommelier**. It knows every note of every bean in our inventory.
              </p>
              <button 
                onClick={() => (document.querySelector('.chat-btn') as HTMLElement)?.click()}
                className="px-10 py-4 bg-white text-stone-900 rounded-full font-bold hover:bg-amber-500 hover:text-white transition-all shadow-2xl"
              >
                Consult Sommelier
              </button>
            </div>
            <div className="relative">
              <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-[3rem] overflow-hidden border-8 border-white/5 rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500&auto=format" 
                  className="w-full h-full object-cover"
                  alt="Expert"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-amber-600 text-white p-4 rounded-2xl font-bold text-xs shadow-xl animate-bounce">
                AI Powered Expert
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-32 pb-16 border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
             <div className="flex items-center gap-3">
               <i className="fa-solid fa-mug-hot text-amber-800 text-3xl"></i>
               <span className="text-2xl font-black tracking-tighter">MASTER COFFEE</span>
             </div>
             <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-stone-400">
               <a href="#" className="hover:text-amber-800">Twitter</a>
               <a href="#" className="hover:text-amber-800">Instagram</a>
               <a href="#" className="hover:text-amber-800">LinkedIn</a>
             </div>
          </div>
          <div className="text-center text-stone-300 text-[10px] uppercase tracking-[0.4em] font-medium">
            © 2024 Master Coffee Pro • Handcrafted in the Clouds
          </div>
        </div>
      </footer>

      {/* Floating Components */}
      <div className="chat-btn">
        <ChatBot />
      </div>
      
      {showAuth && (
        <AuthModal 
          onClose={() => setShowAuth(false)} 
          onAuthSuccess={handleAuthSuccess} 
        />
      )}
    </div>
  );
};

export default App;