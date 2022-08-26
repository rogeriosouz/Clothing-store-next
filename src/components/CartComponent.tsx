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
};

export function CartComponent({
  urlImg,
  price,
  name,
  index,
  id,
  quant,
}: CartComponentsProps) {
  const { addQuantCart, removeQuantCart } = useContext(ContextCartCreate);

  return (
    <div className="relative w-[100%] mb-4 h-[180px] m-auto shadow-2xl flex items-center justify-between">
      <Link href={`/products/${id}`}>
        <div className="cursor-pointer w-[250px] overflow-hidden  h-full bg-white">
          <img className="w-full h-full object-cover" src={urlImg} alt={name} />
        </div>
      </Link>
      <span
        className="absolute top-[20px] font-bold"
        style={{
          left: 'calc(100% - 120px)',
        }}
      >
        R$:{price}
      </span>
      <div className="w-full items-center justify-center">
        <div className="max-w-max">
          <Link href={`/products/${id}`}>
            <p className="text-xl cursor-pointer text-left ml-[150px] font-semibold mb-[10px]">
              {name}
            </p>
          </Link>
        </div>
      </div>

      <div
        className="absolute top-[80%] flex gap-2 items-center"
        style={{
          left: 'calc(100% - 125px)',
        }}
      >
        <button className="bg-black rounded" onClick={() => addQuantCart(id)}>
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
  );
}
