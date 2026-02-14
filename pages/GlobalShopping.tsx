

import React, { useState, useEffect } from 'react';
import { useApp } from '../App';
import { GLOBAL_STORES } from '../constants';
import { Sparkles, ShieldCheck, Zap, Navigation, ChevronRight, ChevronLeft, ExternalLink } from 'lucide-react';

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop",
    title: "وجهتك نحو العالم",
    subtitle: "نتيح لك الوصول إلى أشهر المتاجر العالمية بضغطة زر واحدة.",
    badge: "تسوق عالمي"
  },
  {
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1600&auto=format&fit=crop",
    title: "أحدث صيحات الموضة",
    subtitle: "اكتشف تشكيلات حصرية من برانداتك العالمية المفضلة بأسعار تنافسية.",
    badge: "عروض حصرية"
  },
  {
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1600&auto=format&fit=crop",
    title: "تكنولوجيا بلا حدود",
    subtitle: "أحدث الأدوات والتقنيات الذكية تصلك من متاجر التجزئة الكبرى.",
    badge: "وصل حديثاً"
  }
];

export const GlobalShopping: React.FC = () => {
  const { lang, t } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="bg-background min-h-screen animate-fade-in">
       
       {/* Hero Section with Auto Slider */}
       <div className="relative h-[450px] md:h-[550px] overflow-hidden bg-slate-900">
         {HERO_SLIDES.map((slide, index) => (
           <div 
             key={index}
             className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}
           >
             {/* Background Image with Overlay */}
             <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"></div>
             
             {/* Content Overlay */}
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <div className="animate-fade-in-up delay-100">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-black mb-6 text-accent border border-white/10 tracking-widest uppercase">
                    <Sparkles size={14} />
                    <span>{slide.badge}</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-2xl tracking-tight leading-tight">
                    {slide.title}
                  </h1>
                  <p className="max-w-xl mx-auto text-lg md:text-xl text-white/80 font-medium leading-relaxed drop-shadow-md">
                    {slide.subtitle}
                  </p>
                </div>
             </div>
           </div>
         ))}

         {/* Navigation Controls */}
         <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center items-center gap-6">
            <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-accent hover:text-primary transition-all shadow-xl">
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex gap-2">
              {HERO_SLIDES.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-10 bg-accent shadow-lg shadow-accent/20' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>

            <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-accent hover:text-primary transition-all shadow-xl">
              <ChevronRight size={24} />
            </button>
         </div>

         {/* Decorative Bottom Edge */}
         <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
       </div>

       <div className="container mx-auto px-4 py-20">
         
         {/* Store Grid Section - Updated with Real Logos and Removed Box */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {GLOBAL_STORES.map((store) => (
              <div key={store.id} className="group bg-white rounded-5xl p-8 shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors"></div>
                
                {/* Logo Display without Box */}
                <div className="h-24 w-full flex items-center justify-center mb-6">
                  <img 
                    src={store.logo} 
                    alt={store.name} 
                    className="h-full w-auto max-w-[180px] object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-sm"
                  />
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-primary transition-colors">{store.name}</h3>
                <p className="text-slate-400 font-medium mb-8 text-sm leading-relaxed h-12 overflow-hidden">
                  {store.description[lang]}
                </p>
                <a 
                  href={store.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full max-w-[180px] bg-slate-50 border border-slate-100 text-primary py-4 rounded-2xl font-black text-sm hover:bg-primary hover:text-white hover:border-transparent transition-all flex items-center justify-center gap-3 active:scale-95 group/btn"
                >
                  {t.visitStore}
                  <ExternalLink size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
         </div>

         {/* Features Section */}
         <div className="glass-morphism rounded-5xl p-10 md:p-16 text-center max-w-5xl mx-auto shadow-2xl border border-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-16 tracking-tight relative z-10">
              {t.whyShopGlobal}
            </h2>
            
            <div className="relative z-10">
              <div className="absolute top-6 left-[15%] right-[15%] h-[4px] rounded-full hidden md:block overflow-hidden">
                 <div className="w-full h-full bg-gradient-to-l from-primary-vibrant via-blue-500 to-accent-vibrant opacity-30"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-4 relative">
                 <div className="flex flex-col items-center group">
                    <div className="relative mb-10">
                      <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-lg font-black text-slate-900 relative z-20 border-4 border-slate-50 transition-all group-hover:scale-110 group-hover:border-primary-vibrant group-hover:shadow-primary-vibrant/20">
                        1
                      </div>
                    </div>
                    <div className="bg-white w-20 h-20 rounded-3xl flex items-center justify-center mb-6 text-primary shadow-lg group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:-rotate-6">
                      <ShieldCheck size={36} strokeWidth={1.5} />
                    </div>
                    <h4 className="font-black text-xl mb-3 text-slate-900 group-hover:text-primary transition-colors">{t.feature1Title}</h4>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-[240px]">
                      {t.feature1Desc}
                    </p>
                 </div>

                 <div className="flex flex-col items-center group">
                    <div className="relative mb-10">
                      <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-lg font-black text-slate-900 relative z-20 border-4 border-slate-50 transition-all group-hover:scale-110 group-hover:border-blue-500 group-hover:shadow-blue-500/20">
                        2
                      </div>
                    </div>
                    <div className="bg-white w-20 h-20 rounded-3xl flex items-center justify-center mb-6 text-blue-500 shadow-lg group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                      <Zap size={36} strokeWidth={1.5} />
                    </div>
                    <h4 className="font-black text-xl mb-3 text-slate-900 group-hover:text-blue-500 transition-colors">{t.feature2Title}</h4>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-[240px]">
                      {t.feature2Desc}
                    </p>
                 </div>

                 <div className="flex flex-col items-center group">
                    <div className="relative mb-10">
                      <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-lg font-black text-slate-900 relative z-20 border-4 border-slate-50 transition-all group-hover:scale-110 group-hover:border-accent-vibrant group-hover:shadow-accent-vibrant/20">
                        3
                      </div>
                    </div>
                    <div className="bg-white w-20 h-20 rounded-3xl flex items-center justify-center mb-6 text-accent-vibrant shadow-lg group-hover:bg-accent-vibrant group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                      <Navigation size={36} strokeWidth={1.5} className="rotate-45" />
                    </div>
                    <h4 className="font-black text-xl mb-3 text-slate-900 group-hover:text-accent-vibrant transition-colors">{t.feature3Title}</h4>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-[240px]">
                      {t.feature3Desc}
                    </p>
                 </div>
              </div>
            </div>
         </div>
       </div>
    </div>
  );
};