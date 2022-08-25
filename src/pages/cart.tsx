import { useContext } from 'react';
import { CartComponent } from '../components/CartComponent';
import { ContextCart } from '../context/Carinho';

export default function Cart() {
  const { cart } = useContext(ContextCart);

  let total = 0;

  cart.map((item: any) => {
    total += item.price;
  });

  return (
    <section className="p-4 w-full h-screen mt-[150px]">
      <div className="gap-10 max-w-[1200px] m-auto h-screen sm:flex-row flex-col-reverse flex items-start">
        <div className="gap-2 overflow-auto shadow-lg w-[850px] h-[500px]">
          {cart.length > 0 && (
            <>
              {cart.map((product: any, index: number) => (
                <CartComponent
                  key={index}
                  name={product.name}
                  price={product.price}
                  urlImg={product.imgSrc}
                  index={index}
                  id={product.id}
                />
              ))}
            </>
          )}
        </div>

        <div className="w-[400px] mt-[20px] h-[200px] mb-auto shadow-lg  flex flex-col items-center justify-between p-2">
          <div className="h-[100px] w-full p-2 flex items-center justify-between">
            <p className="font-bold">Total das compras</p>
            <span>R$190,00</span>
          </div>

          <div className="h-[100px] w-full p-2 flex items-center justify-between">
            <p className="font-bold">Total das compras</p>
            <span>R$190,00</span>
          </div>

          <button className="w-full h-[80px] bg-black text-white">
            continuar
          </button>
        </div>
      </div>
    </section>
  );
}
