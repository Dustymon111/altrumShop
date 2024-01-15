import { AiFillHome } from "react-icons/ai";
import { IoCart } from "react-icons/io5";
export default function Navigator() {
    return(
            <div className="h-full flex justify-between bg-black text-white font-bold p-7 text-xl p">
                <h1 className="p-2 text-2xl">Altrumshop</h1>
                <div className="w-72 flex justify-between p-2">
                    <a className="flex justify-between w-24 hover:text-gray-600 text-xl" href="/">
                    <AiFillHome size={28}/>
                        Home
                    </a>
                    <a className="flex justify-between w-20 hover:text-gray-600 text-xl" href="/cart">
                        <IoCart size={32}/>
                        Cart
                    </a>
                </div>
            </div>  
    )
}
