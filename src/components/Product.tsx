import Link from 'next/link';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

type ProductProps = {
  name: string;
  price: number;
  imgSrc: string;
  id: string;
};

export function Product({ name, price, imgSrc, id }: ProductProps) {
  return (
    <div className="m-auto w-[290px] min-h-[450px] bg-zinc-100 border border-zinc-300 rounded">
      <div className="w-full h-[319px] rounded-[17px] overflow-hidden bg-white">
        <img className="object-fill w-full h-full" src={imgSrc} alt="aa" />
      </div>
      <div className="w-full h-[97px] flex flex-col items-center">
        <Link href={`/products/${id}`}>
          <span className="text-lg cursor-pointer mb-[20px] mt-[12px] font-semibold">
            {name}
          </span>
        </Link>
        <div className="relative flex items-center w-full mt-[10px]">
          <div className="w-full justify-start pl-8 flex-col">
            <p className="flex gap-2 items-center mb-[6px]">
              <AiFillStar fontSize={15} />
              <AiFillStar fontSize={15} />
              <AiFillStar fontSize={15} />
              <AiFillStar fontSize={15} />
              <AiOutlineStar fontSize={15} />
            </p>
            <p className="font-semibold text-xl">R$:{price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
