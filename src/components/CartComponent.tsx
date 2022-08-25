import Link from 'next/link';
import { useContext } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { ContextCart } from '../context/Carinho';

type CartComponentsProps = {
  urlImg: string;
  name: string;
  price: number;
  index: number;
  id: string;
};

export function CartComponent({
  urlImg,
  price,
  name,
  index,
  id,
}: CartComponentsProps) {
  const { handleRemoveItemFromCart } = useContext(ContextCart);

  return (
    <div className="relative w-[100%] mb-4 h-[180px] m-auto shadow-2xl flex items-center justify-between">
      <Link href={`/products/${id}`}>
        <div className="cursor-pointer w-[250px] overflow-hidden h-full bg-white">
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
        <Link href={`/products/${id}`}>
          <p className="text-xl cursor-pointer text-center font-semibold mb-[10px]">
            {name}
          </p>
        </Link>
      </div>
      <button
        onClick={() => handleRemoveItemFromCart(index)}
        className="absolute top-[80%]"
        style={{
          left: 'calc(100% - 50px)',
        }}
      >
        <MdDeleteForever fontSize={30} />
      </button>
    </div>
  );
}
