import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { FormatRupiah } from "@arismun/format-rupiah";
import './Cart.css'
import Swal from 'sweetalert2'
import Navigator from "./navigator"
import { FaTrash } from "react-icons/fa";
import { IoCart } from "react-icons/io5";

export default function Cart() {
    const [dataCart, setDataCart] = useState([])
    const [totalHarga, setTotalHarga] = useState(0)
    const [diskon, setTotalDiskon] = useState(0)
    let navigate = useNavigate()

    useEffect(()=>{
        fetch("http://localhost:3000/api/cart")
        .then((data)=> data.json())
        .then((data)=>{    
          setDataCart(data)
          changeHarga(dataCart)
        })
      },[dataCart])


    function changeHarga(data){
        let totalharga = 0 
        let totaldiskon = 0 
        for(let i = 0; i < data.length; i++){
            totalharga += (data[i].harga * data[i].jumlah)    
            if(data[i].diskon !== 0){
                let diskonya =  (data[i].diskon / 100 * data[i].harga ) * data[i].jumlah
                totaldiskon += diskonya
            }     
        }
        setTotalHarga(totalharga)
        setTotalDiskon(totaldiskon)
    }

    
    return (
        <>
        <Navigator/>
        {dataCart.length === 0 ? 
        <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600">Add items to your cart and start shopping!</p>
          <button className="hover:text-green-600" onClick={() => {
                navigate('/')
          }}>
          <IoCart size={72}/>
          </button>
        </div>
      </div>
        : 
        <div className="flex">
            <div className="p-5 w-1/2">
                <h1 className="font-bold text-2xl bg-black text-white p-5 mx-2 w-full rounded-md">CART</h1>
                {dataCart.map((val,idx) => {
                return (
                <>
                    <div key= {val.id} class="w-full flex p-4 m-2 justify-between border-2 border-black rounded-lg">
                        <img className="" src={val.image} alt="" width="150px"/>
                        <div className="w-1/2 h-1/2 grid gap-2 between my-auto mx-3">
                            <p className="">{val.namaBarang}</p>
                            <p><FormatRupiah value={val.harga}/>,-</p>
                            {   
                                val.diskon !== 0
                                ?
                                <div className="bg-red-600 text-white font-bold rounded-full p-2 w-3/12 text-center">
                                    {val.diskon}% 
                                </div>
                                :
                                <></>
                            }
                        </div>
                        <div className="w-full h-6/12 m-auto relative">
                            <div className="flex justify-between w-3/12 h-3/4">
                                {
                                    val.jumlah === 1 ?
                                    <button className="px-3 bg-black text-white rounded-md font-bold text-2xl disabled:bg-gray-500" disabled>-</button>
                                    :
                                    <button className="px-3 bg-black text-white rounded-md font-bold text-2xl" onClick={()=>{
                                        val.jumlah -= 1
                                        setDataCart(dataCart)
                                        changeHarga(dataCart)
                                        fetch(`http://localhost:3000/api/cart/${val.id}`,{
                                            method : "PATCH",
                                            headers : {"content-type" : "application/json"},
                                            body :JSON.stringify({
                                                jumlah : val.jumlah
                                            })
                                         })
                                        }}>-</button>
                                    }
                                    <p className="">{val.jumlah}</p>
                                    <button className="px-2 bg-black text-white rounded-md font-bold text-xl" onClick={()=>{
                                        val.jumlah += 1    
                                        setDataCart(dataCart)
                                        changeHarga(dataCart)
                                        fetch(`http://localhost:3000/api/cart/${val.id}`,{
                                                method : "PATCH",
                                                headers : {"content-type" : "application/json"},
                                                body :JSON.stringify({
                                                jumlah : val.jumlah
                                            })
                                        })
                                    }}>+</button>
                                </div>
                            <div className="absolute top-0 right-0">
                                <button className="rounded-xl hover:text-red-500" onClick={()=>{
                                    fetch(`http://localhost:3000/api/cart/${val.id}`,{
                                        method :"DELETE"
                                    })
                                    .then(()=>{
                                        let dataDelete = dataCart.filter((jawaban)=> jawaban.id !== val.id)
                                        val = dataDelete
                                        if(val.length === 0){
                                            dataCart.splice(idx,1)
                                        }
                                        setDataCart(dataCart)
                                        changeHarga(dataCart)
                                    })  
                                }}><FaTrash size={28}/></button>
                            </div>
                        </div>
                    </div>
                </>)
            })}
            </div>
            <div className="mx-auto flex flex-col justify-between w-3/12 h-52 sticky top-28 left-0 right-0 border-2 border-black p-2 m-2 rounded-2xl">
                <div className="flex flex-col justify-between h-full p-2">
                    <p><b>Harga Sebelum Diskon</b>Rp.{totalHarga}</p>
                    <p><b>Total Potongan</b>Rp.{diskon}</p>
                    <p><b>Total Setelah Diskon</b>Rp.{totalHarga - diskon}</p>
                </div>
                <button className="p-2 bg-black text-white font-bold hover:bg-red-700 rounded-xl" onClick={()=>{
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Terimah Kasih Telah Berbelanja!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    fetch("http://localhost:3000/api/cart",{
                        method : "DELETE",
                        headers :{
                            "content-type" : "application/json"
                        }
                    })
                    .then(()=>{setDataCart([])})
                }}>Check Out</button>
            </div>
    </div>

    }
    

    </>
    )
}