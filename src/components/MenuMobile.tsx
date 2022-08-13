import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';
import { useCategoriesQuery } from '../generated/graphql';

type MenuMobileProps = {
  menuMobile: boolean;
  setMenuMobile: any;
};

export function MenuMobile({ menuMobile, setMenuMobile }: MenuMobileProps) {
  const [menuCategory, setMenuCategory] = useState(false);
  const [{ data }] = useCategoriesQuery();

  return (
    <div
      className={classNames(
        'sm:hidden w-full mt-[140px] bg-white fixed z-[2] top-0 h-[0px] transition-all',
        {
          'h-[200px] border-b': menuMobile,
          'h-[0px] overflow-hidden': !menuMobile,
        }
      )}
    >
      <div
        style={{
          letterSpacing: '0.300em',
        }}
        className="flex flex-col items-center justify-center"
      >
        <div className="w-full p-3 text-center">
          <Link href={'/products'}>
            <p
              onClick={() => setMenuMobile(false)}
              className="text-base cursor-pointer"
            >
              TODOS PRODUTOS
            </p>
          </Link>
        </div>
        <div className="w-full p-3 flex items-center justify-center flex-col">
          <button
            style={{
              letterSpacing: '0.300em',
            }}
            onClick={() => setMenuCategory(!menuCategory)}
            className="w-full shadow-xl p-1 pl-3 rounded flex items-center justify-center cursor-pointer"
          >
            categorias
            {menuCategory ? (
              <MdOutlineArrowDropUp fontSize={30} />
            ) : (
              <MdOutlineArrowDropDown fontSize={30} />
            )}
          </button>
          <div
            className={classNames(
              'w-full bg-white flex items-start justify-center flex-col overflow-hidden',
              {
                'h-[0px]': !menuCategory,
                'min-h-min': menuCategory,
              }
            )}
          >
            {data?.categories.map((categoria) => (
              <Link key={categoria.id} href={`/category/${categoria.id}`}>
                <p
                  onClick={() => {
                    setMenuMobile(false);
                    setMenuCategory(false);
                  }}
                  style={{
                    letterSpacing: '0.345em',
                  }}
                  className="hover:bg-zinc-300 transition-colors text-[14px] mt-[12px] font-medium cursor-pointer  w-full text-center p-2"
                >
                  {categoria.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
