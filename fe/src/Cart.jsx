import { useState, useEffect } from "react"
import './Cart.css'
import Swal from 'sweetalert2'
import Navigator from "./navigator"
export default function Cart() {
    const [dataCart, setDataCart] = useState([])
    const [totalHarga, setTotalHarga] = useState(0)
    const [diskon, setTotalDiskon] = useState(0)

    useEffect(()=>{
        fetch("http://localhost:3000/api/cart")
        .then((data)=> data.json())
        .then((data)=>{    
          setDataCart(data)
        })
      },[])


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
        <div class="w-full h-full text-5xl my-auto font-bold">
            <h1 className="text-center">Cart Empty</h1>
        </div> 
        : 
        <div className="flex">
            <div className="p-5 w-1/2 flex flex-col">
                <h1 className="font-bold text-2xl bg-black text-white p-5 mx-2 w-full rounded-md">CART</h1>
                {dataCart.map((val,idx) => {
                return (
                <>
                    <div key= {val.id} class="boxcart flex p-2 m-2 w-full">
                        <img className="" src={val.image} alt="" width="100px" height = "100px"/>
                        <div className="w-full justify-between">
                            <p className="text-wrap w-3/4">{val.namaBarang}</p>
                            <p>Rp.{val.harga}</p>
                            <p className="">{val.jumlah} pcs</p>
                        </div>
                        <div className="w-full justify-between flex">
                            <div className="my-auto flex gap-5 w-full">
                            {
                                dataCart[idx].jumlah === 1 ?
                                <button className="w-1/6 bg-black text-white p-2 rounded-xl font-bold text-xl" disabled>-</button>
                                :
                                <button className="w-1/6 bg-black text-white p-2 rounded-xl font-bold text-xl" onClick={()=>{
                                    dataCart[idx].jumlah -= 1
                                    setDataCart(dataCart)
                                    changeHarga(dataCart)
                                    fetch(`http://localhost:3000/api/cart/${val.id}`,{
                                        method : "PATCH",
                                        headers : {"content-type" : "application/json"},
                                        body :JSON.stringify({
                                            jumlah : dataCart[idx].jumlah
                                        })
                                    })
                                }}>-</button>
                            }
                            <button className="w-1/6 bg-black text-white p-2 rounded-xl font-bold text-xl" onClick={()=>{
                                dataCart[idx].jumlah += 1    
                                setDataCart(dataCart)
                                changeHarga(dataCart)
                                fetch(`http://localhost:3000/api/cart/${val.id}`,{
                                    method : "PATCH",
                                    headers : {"content-type" : "application/json"},
                                    body :JSON.stringify({
                                        jumlah : dataCart[idx].jumlah
                                    })
                                })
                            }}>+</button>
                            </div>
                            <div className="my-auto">
                                <button className="" onClick={()=>{
                                    fetch(`http://localhost:3000/api/cart/${val.id}`,{
                                        method :"DELETE"
                                    })
                                    .then(()=>{
                                        let databackup =[...dataCart]
                                        console.log(databackup[idx])
                                        let dataDelete = databackup.filter((jawaban)=> jawaban.id !== val.id)
                                        databackup[idx] = dataDelete
                                        if(databackup[idx].length === 0){
                                            databackup.splice(idx,1)
                                        }
                                        setDataCart(databackup)
                                        changeHarga(databackup)
                                    })
                                }}>delete</button>
                            </div>
                        </div>
                    </div>
                </>)
            })}
            </div>
            <div className="mx-auto h-full w-3/12 sticky top-28 left-0 right-0 border-2 border-black p-2 m-2 rounded-2xl">
                <p>Harga Sebelum Diskon : {totalHarga}</p>
                <p>Total Potongan : {diskon}</p>
                <p>Total Setelah Diskon : {totalHarga - diskon}</p>
                <button onClick={()=>{
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Terimah Kasih Telah berbelanja!',
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