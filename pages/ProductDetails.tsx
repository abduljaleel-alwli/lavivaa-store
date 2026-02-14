import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../App';
import { MOCK_PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { Minus, Plus, Heart, Shuffle, Ruler, Expand, Facebook, Twitter, Linkedin, Instagram, ArrowRight, ArrowLeft } from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const { lang, t, addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'additional' | 'reviews'>('description');

  const product = MOCK_PRODUCTS.find(p => p.id === id);
  
  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  // Related products (same category, excluding current)
  const relatedProducts = MOCK_PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id && p.isLocal)
    .slice(0, 4);

  const BreadcrumbIcon = lang === 'en' ? ArrowRight : ArrowLeft;

  return (
    <div className="bg-white min-h-screen animate-fade-in pb-20">
      
      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-4 border-b border-gray-100">
        <div className="container mx-auto px-4 text-xs text-gray-500 font-medium flex items-center gap-2 uppercase tracking-wider">
           <Link to="/" className="hover:text-primary transition-colors">{t.home}</Link>
           <span>/</span>
           <Link to="/local-shopping" className="hover:text-primary transition-colors">{t.shop}</Link>
           <span>/</span>
           <span className="hover:text-primary transition-colors cursor-pointer">{product.category}</span>
           <span>/</span>
           <span className="text-gray-900">{product.name[lang]}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column - Image */}
          <div className="relative group">
            <div className="aspect-[4/5] bg-[#f9f9f9] rounded-xl overflow-hidden flex items-center justify-center relative">
               <img src={product.image} alt={product.name[lang]} className="w-full h-full object-cover" />
               <button className="absolute top-6 right-6 bg-white p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100">
                 <Expand size={20} />
               </button>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="flex flex-col">
            <div className="mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase">
              <Link to="/local-shopping" className="hover:text-primary">{t.home}</Link> <BreadcrumbIcon size={10} className="inline mx-1" /> 
              <Link to="/local-shopping" className="hover:text-primary">{t.shop}</Link> <BreadcrumbIcon size={10} className="inline mx-1" />
              <span className="text-gray-900">{product.category}</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">{product.name[lang]}</h1>
            
            <div className="text-2xl font-bold text-primary mb-6">
              {product.price.toFixed(2)} {t.currency}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 text-lg font-light">
              {product.description[lang]}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-100">
               {/* Quantity */}
               <div className="flex items-center border border-gray-300 rounded-full h-12 px-2 w-32 justify-between">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-medium text-gray-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary"
                  >
                    <Plus size={16} />
                  </button>
               </div>

               {/* Add to Cart */}
               <button 
                 onClick={() => addToCart(product, quantity)}
                 className="flex-1 bg-primary text-white h-12 rounded-full font-bold hover:bg-opacity-90 transition-all px-8 text-sm uppercase tracking-wider"
               >
                 {t.addToCart}
               </button>
            </div>

            {/* Extra Actions */}
            <div className="flex gap-6 mb-8 text-sm font-medium text-gray-600">
               <button className="flex items-center gap-2 hover:text-primary transition-colors">
                 <Heart size={18} /> {t.wishlist}
               </button>
               <button className="flex items-center gap-2 hover:text-primary transition-colors">
                 <Shuffle size={18} /> {t.compare}
               </button>
               <button className="flex items-center gap-2 hover:text-primary transition-colors">
                 <Ruler size={18} /> {t.sizeGuide}
               </button>
            </div>

            {/* Meta Info */}
            <div className="space-y-3 text-sm text-gray-500 mb-8">
               {product.sku && (
                 <div className="flex gap-2">
                   <span className="font-bold text-gray-900 w-24 uppercase tracking-wider">{t.sku}:</span>
                   <span>{product.sku}</span>
                 </div>
               )}
               <div className="flex gap-2">
                 <span className="font-bold text-gray-900 w-24 uppercase tracking-wider">{t.category}:</span>
                 <span className="uppercase">{product.category}</span>
               </div>
               {product.brand && (
                 <div className="flex gap-2">
                    <span className="font-bold text-gray-900 w-24 uppercase tracking-wider">{t.brand}:</span>
                    <span className="uppercase text-gray-400 font-bold">{product.brand}</span>
                 </div>
               )}
            </div>

            {/* Social Share */}
            <div className="flex gap-4 text-gray-400">
              <Facebook size={18} className="hover:text-primary cursor-pointer transition-colors" />
              <Twitter size={18} className="hover:text-primary cursor-pointer transition-colors" />
              <Linkedin size={18} className="hover:text-primary cursor-pointer transition-colors" />
              <Instagram size={18} className="hover:text-primary cursor-pointer transition-colors" />
            </div>

          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-24 mb-16">
           <div className="flex justify-center gap-8 border-b border-gray-200 mb-8">
              {(['description', 'additional', 'reviews'] as const).map(tabKey => (
                 <button
                   key={tabKey}
                   onClick={() => setActiveTab(tabKey)}
                   className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all relative ${activeTab === tabKey ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                 >
                   {tabKey === 'description' && t.description}
                   {tabKey === 'additional' && t.additionalInfo}
                   {tabKey === 'reviews' && `${t.reviews} (0)`}
                   {activeTab === tabKey && (
                     <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-900"></span>
                   )}
                 </button>
              ))}
           </div>
           
           <div className="max-w-4xl mx-auto text-gray-600 leading-relaxed text-center animate-fade-in">
              {activeTab === 'description' && (
                <div>
                   <p className="mb-4">{product.description[lang]}</p>
                   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
              )}
              {activeTab === 'additional' && (
                <div className="text-sm">
                   <p>Weight: 1.2 kg</p>
                   <p>Dimensions: 30 x 20 x 5 cm</p>
                   <p>Materials: 100% Organic</p>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="italic text-gray-400">
                   No reviews yet.
                </div>
              )}
           </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-100 pt-16">
             <h2 className="text-2xl font-bold text-primary mb-8">{t.relatedProducts}</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {relatedProducts.map(p => (
                 <ProductCard key={p.id} product={p} />
               ))}
             </div>
          </div>
        )}

      </div>
    </div>
  );
};