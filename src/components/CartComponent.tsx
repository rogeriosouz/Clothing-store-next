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
    <div className="sm:border-white  border border-zinc-400 sm:mb-0 mb-[20px] w-full sm:h-[180px] h-[110px] shadow-2xl flex">
      <Link href={`/products/${id}`}>
        <div className="w-[25%] h-full cursor-pointer">
          <img
            className="w-full h-full sm:object-cover object-scale-down"
            src={urlImg}
            alt={name}
          />
        </div>
      </Link>
      <div className="relative sm:ml-0 ml-2 w-[75%] flex sm:flex-col flex-col-reverse sm:justify-between justify-center ">
        <div
          style={{
            left: 'calc(100% - 80px)',
          }}
          className="absolute sm:hidden flex gap-2 h-[20px] items-center"
        >
          <button className="bg-zinc-500" onClick={() => addQuantCart(id)}>
            <IoIosAdd fontSize={20} color={'#fff'} />
          </button>
          <span className="font-semibold text-lg"> {quant} </span>
          <button
            className="bg-zinc-500"
            onClick={() => {
              removeQuantCart(id, index);
            }}
          >
            <HiMinusSm fontSize={20} color={'#fff'} />
          </button>
        </div>
        <div className="w-full h-[20px] sm:mt-[20px] flex items-center text-black sm:justify-end justify-start pr-4">
          <span className="font-bold text-base text-zinc-500">R$:{price}</span>
        </div>
        <div className="w-full h-[30px] flex items-center sm:justify-center justify-start text-black">
          <Link href={`/products/${id}`}>
            <p className="sm:text-xl text-[17px]  cursor-pointer text-left font-semibold">
              {name}
            </p>
          </Link>
        </div>
        <div className="sm:flex hidden w-full h-[20px] bg-white mb-[10px] items-center justify-end">
          <div className="sm:flex hidden items-center justify-start w-full pl-4 gap-2 text-white">
            {size && <p className="text-sm bg-zinc-600  ">TM: {size}</p>}

            <span className="text-sm bg-zinc-600">COR: {color}</span>
          </div>
          <div className="flex items-center pr-4 gap-2">
            <button className="bg-zinc-600" onClick={() => addQuantCart(id)}>
              <IoIosAdd fontSize={23} color={'#fff'} />
            </button>
            <span className="font-bold sm:text-lg text-sm"> {quant} </span>
            <button
              className="bg-zinc-600"
              onClick={() => {
                removeQuantCart(id, index);
              }}
            >
              <HiMinusSm fontSize={23} color={'#fff'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
