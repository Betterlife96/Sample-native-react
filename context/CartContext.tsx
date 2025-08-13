import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  isLoading: boolean;
}

const CART_STORAGE_KEY = '@farmstarter_cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

async function getStoredCart(): Promise<CartItem[]> {
  try {
    const stored = await AsyncStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Error reading cart:', e);
    return [];
  }
}

async function saveCart(cart: CartItem[]) {
  try {
    await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error('Error saving cart:', e);
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load persisted cart on app start
  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await getStoredCart();
        setCart(storedCart);
      } catch (e) {
        console.error('Error loading cart:', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadCart();
  }, []);

  const addToCart = async (product: Product) => {
    const updatedCart = (prev: CartItem[]) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    };

    setCart((prev) => {
      const newCart = updatedCart(prev);
      saveCart(newCart);
      return newCart;
    });
  };

  const removeFromCart = async (productId: number) => {
    setCart((prev) => {
      const newCart = prev.filter((item) => item.id !== productId);
      saveCart(newCart);
      return newCart;
    });
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) => {
      const newCart = prev.map((item) => (item.id === productId ? { ...item, quantity } : item));
      saveCart(newCart);
      return newCart;
    });
  };

  const clearCart = async () => {
    setCart([]);
    await saveCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        isLoading,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
