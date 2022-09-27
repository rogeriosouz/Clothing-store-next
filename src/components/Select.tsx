import { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: any;
}

export function Select({ children, ...rest }: SelectProps) {
  return (
    <select
      className="rounded cursor-pointer hover:border-slate-500 bg-zinc-700 text-white  min-w-min px-3  border border-slate-700 outline-none"
      {...rest}
    >
      {children}
    </select>
  );
}
