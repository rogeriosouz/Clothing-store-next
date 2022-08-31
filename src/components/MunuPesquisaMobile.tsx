import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';

type PropsMenuPesquisa = {
  height: boolean;
};

export function MenuPesquisaMobile({ height }: PropsMenuPesquisa) {
  const [inputPesquisa, setInputPesquisa] = useState('');

  const inputActive = inputPesquisa === '';

  return (
    <div
      className={classNames(
        'w-full mt-[140px] sm:hidden transition-all flex border-b-[1px] border-[#55555565] overflow-hidden items-center justify-center gap-3 fixed bg-white left-0 top-0 z-10',
        {
          'h-[80px]': height,
          'h-[0px] border-b-[0px]': !height,
        }
      )}
    >
      <input
        className={classNames(
          'rounded shadow-xl font-bold w-[80%] h-[50%] outline-none p-2 bg-zinc-300 text-black'
        )}
        placeholder="pesquisa"
        type="text"
        onChange={(e) => setInputPesquisa(e.target.value)}
      />
      <button
        disabled={inputActive}
        className="disabled:text-zinc-500 text-black w-[40px] h-[48%] rounded flex items-center justify-center"
      >
        {inputActive ? (
          <div>
            <BiSearchAlt2 fontSize={30} />
          </div>
        ) : (
          <Link href={`/search/${inputPesquisa}`}>
            <BiSearchAlt2 fontSize={30} />
          </Link>
        )}
      </button>
    </div>
  );
}
