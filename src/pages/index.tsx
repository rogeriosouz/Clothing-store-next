import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { AiFillCar } from 'react-icons/ai';
import { BiWorld } from 'react-icons/bi';
import { MdLocalOffer } from 'react-icons/md';

import { ButtonPaginations } from '../components/ButtonsPagination';
import { Product } from '../components/Product';
import { Select } from '../components/Select';
import { Slider } from '../components/Slider';

import {
  ProductOrderByInput,
  ProductsDocument,
  useProductsQuery,
} from '../generated/graphql';
import { client, ssrCache } from '../lib/urql';
import { randomList } from '../utils/utilitarios';

type PropsHome = {
  listFotos: string[];
};

export default function Home({ listFotos }: PropsHome) {
  const [ordenProducts, setOrdenProducts] = useState<ProductOrderByInput>();
  const [selecFilter, setSelecFilter] = useState('');
  const [itensPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const [{ data }] = useProductsQuery({
    variables: { orderBy: ordenProducts },
  });

  const pages = Math.ceil((data?.products.length as number) / itensPerPage);
  const startItem = currentPage * itensPerPage;
  const endIten = startItem + itensPerPage;

  const productPagination = data?.products.slice(startItem, endIten);

  useEffect(() => {
    if (selecFilter === 'menor') {
      setOrdenProducts(ProductOrderByInput.PriceAsc);
    }
    if (selecFilter === 'maior') {
      setOrdenProducts(ProductOrderByInput.PriceDesc);
    }
  }, [selecFilter]);

  return (
    <>
      <Slider listFotos={listFotos} />
      <section className="sm:block hidden w-full h-[10vh] mt-[60px] mb-[50px]">
        <div
          style={{
            letterSpacing: '0.305em',
          }}
          className="sm:flex-row gap-6 flex-col sm:text-[16px] max-w-[1400px] h-[10vh] flex m-auto text-base justify-around text-black items-center"
        >
          <div className="flex">
            <div className="sm:max-w-[300px] flex max-w-[400px] items-center justify-center gap-3">
              <BiWorld fontSize={30} />
              Todo brasil
            </div>
          </div>
          <div className="flex">
            <div className="flex sm:max-w-[300px] max-w-[400px] items-center justify-center gap-3">
              <AiFillCar fontSize={30} />
              entrega esprex
            </div>
          </div>
          <div className="flex">
            <div className="flex sm:max-w-[300px] max-w-[400px] items-center justify-center gap-3">
              <MdLocalOffer fontSize={30} />
              com ofertas
            </div>
          </div>
        </div>
      </section>

      <section className="w-full min-h-screen sm:mt-0 mt-[70px]">
        <div className="max-w-[1300px] m-auto mb-4 flex items-center justify-end px-5">
          <div className="min-w-min flex gap-2 items-center pl-2">
            <p className="text-black font-semibold text-lg">Filtrar:</p>
            <Select onChange={(e) => setSelecFilter(e.target.value)}>
              <option value="menor">Menor preço</option>
              <option value="maior">Maior preço</option>
            </Select>
          </div>
        </div>

        <div className="max-w-[1300px] min-h-screen m-auto">
          <div className="gap-y-10 grid cell:grid-cols-1 sm:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4">
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
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query(ProductsDocument).toPromise();

  let maxItems = data?.products.length as number;
  const lisRandom = randomList(0, maxItems - 1) as number[];

  let listFotos = [
    data?.products[lisRandom[0]].images[0].url,
    data?.products[lisRandom[1]].images[0].url,
    data?.products[lisRandom[2]].images[0].url,
  ] as string[];

  return {
    props: {
      urqlState: ssrCache.extractData(),
      listFotos,
    },
  };
};
