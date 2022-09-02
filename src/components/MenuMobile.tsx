import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCategoriesQuery } from '../generated/graphql';

type MenuMobileProps = {
  menuMobile: boolean;
  setMenuMobile: any;
};

export function MenuMobile({ menuMobile, setMenuMobile }: MenuMobileProps) {
  const [{ data }] = useCategoriesQuery();
  const { asPath } = useRouter();

  return (
    <div
      className={classNames(
        'sm:hidden w-full mt-[140px] bg-white fixed z-[2] top-0  transition-all',
        {
          'h-screen ': menuMobile,
          'h-[0px] overflow-hidden': !menuMobile,
        }
      )}
    >
      <div
        style={{
          letterSpacing: '0.300em',
        }}
        className="flex flex-col items-center justify-center"
      >
        <div className="w-full p-4  flex items-center justify-center flex-col">
          <div
            className={
              'w-full bg-white flex gap-3 items-start justify-center flex-col overflow-hidden'
            }
          >
            <Link href={'/'}>
              <div className="h-[41px] flex items-center">
                {asPath === '/' && (
                  <div className="h-full w-[4px] bg-zinc-500"></div>
                )}
                <p
                  onClick={() => {
                    setMenuMobile(false);
                  }}
                  className="text-[17px] hover:bg-zinc-300 transition-colors font-medium cursor-pointer w-full p-2"
                >
                  Home
                </p>
              </div>
            </Link>
            <Link href={'/products'}>
              <div className="h-[41px] flex items-center">
                {asPath === '/products' && (
                  <div className="h-full w-[4px] bg-zinc-500"></div>
                )}
                <p
                  onClick={() => {
                    setMenuMobile(false);
                  }}
                  className="text-[17px] hover:bg-zinc-300 transition-colors font-medium cursor-pointer w-full p-2"
                >
                  Todos produtos
                </p>
              </div>
            </Link>
            {data?.categories.map((categoria) => (
              <div key={categoria.id}>
                <Link href={`/category/${categoria.id}`}>
                  <div className="h-[41px] flex items-center">
                    {asPath === `/category/${categoria.id}` && (
                      <div className="h-full w-[4px] bg-zinc-500"></div>
                    )}

                    <p
                      onClick={() => {
                        setMenuMobile(false);
                      }}
                      className="text-[17px] hover:bg-zinc-300 transition-colors font-medium cursor-pointer w-full p-2"
                    >
                      {categoria.name}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
