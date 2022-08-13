import classNames from 'classnames';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import { DiDojo } from 'react-icons/di';
import { GoThreeBars, GoX } from 'react-icons/go';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';
import { Context } from '../context/Carinho';
import { useCategoriesQuery } from '../generated/graphql';
import { MenuMobile } from './MenuMobile';
import { Search } from './Search';

export function Header() {
  const [menuMobile, setMenuMobile] = useState(false);
  const [category, setCategory] = useState(false);
  const { cart } = useContext(Context);

  const [{ data }] = useCategoriesQuery();

  return (
    <>
      <header
        className={classNames('w-full h-[140px] fixed z-[2] top-0 bg-white', {
          'border-b': !menuMobile,
        })}
      >
        <div className="max-w-[1100px] m-auto h-full flex flex-col">
          <div className="w-full flex items-center justify-between mt-[20px] mb-[20px] h-[40px] p-2">
            <div></div>
            <div className="cursor-pointer">
              <Link href={'/'}>
                <DiDojo fontSize={50} />
              </Link>
            </div>
            <div className=" cursor-pointer">
              <Link href={'/carinho'}>
                <div className="flex gap-2">
                  <AiOutlineShoppingCart fontSize={25} />
                  {cart.length}
                </div>
              </Link>
            </div>
          </div>
          <div className="w-full flex items-center justify-between h-[40px] p-2">
            <div
              style={{
                letterSpacing: '0.345em',
              }}
              className="font-medium text-[15px] gap-3 hidden sm:flex items-center"
            >
              <Link href={'/products'}>
                <p className="h-[34px] flex items-center text-base cursor-pointer">
                  todos produtos
                </p>
              </Link>

              <div className="relative z-10">
                <button
                  style={{
                    letterSpacing: '0.200em',
                  }}
                  onClick={() => setCategory(!category)}
                  className={classNames(
                    'border-r border-black z-10 relative top-[1px] border-l-[1px] border-t font-medium text-[15px] w-[150px] pl-[11px] bg-zinc-100  rounded-t flex items-center text-base cursor-pointer',
                    {
                      'border-b rounded': !category,
                    }
                  )}
                >
                  categorias
                  {category ? (
                    <MdOutlineArrowDropUp fontSize={30} />
                  ) : (
                    <MdOutlineArrowDropDown fontSize={30} />
                  )}
                </button>
                <div
                  className={classNames(
                    'overflow-hidden z-2 border-black border-t  border-b rounded-r rounded-b-lg flex flex-col absolute left-0 w-[300px] top-[100%] bg-zinc-100  border-r border-l',
                    {
                      'h-[0px] border-b-[0px] border-t-[0px] border-white':
                        !category,
                      'min-h-full': category,
                    }
                  )}
                >
                  <div className="w-full z-0 flex flex-col gap-3 text-black p-2 ">
                    {data?.categories.map((categore) => (
                      <Link href={`/category/${categore.id}`} key={categore.id}>
                        <p
                          onClick={() => setCategory(false)}
                          style={{
                            letterSpacing: '0.345em',
                          }}
                          className="hover:bg-zinc-300 transition-colors text-[14px] mt-[12px] font-medium cursor-pointer  w-full text-center p-1"
                        >
                          {categore.name}
                        </p>
                      </Link>
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
