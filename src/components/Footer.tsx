import { AiFillGithub } from 'react-icons/ai';

export function Footer() {
  return (
    <footer className="w-full h-[96px] mt-[90px] bg-zinc-800">
      <div className="max-w-[1440px] h-full flex sm:px-[136px] px-3 items-center justify-between mx-auto">
        <p className="font-semibold text-base  text-white">Rogerio</p>

        <h2 className="font-bold  sm:text-2xl text-xl text-white">Logo</h2>

        <a href="https://github.com/rogeriosouz" target={'_blank'}>
          <AiFillGithub className="  sm:text-[40px] text-[30px]" color="#fff" />
        </a>
      </div>
    </footer>
  );
}
