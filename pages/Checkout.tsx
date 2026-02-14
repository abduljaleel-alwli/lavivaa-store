import React from 'react';
import { useApp } from '../App';
import { DELIVERY_FEE } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck, Truck, ShoppingBag } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { cart, lang, t, clearCart } = useApp();
  const navigate = useNavigate();
  const ArrowIcon = lang === 'en' ? ArrowRight : ArrowLeft;

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const finalTotal = cartTotal + (cart.length > 0 ? DELIVERY_FEE : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t.successOrder);
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 p-4">
        <ShoppingBag size={64} className="text-gray-300 mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.cartEmpty}</h2>
        <Link 
            to="/local-shopping" 
            className="mt-6 bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all flex items-center gap-2"
        >
            {t.continueShopping} <ArrowIcon size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          
          {/* Form Section */}
          <div className="lg:w-2/3">
             <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-6">
                <h2 className="text-xl font-bold text-primary mb-6 border-b pb-4 flex items-center gap-2">
                   1. {t.billingDetails}
                </h2>
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">{t.name} <span className="text-red-500">*</span></label>
                       <input required type="text" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all bg-gray-50 focus:bg-white" />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">{t.phone} <span className="text-red-500">*</span></label>
                       <input required type="tel" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all bg-gray-50 focus:bg-white" />
                     </div>
                   </div>
                   
                   <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">{t.address} <span className="text-red-500">*</span></label>
                       <input required type="text" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all bg-gray-50 focus:bg-white" />
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">{t.city} <span className="text-red-500">*</span></label>
                         <input required type="text" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all bg-gray-50 focus:bg-white" />
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                         <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all bg-gray-50 focus:bg-white" />
                      </div>
                   </div>

                   <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Order Notes (Optional)</label>
                      <textarea rows={3} className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all bg-gray-50 focus:bg-white"></textarea>
                   </div>
                </form>
             </div>
             
             {/* Payment Features */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3 text-sm text-gray-600">
                   <ShieldCheck className="text-primary" size={24} />
                   <span>Secure Payment</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3 text-sm text-gray-600">
                   <Truck className="text-primary" size={24} />
                   <span>Fast Delivery</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3 text-sm text-gray-600">
                   <ShoppingBag className="text-primary" size={24} />
                   <span>Quality Guarantee</span>
                </div>
             </div>
          </div>

          {/* Summary Section */}
          <div className="lg:w-1/3">
             <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 sticky top-24">
                <h2 className="text-xl font-bold text-primary mb-6 border-b pb-4">
                   2. {t.orderSummary}
                </h2>
                
                <div className="max-h-[300px] overflow-y-auto pr-2 mb-6 space-y-4 scrollbar-thin">
                   {cart.map(item => (
                      <div key={item.id} className="flex gap-4">
                         <div className="w-16 h-16 rounded-md bg-gray-100 overflow-hidden flex-shrink-0">
                            <img src={item.image} alt={item.name[lang]} className="w-full h-full object-cover" />
                         </div>
                         <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name[lang]}</h4>
                            <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                            <span className="text-sm font-bold text-primary block mt-1">{(item.price * item.quantity).toFixed(2)} {t.currency}</span>
                         </div>
                      </div>
                   ))}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-3 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium">{cartTotal.toFixed(2)} {t.currency}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>{t.deliveryFee}</span>
                      <span className="font-medium">{DELIVERY_FEE.toFixed(2)} {t.currency}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-primary pt-3 border-t border-gray-100">
                      <span>{t.total}</span>
                      <span>{finalTotal.toFixed(2)} {t.currency}</span>
                    </div>
                </div>
                
                <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                       <input type="radio" checked readOnly className="accent-primary w-4 h-4" />
                       <label className="text-sm font-bold text-gray-900">Cash on Delivery</label>
                    </div>
                    <p className="text-xs text-gray-500 ml-6">Pay comfortably with cash when your order arrives.</p>
                </div>

                <button 
                  type="submit" 
                  form="checkout-form"
                  className="w-full bg-primary text-white py-4 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  {t.placeOrder}
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};