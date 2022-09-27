import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { ButtonPaginations } from '../../components/ButtonsPagination';
import { Product } from '../../components/Product';
import { Select } from '../../components/Select';
import {
  ProductOrderByInput,
  ProductsDocument,
  useProductsQuery,
} from '../../generated/graphql';
import { client, ssrCache } from '../../lib/urql';

export default function Products() {
  const [ordenProducts, setOrdenProducts] = useState<ProductOrderByInput>();
  const [selecFilter, setSelecFilter] = useState('');

  const [{ data }] = useProductsQuery({
    variables: { orderBy: ordenProducts },
  });

  useEffect(() => {
    if (selecFilter === 'menor') {
      setOrdenProducts(ProductOrderByInput.PriceAsc);
    }
    if (selecFilter === 'maior') {
      setOrdenProducts(ProductOrderByInput.PriceDesc);
    }
  }, [selecFilter]);

  const [itensPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(0);

  const pages = Math.ceil((data?.products.length as number) / itensPerPage);
  const startItem = currentPage * itensPerPage;
  const endIten = startItem + itensPerPage;

  const productPagination = data?.products.slice(startItem, endIten);

  return (
    <section className="w-full min-h-screen mt-[190px]">
      <div className="max-w-[1300px] m-auto mb-4 flex items-center justify-end px-5">
        <div className="rounded bg-zinc-700 min-w-min flex gap-2 items-center pl-2">
          <p className="font-semibold text-lg text-white">filtrar:</p>
          <Select onChange={(e) => setSelecFilter(e.target.value)}>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
          </Select>
        </div>
      </div>
      <div className="max-w-[1300px] min-h-screen m-auto">
        <div className="gap-10 grid cell:grid-cols-1 sm:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4">
          {productPagination?.map((product: any) => (
            <Product
              key={product.name}
              price={product.price}
              name={product.name}
              imgSrc={product.images[0].url}
              id={product.id}
            />
          ))}
        </div>
      </div>
      {pages !== 1 && (
        <ButtonPaginations pages={pages} setCurrentPage={setCurrentPage} />
      )}
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await client.query(ProductsDocument).toPromise();
  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
};
