import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type ButtonsProps = {
  pages: any;
  setCurrentPage: any;
};

export function ButtonPaginations({ pages, setCurrentPage }: ButtonsProps) {
  return (
    <div className="w-full h-[50px] mt-[40px]">
      <div className="relative max-w-[400px] pl-[30px] m-auto flex items-center justify-center">
        {Array.from(Array(pages), (item, index) => (
          <button
            className="bg-zinc-600 mr-[20px] w-[30px] h-[30px] rounded text-white"
            value={index}
            onClick={(e: any) => setCurrentPage(e.target.value as number)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
