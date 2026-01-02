import React, { useState } from 'react';
import { AuthMode, User } from '../types';
import { apiService } from '../services/apiService';

interface AuthModalProps {
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onAuthSuccess }) => {
  const [mode, setMode] = useState<AuthMode>(AuthMode.LOGIN);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      let data;
      if (mode === AuthMode.LOGIN) {
        data = await apiService.login({ email, password });
      } else {
        data = await apiService.register({ email, password });
      }
      
      onAuthSuccess({
        username: email.split('@')[0],
        email: email,
        isAuthenticated: true,
        token: data.token
      });
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden p-8 animate-modal">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-mug-hot text-amber-800 text-2xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-stone-800">
            {mode === AuthMode.LOGIN ? 'Welcome Back' : 'Join the Club'}
          </h2>
          <p className="text-stone-500 text-sm mt-2">
            {mode === AuthMode.LOGIN ? 'Sign in with Reqres credentials' : 'Create a new account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full bg-stone-50 border border-stone-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-amber-800 transition-all" 
              placeholder="e.g. eve.holt@reqres.in" 
              required 
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full bg-stone-50 border border-stone-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-amber-800 transition-all" 
              placeholder="Password" 
              required 
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 flex items-center gap-2">
              <i className="fa-solid fa-circle-exclamation"></i>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full bg-amber-900 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-amber-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? <i className="fa-solid fa-circle-notch animate-spin"></i> : (mode === AuthMode.LOGIN ? 'Sign In' : 'Register')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setMode(mode === AuthMode.LOGIN ? AuthMode.REGISTER : AuthMode.LOGIN)} 
            className="text-stone-500 text-sm font-medium hover:text-amber-800"
          >
            {mode === AuthMode.LOGIN ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;