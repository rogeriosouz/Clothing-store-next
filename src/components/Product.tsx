import Link from 'next/link';

type ProductProps = {
  name: string;
  price: number;
  imgSrc: string;
  id: string;
};

export function Product({ name, price, imgSrc, id }: ProductProps) {
  return (
    <div className="shadow-2xl m-auto w-[266px] min-h-[416px] rounded-[17px] bg-zinc-100 border border-zinc-300">
      <div className="w-full h-[319px] rounded-[17px] overflow-hidden bg-white">
        <img className="object-fill w-full h-full" src={imgSrc} alt="aa" />
      </div>
      <div className="w-full h-[97px] flex flex-col items-center">
        <Link href={`/products/${id}`}>
          <span
            className="cursor-pointer text-[14px] mb-[20px] mt-[12px] font-medium"
            style={{
              letterSpacing: '0.345em',
            }}
          >
            {name}
          </span>
        </Link>
        <p
          className="font-bold text-[15px]"
          style={{
            letterSpacing: '0.345em',
          }}
        >
          R$:{price}
        </p>
      </div>
    </div>
  );
}
