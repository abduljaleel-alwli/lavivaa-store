import React, { createContext, useContext, useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Language, CartItem, Product } from './types';
import { TRANSLATIONS } from './constants';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { LocalShopping } from './pages/LocalShopping';
import { GlobalShopping } from './pages/GlobalShopping';
import { ProductDetails } from './pages/ProductDetails';
import { Checkout } from './pages/Checkout';

// Context Definitions
interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof TRANSLATIONS['ar'];
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    // Set Direction based on language
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
  }, [lang]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity: quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{ lang, setLang, t, cart, addToCart, removeFromCart, clearCart, isCartOpen, setIsCartOpen }}>
      <HashRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/local-shopping" element={<LocalShopping />} />
            <Route path="/global-shopping" element={<GlobalShopping />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;