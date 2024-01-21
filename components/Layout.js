import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "./Nav";

export default function Layout({children}) {
  const {data : session} = useSession();

  if(!session){
    return(
      <div className="bg-gray-700 flex justify-center h-screen items-center">
        <div className="px-6 sm:px-0">
          <button type="button"
            onClick={() => signIn('google')}
            className="text-gray-600
            font-semibold
            w-full
            bg-[#ffffff]
            hover:bg-slate-400
            hover:text-black 
            focus:ring-4 
            focus:outline-none 
            focus:ring-white
            rounded-lg 
            text-base 
            duration-200
            px-5 
            py-2.5 
            text-center 
            inline-flex 
            items-center 
            justify-between 
            mr-2 mb-2">
            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
            Sign in
            <span></span>
          </button>
        </div>
    </div>
    );
  }

  return(
    <div>
      <Nav/>
      {children}
    </div>
  );
 
}