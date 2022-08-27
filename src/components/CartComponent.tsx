import Link from 'next/link';
import { useContext } from 'react';
import { HiMinusSm } from 'react-icons/hi';
import { IoIosAdd } from 'react-icons/io';
import { ContextCartCreate } from '../context/CartContext';

type CartComponentsProps = {
  urlImg: string;
  name: string;
  price: number;
  index: number;
  id: string;
  quant: number;
  color: string;
  size: string;
};

export function CartComponent({
  urlImg,
  price,
  name,
  index,
  id,
  quant,
  color,
  size,
}: CartComponentsProps) {
  const { addQuantCart, removeQuantCart } = useContext(ContextCartCreate);

  return (
    <div className="w-full h-[180px] mb-2 shadow-2xl flex">
      <Link href={`/products/${id}`}>
        <div className="w-[25%] h-full cursor-pointer">
          <img className="w-full h-full object-cover" src={urlImg} alt={name} />
        </div>
      </Link>
      <div className="w-[75%] flex flex-col justify-between">
        <div className="w-full h-[30px]  mt-[10px] flex items-center text-black justify-end pr-4">
          <span className="font-bold">R$:{price}</span>
        </div>
        <div className="w-full h-[30px]  flex items-center justify-center text-black">
          <Link href={`/products/${id}`}>
            <p className="text-xl cursor-pointer text-left font-semibold">
              {name}
            </p>
          </Link>
        </div>
        <div className="w-full h-[30px] bg-white mb-[10px] flex items-center justify-end">
          <div className="flex items-center justify-start w-full pl-4 gap-2 text-white">
            {size && (
              <p className="text-end bg-black pl-2 pr-2 rounded">
                tamanho: {size}
              </p>
            )}

            <span className="text-end bg-black pl-2 pr-2 rounded">
              cor: {color}
            </span>
          </div>
          <div className="flex items-center pr-4 gap-2">
            <button
              className="bg-black rounded"
              onClick={() => addQuantCart(id)}
            >
              <IoIosAdd fontSize={24} color={'#fff'} />
            </button>
            <span className="font-bold text-lg"> {quant} </span>
            <button
              className="bg-black rounded"
              onClick={() => {
                removeQuantCart(id, index);
              }}
            >
              <HiMinusSm fontSize={24} color={'#fff'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
