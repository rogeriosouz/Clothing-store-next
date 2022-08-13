import { createContext, useState } from 'react';

type ContextProps = {
  cart: object[];
  handleAddItemToCart: any;
  handleRemoveItemFromCart: any;
  clearCart: any;
};

export const Context = createContext<ContextProps>({
  cart: [],
  handleAddItemToCart: () => {},
  handleRemoveItemFromCart: () => {},
  clearCart: () => {},
});

export function CarinhoProvider({ children }: any) {
  const [cart, setCart] = useState<object[]>([]);

  function handleAddItemToCart(name: string, price: number, imgSrc: string) {
    const itemObject = { name, price, imgSrc };
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
    <Context.Provider
      value={{ cart, clearCart, handleAddItemToCart, handleRemoveItemFromCart }}
    >
      {children}
    </Context.Provider>
  );
}
