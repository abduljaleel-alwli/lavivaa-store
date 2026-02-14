
import React from 'react';
import { Product } from '../types';
import { useApp } from '../App';
import { Heart, ExternalLink, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { lang, t, addToCart } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const cardClass = "group bg-white rounded-4xl p-4 shadow-sm border border-slate-100 hover:border-transparent hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden relative";
  const glowClass = "absolute inset-0 bg-gradient-to-br from-primary-vibrant/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none";

  return (
    <div className={cardClass}>
      <div className={glowClass}></div>
      
      {product.isLocal ? (
        <Link to={`/product/${product.id}`} className="flex flex-col h-full relative z-10">
          {/* Image Container */}
          <div className="relative aspect-square rounded-3xl overflow-hidden mb-5 bg-slate-50 shadow-inner">
            <img 
              src={product.image} 
              alt={product.name[lang]} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Wishlist Button */}
            <button className="absolute top-4 right-4 w-11 h-11 rounded-2xl bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-800 hover:bg-primary hover:text-white transition-all shadow-lg active:scale-90">
              <Heart size={20} />
            </button>
            {/* Badges */}
            {product.isSale && (
              <span className="absolute top-4 left-4 bg-accent-vibrant text-white text-xs font-black px-4 py-1.5 rounded-xl uppercase shadow-xl">
                {t.sale}
              </span>
            )}
            {product.isNew && (
              <span className="absolute bottom-4 left-4 bg-primary-vibrant text-white text-xs font-black px-4 py-1.5 rounded-xl uppercase shadow-xl">
                {t.newArrivals}
              </span>
            )}
          </div>

          {/* Info Area */}
          <div className="flex flex-col flex-grow px-2">
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors mb-2 line-clamp-1">
              {product.name[lang]}
            </h3>
            <p className="text-sm text-slate-400 font-medium mb-6 line-clamp-2 leading-relaxed">
               {product.description[lang]}
            </p>

            <div className="mt-auto flex items-center justify-between">
               <div className="flex flex-col">
                  {product.oldPrice && (
                    <span className="text-sm text-slate-300 line-through font-bold">
                       {product.oldPrice} {t.currency}
                    </span>
                  )}
                  <span className="text-2xl font-black text-primary">
                    {product.price} <span className="text-sm font-bold text-slate-400">{t.currency}</span>
                  </span>
               </div>
               
               <button 
                 onClick={handleAddToCart}
                 className="bg-primary text-white w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg hover:shadow-primary/30 hover:bg-primary-light active:scale-90"
                 title={t.addToCart}
               >
                 <ShoppingBag size={22} />
               </button>
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex flex-col h-full relative z-10">
           {/* Non-local items (direct store links) */}
           <div className="relative aspect-square rounded-3xl overflow-hidden mb-5 bg-slate-50">
            <a href={product.storeUrl} target="_blank" rel="noopener noreferrer">
              <img 
                src={product.image} 
                alt={product.name[lang]} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </a>
          </div>

          <div className="flex flex-col flex-grow px-2">
            <h3 className="text-xl font-bold text-slate-900 mb-2 truncate">
              {product.name[lang]}
            </h3>
            <p className="text-sm text-slate-400 font-medium mb-6 line-clamp-2 leading-relaxed">
               {product.description[lang]}
            </p>

            <div className="mt-auto flex items-center justify-between">
               <span className="text-2xl font-black text-primary">
                  {product.price} <span className="text-sm font-bold text-slate-400">{t.currency}</span>
               </span>
               
               <a 
                 href={product.storeUrl} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-primary transition-all shadow-lg active:scale-95"
               >
                 {t.visitStore} <ExternalLink size={16} />
               </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
