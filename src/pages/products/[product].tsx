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
    <section className="max-w-[1200px] h-screen flex items-start mt-[200px] m-auto gap-10">
      <div className="w-[680px] h-[480px] flex gap-3">
        <div className="w-[170px] h-full shadow-xl">
          <div className="overflow-hidden w-full h-[150px] mt-[10px] mb-[10px] bg-white">
            <img
              className="w-full h-full object-cover"
              src={data?.product?.images[0].url}
              alt={data?.product?.images[0].__typename}
            />
          </div>
        </div>
        <div className="flex-1 h-full shadow-xl">
          <img
            className="w-full h-full object-cover"
            src={data?.product?.images[0].url}
            alt={data?.product?.images[0].__typename}
          />
        </div>
      </div>
      <div className="w-[480px] h-[250px]  flex flex-col justify-between">
        <h1 className="text-center mt-[20px] font-bold text-2xl">
          {data?.product?.name}
        </h1>
        <div className="ml-[20px] flex items-center gap-2">
          <span className="mb-[3px] font-bold flex items-center text-lg">
            R${data?.product?.price}
          </span>
          <p className="text-[12px] font-semibold text-zinc-400"> x3 20,80</p>
        </div>
        <button
          onClick={() => {
            handleAddItemToCart({
              name: data?.product?.name,
              price: data?.product?.price,
              imgSrc: data?.product?.images[0].url,
              id: id,
            });
          }}
          className="w-full h-[60px] bg-black text-white font-bold"
        >
          ADD CART
        </button>
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
