import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';

export function Search() {
  const [search, setSearch] = useState('');

  return (
    <div className="flex gap-2 items-center">
      <input
        style={{
          width: '300px',
          height: '30px',
          letterSpacing: '0.300em',
        }}
        placeholder="pesquisa"
        className="text-[15px] font-bold text-black transition-colors w-[140px] border-b border-black p-2 outline-none hover:border-zinc-400"
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      <Link href={`/search/${search}`}>
        <button
          disabled={!search}
          className={classNames(
            'transition-colors flex items-center justify-center gap-2 cursor-pointer border-b border-black h-[30px] w-[40px] hover:border-zinc-400',
            {
              'border-zinc-400 cursor-default': !search,
            }
          )}
        >
          <BiSearchAlt2
            fontSize={22}
            color={search ? '#000' : 'rgb(161 161 170)'}
          />
        </button>
      </Link>
    </div>
  );
}
