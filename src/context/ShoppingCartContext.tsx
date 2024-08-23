import { createContext, ReactNode, useContext, useState } from "react";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

export type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  getCartQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  isOpen: boolean;
  cartQuantity: number;
  openCart: () => void;
  closeCart: () => void;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const cartQuantity = cartItems.length;

  const closeCart = () => setIsOpen(false);
  const openCart = () => setIsOpen(true);

  const getCartQuantity = (id: number) => {
    const product = cartItems.find((item) => item.id === id);
    return product?.quantity || 0;
  };

  const increaseCartQuantity = (id: number) => {
    const newItems = cartItems.find((item) => item.id === id)
      ? cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [...cartItems, { id, quantity: 1 }];
    setCartItems(newItems);
  };

  const decreaseCartQuantity = (id: number) => {
    const newItems =
      cartItems.find((item) => item.id === id)?.quantity === 1
        ? cartItems.filter((item) => item.id !== id)
        : cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          );
    setCartItems(newItems);
  };

  const removeFromCart = (id: number) => {
    const newItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newItems);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getCartQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        isOpen,
        cartQuantity,
        openCart,
        closeCart,
        cartItems,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
