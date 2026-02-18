
import React, { useState } from 'react';
import { useApp } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  ArrowRight, 
  ArrowLeft, 
  ShoppingBag, 
  ShieldCheck, 
  Zap, 
  Sparkles 
} from 'lucide-react';

interface AuthProps {
  mode: 'login' | 'signup';
}

export const Auth: React.FC<AuthProps> = ({ mode: initialMode }) => {
  const { lang, t } = useApp();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  const ArrowIcon = lang === 'en' ? ArrowRight : ArrowLeft;

  const benefits = [t.customerBenefit1, t.customerBenefit2, t.customerBenefit3];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(mode === 'login' ? 'تم تسجيل الدخول بنجاح!' : 'تم إنشاء الحساب بنجاح!');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row animate-fade-in overflow-hidden">
      
      {/* Visual Side - Featured Content */}
      <div className="lg:w-1/2 relative hidden lg:block bg-primary overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-vibrant/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="absolute inset-0 flex flex-col justify-center px-16 xl:px-24 text-white z-10">
          <div className="mb-12">
             <Link to="/">
               <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh5DRasl3ZaS4vcAnzYRVU1rXQArDgNHt7RpNJY-zvzC-RJp-dqR6SrunlI3IPaTUOH_CD0RkWoU6cRgn9AFbYCWjJZRJCroqSFe-NVitmZ2RiWeJbbi3Ragze8toPuJLHRzEpq_D9Kj5_jova12Czqvn_6opFrTEv9hjx7mZxvb_m6ADQAno6E96waLvA/s16000/logo.png" alt="LAVIVAA" className="h-16 w-auto object-contain mb-10" />
             </Link>
             <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-black mb-6 text-accent border border-white/5 uppercase tracking-widest">
                <Sparkles size={14} />
                <span>{t.welcomeLuxury}</span>
             </div>
             <h1 className="text-5xl font-black leading-tight mb-8">
               {t.authWelcome}
             </h1>
             <p className="text-xl text-white/60 font-medium leading-relaxed max-w-lg">
               {t.heroSub}
             </p>
          </div>

          <div className="space-y-6 max-w-md">
             {benefits.map((benefit, i) => (
               <div key={i} className="flex items-center gap-5 bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                     {i === 0 ? <ShieldCheck size={24} /> : i === 1 ? <Zap size={24} /> : <ShoppingBag size={24} />}
                  </div>
                  <span className="font-bold text-lg">{benefit}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Dynamic Image in background */}
        <div className="absolute inset-0 opacity-20">
           <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200" 
            alt="Auth context" 
            className="w-full h-full object-cover grayscale"
           />
           <div className="absolute inset-0 bg-primary/80"></div>
        </div>
      </div>

      {/* Form Side */}
      <div className="lg:w-1/2 w-full flex flex-col justify-center items-center p-6 md:p-12 lg:p-20 bg-white relative">
        {/* Mobile Header */}
        <div className="lg:hidden w-full max-w-md mb-12 text-center">
           <Link to="/" className="inline-block mb-8">
             <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh5DRasl3ZaS4vcAnzYRVU1rXQArDgNHt7RpNJY-zvzC-RJp-dqR6SrunlI3IPaTUOH_CD0RkWoU6cRgn9AFbYCWjJZRJCroqSFe-NVitmZ2RiWeJbbi3Ragze8toPuJLHRzEpq_D9Kj5_jova12Czqvn_6opFrTEv9hjx7mZxvb_m6ADQAno6E96waLvA/s16000/logo.png" alt="LAVIVAA" className="h-12 w-auto object-contain" />
           </Link>
        </div>

        <div className="w-full max-w-md">
          {/* Toggle Login/Signup */}
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-900 mb-2">
              {mode === 'login' ? t.login : t.signup}
            </h2>
            <p className="text-slate-400 font-medium">
              {mode === 'login' ? t.dontHaveAccount : t.alreadyHaveAccount} 
              <button 
                type="button"
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-primary font-black hover:underline mx-2"
              >
                {mode === 'login' ? t.signupNow : t.loginNow}
              </button>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">{t.fullNameLabel}</label>
                  <div className="relative group">
                    <div className={`absolute top-1/2 -translate-y-1/2 ${lang === 'en' ? 'left-5' : 'right-5'} text-slate-300 group-focus-within:text-primary transition-colors`}>
                      <User size={20} />
                    </div>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Abdullah Ahmed"
                      className={`w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 focus:outline-none focus:ring-0 focus:border-primary/20 focus:bg-white transition-all font-medium text-slate-900 ${lang === 'en' ? 'pl-14 pr-6' : 'pr-14 pl-6'}`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">{t.mobileLabel}</label>
                  <div className="relative group">
                    <div className={`absolute top-1/2 -translate-y-1/2 ${lang === 'en' ? 'left-5' : 'right-5'} text-slate-300 group-focus-within:text-primary transition-colors`}>
                      <Phone size={20} />
                    </div>
                    <input 
                      required
                      type="tel" 
                      placeholder="+970 5XX XXX XXX"
                      dir="ltr"
                      className={`w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 focus:outline-none focus:ring-0 focus:border-primary/20 focus:bg-white transition-all font-medium text-slate-900 ${lang === 'en' ? 'pl-14 pr-6 text-left' : 'pr-14 pl-6 text-right'}`}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">{t.emailLabel}</label>
              <div className="relative group">
                <div className={`absolute top-1/2 -translate-y-1/2 ${lang === 'en' ? 'left-5' : 'right-5'} text-slate-300 group-focus-within:text-primary transition-colors`}>
                  <Mail size={20} />
                </div>
                <input 
                  required
                  type="email" 
                  placeholder="name@example.com"
                  className={`w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 focus:outline-none focus:ring-0 focus:border-primary/20 focus:bg-white transition-all font-medium text-slate-900 ${lang === 'en' ? 'pl-14 pr-6' : 'pr-14 pl-6'}`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.passwordLabel}</label>
                {mode === 'login' && (
                  <button type="button" className="text-[10px] font-black text-primary hover:underline">نسيت كلمة السر؟</button>
                )}
              </div>
              <div className="relative group">
                <div className={`absolute top-1/2 -translate-y-1/2 ${lang === 'en' ? 'left-5' : 'right-5'} text-slate-300 group-focus-within:text-primary transition-colors`}>
                  <Lock size={20} />
                </div>
                <input 
                  required
                  type="password" 
                  placeholder="••••••••"
                  className={`w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 focus:outline-none focus:ring-0 focus:border-primary/20 focus:bg-white transition-all font-medium text-slate-900 ${lang === 'en' ? 'pl-14 pr-6' : 'pr-14 pl-6'}`}
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg hover:bg-primary-light transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 group mt-8"
            >
              {mode === 'login' ? t.login : t.signup}
              <ArrowIcon size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Merchant CTA */}
          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
             <p className="text-slate-400 font-medium text-sm mb-4">ترغب في الانضمام كتاجر؟</p>
             <Link 
               to="/merchant-signup" 
               className="inline-flex items-center gap-2 text-primary font-black hover:underline"
             >
                <Sparkles size={16} /> {t.startSelling}
             </Link>
          </div>

          {/* Social Auth (Visual Only) */}
          <div className="mt-10 text-center">
             <div className="relative flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-slate-100"></div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">أو عبر</span>
                <div className="flex-1 h-px bg-slate-100"></div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 border-2 border-slate-100 py-3 rounded-2xl hover:bg-slate-50 transition-all font-bold text-sm">
                   <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="h-5 w-5" />
                   Google
                </button>
                <button className="flex items-center justify-center gap-3 border-2 border-slate-100 py-3 rounded-2xl hover:bg-slate-50 transition-all font-bold text-sm">
                   <img src="https://www.svgrepo.com/show/303114/facebook-3.svg" alt="Facebook" className="h-5 w-5" />
                   Facebook
                </button>
             </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-12 text-slate-300 text-xs font-bold text-center">
          {t.rights}
        </p>
      </div>
    </div>
  );
};
