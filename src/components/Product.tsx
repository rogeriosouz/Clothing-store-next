import Link from 'next/link';

type ProductProps = {
  name: string;
  price: number;
  imgSrc: string;
  id: string;
};

export function Product({ name, price, imgSrc, id }: ProductProps) {
  return (
    <div className=" m-auto w-[290px] min-h-[440px] bg-zinc-100 border border-zinc-300">
      <div className="w-full h-[319px] rounded-[17px] overflow-hidden bg-white">
        <img className="object-fill w-full h-full" src={imgSrc} alt="aa" />
      </div>
      <div className="w-full h-[97px] flex flex-col items-center">
        <Link href={`/products/${id}`}>
          <span className="text-lg cursor-pointer mb-[20px] mt-[12px] font-semibold">
            {name}
          </span>
        </Link>
        <div className="relative flex items-centerl w-full justify-center">
          <p className="font-semibold text-xl">R$:{price}</p>
        </div>
      </div>
    </div>
  );
}
