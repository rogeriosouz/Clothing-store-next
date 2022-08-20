import Link from 'next/link';
import { useContext } from 'react';
import { MdRemoveCircle } from 'react-icons/md';
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
    <div className="relative w-[100%] h-[83px] m-auto rounded shadow-2xl border border-black flex items-center justify-between">
      <Link href={`/products/${id}`}>
        <div className="cursor-pointer w-[119px] overflow-hidden h-full rounded bg-white">
          <img className="w-full h-full object-cover" src={urlImg} alt={name} />
        </div>
      </Link>
      <div className="p-9">
        <Link href={`/products/${id}`}>
          <p
            style={{
              letterSpacing: '0.345em',
            }}
            className="cursor-pointer font-medium mb-[10px]"
          >
            {name}
          </p>
        </Link>
        <span
          className="w-full flex font-bold justify-end"
          style={{
            letterSpacing: '0.345em',
          }}
        >
          R$:{price}
        </span>
        <button
          onClick={() => handleRemoveItemFromCart(index)}
          className="absolute top-[37%]"
          style={{
            left: 'calc(100% - 30px)',
          }}
        >
          <MdRemoveCircle fontSize={20} />
        </button>
      </div>
    </div>
  );
}
