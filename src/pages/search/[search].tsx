import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { ButtonPaginations } from '../../components/ButtonsPagination';
import { Product } from '../../components/Product';
import { SearchDocument, useSearchQuery } from '../../generated/graphql';
import { client, ssrCache } from '../../lib/urql';

export default function Sacher({ search }: any) {
  const [{ data }] = useSearchQuery({
    variables: {
      _search: search,
    },
  });

  const [itensPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const pages = Math.ceil((data?.products.length as number) / itensPerPage);
  const startItem = currentPage * itensPerPage;
  const endIten = startItem + itensPerPage;

  const productPagination = data?.products.slice(startItem, endIten);

  return (
    <section className="w-full min-h-screen mt-[190px]">
      <div className="max-w-[1300px] min-h-screen m-auto">
        {data?.products.length ? (
          <>
            <div className="gap-10 grid cell:grid-cols-1 sm:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4">
              {productPagination?.map((product) => (
                <Product
                  key={product.id}
                  price={product.price}
                  name={product.name}
                  imgSrc={product.images[0].url}
                  id={product.id}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="font-normal text-xl flex items-start mt-[500px] justify-center">
            produto não encontrado
          </div>
        )}
      </div>
      {pages !== 1 && (
        <ButtonPaginations pages={pages} setCurrentPage={setCurrentPage} />
      )}
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
