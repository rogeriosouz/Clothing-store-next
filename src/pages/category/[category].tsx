import { GetServerSideProps } from 'next';
import { Product } from '../../components/Product';
import { CategoryDocument, useCategoryQuery } from '../../generated/graphql';
import { client, ssrCache } from '../../lib/urql';

export default function Category({ category }: any) {
  const [{ data }] = useCategoryQuery({
    variables: {
      id: category,
    },
  });

  return (
    <section className="w-full min-h-screen mt-[190px]">
      <div className="max-w-[1200px] min-h-screen m-auto">
        <div className="gap-10 grid cell:grid-cols-1 sm:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4">
          {data?.category?.products.map((product) => (
            <Product
              key={product.id}
              price={product.price}
              name={product.name}
              imgSrc={product.images[0].url}
              id={product.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  await client.query(CategoryDocument, { id: params?.category }).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
      category: params?.category,
    },
  };
};
