import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { ReqresUser, ReqresListResponse } from '../types';

const StaffPortal: React.FC = () => {
  const [data, setData] = useState<ReqresListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<ReqresUser | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = async (page: number) => {
    setLoading(true);
    try {
      const res = await apiService.getUsers(page);
      setData(res);
      setCurrentPage(page);
    } catch (err) {
      console.error("Fetch Users Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const handleUserClick = async (id: number) => {
    try {
      const res = await apiService.getUser(id);
      setSelectedUser(res.data);
    } catch (err) {
      console.error("Fetch User Detail Error:", err);
    }
  };

  if (loading && !data) {
    return (
      <div className="py-20 text-center">
        <i className="fa-solid fa-circle-notch animate-spin text-4xl text-amber-800"></i>
        <p className="mt-4 text-stone-500 font-medium tracking-widest uppercase text-xs">Accessing Database...</p>
      </div>
    );
  }

  return (
    <section id="staff" className="py-24 bg-stone-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-amber-800 font-bold uppercase tracking-widest text-[10px]">Staff Portal Only</span>
            <h2 className="text-4xl font-bold text-stone-800 mt-2 italic">Global Barista Directory</h2>
            <p className="text-stone-500 mt-4 max-w-lg">Manage and connect with our premium roasters across international branches.</p>
          </div>
          
          <div className="flex gap-2 bg-white p-1 rounded-full border border-stone-200 shadow-sm">
            <button 
              disabled={currentPage === 1}
              onClick={() => fetchUsers(currentPage - 1)}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-stone-50 disabled:opacity-30 transition-colors"
            >
              <i className="fa-solid fa-chevron-left text-xs"></i>
            </button>
            <div className="flex items-center px-4 font-bold text-stone-700 text-xs">
              Page {currentPage} of {data?.total_pages || 1}
            </div>
            <button 
              disabled={currentPage === data?.total_pages}
              onClick={() => fetchUsers(currentPage + 1)}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-stone-50 disabled:opacity-30 transition-colors"
            >
              <i className="fa-solid fa-chevron-right text-xs"></i>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data?.data.map((user) => (
            <div 
              key={user.id} 
              onClick={() => handleUserClick(user.id)}
              className="group bg-white p-5 rounded-3xl border border-stone-200 hover:shadow-xl hover:border-amber-200 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={user.avatar} alt={user.first_name} className="w-14 h-14 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 group-hover:text-amber-900 transition-colors">
                    {user.first_name} {user.last_name}
                  </h3>
                  <p className="text-stone-400 text-[11px] truncate max-w-[140px]">{user.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedUser && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setSelectedUser(null)}></div>
            <div className="relative bg-white w-full max-w-sm rounded-[3rem] shadow-2xl overflow-hidden animate-modal">
              <div className="h-24 bg-stone-800"></div>
              <div className="px-8 pb-8 -mt-12 text-center">
                <img src={selectedUser.avatar} className="w-24 h-24 rounded-3xl border-4 border-white mx-auto shadow-lg mb-4 object-cover" />
                <h3 className="text-2xl font-bold text-stone-800">{selectedUser.first_name} {selectedUser.last_name}</h3>
                <p className="text-amber-800 font-bold uppercase tracking-widest text-[10px] mb-6">Master Roaster ID: #{selectedUser.id}</p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl">
                    <span className="text-xs text-stone-400 font-bold uppercase">Email</span>
                    <span className="text-sm text-stone-700 font-medium">{selectedUser.email}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl">
                    <span className="text-xs text-stone-400 font-bold uppercase">Status</span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-bold">Active</span>
                  </div>
                </div>

                <button onClick={() => setSelectedUser(null)} className="w-full py-4 bg-amber-900 text-white rounded-2xl font-bold hover:bg-amber-800 transition-all">
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StaffPortal;