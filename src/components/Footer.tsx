export function Footer() {
  return (
    <footer className="w-full h-[80px] mt-[90px] bg-zinc-800">
      <div className="text-white  sm:max-w-[700px] max-w-[300px] w-[300px] sm:text-center text-center text-[14px] mb-[20px] mt-[12px] font-medium  m-auto h-full flex flex-col items-center justify-center">
        <p className="font-bold">Feito por: rogerio pereira</p>
        <span className="font-bold">
          Github:{' '}
          <a
            target={'_blank'}
            className="hover:underline"
            href="https://github.com/rogeriosouz"
          >
            https://github.com/rogeriosouz
          </a>
        </span>
      </div>
    </footer>
  );
}
