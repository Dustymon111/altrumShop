import { AiFillHome } from "react-icons/ai";
import { IoCart } from "react-icons/io5";
import { MdPerson } from "react-icons/md";
export default function Navigator() {
    return(
            <div className="z-50 h-full flex justify-between bg-black text-white font-bold p-7 text-xl sticky top-0">
                <h1 className="p-2 text-2xl">Altrumshop</h1>
                <div className="w-96 flex justify-between p-2">
                    <a className="flex justify-between w-24 hover:text-blue-400 text-xl" href="/">
                    <AiFillHome size={28}/>
                        Home
                    </a>
                    <a className="flex justify-between w-20 hover:text-green-600 text-xl" href="/cart">
                        <IoCart size={32}/>
                        Cart
                    </a>
                    <a className="flex justify-between hover:text-red-600 text-xl" href="/login">
                    <MdPerson size={32}/>
                        Sign Out
                    </a>
                </div>
            </div>  
    )
}
