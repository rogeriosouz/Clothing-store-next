import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type ButtonsProps = {
  pages: any;
  setCurrentPage: any;
};

export function ButtonPaginations({ pages, setCurrentPage }: ButtonsProps) {
  const [page, setPage] = useState(1);

  return (
    <div className="w-full h-[50px] mt-[40px]">
      <div className="relative max-w-[400px] pl-[30px] m-auto flex items-center justify-center">
        {Array.from(Array(pages), (item, index) => (
          <>
            {page === index + 1 ? (
              <button
                className="bg-zinc-200 border-2 border-black text-black mr-[5px] w-[35px] h-[50px] "
                value={index}
                onClick={(e: any) => {
                  setPage(index + 1);
                  setCurrentPage(e.target.value as number);
                }}
              >
                {index + 1}
              </button>
            ) : (
              <button
                className="bg-zinc-600 mr-[5px] w-[35px] h-[50px] text-white"
                value={index}
                onClick={(e: any) => {
                  setPage(index + 1);
                  setCurrentPage(e.target.value as number);
                }}
              >
                {index + 1}
              </button>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
