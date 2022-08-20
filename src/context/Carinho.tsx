import { createContext, useState } from 'react';

type ContextProps = {
  cart: object[];
  handleAddItemToCart: any;
  handleRemoveItemFromCart: any;
  clearCart: any;
};

export const ContextCart = createContext<ContextProps>({
  cart: [],
  handleAddItemToCart: () => {},
  handleRemoveItemFromCart: () => {},
  clearCart: () => {},
});

type AddPRoductProps = {
  name: string;
  price: number;
  imgSrc: string;
  id: string;
};

export function CartContext({ children }: any) {
  const [cart, setCart] = useState<object[]>([]);

  function handleAddItemToCart({ name, price, imgSrc, id }: AddPRoductProps) {
    const itemObject = { name, price, imgSrc, id };
    setCart([...cart, itemObject]);
  }

  function handleRemoveItemFromCart(clickedItemIndex: number) {
    const filtedCart = cart.filter(
      (cartItem) => cart.indexOf(cartItem) !== clickedItemIndex
    );
    setCart(filtedCart);
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <ContextCart.Provider
      value={{ cart, clearCart, handleAddItemToCart, handleRemoveItemFromCart }}
    >
      {children}
    </ContextCart.Provider>
  );
}
