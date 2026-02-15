
import React, { useState } from 'react';
import { useApp } from '../App';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  ShoppingBag, 
  User, 
  X, 
  Facebook, 
  Twitter, 
  Instagram, 
  Phone, 
  MapPin, 
  Mail, 
  MessageCircle 
} from 'lucide-react';
import { DELIVERY_FEE, CATEGORIES } from '../constants';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { lang, setLang, t, cart, isCartOpen, setIsCartOpen, removeFromCart } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const finalTotal = cartTotal + (cart.length > 0 ? DELIVERY_FEE : 0);

  const NavLink = ({ to, label }: { to: string, label: string }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        className={`text-sm font-bold tracking-wide transition-all duration-300 hover:text-accent ${isActive ? 'text-accent border-b-2 border-accent pb-1' : 'text-white/80'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="flex flex-col min-h-screen relative font-sans">
      {/* Top Bar - Elegant Dark Theme */}
      <div className="bg-primary-light border-b border-white/5 text-[11px] text-white/60 py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6 font-medium">
             <div className="flex items-center gap-2 hover:text-accent transition-colors cursor-pointer">
               <MapPin size={12} /> <span>فلسطين، القدس</span>
             </div>
             <div className="flex items-center gap-2 hover:text-accent transition-colors cursor-pointer">
               <Phone size={12} /> <span>+970 5XX XXX XXX</span>
             </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              <Facebook size={12} className="hover:text-accent cursor-pointer transition-all" />
              <Twitter size={12} className="hover:text-accent cursor-pointer transition-all" />
              <Instagram size={12} className="hover:text-accent cursor-pointer transition-all" />
            </div>
            <div className="h-3 w-px bg-white/10"></div>
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value as any)} 
              className="bg-transparent border-none outline-none cursor-pointer hover:text-accent font-bold"
            >
              <option value="ar" className="text-primary">العربية</option>
              <option value="en" className="text-primary">English</option>
              <option value="he" className="text-primary">עברית</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Header - Deep Primary Theme */}
      <header className="sticky top-0 z-40 bg-primary/95 backdrop-blur-lg shadow-xl border-b border-white/5">
        <div className="container mx-auto px-4 py-4 md:py-5">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <button className="md:hidden text-white hover:text-accent" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Menu size={24} />
              </button>
              <Link to="/" className="flex items-center gap-2 group">
                <img src="logo.png" alt="LAVIVAA" className="h-12 w-auto object-contain group-hover:scale-105 transition-transform" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              <NavLink to="/" label={t.home} />
              <NavLink to="/local-shopping" label={t.localShopping} />
              <NavLink to="/global-shopping" label={t.globalShopping} />
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* Enhanced Search Input */}
              <div className="hidden sm:flex relative items-center group">
                <input 
                  type="text" 
                  placeholder={t.searchPlaceholder} 
                  className={`py-2.5 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent/40 focus:bg-white/10 w-32 md:w-64 transition-all duration-500 focus:w-80 placeholder:text-white/20 font-medium ${lang === 'en' ? 'pl-12 pr-4' : 'pr-12 pl-4'}`}
                />
                <div className={`absolute pointer-events-none transition-all duration-300 group-focus-within:text-accent text-white/30 ${lang === 'en' ? 'left-4' : 'right-4'}`}>
                  <Search size={18} className="transform group-focus-within:scale-110 transition-transform" />
                </div>
              </div>
              
              <button className="hidden md:block text-white/70 hover:text-accent transition-all transform hover:scale-110">
                <User size={22} />
              </button>
              
              <button 
                className="relative text-white/70 hover:text-accent transition-all transform hover:scale-110"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag size={22} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-primary text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black shadow-lg">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute top-0 right-0 w-4/5 h-full bg-primary p-8 shadow-2xl overflow-y-auto animate-fade-in" onClick={(e) => e.stopPropagation()}>
             <div className="flex justify-between items-center mb-10">
               <img src="logo.png" alt="LAVIVAA" className="h-10 w-auto object-contain" />
               <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/50 hover:text-accent"><X size={28} /></button>
             </div>
             <nav className="flex flex-col gap-6">
                <NavLink to="/" label={t.home} />
                <NavLink to="/local-shopping" label={t.localShopping} />
                <NavLink to="/global-shopping" label={t.globalShopping} />
                <div className="h-px bg-white/5 my-4"></div>
                <div className="flex items-center justify-between text-white/60 font-bold">
                  <span>اللغة</span>
                  <select 
                    value={lang} 
                    onChange={(e) => setLang(e.target.value as any)} 
                    className="bg-primary-light px-3 py-1 rounded-lg border border-white/10 text-white text-sm"
                  >
                    <option value="ar">العربية</option>
                    <option value="en">English</option>
                    <option value="he">עברית</option>
                  </select>
                </div>
             </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer - Reverted to Original Side Alignment */}
      <footer className="bg-primary text-white pt-20 pb-10 border-t-4 border-accent relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
             {/* Brand */}
             <div className="flex flex-col space-y-6">
                <Link to="/" className="inline-block group">
                  <img src="logo.png" alt="LAVIVAA" className="h-14 w-auto object-contain group-hover:scale-105 transition-transform" />
                </Link>
                <p className="text-white/60 text-base leading-relaxed font-medium max-w-xs">
                  {t.footerDesc}
                </p>
                <div className="flex gap-4">
                  {[Facebook, Instagram, Twitter].map((Icon, i) => (
                    <div key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300 cursor-pointer text-white/80 shadow-sm">
                      <Icon size={18}/>
                    </div>
                  ))}
                </div>
             </div>

             {/* Explore Links */}
             <div className="flex flex-col">
                <h4 className="font-black text-xl mb-8 text-accent uppercase tracking-wider">{t.explore}</h4>
                <ul className="space-y-4 text-white/60 font-bold">
                  <li><Link to="/local-shopping" className="hover:text-accent transition-all inline-block">{t.localShopping}</Link></li>
                  <li><Link to="/global-shopping" className="hover:text-accent transition-all inline-block">{t.globalShopping}</Link></li>
                  <li><Link to="/" className="hover:text-accent transition-all inline-block">{t.about}</Link></li>
                </ul>
             </div>

             {/* Categories */}
             <div className="flex flex-col">
                <h4 className="font-black text-xl mb-8 text-accent uppercase tracking-wider">{t.browseCategories}</h4>
                <ul className="space-y-4 text-white/60 font-bold">
                  {CATEGORIES.map(c => (
                     <li key={c.id}><Link to="/local-shopping" className="hover:text-accent transition-all inline-block">{c.name[lang]}</Link></li>
                  ))}
                </ul>
             </div>

             {/* Direct Contact Info */}
             <div className="flex flex-col">
                <h4 className="font-black text-xl mb-8 text-accent uppercase tracking-wider">تواصل مباشر</h4>
                <div className="space-y-6">
                   <div className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300 flex-shrink-0">
                         <MapPin size={20} />
                      </div>
                      <div>
                         <span className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">الموقع</span>
                         <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">فلسطين</span>
                      </div>
                   </div>

                   <div className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300 flex-shrink-0">
                         <Phone size={20} />
                      </div>
                      <div>
                         <span className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">رقم الهاتف</span>
                         <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors" dir="ltr">+970 59 XXX XXXX</span>
                      </div>
                   </div>

                   <div className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300 flex-shrink-0">
                         <Mail size={20} />
                      </div>
                      <div>
                         <span className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">البريد الإلكتروني</span>
                         <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">info@lavivaa.com</span>
                      </div>
                   </div>

                   {/* WhatsApp Button */}
                   <a 
                     href="https://wa.me/970590000000" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex items-center justify-center gap-3 w-full max-w-[200px] mt-4 bg-accent text-primary py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-accent/5 hover:shadow-accent/20 transition-all hover:scale-[1.02] active:scale-95 group"
                   >
                     <MessageCircle size={22} className="group-hover:rotate-12 transition-transform" />
                     واتساب
                   </a>
                </div>
             </div>
          </div>
          
          <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold text-white/30">
             <p>{t.rights}</p>
             <div className="flex gap-8">
                <span className="hover:text-white transition-colors cursor-pointer">سياسة الخصوصية</span>
                <span className="hover:text-white transition-colors cursor-pointer">الشروط والأحكام</span>
             </div>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <>
          <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 transition-opacity" onClick={() => setIsCartOpen(false)} />
          <div className={`fixed top-0 bottom-0 ${lang === 'en' ? 'right-0' : 'left-0'} w-full md:w-[450px] bg-white z-50 shadow-2xl flex flex-col transform transition-all duration-500 animate-slide-in`}>
             <div className="p-6 bg-primary text-white border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <ShoppingBag size={24} className="text-accent" />
                  <h2 className="text-xl font-black">{t.cart} <span className="text-white/40 ml-1">({cart.length})</span></h2>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all"><X size={20} /></button>
             </div>
             
             <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
               {cart.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-6">
                   <div className="w-32 h-32 rounded-full bg-slate-50 flex items-center justify-center">
                    <ShoppingBag size={64} className="opacity-10" />
                   </div>
                   <p className="text-xl font-bold text-slate-400">{t.emptyCart}</p>
                   <button onClick={() => setIsCartOpen(false)} className="bg-primary text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-primary/20">{t.shopNow}</button>
                 </div>
               ) : (
                 <div className="space-y-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-5 bg-slate-50 p-4 rounded-3xl border border-slate-100 group">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                          <img src={item.image} alt={item.name[lang]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <h4 className="text-base font-black text-slate-900 line-clamp-1">{item.name[lang]}</h4>
                          <span className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">{item.category}</span>
                          <div className="flex justify-between items-end mt-auto">
                             <span className="font-black text-primary text-lg">{item.price} {t.currency}</span>
                             <button onClick={() => removeFromCart(item.id)} className="text-red-400 text-xs font-bold hover:text-red-600 transition-colors bg-white px-3 py-1 rounded-full shadow-sm border border-red-50">إزالة</button>
                          </div>
                        </div>
                      </div>
                    ))}
                 </div>
               )}
             </div>

             {cart.length > 0 && (
               <div className="p-8 bg-slate-900 text-white rounded-t-[3rem] shadow-2xl">
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-white/50 font-bold">
                      <span>المجموع الفرعي</span>
                      <span className="text-white">{cartTotal} {t.currency}</span>
                    </div>
                    <div className="flex justify-between text-white/50 font-bold">
                      <span>{t.deliveryFee}</span>
                      <span className="text-white">{DELIVERY_FEE} {t.currency}</span>
                    </div>
                    <div className="h-px bg-white/10 my-2"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-black">{t.total}</span>
                      <span className="text-2xl font-black text-accent">{finalTotal} {t.currency}</span>
                    </div>
                  </div>
                  <Link 
                    to="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full bg-accent text-primary py-5 rounded-2xl font-black hover:bg-white transition-all block text-center shadow-xl shadow-accent/5 uppercase tracking-widest"
                  >
                    {t.checkout}
                  </Link>
               </div>
             )}
          </div>
        </>
      )}
    </div>
  );
};
