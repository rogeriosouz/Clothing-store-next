import { useContext } from 'react';
import { CartComponent } from '../components/CartComponent';
import { ContextCartCreate } from '../context/CartContext';

export default function Cart() {
  const { cart, total, quantityItems } = useContext(ContextCartCreate);

  return (
    <section className="p-1 w-full h-screen mt-[150px]">
      <div className="gap-10 max-w-[1300px] m-auto h-screen sm:flex-row flex-col flex items-start">
        <div className="gap-2 overflow-auto shadow-lg sm:w-[850px] w-full min-h-min mb-[50px] mt-[30px]">
          {cart.length > 0 && (
            <>
              {cart.map((product, index: number) => (
                <CartComponent
                  key={index}
                  name={product.name}
                  price={product.price}
                  urlImg={product.imgSrc}
                  index={index}
                  id={product.id}
                  quant={product.quant as number}
                  color={product.color}
                  size={product.size}
                />
              ))}
            </>
          )}
        </div>

        <div className=" sm:w-[400px] w-full h-[200px] mb-auto shadow-lg flex flex-col items-center justify-between">
          <div className="h-[100px] w-full p-2 flex items-center justify-between">
            <p className="font-bold">Total de items</p>
            <span>{quantityItems}</span>
          </div>

          <div className="h-[100px] w-full p-2 flex items-center justify-between">
            <p className="font-bold ">Total das compras</p>
            <span className="text-zinc-500">
              R$
              {total}
            </span>
          </div>

          <button className="w-full h-[80px] bg-black text-white">
            continuar
          </button>
        </div>
      </div>
    </section>
  );
}
