import React from 'react';
import { CoffeeItem } from '../types';

interface MenuCardProps {
  item: CoffeeItem;
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  // Menggunakan format manual agar simbol Rp tidak berubah menjadi $ karena isu locale browser
  const formattedPrice = `Rp ${item.price.toLocaleString('id-ID')}`;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100">
      <div className="relative h-48 overflow-hidden bg-stone-200">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format';
          }}
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-amber-900 shadow-sm">
          {formattedPrice}
        </div>
      </div>
      <div className="p-5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-1 block">
          {item.category}
        </span>
        <h3 className="text-lg font-bold text-stone-800 mb-2">{item.name}</h3>
        <p className="text-stone-500 text-sm leading-relaxed line-clamp-2 min-h-[40px]">
          {item.description}
        </p>
        <button className="mt-4 w-full bg-stone-50 text-stone-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-amber-900 hover:text-white transition-all flex items-center justify-center gap-2 border border-stone-200 hover:border-amber-900">
          <i className="fa-solid fa-plus"></i> Add to Order
        </button>
      </div>
    </div>
  );
};

export default MenuCard;