import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/react';

export default function Login() {
  function singIngGitHub() {
    signIn('github');
  }

  return (
    <section className="w-full h-screen flex items-center justify-center mt-[80px]">
      <div
        style={{
          boxShadow: 'rgb(0 0 0 / 20%) 2px 2px 19px 4px',
        }}
        className="w-[450px] min-h-min bg-white rounded pt-10 pb-10"
      >
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-center text-2xl font-bold">Login</h1>

          <div className="sm:mb-[40px] mb-[15px] sm:p-0 p-2 w-full flex items-center justify-center flex-col">
            <label className="mb-[10px] font-semibold text-lg sm:w-[85%] w-full">
              E-mail
            </label>
            <input
              placeholder="E-mail"
              className="sm:w-[85%] w-full transition-color hover:border-zinc-400 border border-zinc-300 p-2 outline-none h-[40px] rounded text-black font-normal"
              type="text"
            />
          </div>

          <div className="sm:mb-[40px] mb-[15px] sm:p-0 p-2 w-full flex items-center justify-center flex-col">
            <label className="mb-[10px] font-semibold text-lg sm:w-[85%] w-full">
              Password
            </label>
            <input
              placeholder="Password"
              className="sm:w-[85%] w-full transition-colors hover:border-zinc-400 border border-zinc-300 p-2 outline-none h-[40px] rounded text-black font-normal"
              type="text"
            />
          </div>

          <div className="w-full p-2 flex items-center justify-center">
            <button className="sm:w-[40%] w-full sm:p-0 hover:bg-zinc-700 transition-colors  h-[40px] rounded sm:mb-[40px] mb-[15px] text-white font-semibold bg-black">
              logar
            </button>
          </div>
          <div className="flex w-full h-[40px] justify-around p-[1px]">
            <button className="transition-colors sm:hover:bg-zinc-600 bg-black w-[30%] h-[40px] rounded"></button>
            <button
              onClick={singIngGitHub}
              className="transition-colors sm:hover:bg-zinc-600 bg-black w-[30%] h-[40px] rounded"
            >
              gitHub
            </button>
            <button className="transition-colors sm:hover:bg-zinc-600 bg-black w-[30%] h-[40px] rounded"></button>
          </div>
        </div>
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
