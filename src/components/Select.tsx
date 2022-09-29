import { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: any;
}

export function Select({ children, ...rest }: SelectProps) {
  return (
    <select
      style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
      className="transition-colors  rounded-[1px] hover:bg-[#000000ad] hover:text-white cursor-pointer hover:border-zinc-700 bg-[#ffffffce] text-black font-semibold text-base w-[130px] border-[2px] border-zinc-700 text-center px-3 outline-none"
      {...rest}
    >
      {children}
    </select>
  );
}
