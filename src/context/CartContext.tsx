import { createContext, useState } from 'react';

type ContextProps = {
  cart: CartProps[];
  addItemToCart: ({ name, price, imgSrc, id }: CartProps) => void;
  removeItemFromCart: (clickedItemIndex: number) => void;
  clearCart: () => void;
  addQuantCart: (id: string) => void;
  removeQuantCart: (id: string, index: number) => void;
  total: number;
  quantityItems: number;
  editProduct: (id: string, size: string, color: string) => void;
};

export type CartProps = {
  name: string;
  price: number;
  imgSrc: string;
  id: string;
  quant?: number;
  color: string;
  size: string;
};

export const ContextCartCreate = createContext({} as ContextProps);

export function CartContext({ children }: any) {
  const [cart, setCart] = useState([] as CartProps[]);
  const [priceCart, setPriceCart] = useState(0);

  let total = 0;
  let quantityItems = 0;
  cart.map((item) => {
    total += item.price;
    quantityItems += item.quant as number;
  });

  function addItemToCart({ name, price, imgSrc, id, size, color }: CartProps) {
    const itemObject = { name, price, imgSrc, id, quant: 1, size, color };
    setPriceCart(price);
    setCart([...cart, itemObject]);
  }

  function removeItemFromCart(clickedItemIndex: number) {
    const filtedCart = cart.filter(
      (cartItem) => cart.indexOf(cartItem) !== clickedItemIndex
    );
    setCart(filtedCart);
  }

  function addQuantCart(id: string) {
    let newsItems = [] as CartProps[];
    let positionObj: number = 0;

    cart.map((item, index) => {
      if (item.id === id) {
        newsItems.push({
          name: item.name,
          id: item.id,
          price: item.price + priceCart,
          quant: (item.quant as number) + 1,
          imgSrc: item.imgSrc,
          size: item.size,
          color: item.color,
        });
        positionObj = index;
      }
    });

    cart[positionObj] = newsItems[0];
    let newCart = [...cart];

    setCart(newCart);
  }

  function removeQuantCart(id: string, index: number) {
    let newsItems = [] as CartProps[];
    let positionObj: number = 0;

    cart.map((item, index) => {
      if (item.id === id) {
        newsItems.push({
          name: item.name,
          id: item.id,
          price: item.price - priceCart,
          quant: (item.quant as number) - 1,
          imgSrc: item.imgSrc,
          size: item.size,
          color: item.color,
        });
        positionObj = index;
      }
    });

    if ((newsItems[0].quant as number) < 1) {
      removeItemFromCart(index);
      return;
    }

    cart[positionObj] = newsItems[0];
    let newCart = [...cart];
    setCart(newCart);
  }

  function editProduct(id: string, size: string, color: string) {
    let newsItems = [] as CartProps[];
    let positionObj: number = 0;

    cart.map((item, index) => {
      if (item.id === id) {
        newsItems.push({
          name: item.name,
          id: item.id,
          price: item.price,
          quant: item.quant,
          imgSrc: item.imgSrc,
          size: size,
          color: color,
        });
        positionObj = index;
      }
    });

    cart[positionObj] = newsItems[0];
    let newCart = [...cart];

    setCart(newCart);
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <ContextCartCreate.Provider
      value={{
        cart,
        total,
        quantityItems,
        editProduct,
        addQuantCart,
        removeQuantCart,
        clearCart,
        addItemToCart,
        removeItemFromCart,
      }}
    >
      {children}
    </ContextCartCreate.Provider>
  );
}
