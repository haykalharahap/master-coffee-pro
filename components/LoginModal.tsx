
import React, { useState } from 'react';
import { LoginStatus, User } from '../types';

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<LoginStatus>(LoginStatus.IDLE);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setStatus(LoginStatus.LOADING);
    
    // Simulating API Request
    setTimeout(() => {
      if (email.includes('error')) {
        setStatus(LoginStatus.ERROR);
        setError('Invalid credentials. Please try again.');
      } else {
        setStatus(LoginStatus.SUCCESS);
        onLoginSuccess({
          username: email.split('@')[0],
          email: email,
          isAuthenticated: true
        });
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-stone-800">Welcome Back</h2>
            <button onClick={onClose} className="text-stone-400 hover:text-stone-600">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>
          <p className="text-stone-500 mb-8 text-sm">Sign in to your Master Coffee account to track orders and earn points.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase mb-1.5 ml-1">Email Address</label>
              <div className="relative">
                <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"></i>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-11 py-3 focus:ring-2 focus:ring-amber-800 outline-none text-sm transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase mb-1.5 ml-1">Password</label>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"></i>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-11 py-3 focus:ring-2 focus:ring-amber-800 outline-none text-sm transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100 flex items-center gap-2">
                <i className="fa-solid fa-circle-exclamation"></i>
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={status === LoginStatus.LOADING}
              className="w-full bg-amber-900 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-amber-900/20 hover:bg-amber-800 hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {status === LoginStatus.LOADING ? (
                <>
                  <i className="fa-solid fa-circle-notch animate-spin"></i>
                  Authenticating...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-stone-100 text-center">
            <p className="text-stone-500 text-xs">
              Don't have an account? 
              <button className="text-amber-800 font-bold ml-1 hover:underline">Join the club</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
