import { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

import { CartProps, ContextCartCreate } from '../../context/CartContext';
import { ProductDocument, useProductQuery } from '../../generated/graphql';
import { client, ssrCache } from '../../lib/urql';

const Select: any = dynamic(
  () => import('react-select').then((mod: any) => mod.default),
  {
    ssr: false,
    loading: () => null,
  }
);

function isEqualProduct(cart: CartProps[], id: string) {
  let iqual = false;

  cart.map((item) => {
    if (item.id === id) {
      iqual = true;
    }
  });

  return iqual;
}

export default function Product({ id }: any) {
  const [isClick, setIsClick] = useState(false);
  const [selectColor, setSelectColor] = useState('');
  const [selectSize, setSelectSize] = useState('');
  const [optionSize, setOptionSize] = useState([]);
  const [optionColor, setOptionColor] = useState([]);
  const [isIqualColor, setIsIqualColor] = useState(false);
  const [uniquiColor, setUniquiCor] = useState('');

  const [{ data }] = useProductQuery({
    variables: {
      id,
    },
  });

  const { addItemToCart, cart, editProduct } = useContext(ContextCartCreate);

  useEffect(() => {
    const iqual = isEqualProduct(cart, id);

    if (iqual) {
      setIsClick(true);
    } else {
      setIsClick(false);
    }
  });

  useEffect(() => {
    const isSize = data?.product?.categories[0].name !== 'Accessories';
    const optSize: any = [];
    const optColor: any = [];

    if (isSize) {
      data?.product?.variants.map((item: any) => {
        optSize.push({ value: item.size, label: item.size });
      });
    } else {
      data?.product?.variants.map((item: any) => {
        optColor.push({ value: item.color, label: item.color });
      });
    }

    let color = '';
    let isIqualColor = false;
    data?.product?.variants.map((item: any) => {
      if (item.color === color) {
        color = item.color;
        isIqualColor = true;
        return;
      }
      color = item.color;
    });

    setUniquiCor(color);
    setIsIqualColor(isIqualColor);

    setOptionSize(optSize);
    setOptionColor(optColor);
  }, [data]);

  return (
    <section className="mb-[160px] laptop:flex-row flex-col max-w-[1300px] h-screen flex items-start mt-[200px] m-auto justify-between">
      <div className="sm:w-[690px] w-full laptop:m-0 m-auto  h-[490px] flex sm:flex-row flex-col-reverse">
        <div className="h-full sm:shadow-xl sm:w-[170px] w-full">
          <div className="p-1 flex gap-2 overflow-hidden min-w-min sm:h-[150px] h-[90px] mt-[10px] mb-[10px] bg-white">
            <img
              className="sm:border-none border-2 border-zinc-400 min-w-min h-full  sm:object-cover object-contain"
              src={data?.product?.images[0].url}
              alt={data?.product?.images[0].__typename}
            />
          </div>
        </div>
        <div className="h-full shadow-xl">
          <img
            className="w-full h-full object-cover"
            src={data?.product?.images[0].url}
            alt={data?.product?.images[0].__typename}
          />
        </div>
      </div>
      <div className="laptop:w-[480px] laptop:mt-0 mt-[30px] sm:p-5 p-0 laptop:p-0 w-full min-h-min flex flex-col justify-between gap-6">
        <h1 className="text-center mt-[20px] font-bold text-2xl">
          {data?.product?.name}
        </h1>
        <div className="ml-[20px] flex items-center gap-2">
          <span className="mb-[3px] font-bold flex items-center text-lg">
            R${data?.product?.price}
          </span>
          <p className="text-[12px] font-semibold text-zinc-400"> x3 20,80</p>
        </div>
        <div className="ml-[20px] mr-[20px] flex items-center justify-between">
          <div>
            <span className="font-bold  text-base">COLORS</span>
          </div>
          <div className="flex items-center gap-2">
            {!isIqualColor ? (
              <Select
                onChange={(e: any) => setSelectColor(e.value)}
                className="w-[150px] border-zinc-500 outline-emerald-600"
                options={optionColor}
              />
            ) : (
              <Select
                onChange={(e: any) => setSelectColor(e.value)}
                className="w-[150px] border-zinc-500 outline-emerald-600"
                options={[{ value: uniquiColor, label: uniquiColor }]}
              />
            )}
          </div>
        </div>

        {data?.product?.categories[0].name !== 'Accessories' && (
          <div className="ml-[20px] mr-[20px] flex items-center justify-between">
            <div>
              <span className="font-bold text-base">SIZE</span>
            </div>
            <div className="flex gap-1">
              <Select
                onChange={(e: any) => setSelectSize(e.value)}
                className="w-[150px] text-black "
                options={optionSize}
              />
            </div>
          </div>
        )}

        {isClick ? (
          <Link href={'/cart'}>
            <a>
              <button
                onClick={() => editProduct(id, selectSize, selectColor)}
                className=" w-full h-[60px] bg-black text-white font-bold "
              >
                IR PARA O CARINHO
              </button>
            </a>
          </Link>
        ) : (
          <button
            onClick={() => {
              addItemToCart({
                name: data?.product?.name as string,
                price: data?.product?.price as number,
                imgSrc: data?.product?.images[0].url as string,
                id: id,
                color: selectColor,
                size: selectSize,
              });
              setIsClick(true);
            }}
            className="0 w-full h-[60px] bg-black text-white font-bold"
          >
            ADD CART
          </button>
        )}
      </div>
    </section>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  await client.query(ProductDocument, { id: params?.product }).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
      id: params?.product,
    },
    revalidate: 60 * 60 * 4, // 4 hours
  };
};
