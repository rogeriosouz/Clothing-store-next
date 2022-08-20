import { GetServerSideProps } from 'next';
import { Product } from '../../components/Product';
import { SearchDocument, useSearchQuery } from '../../generated/graphql';
import { client, ssrCache } from '../../lib/urql';

export default function Sacher({ search }: any) {
  const [{ data }] = useSearchQuery({
    variables: {
      _search: search,
    },
  });

  return (
    <section className="w-full min-h-screen mt-[190px]">
      <div className="max-w-[1100px] min-h-screen m-auto">
        {data?.products.length ? (
          <>
            <div className="gap-10 grid cell:grid-cols-1 sm:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4">
              {data.products?.map((product) => (
                <Product
                  key={product.name}
                  price={product.price}
                  name={product.name}
                  imgSrc={product.images[0].url}
                  id={product.id}
                />
              ))}
            </div>
          </>
        ) : (
          <div
            style={{
              letterSpacing: '0.345em',
            }}
            className="text-xl h-screen flex items-center justify-center"
          >
            produto não encontrado
          </div>
        )}
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  await client.query(SearchDocument, { _search: params?.search }).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
      search: params?.search,
    },
  };
};
