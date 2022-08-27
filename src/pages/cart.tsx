import { useContext } from 'react';
import { CartComponent } from '../components/CartComponent';
import { ContextCartCreate } from '../context/CartContext';

export default function Cart() {
  const { cart, total, quantityItems } = useContext(ContextCartCreate);

  return (
    <section className="p-4 w-full h-screen mt-[150px]">
      <div className="gap-10 max-w-[1300px] m-auto h-screen sm:flex-row flex-col-reverse flex items-start">
        <div className="gap-2 overflow-auto shadow-lg w-[850px] h-[550px] p-1">
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

        <div className="w-[400px] mt-[20px] h-[200px] mb-auto shadow-lg  flex flex-col items-center justify-between p-2">
          <div className="h-[100px] w-full p-2 flex items-center justify-between">
            <p className="font-bold">Total de items</p>
            <span>{quantityItems}</span>
          </div>

          <div className="h-[100px] w-full p-2 flex items-center justify-between">
            <p className="font-bold">Total das compras</p>
            <span>
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
