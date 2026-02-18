
import React, { useState } from 'react';
import { useApp } from '../App';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Store, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  CreditCard, 
  Zap, 
  ShieldCheck, 
  Image as ImageIcon,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Info,
  User,
  Mail,
  Lock,
  Phone
} from 'lucide-react';
import { MERCHANT_PLANS, CATEGORIES } from '../constants';

export const MerchantOnboarding: React.FC = () => {
  const { lang, t } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string | null>('pro');
  
  const ArrowIcon = lang === 'en' ? ArrowRight : ArrowLeft;
  const StepChevron = lang === 'en' ? ChevronRight : ChevronLeft;

  const currentPlan = MERCHANT_PLANS.find(p => p.id === selectedPlan);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);
  
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t.successOrder + ' سيتم مراجعة طلبك وتفعيل متجرك فور تأكيد الدفع.');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 animate-fade-in">
      <div className="container mx-auto max-w-5xl">
        
        {/* Header Content */}
        <div className="text-center mb-16">
           <Link to="/" className="inline-block mb-8">
             <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh5DRasl3ZaS4vcAnzYRVU1rXQArDgNHt7RpNJY-zvzC-RJp-dqR6SrunlI3IPaTUOH_CD0RkWoU6cRgn9AFbYCWjJZRJCroqSFe-NVitmZ2RiWeJbbi3Ragze8toPuJLHRzEpq_D9Kj5_jova12Czqvn_6opFrTEv9hjx7mZxvb_m6ADQAno6E96waLvA/s16000/logo.png" alt="LAVIVAA" className="h-16 w-auto object-contain mx-auto" />
           </Link>
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">{t.merchantOnboardingTitle}</h1>
           <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">{t.merchantOnboardingSub}</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-4 mb-12">
           {[1, 2, 3, 4].map(s => (
             <React.Fragment key={s}>
               <div className={`flex items-center gap-3 transition-all duration-500 ${step >= s ? 'text-primary' : 'text-slate-300'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${step === s ? 'bg-primary text-white scale-110 shadow-lg' : step > s ? 'bg-primary/20 text-primary' : 'bg-slate-100 text-slate-300'}`}>
                    {step > s ? <Check size={20} /> : s}
                  </div>
                  <span className="hidden sm:inline font-bold text-sm">
                    {s === 1 ? t.step1 : s === 2 ? t.step2 : s === 3 ? t.step3 : t.step4}
                  </span>
               </div>
               {s < 4 && <div className={`h-px w-8 sm:w-16 bg-slate-200 transition-all ${step > s ? 'bg-primary/30' : ''}`} />}
             </React.Fragment>
           ))}
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden min-h-[550px] relative">
          
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="p-8 md:p-16 animate-fade-in">
               <div className="max-w-2xl mx-auto space-y-8">
                  <div className="text-center mb-10">
                     <h2 className="text-3xl font-black text-slate-900 mb-4">{t.step1}</h2>
                     <p className="text-slate-500 font-medium">أخبرنا قليلاً عنك لإنشاء هويتك كتاجر.</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">{t.fullNameLabel}</label>
                        <div className="relative group">
                           <User size={20} className={`absolute top-1/2 -translate-y-1/2 ${lang === 'en' ? 'left-5' : 'right-5'} text-slate-300`} />
                           <input type="text" placeholder="الاسم الكامل" className={`w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 focus:outline-none focus:border-primary/20 font-bold ${lang === 'en' ? 'pl-14' : 'pr-14'}`} />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">{t.mobileLabel}</label>
                        <div className="relative group">
                           <Phone size={20} className={`absolute top-1/2 -translate-y-1/2 ${lang === 'en' ? 'left-5' : 'right-5'} text-slate-300`} />
                           <input type="tel" dir="ltr" placeholder="+970" className={`w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 focus:outline-none focus:border-primary/20 font-bold ${lang === 'en' ? 'pl-14' : 'pr-14'}`} />
                        </div>
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">{t.emailLabel}</label>
                     <div className="relative group">
                        <Mail size={20} className={`absolute top-1/2 -translate-y-1/2 ${lang === 'en' ? 'left-5' : 'right-5'} text-slate-300`} />
                        <input type="email" placeholder="example@mail.com" className={`w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 focus:outline-none focus:border-primary/20 font-bold ${lang === 'en' ? 'pl-14' : 'pr-14'}`} />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">{t.passwordLabel}</label>
                     <div className="relative group">
                        <Lock size={20} className={`absolute top-1/2 -translate-y-1/2 ${lang === 'en' ? 'left-5' : 'right-5'} text-slate-300`} />
                        <input type="password" placeholder="••••••••" className={`w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 focus:outline-none focus:border-primary/20 font-bold ${lang === 'en' ? 'pl-14' : 'pr-14'}`} />
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* Step 2: Store Details */}
          {step === 2 && (
            <div className="p-8 md:p-16 animate-fade-in">
               <div className="text-center mb-10">
                  <h2 className="text-3xl font-black text-slate-900 mb-4">{t.step2}</h2>
                  <p className="text-slate-500 font-medium">حدد تفاصيل متجرك للبدء في عرض منتجاتك.</p>
               </div>
               <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                     <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">{t.storeName}</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Elegance Boutique"
                          className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary/20 transition-all font-bold text-slate-900"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">{t.businessType}</label>
                        <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary/20 transition-all font-bold text-slate-900 appearance-none">
                           <option>محلي (Local)</option>
                           <option>علامة تجارية (Brand)</option>
                           <option>حرفي (Artisan)</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">{t.storeCategory}</label>
                        <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary/20 transition-all font-bold text-slate-900 appearance-none">
                           {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name[lang]}</option>)}
                        </select>
                     </div>
                  </div>
                  <div className="space-y-8">
                     <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">{t.storeDescription}</label>
                        <textarea 
                          rows={4}
                          placeholder="Tell us about your store..."
                          className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary/20 transition-all font-bold text-slate-900"
                        ></textarea>
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">{t.storeLogo}</label>
                        <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center text-slate-300 hover:text-primary hover:border-primary/30 transition-all cursor-pointer group bg-slate-50/50">
                           <ImageIcon size={48} className="mb-4 group-hover:scale-110 transition-transform" />
                           <span className="font-bold text-sm">رفع صورة الشعار</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* Step 3: Plans */}
          {step === 3 && (
            <div className="p-8 md:p-16 animate-fade-in">
               <div className="text-center mb-12">
                  <h2 className="text-3xl font-black text-slate-900 mb-4">{t.choosePlan}</h2>
                  <p className="text-slate-500 font-medium">{t.plansSub}</p>
               </div>
               <div className="grid md:grid-cols-3 gap-8">
                  {MERCHANT_PLANS.map(plan => (
                    <div 
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`relative group cursor-pointer rounded-[2.5rem] p-8 transition-all duration-500 ${selectedPlan === plan.id ? 'bg-primary text-white scale-[1.05] shadow-2xl shadow-primary/30 ring-4 ring-accent' : 'bg-slate-50 text-slate-900 hover:bg-slate-100'}`}
                    >
                      {plan.recommended && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-primary px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                           {t.recommended}
                        </div>
                      )}
                      <div className="mb-8">
                        <h3 className="text-xl font-black mb-2">{plan.name[lang]}</h3>
                        <div className="flex items-baseline gap-2">
                           <span className="text-4xl font-black">{plan.price}</span>
                           <span className="text-sm font-bold opacity-60">{t.currency} / {t.month}</span>
                        </div>
                      </div>
                      <ul className="space-y-4 mb-10">
                        {plan.features[lang].map((f, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm font-bold">
                             <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${selectedPlan === plan.id ? 'bg-white/20 text-accent' : 'bg-primary/10 text-primary'}`}>
                               <Check size={12} strokeWidth={4} />
                             </div>
                             <span className="opacity-80 leading-relaxed">{f}</span>
                          </li>
                        ))}
                      </ul>
                      <div className={`w-full py-4 rounded-2xl font-black text-center transition-all ${selectedPlan === plan.id ? 'bg-white text-primary' : 'bg-primary text-white shadow-lg'}`}>
                         {selectedPlan === plan.id ? 'مختار حالياً' : 'اختيار الباقة'}
                      </div>
                    </div>
                  ))}
               </div>
               <div className="mt-12 flex items-center gap-4 bg-primary/5 p-6 rounded-3xl border border-primary/10">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary flex-shrink-0">
                    <Info size={20} />
                  </div>
                  <p className="text-sm font-bold text-primary-light leading-relaxed">
                    {t.paymentNote}
                  </p>
               </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {step === 4 && (
            <div className="p-8 md:p-16 animate-fade-in">
               <div className="max-w-xl mx-auto">
                  <div className="bg-slate-900 text-white rounded-[2rem] p-8 mb-10 shadow-2xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                     <div className="flex justify-between items-start mb-10 relative z-10">
                        <div>
                           <h4 className="text-accent text-[10px] font-black uppercase tracking-widest mb-1">{t.step3}</h4>
                           <h3 className="text-2xl font-black">{currentPlan?.name[lang]}</h3>
                        </div>
                        <div className="bg-white/10 p-3 rounded-2xl">
                           <Zap size={24} className="text-accent" />
                        </div>
                     </div>
                     <div className="flex justify-between items-center relative z-10">
                        <span className="text-white/40 font-bold">{t.orderTotal}</span>
                        <span className="text-3xl font-black text-accent">{currentPlan?.price} {t.currency}</span>
                     </div>
                  </div>

                  <form onSubmit={handleFinalSubmit} className="space-y-6">
                     <h3 className="text-lg font-black text-slate-900 mb-6">{t.paymentMethod}</h3>
                     <div className="grid grid-cols-2 gap-4 mb-10">
                        <div className="border-2 border-primary bg-primary/5 rounded-3xl p-6 flex flex-col items-center gap-3 cursor-pointer group">
                           <CreditCard size={32} className="text-primary group-hover:scale-110 transition-transform" />
                           <span className="font-black text-sm text-primary">بطاقة بنكية</span>
                        </div>
                        <div className="border-2 border-slate-100 rounded-3xl p-6 flex flex-col items-center gap-3 cursor-pointer hover:border-primary/20 group">
                           <img src="https://www.svgrepo.com/show/303107/paypal-logo.svg" alt="PayPal" className="h-8 w-auto group-hover:scale-110 transition-transform" />
                           <span className="font-black text-sm text-slate-400">بايبال</span>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">رقم البطاقة</label>
                           <input type="text" placeholder="**** **** **** ****" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary/20 font-mono font-bold" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">تاريخ الانتهاء</label>
                              <input type="text" placeholder="MM/YY" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary/20 font-bold" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">CVC</label>
                              <input type="password" placeholder="***" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary/20 font-bold" />
                           </div>
                        </div>
                     </div>

                     <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-primary/20 mt-10 hover:bg-primary-light transition-all flex items-center justify-center gap-3 group">
                        {t.payNow}
                        <ShieldCheck size={24} className="group-hover:rotate-12 transition-transform" />
                     </button>
                  </form>
               </div>
            </div>
          )}

          {/* Stepper Actions Footer */}
          <div className="bg-slate-50 p-6 flex justify-between items-center border-t border-slate-100">
             <button 
               onClick={step === 1 ? () => navigate('/signup') : handleBack}
               className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-900 transition-colors px-6 py-2"
             >
                <StepChevron size={20} className={lang === 'en' ? '' : 'rotate-180'} />
                {t.back}
             </button>

             {step < 4 && (
               <button 
                 onClick={handleNext}
                 className="bg-primary text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:shadow-primary/20 hover:scale-105 transition-all flex items-center gap-3 active:scale-95"
               >
                 {t.next}
                 <ArrowIcon size={20} />
               </button>
             )}
          </div>

        </div>

        {/* Support Footer */}
        <div className="mt-12 text-center text-slate-300 font-bold text-sm flex items-center justify-center gap-8">
           <div className="flex items-center gap-2">
             <ShieldCheck size={18} />
             <span>دفع آمن 100%</span>
           </div>
           <div className="flex items-center gap-2">
             <Zap size={18} />
             <span>تفعيل فوري للمتجر</span>
           </div>
           <div className="flex items-center gap-2">
             <Sparkles size={18} />
             <span>دعم فني متخصص</span>
           </div>
        </div>
      </div>
    </div>
  );
};
