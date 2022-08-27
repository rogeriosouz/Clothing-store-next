import classNames from 'classnames';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import { DiDojo } from 'react-icons/di';
import { GoThreeBars, GoX } from 'react-icons/go';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';
import { ContextCartCreate } from '../context/CartContext';
import { useCategoriesQuery } from '../generated/graphql';
import { MenuMobile } from './MenuMobile';
import { Search } from './Search';

export function Header() {
  const [menuMobile, setMenuMobile] = useState(false);
  const [category, setCategory] = useState(false);
  const { cart } = useContext(ContextCartCreate);

  const [{ data }] = useCategoriesQuery();

  return (
    <>
      <header
        className={classNames('w-full h-[140px] fixed z-[2] top-0 bg-white', {
          'border-b': !menuMobile,
        })}
      >
        <div className="max-w-[1300px] m-auto h-full flex flex-col">
          <div className="w-full flex items-center justify-center relative mt-[20px] mb-[20px] h-[40px] p-2">
            <div className="cursor-pointer">
              <Link href={'/'}>
                <a>
                  <DiDojo fontSize={50} />
                </a>
              </Link>
            </div>
            <div className="cursor-pointer absolute left-[96%]">
              <Link href={'/cart'}>
                <div className="flex gap-2">
                  <AiOutlineShoppingCart fontSize={25} />
                  {cart.length}
                </div>
              </Link>
            </div>
          </div>
          <div className="w-full flex items-center justify-between h-[40px] p-2">
            <div className="font-medium text-[15px] gap-10 hidden sm:flex items-center">
              <Link href={'/products'}>
                <p className="transition-colors p-4 pl-5 pr-5 hover:bg-zinc-600 hover:text-white h-[34px] flex items-center font-medium text-xl cursor-pointer">
                  todos produtos
                </p>
              </Link>

              <div className="relative z-10">
                <button
                  onClick={() => setCategory(!category)}
                  className={classNames(
                    'border-black z-10 relative top-[1px] font-medium text-xl w-[150px] pl-[11px] bg-zinc-100 flex items-center cursor-pointer',
                    {
                      'border-b': !category,
                    }
                  )}
                >
                  categorias
                  <div className="ml-[10px]">
                    {category ? (
                      <MdOutlineArrowDropUp fontSize={30} />
                    ) : (
                      <MdOutlineArrowDropDown fontSize={30} />
                    )}
                  </div>
                </button>
                <div
                  className={classNames(
                    'overflow-hidden z-2 border-black flex flex-col absolute left-0 w-[300px] top-[100%] bg-zinc-100',
                    {
                      'h-[0px] border-white': !category,
                      'min-h-full': category,
                    }
                  )}
                >
                  <div className="w-full z-0 flex flex-col gap-3 text-black p-2 ">
                    {data?.categories.map((categore) => (
                      <div key={categore.id}>
                        <Link href={`/category/${categore.id}`}>
                          <p
                            onClick={() => setCategory(false)}
                            className="font-bold p-3 rounded hover:bg-zinc-300 hover:text-zinc-500 transition-colors text-[14px] mt-[12px] cursor-pointer  w-full text-center"
                          >
                            {categore.name}
                          </p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setMenuMobile(!menuMobile)}
              className="cursor-pointer sm:hidden"
            >
              {menuMobile ? (
                <GoX fontSize={30} />
              ) : (
                <GoThreeBars fontSize={30} />
              )}
            </button>

            <Search />
          </div>
        </div>
      </header>
      <MenuMobile menuMobile={menuMobile} setMenuMobile={setMenuMobile} />
    </>
  );
}
