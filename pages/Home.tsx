
import React from 'react';
import { useApp } from '../App';
import {
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  Zap,
  ShieldCheck,
  Headset,
  Globe,
  Truck,
  RefreshCw,
  Gift
} from 'lucide-react';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const { lang, t } = useApp();
  const ArrowIcon = lang === 'en' ? ArrowRight : ArrowLeft;

  const bestsellers = MOCK_PRODUCTS.slice(0, 8);

  return (
    <div className="animate-fade-in space-y-24 pb-20">

      {/* Hero Section */}
      <section className="relative pt-10 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-slate-50 -z-10"></div>
        <div className="absolute top-0 right-0 w-[50%] h-full bg-primary/5 rounded-l-[100px] -z-10"></div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Content Area */}
            <div className={`lg:w-1/2 z-10 text-center ${lang === 'en' ? 'lg:text-left' : 'lg:text-right'}`}>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-8 animate-fade-in">
                <Sparkles size={16} />
                <span>{t.welcomeLuxury}</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.4] mb-8" style={{lineHeight: 1.3}}>
                {t.heroTitlePart1} <span className="text-primary underline decoration-accent underline-offset-8">{t.heroTitleLocal}</span>
                {t.heroTitlePart2} <span className="text-accent">{t.heroTitleGlobal}</span>
              </h1>
              <p className={`text-slate-500 text-xl mb-12 leading-relaxed max-w-2xl mx-auto font-medium ${lang === 'en' ? 'lg:mr-0' : 'lg:ml-0'}`}>
                {t.heroSub}
              </p>

              <div className={`flex flex-col sm:flex-row gap-5 justify-center ${lang === 'en' ? 'lg:justify-start' : 'lg:justify-end'}`}>
                <Link to="/local-shopping" className="bg-primary text-white px-10 py-5 rounded-3xl font-black text-lg hover:bg-primary-light transition-all shadow-2xl hover:shadow-primary/40 flex items-center justify-center gap-3 active:scale-95">
                  {t.localShopping}
                  <ShoppingBag size={20} />
                </Link>
                <Link to="/global-shopping" className="bg-white text-slate-900 px-10 py-5 rounded-3xl font-black text-lg border-2 border-slate-200 hover:border-accent transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95">
                  {t.globalShopping} <ArrowIcon size={20} />
                </Link>
              </div>

              {/* Trust Bar */}
              <div className={`mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-2xl mx-auto ${lang === 'en' ? 'lg:mr-0' : 'lg:ml-0'}`}>
                <div className="animate-fade-in-up delay-100 group flex items-center gap-4 bg-white/60 backdrop-blur-md p-4 rounded-3xl border border-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Headset size={24} />
                  </div>
                  <div className={lang === 'en' ? 'text-left' : 'text-right'}>
                    <span className="text-2xl font-black text-primary block leading-none mb-1">24/7</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.support247}</span>
                  </div>
                </div>

                <div className="animate-fade-in-up delay-200 group flex items-center gap-4 bg-white/60 backdrop-blur-md p-4 rounded-3xl border border-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    <ShieldCheck size={24} />
                  </div>
                  <div className={lang === 'en' ? 'text-left' : 'text-right'}>
                    <span className="text-2xl font-black text-primary block leading-none mb-1">100%</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.authentic100}</span>
                  </div>
                </div>

                <div className="animate-fade-in-up delay-300 group flex items-center gap-4 bg-white/60 backdrop-blur-md p-4 rounded-3xl border border-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 bg-primary-vibrant/10 rounded-2xl flex items-center justify-center text-primary-vibrant group-hover:bg-primary-vibrant group-hover:text-white transition-colors duration-300">
                    <Globe size={24} />
                  </div>
                  <div className={lang === 'en' ? 'text-left' : 'text-right'}>
                    <span className="text-2xl font-black text-primary block leading-none mb-1">+50</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.globalStoresCount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Content */}
            <div className="lg:w-1/2 relative h-[600px] w-full hidden md:block">
              <div className={`absolute top-0 w-[80%] h-[90%] rounded-5xl overflow-hidden shadow-2xl border-8 border-white ${lang === 'en' ? 'left-0' : 'right-0'}`}>
                <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop" alt="Luxury Sofa" className="w-full h-full object-cover" />
              </div>
              <div className={`absolute bottom-4 w-[60%] aspect-square rounded-5xl overflow-hidden shadow-2xl border-8 border-white -translate-y-12 ${lang === 'en' ? 'right-0' : 'left-0'}`}>
                <img src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop" alt="Interior" className="w-full h-full object-cover" />
              </div>
              <div className={`absolute top-1/2 transform bg-white p-8 rounded-4xl shadow-2xl border border-slate-100 max-w-[240px] animate-bounce-slow ${lang === 'en' ? 'right-0 translate-x-1/4' : 'left-0 -translate-x-1/4'}`}>
                <div className="bg-accent w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-accent/20">
                  <Zap size={24} />
                </div>
                <h4 className="font-black text-xl text-slate-900 mb-2">{t.bigSale}</h4>
                <p className="text-slate-500 text-sm font-bold">{t.bigSaleDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className={lang === 'en' ? 'text-left' : 'text-right'}>
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">{t.browseCategories}</h2>
            <p className="text-slate-500 font-medium text-lg">{t.categoriesSub}</p>
          </div>
          <Link to="/local-shopping" className="group flex items-center gap-3 text-primary font-black text-lg">
            {t.viewAll} <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all"><ArrowIcon size={20} /></div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <Link
              to="/local-shopping"
              key={cat.id}
              className={`group relative overflow-hidden rounded-4xl ${idx === 0 ? 'md:col-span-2 md:row-span-2 h-[500px]' : 'h-[240px] shadow-lg'}`}
            >
              <img src={cat.image} alt={cat.name[lang]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className={`absolute bottom-8 text-white ${lang === 'en' ? 'left-8' : 'right-8'}`}>
                <h3 className={`font-black mb-1 ${idx === 0 ? 'text-3xl' : 'text-xl'}`}>{cat.name[lang]}</h3>
                <span className="text-sm font-bold opacity-80">{cat.itemCount} {t.productsFound.split(' ')[0]}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">{t.bestsellers}</h2>
            <p className="text-slate-500 font-medium text-lg">{t.bestsellersSub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestsellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">{t.whatMakesUsSpecial} <span className="text-primary">LAVIVAA</span></h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center">
            <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center text-primary mx-auto mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-6 shadow-sm">
              <Truck size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4">{t.fastShipping}</h3>
            <p className="text-slate-500 font-medium leading-relaxed">{t.fastShippingDesc}</p>
          </div>

          <div className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center">
            <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center text-accent mx-auto mb-8 group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm">
              <ShieldCheck size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4">{t.securePayment}</h3>
            <p className="text-slate-500 font-medium leading-relaxed">{t.securePaymentDesc}</p>
          </div>

          <div className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-500 mx-auto mb-8 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 group-hover:-rotate-6 shadow-sm">
              <RefreshCw size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4">{t.easyReturns}</h3>
            <p className="text-slate-500 font-medium leading-relaxed">{t.easyReturnsDesc}</p>
          </div>

          <div className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center">
            <div className="w-20 h-20 bg-primary-vibrant/5 rounded-3xl flex items-center justify-center text-primary-vibrant mx-auto mb-8 group-hover:bg-primary-vibrant group-hover:text-white transition-all duration-500 shadow-sm">
              <Gift size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4">{t.luxuryPackaging}</h3>
            <p className="text-slate-500 font-medium leading-relaxed">{t.luxuryPackagingDesc}</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="bg-primary rounded-5xl p-10 md:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 -translate-x-1/2"></div>
          <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div className={lang === 'en' ? 'text-left' : 'text-right'}>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight" style={{ lineHeight: 1.3 }}>{t.experienceTitle}</h2>
              <p className="text-white/70 text-lg font-medium leading-relaxed mb-12">
                {t.experienceDesc}
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary-vibrant flex items-center justify-center shadow-lg"><ShieldCheck size={28} /></div>
                  <div>
                    <h4 className="font-bold text-xl">{t.fullSecurity}</h4>
                    <p className="text-white/60 text-sm mt-1">{t.fullSecurityDesc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center shadow-lg text-primary"><Zap size={28} /></div>
                  <div>
                    <h4 className="font-bold text-xl">{t.superSpeed}</h4>
                    <p className="text-white/60 text-sm mt-1">{t.superSpeedDesc}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-4xl overflow-hidden shadow-2xl rotate-3">
                <img src="https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=800&auto=format&fit=crop" alt="Experience" className="w-full h-full object-cover" />
              </div>
              <div className={`absolute -bottom-8 bg-white text-slate-900 p-8 rounded-4xl shadow-2xl border border-slate-100 max-w-[200px] -rotate-3 hidden md:block ${lang === 'en' ? '-right-8' : '-left-8'}`}>
                <span className="text-4xl font-black text-primary block mb-1">+10k</span>
                <span className="text-sm font-bold text-slate-400">{t.happyCustomers}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
