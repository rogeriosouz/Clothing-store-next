import { createContext, useState } from 'react';

type ContextProps = {
  cart: object[];
  handleAddItemToCart: any;
  handleRemoveItemFromCart: any;
  clearCart: any;
  isIqualProduct: boolean;
};

export const ContextCart = createContext({} as ContextProps);

type AddPRoductProps = {
  name: string;
  price: number;
  imgSrc: string;
  id: string;
};

function isIqualItem(obj1: object, obj2: object) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function CartContext({ children }: any) {
  const [cart, setCart] = useState<object[]>([]);
  const [isIqualProduct, setIsIQualProduct] = useState(false);

  function handleAddItemToCart({ name, price, imgSrc, id }: AddPRoductProps) {
    const itemObject = { name, price, imgSrc, id };

    cart.map((item) => {
      if (isIqualItem(item, itemObject)) {
        setIsIQualProduct(true);
      }
    });

    if (!isIqualProduct) {
      setIsIQualProduct(false);
      setCart([...cart, itemObject]);
    }
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
      value={{
        cart,
        isIqualProduct,
        clearCart,
        handleAddItemToCart,
        handleRemoveItemFromCart,
      }}
    >
      {children}
    </ContextCart.Provider>
  );
}
