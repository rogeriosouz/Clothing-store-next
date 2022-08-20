import { GetStaticPaths, GetStaticProps } from 'next';
import { useContext } from 'react';
import { ContextCart } from '../../context/Carinho';
import { ProductDocument, useProductQuery } from '../../generated/graphql';
import { client, ssrCache } from '../../lib/urql';

export default function Product({ id }: any) {
  const [{ data }] = useProductQuery({
    variables: {
      id,
    },
  });
  const { handleAddItemToCart } = useContext(ContextCart);

  return (
    <section className="w-full h-screen mt-[150px]">
      <div className="max-w-[1100px] h-screen m-auto flex flex-col p-5">
        <div className="flex">
          <div className="hidden sm:flex border border-black shadow-xl shadow-zinc-200 p-2 flex-1 w-full h-[500px] mr-[20px] bg-white rounded">
            <div className="rounded overflow-hidden w-[150px] m-auto mt-[10px]">
              <img
                className="w-full h-full"
                src={data?.product?.images[0].url}
                alt={data?.product?.images[0].__typename}
              />
            </div>
          </div>
          <div className="border border-black  shadow-xl shadow-zinc-200 flex-2 w-full h-[500px] rounded overflow-hidden bg-white">
            <img
              className="w-full h-full object-contain"
              src={data?.product?.images[0].url}
              alt={data?.product?.images[0].__typename}
            />
          </div>
        </div>
        <div className="relative border border-black  shadow-xl shadow-zinc-200 bg-white h-[101px] mt-[20px] w-full rounded flex flex-col items-center justify-between">
          <span
            className="mt-[15px] text-[14px] mb-[20px] font-medium"
            style={{
              letterSpacing: '0.345em',
            }}
          >
            {data?.product?.name}
          </span>
          <p
            className="font-bold text-[15px] mb-[20px]"
            style={{
              letterSpacing: '0.345em',
            }}
          >
            R$:{data?.product?.price}
          </p>

          <button
            onClick={() => {
              handleAddItemToCart({
                name: data?.product?.name,
                price: data?.product?.price,
                imgSrc: data?.product?.images[0].url,
              });
            }}
            className="cursor-pointer text-[30px] absolute left-[85%] top-[25%]"
          >
            +
          </button>
        </div>
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
