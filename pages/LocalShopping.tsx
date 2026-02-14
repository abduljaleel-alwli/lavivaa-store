
import React, { useState } from 'react';
import { useApp } from '../App';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { 
  Filter, 
  SlidersHorizontal, 
  Check, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  Users, 
  Baby,
  Shirt,
  Footprints,
  Watch,
  Home as HomeIcon,
  LayoutGrid
} from 'lucide-react';

export const LocalShopping: React.FC = () => {
  const { lang, t } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<'adult' | 'child' | null>(null);
  const [priceRange, setPriceRange] = useState<number>(1000);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>('clothes');

  const products = MOCK_PRODUCTS.filter(p => p.isLocal);

  const filteredProducts = products.filter(product => {
    const matchCat = selectedCategory === 'all' || product.category === selectedCategory;
    const matchSub = !selectedSubCategory || product.subCategory === selectedSubCategory;
    const matchAge = !selectedAge || product.targetAge === selectedAge;
    const matchPrice = product.price <= priceRange;
    return matchCat && matchSub && matchAge && matchPrice;
  });

  const toggleExpand = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const getCategoryIcon = (id: string) => {
    const iconProps = { size: 20, className: "text-accent" };
    switch (id) {
      case 'clothes': return <Shirt {...iconProps} />;
      case 'shoes': return <Footprints {...iconProps} />;
      case 'accessories': return <Watch {...iconProps} />;
      case 'home': return <HomeIcon {...iconProps} />;
      default: return <Filter {...iconProps} />;
    }
  };

  const Chevron = lang === 'en' ? ChevronRight : ChevronLeft;

  return (
    <div className="bg-slate-50 min-h-screen py-12 animate-fade-in">
      <div className="container mx-auto px-4">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
           <div className="text-right">
             <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">{t.localShopping}</h1>
             <div className="flex items-center gap-2 text-slate-400 font-bold">
                <span className="w-8 h-1 bg-primary rounded-full"></span>
                <span>{filteredProducts.length} منتجات تم العثور عليها</span>
             </div>
           </div>
           
           <button 
             className="md:hidden flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 font-black text-primary"
             onClick={() => setShowMobileFilter(!showMobileFilter)}
           >
             <SlidersHorizontal size={20} /> {t.filter}
           </button>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Advanced Sidebar Filter - Custom Green Theme */}
          <aside className={`md:w-80 flex-shrink-0 ${showMobileFilter ? 'fixed inset-0 z-50 bg-primary p-8 overflow-y-auto' : 'hidden md:block'}`}>
            <div className="md:sticky md:top-28 space-y-8">
               
               {/* Categories Card */}
               <div className="bg-primary p-8 rounded-[2.5rem] shadow-2xl shadow-primary/20 border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                  
                  <div className="flex items-center gap-3 font-black text-xl mb-10 text-white relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-accent shadow-inner">
                       <Filter size={20} />
                    </div>
                    <span>التصنيفات</span>
                  </div>

                  <ul className="space-y-3 relative z-10">
                    {/* View All Option */}
                    <li>
                      <button 
                        onClick={() => {
                          setSelectedCategory('all');
                          setSelectedSubCategory(null);
                          setSelectedAge(null);
                        }}
                        className={`flex items-center justify-between w-full p-4 rounded-2xl transition-all font-bold ${selectedCategory === 'all' ? 'bg-accent text-primary shadow-lg scale-[1.02]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                      >
                        <div className="flex items-center gap-3">
                          <LayoutGrid size={20} className={selectedCategory === 'all' ? 'text-primary' : 'text-accent'} />
                          <span>{t.viewAll}</span>
                        </div>
                        {selectedCategory === 'all' && <Check size={18} className="text-primary" />}
                      </button>
                    </li>

                    {CATEGORIES.map(cat => (
                      <li key={cat.id} className="space-y-2">
                        <div 
                          className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all ${selectedCategory === cat.id ? 'bg-white/10 text-white border border-white/10 ring-1 ring-accent/30' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            toggleExpand(cat.id);
                          }}
                        >
                          <div className="flex items-center gap-3 font-bold">
                            {getCategoryIcon(cat.id)}
                            <span>{cat.name[lang]}</span>
                          </div>
                          {cat.subCategories ? (
                            <ChevronDown size={18} className={`text-accent transition-transform duration-300 ${expandedCategory === cat.id ? 'rotate-180' : ''}`} />
                          ) : (
                            <span className="text-[10px] font-black opacity-40 bg-white/10 px-2 py-0.5 rounded-md">({cat.itemCount})</span>
                          )}
                        </div>

                        {/* Sub-Categories */}
                        {cat.subCategories && expandedCategory === cat.id && (
                          <div className="pr-4 py-2 space-y-1 animate-fade-in">
                            {cat.subCategories.map(sub => (
                              <button 
                                key={sub.id}
                                onClick={() => setSelectedSubCategory(selectedSubCategory === sub.id ? null : sub.id)}
                                className={`flex items-center gap-3 text-sm w-full p-3 rounded-xl transition-all font-bold ${selectedSubCategory === sub.id ? 'bg-accent/20 text-accent' : 'text-white/40 hover:text-accent hover:bg-white/5'}`}
                              >
                                {sub.id === 'men' && <User size={16} className="text-accent" />}
                                {sub.id === 'women' && <Users size={16} className="text-accent" />}
                                {sub.id === 'kids' && <Baby size={16} className="text-accent" />}
                                {sub.name[lang]}
                              </button>
                            ))}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
               </div>

               {/* Age Group Card */}
               <div className="bg-primary p-8 rounded-[2.5rem] shadow-2xl shadow-primary/20 border border-white/5 relative overflow-hidden">
                  <h3 className="font-black mb-6 text-[10px] uppercase tracking-[0.2em] text-white/30">الفئة العمرية</h3>
                  <div className="grid grid-cols-2 gap-3">
                     <button 
                        onClick={() => setSelectedAge(selectedAge === 'adult' ? null : 'adult')}
                        className={`p-5 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 font-black ${selectedAge === 'adult' ? 'border-accent bg-accent/10 text-accent shadow-lg shadow-accent/5' : 'border-white/5 text-white/40 hover:border-white/20'}`}
                     >
                        <Users size={24} className="text-accent" />
                        <span className="text-[10px]">كبار</span>
                     </button>
                     <button 
                        onClick={() => setSelectedAge(selectedAge === 'child' ? null : 'child')}
                        className={`p-5 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 font-black ${selectedAge === 'child' ? 'border-accent bg-accent/10 text-accent shadow-lg shadow-accent/5' : 'border-white/5 text-white/40 hover:border-white/20'}`}
                     >
                        <Baby size={24} className="text-accent" />
                        <span className="text-[10px]">صغار</span>
                     </button>
                  </div>
               </div>

               {/* Price Range Card */}
               <div className="bg-primary p-8 rounded-[2.5rem] shadow-2xl shadow-primary/20 border border-white/5">
                  <h3 className="font-black mb-8 text-[10px] uppercase tracking-[0.2em] text-white/30">{t.price}</h3>
                  <div className="px-1">
                    <input 
                      type="range" 
                      min="0" 
                      max="1000" 
                      value={priceRange} 
                      onChange={(e) => setPriceRange(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-accent"
                    />
                  </div>
                  <div className="flex justify-between mt-8 items-center">
                     <span className="text-[10px] font-black text-white/20">0</span>
                     <div className="bg-accent text-primary px-5 py-2 rounded-full text-xs font-black shadow-lg shadow-accent/10">
                        {priceRange} {t.currency}
                     </div>
                  </div>
               </div>
               
               {showMobileFilter && (
                 <button 
                    className="w-full bg-accent text-primary py-5 rounded-[2rem] font-black mt-10 shadow-2xl uppercase tracking-widest text-sm"
                    onClick={() => setShowMobileFilter(false)}
                 >
                   تطبيق الفلترة
                 </button>
               )}
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
             {filteredProducts.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                 {filteredProducts.map(product => (
                   <ProductCard key={product.id} product={product} />
                 ))}
               </div>
             ) : (
               <div className="h-[500px] flex flex-col items-center justify-center bg-white rounded-5xl shadow-2xl border border-slate-100">
                 <div className="bg-slate-50 w-32 h-32 rounded-full flex items-center justify-center text-slate-200 mb-8">
                    <SlidersHorizontal size={48} />
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 mb-4">لا توجد منتجات مطابقة</h3>
                 <p className="text-slate-400 font-medium mb-10 max-w-sm text-center">جرب تغيير إعدادات الفلترة أو مسح الكل للوصول إلى خيارات أكثر.</p>
                 <button 
                   onClick={() => { 
                     setSelectedCategory('all'); 
                     setSelectedSubCategory(null);
                     setSelectedAge(null);
                     setPriceRange(1000); 
                   }} 
                   className="bg-primary text-white px-10 py-4 rounded-3xl font-black shadow-xl hover:shadow-primary/30 transition-all active:scale-95"
                 >
                   مسح جميع الفلاتر
                 </button>
               </div>
             )}
          </div>

        </div>
      </div>
    </div>
  );
};
